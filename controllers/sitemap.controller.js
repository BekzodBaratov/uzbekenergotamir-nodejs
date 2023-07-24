const router = require("express").Router();
const { Calculate } = require("../models/calculates.model");
const { Contact } = require("../models/contacts.model");
const { EnergyProduct } = require("../models/energyProducts.model");
const { News } = require("../models/news.model");
const { Partner } = require("../models/partners.model");
const { Product } = require("../models/products.model");

router.get("/", async function (req, res) {
  const calculates = await Calculate.find();
  const contacts = await Contact.find();
  const energy_products = await EnergyProduct.find();
  const news = await News.find();
  const partners = await Partner.find();
  const products = await Product.find();

  res.status(200).json({
    success: true,
    data: {
      calculates,
      contacts,
      energy_products,
      news,
      partners,
      products,
    },
  });
});

module.exports = router;

// const router = require("express").Router();
// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createGzip } = require("zlib");
// const { Readable } = require("stream");

// let sitemap;

// router.get("/", function (req, res) {
//   res.header("Content-Type", "application/xml");
//   res.header("Content-Encoding", "gzip");
//   if (sitemap) return res.send(sitemap);

//   try {
//     const smStream = new SitemapStream({ hostname: "https://uetsolar.uz/" });
//     const pipeline = smStream.pipe(createGzip());

//     smStream.write({ url: "/page-1/", changefreq: "daily", priority: 0.3 });
//     smStream.write({ url: "/page-2/", changefreq: "monthly", priority: 0.7 });
//     smStream.write({ url: "/page-3/" }); // changefreq: 'weekly',  priority: 0.5
//     smStream.write({ url: "/page-4/", img: "http://urlTest.com" });

//     streamToPromise(pipeline).then((sm) => (sitemap = sm));
//     smStream.end();
//     pipeline.pipe(res).on("error", (e) => {
//       throw e;
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).end();
//   }
// });

// module.exports = router;
