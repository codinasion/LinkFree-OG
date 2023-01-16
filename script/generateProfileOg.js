import fetch from "node-fetch";

import fs from "fs";

import getScreenshot from "./chromium.js";

import ProfileOgTemplate from "../template/profile.js";

export default async function generateProfileOg(
  LINK_FREE_OWNER,
  LINK_FREE_REPO_NAME,
  LINK_FREE_PROFILE_API,
  TOKEN
) {
  try {
    // Create profile directory
    const dirPath = "og/profile";
    fs.mkdirSync(dirPath, { recursive: true });

    // Get profiles data
    await console.log("Get profiles data...");

    const allPathsResponse = await fetch(
      `https://api.github.com/repos/${LINK_FREE_OWNER}/${LINK_FREE_REPO_NAME}/git/trees/main?recursive=1`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    );

    if (allPathsResponse.status !== 200) {
      console.log("Error fetching all paths");
      return;
    }

    const allPaths = await allPathsResponse.json().then((data) => data.tree);

    await console.log("Cleaning up paths...");
    const profilesPaths = await allPaths.filter((path) =>
      path.path.includes("data/")
    );

    for (const profilePath of profilesPaths) {
      if (
        profilePath.path.endsWith(".json") &&
        !profilePath.path.replace("data/", "").includes("/")
      ) {
        let username = profilePath.path
          .replace("data/", "")
          .replace(".json", "");
        await console.log(`Generating profile for ${username}...`);

        const profileResponse = await fetch(
          `${LINK_FREE_PROFILE_API}/${username}`,
          {
            method: "GET",
          }
        );

        if (profileResponse.status !== 200) {
          console.log(`Error fetching profile data for ${username}`);
          continue;
        }

        const profileData = await profileResponse.json();

        const userSocialLinks = [];

        if (profileData.socials) {
          await console.log("Get social links...");
          for (let link of profileData.socials) {
            if (link.icon === "FaTwitter") {
              userSocialLinks.push({
                icon: "twitter",
                url: link.url,
              });
            }
            if (link.icon === "FaGithub") {
              userSocialLinks.push({
                icon: "github",
                url: link.url,
              });
            }
            if (link.icon === "FaYoutube") {
              userSocialLinks.push({
                icon: "youtube",
                url: link.url,
              });
            }
            if (link.icon === "FaLinkedin") {
              userSocialLinks.push({
                icon: "linkedin",
                url: link.url,
              });
            }
            if (link.icon === "FaTwitch") {
              userSocialLinks.push({
                icon: "twitch",
                url: link.url,
              });
            }
            if (link.icon === "FaInstagram") {
              userSocialLinks.push({
                icon: "instagram",
                url: link.url,
              });
            }
          }
        }

        if (profileData.links) {
          await console.log("Get links...");
          for (let link of profileData.links) {
            if (link.icon === "FaTwitter") {
              let data = {
                icon: "twitter",
                url: link.url,
              };
              if (!userSocialLinks.includes(data)) {
                userSocialLinks.push(data);
              }
            }
            if (link.icon === "FaGithub") {
              let data = {
                icon: "github",
                url: link.url,
              };
              if (!userSocialLinks.includes(data)) {
                userSocialLinks.push(data);
              }
            }
            if (link.icon === "FaYoutube") {
              let data = {
                icon: "youtube",
                url: link.url,
              };
              if (!userSocialLinks.includes(data)) {
                userSocialLinks.push(data);
              }
            }
            if (link.icon === "FaLinkedin") {
              let data = {
                icon: "linkedin",
                url: link.url,
              };
              if (!userSocialLinks.includes(data)) {
                userSocialLinks.push(data);
              }
            }
            if (link.icon === "FaTwitch") {
              let data = {
                icon: "twitch",
                url: link.url,
              };
              if (!userSocialLinks.includes(data)) {
                userSocialLinks.push(data);
              }
            }
            if (link.icon === "FaInstagram") {
              userSocialLinks.push({
                icon: "instagram",
                url: link.url,
              });
            }
          }
        }

        await console.log(userSocialLinks);

        let userData = {
          username: username,
          userImage: profileData.avatar,
          userName: profileData.name,
          userBio: profileData.bio,
          userTags: profileData.tags,
          userSocialLinks: userSocialLinks,
        };

        // generate html
        await console.log("Generate html...");
        const html = await ProfileOgTemplate(userData);

        // get screenshot
        await console.log("Get screenshot...");
        const screenshot_data = {
          html: html,
          filePath: `${dirPath}/${username}.png`,
        };

        await getScreenshot(screenshot_data);

        // For testing a single profile
        // break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}
