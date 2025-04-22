const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const companies = [
    {
        name: 'flex',
        url: 'https://www.flex.one',
        selector: 'img[alt*="Flex"][alt*="logo"]'
    },
    {
        name: 'avantstay',
        url: 'https://www.avantstay.com',
        selector: 'img[alt*="AvantStay"][alt*="logo"]'
    },
    {
        name: 'keep',
        url: 'https://www.trykeep.com',
        selector: 'img[alt*="Keep"][alt*="logo"]'
    },
    {
        name: 'ryze',
        url: 'https://www.ryzesuperfoods.com',
        selector: 'img[alt*="Ryze"][alt*="logo"]'
    },
    {
        name: 'steward',
        url: 'https://usesteward.com',
        selector: 'img[alt*="Steward"][alt*="logo"]'
    },
    {
        name: 'sydecar',
        url: 'https://www.sydecar.io',
        selector: 'img[alt*="Sydecar"][alt*="logo"]'
    },
    {
        name: 'finix',
        url: 'https://finix.com',
        selector: 'img[alt*="Finix"][alt*="logo"]'
    }
];

async function downloadLogos() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const company of companies) {
        try {
            await page.goto(company.url);
            await page.waitForSelector(company.selector, { timeout: 5000 });
            
            const logoUrl = await page.evaluate((selector) => {
                const img = document.querySelector(selector);
                return img ? img.src : null;
            }, company.selector);

            if (logoUrl) {
                const response = await page.goto(logoUrl);
                const buffer = await response.buffer();
                fs.writeFileSync(path.join(__dirname, 'img', 'portfolio', `${company.name}.png`), buffer);
                console.log(`Downloaded logo for ${company.name}`);
            }
        } catch (error) {
            console.error(`Failed to download logo for ${company.name}:`, error.message);
        }
    }

    await browser.close();
}

downloadLogos(); 