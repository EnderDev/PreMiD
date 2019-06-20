import { execSync } from "child_process";
import { app, MenuItem } from "electron";
import { resolve, join } from "path";

import sudo = require("sudo-prompt");
import { tray, trayContextMenu } from "../managers/trayManager";

export function check() {
  /*sudo.exec(
    "./updater.app/Contents/MacOS/osx-intel",
    {
      name: "PreMiD",
      stdio: "inherit",
      cwd: `${join(__dirname, "../")}`
    },
    function(error, stdout, stderr) {
      console.log(error, stdout, stderr);
    }
  );
  var res = execSync("./updater.app -h", {
    stdio: "inherit",
    cwd: `${join(__dirname, "../")}`
  });*/
}
