import fetch from "node-fetch";

import fs from "fs";

import getScreenshot from "./chromium.js";

import ProfileOgTemplate from "../template/profile.js";

export default async function generateProfileOg() {
  const dirPath = "og/profile";
  fs.mkdirSync(dirPath, { recursive: true });

  // generate html
  await console.log("generate html");
  const html = await ProfileOgTemplate();

  // get screenshot
  await console.log("get screenshot");
  const screenshot_data = {
    html: html,
    filePath: `${dirPath}/profile.png`,
  };

  await getScreenshot(screenshot_data);
}
