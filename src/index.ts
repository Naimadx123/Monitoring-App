import { app, BrowserWindow } from "electron";

app.on("ready", () => {
  console.log("App is ready");

  const win = new BrowserWindow({
    width: 2080,
    height: 1080,
    icon: './copy/icons/icon.ico',
  });

  const indexHTML = "./copy/index.html";
  win
    .loadFile(indexHTML)
    .then(() => {
      // IMPLEMENT FANCY STUFF HERE
    })
    .catch((e) => console.error(e));
});