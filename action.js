import core from "@actions/core";

import generateHomeOg from "./script/generateHomeOg.js";
import generateProfileOg from "./script/generateProfileOg.js";

(async () => {
  try {
    console.log("Hii there !!!");

    // LinkFree data
    const LINK_FREE_OWNER = await core.getInput("LINK_FREE_OWNER");
    const LINK_FREE_REPO_NAME = await core.getInput("LINK_FREE_REPO_NAME");

    // Github Token data
    const TOKEN = await core.getInput("TOKEN");

    // Workflow trigger data
    const GENERATE_HOME_OG = await core.getInput("GENERATE_HOME_OG");

    if (GENERATE_HOME_OG === "true") {
      await console.log("Generating Home OG");
      await generateHomeOg(TOKEN, LINK_FREE_OWNER, LINK_FREE_REPO_NAME);
    }

    // await generateProfileOg();

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
