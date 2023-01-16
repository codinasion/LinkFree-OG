import core from "@actions/core";

import generateHomeOg from "./script/generateHomeOg.js";
import generateProfileOg from "./script/generateProfileOg.js";

(async () => {
  try {
    console.log("Hii there !!!");

    // LinkFree data
    const LINK_FREE_OWNER = await core.getInput("LINK_FREE_OWNER");
    const LINK_FREE_REPO_NAME = await core.getInput("LINK_FREE_REPO_NAME");
    const LINK_FREE_PROFILE_API = await core.getInput("LINK_FREE_PROFILE_API");

    // Github Token data
    const TOKEN = await core.getInput("TOKEN");

    // Workflow trigger data
    const GENERATE_HOME_OG = await core.getInput("GENERATE_HOME_OG");
    const GENERATE_PROFILE_OG = await core.getInput("GENERATE_PROFILE_OG");

    if (GENERATE_HOME_OG === "true") {
      await console.log("Generating Home OG");
      await generateHomeOg(LINK_FREE_OWNER, LINK_FREE_REPO_NAME, TOKEN);
    }

    if (GENERATE_PROFILE_OG === "true") {
      await console.log("Generating Profile OG");
      await generateProfileOg(
        LINK_FREE_OWNER,
        LINK_FREE_REPO_NAME,
        LINK_FREE_PROFILE_API,
        TOKEN
      );
    }

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
