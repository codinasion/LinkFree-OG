const HomeOgTemplate = (
  repoOwner = "EddieHubCommunity",
  repoName = "LinkFree",
  repoDescription = "Connect to your audience with a single link. Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe.",
  repoWebsite = "https://linkfree.eddiehub.io",
  contributorsToShow = [
    {
      login: "eddiejaoude",
    },
  ],
  restOfContributors = 1000
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

    <title>${repoName}</title>
</head>

<body class="p-5">

    <div class="row">
        <div class="col-10 pt-4 pl-4">
            <div class="col-12 pt-1">
                <h1>
                    <b>${repoName}e</b>
                </h1>
                <small class="text-muted">
                    <i class="fa fa-github" style="font-size:15px;"></i>
                    ${repoOwner}/${repoName}
                </small>
            </div>
            <div class="col-12 pt-4">
                <h5 class="text-muted">
                    ${repoDescription}
                </h5>
            </div>
        </div>
        <div class="col-2">
            <img src="https://avatars.githubusercontent.com/u/66388388?s=200&v=4" alt="EddieHubCommunity"
                class="text-center">
        </div>
    </div>

    <div class="row pt-4">
        <div class="col-12">
            <h5>
                <b>Awesome Contributors 🤗</b>
            </h5>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col">
                ${contributorsToShow
                  .map(
                    (contributor) =>
                      `<img src="http://github.com/${contributor.login}.png" class="rounded-circle m-1" alt="" style="width: 32px">`
                  )
                  .join("")}
                    <small class="text-muted">& ${restOfContributors} other 🧑‍💻</small>
                </div>
            </div>
        </div>
    </div>

    <div class="row pt-5">
        <div class="col-9 text-start">
            <small class="text-muted">
                <b>github.com/${repoOwner}</b>
            </small>
        </div>
        <div class="col-3 text-end">
            <small class="text-muted">
                <b>${repoWebsite}</b>
            </small>
        </div>
    </div>

</body>

</html>
`;
};

export default HomeOgTemplate;
