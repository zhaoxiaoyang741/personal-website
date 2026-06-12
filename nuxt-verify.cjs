const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'D:/temp/nuxt-screenshot.png', fullPage: true });

  const title = await page.title();
  const sections = await page.evaluate(() => {
    const s = document.querySelectorAll('.depth-section');
    return Array.from(s).map(el => el.id);
  });
  const cursorExists = await page.evaluate(() => !!document.getElementById('custom-cursor'));
  const grainExists = await page.evaluate(() => !!document.querySelector('.grain-overlay'));
  const navExists = await page.evaluate(() => !!document.getElementById('main-nav'));
  const scrollContainerExists = await page.evaluate(() => !!document.getElementById('scroll-container'));

  console.log('TITLE:', title);
  console.log('SECTIONS:', JSON.stringify(sections));
  console.log('CURSOR:', cursorExists);
  console.log('GRAIN:', grainExists);
  console.log('NAV:', navExists);
  console.log('SCROLL_CONTAINER:', scrollContainerExists);
  if (errors.length) {
    console.log('CONSOLE_WARNINGS:', JSON.stringify(errors));
  } else {
    console.log('NO_CONSOLE_ERRORS');
  }

  await browser.close();
})();
