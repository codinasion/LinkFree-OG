import puppeteer from "puppeteer";

const default_width = 1200;
const default_height = 627;
const default_file_path = "screenshot.png";

export default async function getScreenshot(screenshot_data) {
  const {
    html,
    width = default_width,
    height = default_height,
    filePath = default_file_path,
  } = screenshot_data;

  // Create a browser instance
  await console.log("Launching browser...");
  const browser = await puppeteer.launch();

  // Create a new page
  await console.log("Creating new page...");
  const page = await browser.newPage();

  // Set viewport width and height
  await console.log("Setting viewport...");
  await page.setViewport({ width: width, height: height });

  // Set html content
  await console.log("Setting html content...");
  await page.setContent(html);
  
  // Wait for loading of all elements
  await console.log("Waiting for loading of all elements...");
  await page.waitForTimeout(1000);

  // Capture screenshot
  await console.log("Capturing screenshot...");
  await page.screenshot({
    type: "png",
    path: filePath,
  });

  // Close the browser instance
  await console.log("Closing browser...");
  await browser.close();

  return;
}
