import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { domain } = req.query;

  if (!domain || typeof domain !== "string") {
    console.log(domain,"oijhpiuhopiu")
    return res
      .status(400)
      .json({ error: "Bad Request: Domain parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.godaddy.com/v1/domains/available?domain=${domain}`,
      {
        method: "GET",
        headers: {
            Authorization: `sso-key h1eGhXVwVMMU_T7QniqLaJcLxgzXpkWEa4J:TnjRPi7hcNBpM7zrrbeuNK`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error checking domain:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
