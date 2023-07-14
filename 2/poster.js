const Jokes = async (page) => {
    let joke = {
        "Joke": "Why did the AI programmer fall in love with their chatbot?",
        "Punchline": "Because it always knew how to make their heart skip a beat, byte by byte! ❤️😄",
        "hashtags": "#AIlove #ChatbotRomance #ProgrammersHeart #ArtificialIntelligence"
        }
 
     // Wait for the "Start a post" button to appear and click it
     await page.waitForSelector('.share-box-feed-entry__trigger');
     await page.click('.share-box-feed-entry__trigger');
 
     await page.waitForSelector('.ql-editor');
     await page.type('.ql-editor', `${joke.Joke}\n\n${joke.Punchline} 😄😄😄😄 \n\n${joke.hashtags}`);
     await page.waitForTimeout(2000);

     await page.waitForSelector('.share-actions__primary-action');
     await page.click('.share-actions__primary-action');
 }
 

const Article = async () => {
    console.log("posting article ....")

}

const screenshot = async (page) => {
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'images/new.png' });
    await page.waitForTimeout(5000);
};

module.exports = { Jokes, screenshot, Article };






