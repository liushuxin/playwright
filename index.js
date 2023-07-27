const { chromium } = require("playwright");
//chromium.launch({ headless: false, slowMo: 50 });

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  // Create pages, interact with UI elements, assert values

  const page = await browser.newPage();
  const username = "shuxin.liu";
  const password = "L1shuxin";

  const bracnh1 = "feature/base/NANO-2647";

  await page.goto(
    "https://gitlab.zatech.online/genesis/greatstaff/-/merge_requests"
  );

  await page.fill("#user_login", username);
  await page.fill("#user_password", password);
  await page.click(".gl-button,.btn,.btn-confirm");
  await page.waitForSelector("a[title='New merge request']");
  await page.click("a[title='New merge request']");

  //   await page.evaluate(() => {
  //     document.querySelector(
  //       "input[name='merge_request[source_branch]']"
  //     ).style.display = "inline";
  //   });
  await page.mainFrame().waitForTimeout(2000);
  await page.click('xpath=//*[@id="new_merge_request"]/div[1]/div/a');

  await page.click(
    'xpath=//*[@id="new_merge_request"]/div/div[2]/div/div[2]/div[2]/button/span'
  );
  await page.fill(
    'xpath=//*[@id="new_merge_request"]/div/div[2]/div/div[2]/div[2]/div/div[2]/input',
    bracnh1
  );
  await page.click(
    '//*[@id="new_merge_request"]/div/div[2]/div/div[2]/div[2]/div/div[3]/ul/li[1]/a'
  );
  await page.click('//*[@id="new_merge_request"]/input[2]');
  await page.click('//*[@id="new_merge_request"]/div[5]/div/div[1]/div/a');
  await page.click('//*[@id="new_merge_request"]/div[7]/input');
  await page.click(
    '//*[@id="notes"]/div/section/div/div[2]/div[4]/div/div[1]/div[1]/div[2]/div/div[1]/button',
    { timeout: 120000 }
  );
  // await page.click(
  //   '//*[@id="notes"]/div/section/div/div[2]/div[4]/div/div[1]/div[2]/div/button[2]',
  //   { timeout: 1200000 }
  // );
  //
  // await page.reload();
  // await page.click(
  //   '//*[@id="notes"]/div/section/div/div[2]/div[4]/div/div[1]/div[2]/div/button[2]'
  // );

  //   let interId = '';
  //   interId =  setInterval(()=> {
  //     const btn = accept-merge-request
  //     if()

  //     await page.reload();

  //   },10000);

  //*[@id="notes"]/div/section/div/div[2]/div[4]/div/div[1]/div[1]/div[2]/div/div[1]/button

  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
