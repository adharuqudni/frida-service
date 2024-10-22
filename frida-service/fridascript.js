/*  Android ssl certificate pinning bypass script for various methods
	by Maurizio Siddu
	
	Run with:
	frida -U -f <APP_ID> -l frida_multiple_unpinning.js [--no-pause]
*/

setTimeout(function () {
  /**
   * Bypass Emulator Detection
   * @param {any} function(
   * @returns {any}
   */
  Java.perform(function () {
   
    // const groups = Java.enumerateMethods('*android.content.Context*!*')
    // console.log(JSON.stringify(groups, null, 2));
    // setInterval(() => {
    //   const groups = Java.enumerateMethods("*!*getClientInfo*");
    //   console.log(groups);
    //   console.log(JSON.stringify(groups, null, 2));

    //   // send(JSON.stringify(groups, null, 2));
    // }, 5 * 1000);

    // try {
    //   var okhttp = Java.use("com.android.okhttp.OkHttpClient");
    //   // console.log(okhttp)
    //   // ANSI escape code for red color
    //   var redColor = "\u001b[31m";
    //   // ANSI escape code for green color
    //   var greenColor = "\u001b[32m";
    //   // ANSI escape code to reset color
    //   var resetColor = "\u001b[0m";

    //   var targetHosts = [
    //     "e75799d8293d.33766ad1.ap-southeast-1.token.awswaf.com",
    //   ];
    //   // Replace with your target hosts to set your scope
    //   // eg: targetHosts = ["google.com", "frida.re", "github.com"]
    //   // leave empty (eg: []) to print all requests

    //   // Intercept API calls
    //   var originalNewCall = okhttp.newCall.overload(
    //     "com.android.okhttp.Request"
    //   );
    //   console.log(originalNewCall);
    //   originalNewCall.implementation = function (request) {
    //     // Get the request's URL and extract the host
    //     var requestUrl = request.url().toString();
    //     var urlParts = requestUrl.split("/");
    //     var extractedHost = urlParts[2]; // Assumes the host is at index 2
    //     console.log("request url: ", requestUrl);
    //     console.log("request parts: ", urlParts);
    //     console.log("extractedHost: ", extractedHost);

    //     if (targetHosts.includes(extractedHost) || targetHosts.length === 0) {
    //       var requestEndpoint = requestUrl.replace(
    //         /^(https?:\/\/[^\/]+)(\/.*)$/,
    //         "$2"
    //       );
    //       // Construct and print request headers
    //       var requestHeaders = request.headers();
    //       console.log(redColor + "[API Call]" + resetColor);
    //       console.log("             ");
    //       console.log(greenColor + request.method() + " " + requestEndpoint);
    //       // Add the Host header with the extracted host
    //       requestHeaders = requestHeaders
    //         .newBuilder()
    //         .add("Host", extractedHost)
    //         .build();
    //       // console.log(greenColor + "Request Headers:");
    //       var requestHeaderNames = requestHeaders.names();
    //       var requestHeaderNamesArray = requestHeaderNames.toArray();

    //       for (var i = 0; i < requestHeaderNamesArray.length; i++) {
    //         var headerName = requestHeaderNamesArray[i];
    //         var headerValue = requestHeaders.get(headerName);
    //         headerValue = decodeURIComponent(headerValue); // Decode header value
    //         console.log(
    //           greenColor + headerName + ": " + headerValue + resetColor
    //         );
    //       }
    //       console.log("             ");
    //       console.log("             ");

    //       console.log(
    //         greenColor + requestBodyToString(request.body()) + resetColor
    //       );
    //       console.log(redColor + "============================" + resetColor);

    //       var newRequest = request.newBuilder().headers(requestHeaders).build();
    //       var response = this.newCall(newRequest).execute();

    //       // Construct and print response headers
    //       console.log(
    //         redColor +
    //           "[API Response]" +
    //           " - [" +
    //           requestEndpoint +
    //           "]" +
    //           resetColor
    //       );
    //       console.log("             ");
    //       console.log(
    //         greenColor + response.code() + " " + response.message() + resetColor
    //       );
    //       var responseHeaders = response.headers();
    //       var responseHeaderNames = responseHeaders.names();
    //       var responseHeaderNamesArray = responseHeaderNames.toArray();
    //       for (var i = 0; i < responseHeaderNamesArray.length; i++) {
    //         var responseHeaderName = responseHeaderNamesArray[i];
    //         var responseHeaderValue = responseHeaders.get(responseHeaderName);
    //         console.log(
    //           greenColor +
    //             responseHeaderName +
    //             ": " +
    //             responseHeaderValue +
    //             resetColor
    //         );
    //       }
    //       console.log("             ");

    //       // console.log(greenColor  + response.message());
    //       var responseBody = response.body();
    //       if (responseBody !== null) {
    //         if (response.isSuccessful()) {
    //           console.log(
    //             greenColor + responseBody.string() + resetColor + resetColor
    //           );
    //         } else {
    //           console.log(
    //             redColor + "Error: Response not successful" + resetColor
    //           );
    //         }
    //       } else {
    //         console.log(greenColor + "Error: Empty response body" + resetColor);
    //       }
    //       console.log(redColor + "============================" + resetColor);
    //       return this.newCall(request);
    //     } else {
    //       // Return a new Call instance for Frida to continue instrumenting
    //       console.log(request);
    //       return this.newCall(request);
    //     }
    //   };
    // } catch (err) {
    //   console.log(err);
    // }

    // setInterval(() => {
    //   Java.choose("android.content.SharedPreferences", {
    //     onMatch: function (instance) {
    //       const token = instance.getAll();
    //       // console.log('instanc', JSON.stringify(instance.values()))
    //       if (token != null && token) {
    //         var iterator = token.entrySet().iterator();
    //         while (iterator.hasNext()) {
    //           var entry = Java.cast(iterator.next(), HashMapNode);
    //           console.log(entry.getKey());
    //           console.log(entry.getValue());
    //         }
    //       }
    //     },
    //     onComplete: function () {
    //       console.log("done.");
    //     },
    //   });
    // }, 2000);

    // setInterval(() => {
    //   var Signal = Java.use("com.amazonaws.waf.mobilesdk.publicmodel.Signal");
    //   Signal.toString.implementation = function () {
    //     var res = this.toString();
    //     var replaced = replaceDeviceID(res, '13fb8aef-a57a-45c9-be77-054f73a9ed6f')
    //     console.log('To string triggered')
    //     return replaced;
    //   };
    //   Java.choose("com.amazonaws.waf.mobilesdk.publicmodel.Signal", {
    //     onMatch: function (instance) {
    //       try {
    //         const token = instance
    //         // const updatedId = replaceDeviceID(
    //         //   token,
    //         //   "e38aa5af-3f92-4a9b-8e43-cca273dafadb"
    //         // );
    //         console.log("token", token);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     },
    //     onComplete: function () {
    //       console.log("request..");
    //     },
    //   });
    // }, 1000);
    setInterval(() => {
      Java.choose("com.traveloka.android.model.repository.CustomHeaderImpl", {
        onMatch: function (instance) {
          try {
            const token = instance.createCustomHeader();
            console.log("Custom Header", token.values().toArray().toString());
          } catch (err) {
            console.log(err);
          }

          // console.log('instanc', JSON.stringify(instance.valueOf))
        },
        onComplete: function () {
          console.log("request..");
        },
      });
    }, 1000);
  });
}, 1000);

