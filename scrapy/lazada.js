import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import axios from "axios";

let browser = null;
let page = null;
let category = [];

async function startBrow() {
  browser = await puppeteer.launch({
    headless: false,
    // headless: "new",
    args: ["--ignore-certificate-errors"],
  });
  page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  page.$;
  //   page.waitForSelector
}

async function sleep(n) {
  await new Promise((resolve) => setTimeout(resolve, n));
}

async function getCategory() {
  await page.goto("https://expressjs.com/en/guide/routing.html");

  // mảng menu cấp 1
  const arrParentMenu = await page.$$("#navmenu > li");
  for (const menu of arrParentMenu) {
    let tagA = await menu.$("a");
    tagA.hover();
    await sleep(1);
    let pMenu = await menu.$eval("a", (e) => {
      return {
        title: e.innerText,
        href: e.href,
        subMenu: [],
      };
    });
    let subMenu = await menu.$$(".dropit-submenu > li");
    for (const li of subMenu) {
      li.hover();
      await sleep(1);
      let sMenu = await li.$eval("a", (e) => {
        return {
          title: e.innerText,
          href: e.href,
        };
      });
      pMenu.subMenu.push(sMenu);
    }
    category.push(pMenu);
  }
  await saveToJsonFile(category, 'categoryTest.json')
}


async function saveToJsonFile(data, filename) {
  try {
    // Chuyển đối tượng thành chuỗi JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Ghi dữ liệu vào tệp
    fs.writeFileSync(filename, jsonData);

    console.log(`Data has been saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving data to ${filename}: ${error.message}`);
  }
}

await startBrow();
await getCategory();
