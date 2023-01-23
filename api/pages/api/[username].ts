import type { NextApiRequest, NextApiResponse } from "next";

import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  // Get username string from url as string
  const username: string = req.query.username as string;

  // fetch image from github as buffer
  const buffer = await fetch(
    `https://raw.githubusercontent.com/codinasion/LinkFree-OG/og/profile/${username.toLowerCase()}.png`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  ).then((res) => res.arrayBuffer());

  // Send image as buffer
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Cache-Control",
    "public, max-age=300, s-maxage=300, stale-while-revalidate=300"
  );
  res.status(200).send(Buffer.from(buffer));
}
