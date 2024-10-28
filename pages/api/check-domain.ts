import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { domain } = req.query;

  if (!domain || typeof domain !== "string") {
    return res
      .status(400)
      .json({ error: "Bad Request: Domain parameter is required" });
  }

  try {
    const response = await fetch(
      `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.WHOISXML_API_KEY}&domainName=${domain}&outputFormat=JSON`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }

    const data = await response.json();


    const domainAvailability = data.DomainInfo?.domainAvailability === "AVAILABLE";

    res.status(200).json({ available: domainAvailability });

  } catch (error) {
    console.error("Error checking domain:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