function returner(typeName) {
  // This is a improvable rudimentary fix, if not works you can patch it manually
  //console.log("typeName: "+typeName)
  if (typeName === undefined || typeName === "void") {
    return;
  } else if (typeName === "boolean") {
    return true;
  } else {
    return null;
  }
}

function overloader(errStr, targetClass, targetFunc, retType) {
  // One ring to overload them all.. ;-)
  var tClass = Java.use(targetClass);
  var tFunc = tClass[targetFunc];
  var params = [];
  var argList = [];
  var overloads = tFunc.overloads;
  var returnTypeName = retType;
  var splittedList = String(errStr).split(".overload");
  for (var n = 1; n < splittedList.length; n++) {
    var extractedOverload = splittedList[n]
      .trim()
      .split("(")[1]
      .slice(0, -1)
      .replaceAll("'", "");
    // Discarding useless error strings
    if (extractedOverload.includes("<signature>")) {
      continue;
    }
    console.log(
      '\x1b[34m[!] Found the unusual/obfuscated pinner "' +
        targetClass +
        "." +
        targetFunc +
        "(" +
        extractedOverload +
        ')"\x1b[0m'
    );
    // Check if extractedOverload is empty
    if (!extractedOverload) {
      // Overloading method withouth arguments
      tFunc.overload().implementation = function () {
        var printStr = printer();
        console.log(
          '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
            targetClass +
            "." +
            targetFunc +
            "(" +
            extractedOverload +
            ')"' +
            printStr +
            "\x1b[0m"
        );
        returner(returnTypeName);
      };
    } else {
      // Check if extractedOverload has multiple arguments
      if (extractedOverload.includes(",")) {
        argList = extractedOverload.split(", ");
      }
      // Considering max 8 arguments for the method to overload (Note: increase it, if needed)
      if (argList.length == 0) {
        tFunc.overload(extractedOverload).implementation = function (a) {
          var printStr = printer();
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 2) {
        tFunc.overload(argList[0], argList[1]).implementation = function (
          a,
          b
        ) {
          var printStr = printer(a);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 3) {
        tFunc.overload(argList[0], argList[1], argList[2]).implementation =
          function (a, b, c) {
            var printStr = printer(a, b);
            console.log(
              '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
                targetClass +
                "." +
                targetFunc +
                "(" +
                extractedOverload +
                ')"' +
                printStr +
                "\x1b[0m"
            );
            returner(returnTypeName);
          };
      } else if (argList.length == 4) {
        tFunc.overload(
          argList[0],
          argList[1],
          argList[2],
          argList[3]
        ).implementation = function (a, b, c, d) {
          var printStr = printer(a, b, c);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 5) {
        tFunc.overload(
          argList[0],
          argList[1],
          argList[2],
          argList[3],
          argList[4]
        ).implementation = function (a, b, c, d, e) {
          var printStr = printer(a, b, c, d);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 6) {
        tFunc.overload(
          argList[0],
          argList[1],
          argList[2],
          argList[3],
          argList[4],
          argList[5]
        ).implementation = function (a, b, c, d, e, f) {
          var printStr = printer(a, b, c, d, e);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 7) {
        tFunc.overload(
          argList[0],
          argList[1],
          argList[2],
          argList[3],
          argList[4],
          argList[5],
          argList[6]
        ).implementation = function (a, b, c, d, e, f, g) {
          var printStr = printer(a, b, c, d, e, f);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      } else if (argList.length == 8) {
        tFunc.overload(
          argList[0],
          argList[1],
          argList[2],
          argList[3],
          argList[4],
          argList[5],
          argList[6],
          argList[7]
        ).implementation = function (a, b, c, d, e, f, g, h) {
          var printStr = printer(a, b, c, d, e, f, g);
          console.log(
            '\x1b[34m[+] Bypassing the unusual/obfuscated pinner "' +
              targetClass +
              "." +
              targetFunc +
              "(" +
              extractedOverload +
              ')"' +
              printStr +
              "\x1b[0m"
          );
          returner(returnTypeName);
        };
      }
    }
  }
}

function printer(a, b, c, d, e, f, g, h) {
  // Build the string to print for the overloaded pinner
  var printList = [];
  var printStr = "";
  if (typeof a === "string") {
    printList.push(a);
  }
  if (typeof b === "string") {
    printList.push(b);
  }
  if (typeof c === "string") {
    printList.push(c);
  }
  if (typeof d === "string") {
    printList.push(d);
  }
  if (typeof e === "string") {
    printList.push(e);
  }
  if (typeof f === "string") {
    printList.push(f);
  }
  if (typeof g === "string") {
    printList.push(g);
  }
  if (typeof h === "string") {
    printList.push(h);
  }
  if (printList.length !== 0) {
    printStr = " check for:";
    for (var i = 0; i < printList.length; i++) {
      printStr += " " + printList[i];
    }
  }
  return printStr;
}

function requestBodyToString(requestBody) {
  if (requestBody === null) {
    return "";
  }

  var buffer = Java.use("okio.Buffer").$new();
  requestBody.writeTo(buffer);
  return buffer.readUtf8();
}

function replaceDeviceID(log, newDeviceID) {
  // Use a regex to match the DeviceID line and replace its value
  const updatedLog = log.replace(
    /({ name : DeviceID, value : {Present=)[^}]+(})/,
    `$1${newDeviceID}$2`
  );
  return updatedLog;
}



