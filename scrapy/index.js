import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import axios from 'axios'

let kq = [];
let index = 1;
let currentPage = 1;
let browser = await puppeteer.launch({
  // headless: false
  headless: "new",
});
let page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1024 });

// crawl data
async function crawlDataBook(url) {
  await page.goto(url);
  let data = await page.evaluate((index) => {
    let elements = Array.from(
      document.querySelectorAll(".col-xs-6.col-sm-4.col-md-3.col-lg-3")
    );
    let result = elements.map((e) => {
      let stars = {
        One: 1,
        Two: 2,
        Three: 3,
        Four: 4,
        Five: 5,
      };
      let obj = {};
      obj["image"] = e.querySelector(".image_container img").src;
      obj["title"] = e.querySelector(".product_pod>h3").innerText;
      obj["url"] = e.querySelector(".product_pod>h3>a").href;
      obj["star"] =
        stars[e.querySelector(".product_pod>.star-rating").classList[1]];
      obj["price"] = e.querySelector(
        ".product_pod>.product_price>.price_color"
      ).textContent;
      obj["index"] = index++;
      return obj;
    });
    let eNext = document.querySelector(".next>a")
      ? document.querySelector(".next>a").href
      : null;
    return {
      result: result,
      next: eNext,
      index: index,
    };
  }, index);
  if (data.next) {
    kq = kq.concat(data.result);
    index = data.index;
    console.log(currentPage++);
    crawlDataBook(data.next, index);
  } else {
    console.log(kq);
    fs.writeFileSync("data.json", JSON.stringify(kq, null, 2));
    const arrUrl = kq.map(item => item.image)
    for(let i = 0; i< arrUrl.length; i++) {
        downloadImage(arrUrl[i], i)
    }
    await browser.close();
  }
}

//Tải ảnh về
async function downloadImage(imageUrl, index) {
  try {
    console.log('index: ', index);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const extension = path.extname(imageUrl);
    const fileName = `image_${index}${extension}`;
    // const currentDir = path.dirname(new URL(import.meta.url).pathname);
    const filePath = "./images/" +  fileName;
    const imagesDir = './images';
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }

    // Save the image to the specified path
    fs.writeFileSync(filePath, Buffer.from(response.data));

    console.log(`Image ${index} downloaded and saved at ${filePath}`);
  } catch (error) {
    console.error(`Error downloading image ${index}: ${error.message}`);
  }
}

crawlDataBook("https://books.toscrape.com/", 1);
