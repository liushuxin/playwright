const { chromium } = require("playwright");
const config = require("./config.json");

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  // Create pages, interact with UI elements, assert values

  const page = await browser.newPage();
  const username = config.username;
  const password = config.password;
  const branch = config.baseBranch;

  await page.goto("");

  await page.fill("#user_login", username);
  await page.fill("#user_password", password);
  await page.click(".gl-button,.btn,.btn-confirm");
  await page.waitForSelector('//*[@id="content-body"]/div[2]/div/div[2]/a');
  await page.click('//*[@id="content-body"]/div[2]/div/div[2]/a');
  await page.click("//html/body/div[3]/div/div[3]/main/form/div[1]/div/a");
  await page.mainFrame().waitForTimeout(1000);
  await page.click(
    "//html/body/div[3]/div/div[3]/main/form/div/div[2]/div/div[2]/div[2]/button",
    {
      timeout: 30000,
    }
  );
  await page.fill(
    "//html/body/div[3]/div/div[3]/main/form/div/div[2]/div/div[2]/div[2]/div/div[2]/input",
    branch
  );
  await page.click(
    "//html/body/div[3]/div/div[3]/main/form/div/div[2]/div/div[2]/div[2]/div/div[3]/ul/li"
  );
  await page.click("//html/body/div[3]/div/div[3]/main/form/input");
  await page.mainFrame().waitForTimeout(1000);
  await page.click(
    "//html/body/div[3]/div/div[3]/main/form/div[5]/div/div[1]/div/a"
  );
  await page.click("//html/body/div[3]/div/div[3]/main/form/div[7]/input");
  await page.click(
    "//html/body/div[3]/div/div[3]/main/div[2]/div[2]/div[3]/div[1]/div/section/div/div[1]/div[3]/div/div[1]/div[1]/div[2]/div/div[1]/button/span",
    { timeout: 100000 }
  );
  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
