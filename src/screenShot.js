const puppeteer = require('puppeteer');
const path = require('path');
require('dotenv').config();

const waitForLoad = async (page) => {
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.waitForTimeout(2000); // Additional delay to ensure all content is loaded
};

const screenShot = async (req, res) => {
  const { link } = req.body; // Get the link from the request body
  const browser = await puppeteer.launch({
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zygote'
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: "new"
  });
  try {
    const page = await browser.newPage();
    await page.goto(link);
    
    // Wait for the page to fully load
    await waitForLoad(page);

    // Get the website's title
    const title = await page.title();

    // Generate a unique filename for the screenshot
    const filename = Date.now() + '.png';

    // Take a screenshot of the page and save it in the "images" directory
    await page.screenshot({
      path: path.join(__dirname, 'images', filename),
      fullPage: true
    });

    // Send the filename as the response
    res.json({ title, filename });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Scraping failed', message: e });
  } finally {
    await browser.close();
  }
};

module.exports = { screenShot };
