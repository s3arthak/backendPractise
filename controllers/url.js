const shortid = require("shortid"); // ✅ fixed import
const URL = require("../models/url");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ error: "url is required" });

  const shortId = shortid(); // ✅ fixed usage
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleAna(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}


module.exports = {
  handlegenerateNewShortURL,
  handleAna,
};
