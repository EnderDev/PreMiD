import { app } from "electron";
import * as trayManager from "./managers/trayManager";

//* Set AppUserModelId for task manager etc
app.setAppUserModelId("Timeraa.PreMiD");
//* Disable Hardware Acceleration as we don't render stuff
app.disableHardwareAcceleration();
//* init application tray icon
trayManager.init();
//* If second instance started, close it
if (!app.requestSingleInstanceLock()) app.quit();
