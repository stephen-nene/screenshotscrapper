const puppeteer = require('puppeteer');
const { Jokes, Article, screenshot } = require('./poster');

const url = "https://www.linkedin.com/";

const login = async (page) => {
  await page.goto(url);
  await page.waitForSelector('#session_key');

  await page.type('#session_key', 'stevekid705@gmail.com');

  await page.waitForTimeout(2000);
  await page.type('#session_password', 'Constletvar99!');
  await page.waitForTimeout(2000);
  
  await page.click('[type=submit]');

  await page.waitForNavigation();
};



const callFunctions = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await login(page);
  await Jokes(page);
//   await screenshot(page);
  // Article();

  await browser.close();
};

callFunctions();
