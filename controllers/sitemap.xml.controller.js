const router = require("express").Router();
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const { EnergyProduct } = require("../models/energyProducts.model");
let sitemap;

router.get("/", async function (req, res) {
  const energy_products = await EnergyProduct.find();

  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");
  if (sitemap) return res.send(sitemap);

  try {
    const smStream = new SitemapStream({ hostname: "https://uetsolar.uz/" });
    const pipeline = smStream.pipe(createGzip());

    for (el in energy_products) {
      smStream.write({ url: `/product/${energy_products[el]._id}`, changefreq: "daily" });
    }

    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    smStream.end();
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

module.exports = router;
