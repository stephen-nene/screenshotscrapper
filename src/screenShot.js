const puppeteer = require('puppeteer');
const path = require('path');
require('dotenv').config();

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
    await page.waitForTimeout(2000);

    // Get the website's title
    const title = await page.title();

    // Generate a unique filename for the screenshot
    const filename = Date.now() + '.png';

    // Take a screenshot of the page and save it in the "images" directory
    await page.screenshot
      ({
        path: path.join(__dirname, 'images', filename),
        fullPage: true
      });

    // Close the browser

    // Send the filename as the response
    res.json({ title, filename });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Scraping failed' });
  } finally {

    await browser.close();

  }
}


module.exports = { screenShot };