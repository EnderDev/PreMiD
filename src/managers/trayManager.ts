import { app, Menu, Tray } from "electron";
import { join } from "path";

let tray = null;

export function init() {
  return new Promise<Boolean>(function(resolve, reject) {
    app.whenReady().then(() => {
      tray = new Tray(join(__dirname, "../assets/tray/16x16.png"));

      var contextMenu = Menu.buildFromTemplate([
        {
          label: "Check for updates"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]);

      tray.setContextMenu(contextMenu);
      resolve();
    });
  });
}
