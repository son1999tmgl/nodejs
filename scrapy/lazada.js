import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import axios from "axios";

let browser = null;
let page = null;
let category = null;

async function startBrow() {
  browser = await puppeteer.launch({
    headless: false,
    // headless: "new",
    args: ["--ignore-certificate-errors"],
  });
  console.log(123);
  page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  console.log(1234);
  //   page.waitForSelector
}

async function getCategory() {
  console.log(234);
  await page.goto("http://www.lazada.vn/");

  await page.waitForSelector(".lzd-site-nav-menu-dropdown", { timeout: 1000000 });
  category = await page.evaluate(async () => {
    return "123";
  });
  console.log("body: ", category);
}

await startBrow();
getCategory();
