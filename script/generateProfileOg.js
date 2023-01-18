import core from "@actions/core";

import fetch from "node-fetch";

import fs from "fs";

import getScreenshot from "./chromium.js";

import ProfileOgTemplate from "../template/profile.js";

export default async function generateProfileOg(
  LINK_FREE_OWNER,
  LINK_FREE_REPO_NAME,
  LINK_FREE_PROFILE_API
) {
  try {
    // Create profile directory
    const dirPath = "og/profile";
    fs.mkdirSync(dirPath, { recursive: true });

    // Get profiles data
    await console.log("Get profiles data...");

    const allProfilesResponse = await fetch(`${LINK_FREE_PROFILE_API}`, {
      method: "GET",
    });

    if (allProfilesResponse.status !== 200) {
      core.setFailed("Error fetching profiles data");
      return;
    }

    const allProfilesData = await allProfilesResponse.json();

    await console.log(`Total profiles: ${allProfilesData.length}...`);

    for (const profile of allProfilesData) {
      let username = profile.username;
      await console.log(`Generating profile for ${username}...`);

      const profileResponse = await fetch(
        `${LINK_FREE_PROFILE_API}/${username}`,
        {
          method: "GET",
        }
      );

      let profileData = [];

      if (profileResponse.status !== 200) {
        await console.log(
          `Error fetching profile data from API for ${username}`
        );

        const anotherProfileResponse = await fetch(
          `https://raw.githubusercontent.com/${LINK_FREE_OWNER}/${LINK_FREE_REPO_NAME}/main/data/${username}.json`,
          {
            method: "GET",
          }
        );

        if (anotherProfileResponse.status !== 200) {
          await console.log(
            `Error fetching profile data from GitHub for ${username}`
          );
          continue;
        }

        profileData = await JSON.parse(await anotherProfileResponse.text());
      } else {
        profileData = await profileResponse.json();
      }
      const userSocialLinks = [];

      if (profileData.socials) {
        await console.log("Get social links...");

        // Convert profileData.socials object keys to lowercase
        // why: url vs Url vs URL
        // ref: https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/data/Drabzit.json
        const socials = profileData.socials.map((obj) => {
          const lowercaseObj = Object.keys(obj).reduce((acc, key) => {
            acc[key.toLowerCase()] = obj[key];
            return acc;
          }, {});
          return lowercaseObj;
        });

        for (let link of socials) {
          if (
            !userSocialLinks.some(
              (l) =>
                l.url.replace("https://", "").replace("http://", "") ===
                link.url.replace("https://", "").replace("http://", "")
            )
          ) {
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
      }

      if (profileData.links) {
        await console.log("Get links...");

        // Convert profileData.links object keys to lowercase
        // why: url vs Url vs URL
        // ref: https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/data/Drabzit.json
        const links = profileData.links.map((obj) => {
          const lowercaseObj = Object.keys(obj).reduce((acc, key) => {
            acc[key.toLowerCase()] = obj[key];
            return acc;
          }, {});
          return lowercaseObj;
        });

        for (let link of links) {
          if (
            !userSocialLinks.some(
              (l) =>
                l.url.replace("https://", "").replace("http://", "") ===
                link.url.replace("https://", "").replace("http://", "")
            )
          ) {
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
      }

      // Remove duplicates icon and url pairs
      userSocialLinks.filter((v, i, a) => a.findIndex((t) => t === v) === i);

      // await console.log(userSocialLinks);

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
        filePath: `${dirPath}/${username.toLowerCase()}.png`,
      };

      await getScreenshot(screenshot_data);

      // For testing a single profile
      // break;
    }
  } catch (err) {
    console.log(err);
  }
}
