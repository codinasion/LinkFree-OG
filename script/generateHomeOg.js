import core from "@actions/core";

import fetch from "node-fetch";

import fs from "fs";

import sleep from "./sleep.js";

import getScreenshot from "./chromium.js";

import HomeOgTemplate from "../template/home.js";

export default async function generateHomeOg(
  LINK_FREE_OWNER,
  LINK_FREE_REPO_NAME,
  TOKEN
) {
  try {
    // Get repository data
    await console.log("Get repository data...");
    const repoDataResponse = await fetch(
      `https://api.github.com/repos/EddieHubCommunity/LinkFree`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    );

    if (repoDataResponse.status !== 200) {
      core.setFailed("Error fetching repo data");
      return;
    }

    const repoData = await repoDataResponse.json();
    const repoOwner = repoData.owner.login;
    const repoName = repoData.name;
    const repoDescription = repoData.description;
    const repoWebsite = repoData.homepage;

    // Get all contributors
    // We will get around 500 contributors data and rest will be anonymous contributors
    // https://github.com/orgs/community/discussions/24355
    await console.log("Get all contributors...");
    const contributorsList = [];
    let contributorsPage = 1;
    while (true) {
      const contributorsResponse = await fetch(
        `https://api.github.com/repos/${LINK_FREE_OWNER}/${LINK_FREE_REPO_NAME}/contributors?per_page=100&page=${contributorsPage}&anon=true`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        }
      );

      if (contributorsResponse.status !== 200) {
        core.setFailed("Error fetching contributors");
        break;
      } else {
        const contributors = await contributorsResponse.json();
        if (contributors.length === 0) {
          break;
        }
        contributorsList.push(...contributors);

        if (contributors.length < 100) {
          break;
        }

        contributorsPage++;

        await console.log(`Fetched ${contributorsList.length} contributors`);

        // To prevent Github api secondary rate limit
        await sleep(5000);
      }
    }

    await console.log(`Total contributors: ${contributorsList.length}`);

    // Sort contributors based on whether login is present or not
    // If login is present then it is a real user
    // If login is not present then it is an anonymous user
    // We will show real users first and then anonymous users
    contributorsList.sort((a, b) => {
      if (a.login && !b.login) {
        return -1;
      } else if (!a.login && b.login) {
        return 1;
      } else {
        return 0;
      }
    });

    // Generate html
    const dirPath = "og";
    fs.mkdirSync(dirPath, { recursive: true });

    const contributorsToShow = contributorsList.slice(0, 130);
    const restOfContributors =
      contributorsList.length - contributorsToShow.length;

    await console.log("Generate html...");
    const html = await HomeOgTemplate(
      repoOwner,
      repoName,
      repoDescription,
      repoWebsite,
      contributorsToShow,
      restOfContributors
    );

    // get screenshot
    await console.log("Get screenshot...");
    const screenshot_data = {
      html: html,
      filePath: `${dirPath}/linkfree.png`,
    };

    await getScreenshot(screenshot_data);
  } catch (e) {
    console.log(e);
  }
}
