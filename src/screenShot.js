const puppeteer = require('puppeteer');
const path = require('path');

const screenShot = async (req, res) => {
    try {
        const { link } = req.body; // Get the link from the request body
        
        const browser = await puppeteer.launch({ headless: "new" });
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
          await browser.close();
    
          // Send the filename as the response
          res.json({ title, filename });
        } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ error: 'Scraping failed' });
      }
}


module.exports = {screenShot};