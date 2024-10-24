const frida = require("frida");
const fs = require("fs");
const path = require("path");
const util = require("util");
const moment = require("moment");
const express = require("express");
const _ = require("lodash");
const app = express();
const port = 3000;
const readFile = util.promisify(fs.readFile);
const current = {
  device: null,
  pid: null,
  script: null,
};

let lastToken = null;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function onError(error) {
  console.error(error.stack);
}
function onMessage(message, data) {
  if (message.type === "send") {
    lastToken = message.payload
    const logging = {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      token: message.payload
    }
    console.log(logging);
  } else if (message.type === "error") {
    console.error(message.stack);
  }
}

async function run() {
  try {
    const source = await readFile(
      path.join(__dirname, "fridascript.js"),
      "utf8"
    );
    let device;
    let pid;
     for (const retry of _.range(0, 9999)) {
      try {
        device = await frida.getUsbDevice();
        current.device = device;
        console.log("[*] spawn()");
        pid = await device.spawn("com.traveloka.android");
        break
      } catch (err) {
        console.log("error message:", err.message);
        await sleep(1000);
      }
    }

    current.pid = pid;

    console.log(`[*] attach(${pid})`);
    const session = await device.attach(pid);

    session.detached.connect((reason) => {
      console.log("Detached:", reason);
    });

    const script = await session.createScript(source);
    script.message.connect(onMessage);
    await script.load();
    console.log(`[*] resume(${pid})`);

    await device.resume(pid);
  } catch (err) {
    console.log("error message:", err.message);
    await sleep(10000);
  }
}

app.get("/", (req, res) => {
  res.send(lastToken);
});

app.get("/health", (req, res) => {
  if(lastToken != null){
    res.status(200).send("Healthy");
  } else {
    res.status(204).send("Empty, still running");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

run().catch(onError);
