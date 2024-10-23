
setTimeout(function () {
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
  console.log("Script Frida is executing....");
  Java.perform(function () {
    var TokenClass = Java.use("com.amazonaws.waf.mobilesdk.publicmodel.WAFToken");
    TokenClass.getValue.implementation = function () {
      var token = this.getValue();
      
      send(token)
      return token;
    };

  });
}, 10000);
