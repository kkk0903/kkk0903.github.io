const axios = require("axios");
const cheerio = require("cheerio");
const { count } = require("console");

const url = "https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes";
const names = [];
const ISOs = [];
axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $("tbody tr").each((i, ele) => {
      const td = $(ele).find("td");
      if (td.length > 3) {
        const ISO = $(td[3]).text().trim();
        const CountryName = $(td[0])
          .text()
          .replace(/[\[\(].*?[\]\)]/g, "")
          .trim();
        if (ISOs) {
          ISOs.push(ISO);

          names.push(CountryName);
        }
        ISOs[0] = "AF";
      }
    });
    console.log(ISOs);
    console.log("-----------------------------------");
    console.log(names);
    // console.log(names.indexOf("Zimbabwe"));
    // const countries = names.slice(1, names.indexOf("Zimbabwe") + 1);
    // console.log(countries);

    const fs = require("fs");
    // ...爬取完 name 陣列後
    // fs.writeFileSync(
    //   "countries.json",
    //   JSON.stringify(countries, null, 2),
    //   "utf-8"
    // );
    // console.log("寫入完成");
    const jsContent = `const names = ${JSON.stringify(names, null, 2)};
    const ISOs = ${JSON.stringify(ISOs, null, 2)};`;

    fs.writeFileSync("data.js", jsContent, "utf-8");
  })

  .catch((error) => {
    console.error("抓取失败:", error);
  });
