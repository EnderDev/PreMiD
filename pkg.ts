import electronPackager = require("electron-packager");
import { platform } from "os";

var icon: string;

if (platform() == "darwin") icon = "./installer_assets/appIcon.icns";
if (platform() == "win32") icon = "./installer_assets/appIcon.ico";

electronPackager({
  dir: "./dist/app",
  out: "./dist",
  asar: true,
  darwinDarkModeSupport: true,
  icon: icon,
  overwrite: true
}).then(() => {
  console.log("UWU");
});
