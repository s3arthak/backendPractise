const express = require('express');
const app = express();
const URL= require('./models/url');
const urlRoute = require('./routes/url');
const connectToMongo = require('./connect');

const PORT = 5000;


connectToMongo('mongodb://localhost:27017/short_url')
  .then(() => console.log("connected mongo"))
  .catch((err) => console.error("Mongo connection error:", err));

app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  return res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
