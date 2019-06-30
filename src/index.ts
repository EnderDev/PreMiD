import { app, systemPreferences, dialog } from "electron";
import { init as initSocket } from "./managers/socketManager";
import { init as initTray } from "./managers/trayManager";
import { update as initAutoLaunch } from "./managers/launchManager";
import { platform } from "os";
import inAppFolder from "./util/inAppFolder";
import { checkForUpdate } from "./util/updateChecker";

export var updateCheckerInterval = null;

//* Set AppUserModelId for task manager etc
app.setAppUserModelId("Timeraa.PreMiD");

//* Disable Hardware Acceleration as we don't render stuff
app.disableHardwareAcceleration();

//* App ready
app.once("ready", async () => {
  //* Handle in App Folder (Mac OS) rejects if user clicks "Quit app"
  await inAppFolder().catch(() => {
    app.quit();
    return;
  });

  //* Mac OS truted accessability client
  if (
    platform() === "darwin" &&
    !systemPreferences.isTrustedAccessibilityClient(false)
  )
    systemPreferences.isTrustedAccessibilityClient(true);

  //* Configure auto launch
  initAutoLaunch();

  //* Init socket
  await initSocket();

  //* init application tray icon
  await initTray();

  //* Check for update
  checkForUpdate(true);
  updateCheckerInterval = setInterval(checkForUpdate, 15 * 1000 * 60);

  //* Hide app icon if Mac OS
  if (platform() === "darwin") app.dock.hide();
});

//* If second instance started, close old one
app.on("second-instance", app.quit);

process.on("uncaughtException", err => {
  if (platform() === "darwin") app.dock.show();
  app.focus();
  dialog.showErrorBox(err.name, err.stack);
});
