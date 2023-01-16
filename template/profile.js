const ProfileOgTemplate = (
  userData = {
    username: "eddiejaoude",
    userImage: "https://github.com/eddiejaoude.png",
    userName: "Eddie Jaoude",
    userBio: "Open Source DevRel | Founder of **EddieHub** | **GitHub** Star",
    userTags: [
      "Open Source",
      "Javascript",
      "Typescript",
      "NextJS",
      "DevOps",
      "DevRel",
    ],
    userSocialLinks: [
      {
        icon: "FaTwitter",
        url: "https://twitter.com/eddiejaoude",
      },
      {
        icon: "FaGithub",
        url: "https://github.com/eddiejaoude",
      },
      {
        icon: "FaYoutube",
        url: "https://youtube.com/eddiejaoude",
      },
    ],
  }
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  
      <!-- Bootstrap CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" />
  
      <!-- font awesome icon -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  
      <style>
          body {
              background: "white";
              background-image: radial-gradient(circle at 25px 25px,
                      lightgray 1%,
                      transparent 0%),
                  radial-gradient(circle at 75px 75px, lightgray 1%, transparent 0%);
              background-size: 100px 100px;
              height: 100vh;
          }
      </style>
  
      <title>${userData.userName}</title>
  </head>
  
  <body class="p-5">
  
      <div class="row">
          <div class="col-6">
              <img src=${userData.userImage} alt=${
    userData.userName
  } class="rounded-3 shadow-lg"
                  style="width: 500px">
          </div>
          <div class="col-6 pt-4">
              <div class="col-12 pt-1">
                  <h1>
                      <b>${userData.userName}</b>
                  </h1>
              </div>
              <div class="col-12 p-1">
                  <h6 class="text-muted">
                        ${userData.userBio.replace(
                          /(?=\*\*)((.|\n)*)(?<=\*\*)/gm,
                          "<strong>$1</strong>"
                        )}
                  </h6>
              </div>
              <div class="col-9 pt-4">
                ${userData.userTags
                  .map(
                    (tag) =>
                      `<span class="badge text-bg-secondary shadow-lg m-2 p-2">${tag}</span>`
                  )
                  .join("")}
                </div>
              <div class="col-12 mt-4">
                  <h5>
                      <b>Connect With Me 🤝</b>
                  </h5>
              </div>
              <div class="col-12 mt-2">
                  <div class="row" style="margin-left: 1px">
                  ${userData.userSocialLinks
                    .slice(0, 10)
                    .map(
                      (link) => `<div class="col-6 p-2">
                        <i class="fa ${
                          link.icon === "twitter"
                            ? "fa-twitter"
                            : link.icon === "github"
                            ? "fa-github"
                            : link.icon === "youtube"
                            ? "fa-youtube-play"
                            : link.icon === "linkedin"
                            ? "fa-linkedin"
                            : link.icon === "twitch"
                            ? "fa-twitch"
                            : link.icon === "instagram"
                            ? "fa-instagram"
                            : ""
                        }" style="font-size:20px;"></i>
                        <b>
                            /${
                              link.icon === "twitter"
                                ? link.url
                                    .replace("https://twitter.com/", "")
                                    .replace("https://www.twitter.com/", "")
                                    .split("/")[0]
                                : link.icon === "github"
                                ? link.url
                                    .replace("https://github.com/", "")
                                    .replace("https://www.github.com/", "")
                                    .split("/")[0]
                                : link.icon === "youtube"
                                ? link.url
                                    .replace("https://youtube.com/", "")
                                    .replace("https://www.youtube.com/", "")
                                    .split("/")[0]
                                : link.icon === "linkedin"
                                ? link.url
                                    .replace("https://linkedin.com/in/", "")
                                    .replace("https://www.linkedin.com/in/", "")
                                    .split("/")[0]
                                : link.icon === "twitch"
                                ? link.url
                                    .replace("https://twitch.tv/", "")
                                    .replace("https://www.twitch.tv/", "")
                                    .split("/")[0]
                                : link.icon === "instagram"
                                ? link.url
                                    .replace("https://instagram.com/", "")
                                    .replace("https://www.instagram.com/", "")
                                    .split("/")[0]
                                : ""
                            }
                        </b>
                    </div>`
                    )
                    .join("")}
                  </div>
              </div>
              <div class="col-12 mt-4">
                  <img src="https://avatars.githubusercontent.com/u/66388388?s=20&v=4" alt="EddieHub"
                      class="rounded-3" style="width: 20px">
                  <small class="pt-1">
                      linkfree.eddiehub.io/
                      <b>
                          ${userData.username}
                      </b>
                  </small>
              </div>
          </div>
      </div>
  
  </body>
  
  </html>
     `;
};

export default ProfileOgTemplate;
