const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/posts/clevy_new-grad-roles-and-internship-opportunities-activity-7190820567392870402-xKqu/');

    // Increase timeout and wait for comments to load
    await page.waitForSelector('.comments-comments-list__comment-item', { timeout: 60000 });

    // Extract comments
    const comments = await page.evaluate(() => {
        const commentElements = document.querySelectorAll('.comments-comments-list__comment-item');
        const commentsData = [];
        commentElements.forEach(commentElement => {
            const author = commentElement.querySelector('.comments-post-meta__profile-link').textContent.trim();
            const content = commentElement.querySelector('.comments-comment-item-content').textContent.trim();
            commentsData.push({ author, content });
        });
        return commentsData;
    });

    // Print comments
    comments.forEach((comment, index) => {
        console.log(`Comment ${index + 1}:`);
        console.log(`Author: ${comment.author}`);
        console.log(`Content: ${comment.content}`);
        console.log('------------------');
    });

    await browser.close();
})();
