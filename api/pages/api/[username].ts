import type { NextApiRequest, NextApiResponse } from 'next'

import fetch from "node-fetch"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Buffer>
) {
    // Get username from request
    const { username } = req.query;

    // fetch image from github as buffer
    const buffer = await fetch(
        `https://raw.githubusercontent.com/codinasion/LinkFree-OG/og/profile/${username}.png`,
        {
            method: "GET",
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
        }
    ).then((res) => res.arrayBuffer());

    // Send image as buffer
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=43200, s-maxage=43200, stale-while-revalidate=43200");
    res.status(200).send(Buffer.from(buffer));
}
