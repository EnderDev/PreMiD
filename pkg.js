"use strict";
exports.__esModule = true;
var electronPackager = require("electron-packager");
var os_1 = require("os");
var icon;
if (os_1.platform() == "darwin")
    icon = "./installer_assets/appIcon.icns";
if (os_1.platform() == "win32")
    icon = "./installer_assets/appIcon.ico";
electronPackager({
    dir: "./dist/app",
    out: "./dist",
    asar: true,
    darwinDarkModeSupport: true,
    icon: icon,
    overwrite: true
}).then(function () {
    console.log("UWU");
});
