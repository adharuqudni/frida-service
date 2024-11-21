
setTimeout(function () {
  console.log("Script Frida is executing....");
  Java.perform(function () {
    var TokenClass = Java.use("com.amazonaws.waf.mobilesdk.publicmodel.WAFToken");
    TokenClass.getValue.implementation = function () {
      var token = this.getValue();
      const formatted = "{identifierDeviceNumber}/"+ token
      send(formatted)
      return token;
    };

  });
}, 10000);
