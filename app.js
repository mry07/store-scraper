import Express from "express";
import AppStoreScraper from "app-store-scraper";
import GooglePlayScraper from "google-play-scraper";

const app = Express();
const port = 3001;

app.use(Express.json());

app.post("/store-scraper", async (req, res) => {
  const { platform } = req.body;
  let scraper;

  switch (platform) {
    case "ios":
      scraper = AppStoreScraper.app({ id: 1160056295, country: "ID" });
      break;
    case "android":
      scraper = GooglePlayScraper.app({ appId: "com.mobile.legends" });
      break;
    default:
      return res
        .status(400)
        .send({ status: "error", message: "Invalid platform" });
  }

  const data = await Promise.all([scraper]);
  res.send({ status: "ok", data: data[0] });
});

app.use((req, res, next) => {
  res.send("Mobile check version is running");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
