const { chromium } = require("playwright");

const config = require("./config.json");

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  // Create pages, interact with UI elements, assert values

  const page = await browser.newPage();
  const username = config.username;
  const password = config.password;
  const cherryBranch = config.cherryBranch;
  const cheryPickPath = config.cherryPath;

  await page.goto(cheryPickPath);

  await page.fill("#user_login", username);
  await page.fill("#user_password", password);
  await page.click(".gl-button,.btn,.btn-confirm");

  await page.waitForSelector(`a[data-username='${username}']`);
  const elementLocator = page.locator(`a[data-username='${username}']`).first();

  const parentLocator = elementLocator
    .locator("..")
    .locator("..")
    .locator("..");
  parentLocator.locator(".merge-request-title-text a").click();
  await page.mainFrame().waitForTimeout(2000);
  const url = await page.url();
  const path = url;

  console.log(url);

  for await (const branch of cherryBranch) {
    //text
    await page.click("text=Cherry-pick");

    await page.mainFrame().waitForTimeout(1000);
    await page.click(
      "//html/body/div[7]/div[1]/div/div/div/form/div[2]/div/div/button"
    );
    await page.fill(
      "//html/body/div[7]/div[1]/div/div/div/form/div[2]/div/div/ul/div/div[2]/div/input",
      branch
    );

    await page.click(
      "//html/body/div[7]/div[1]/div/div/div/form/div[2]/div/div/ul/div/div[2]/li[1]/button/div/p"
    );
    await page.click("//html/body/div[7]/div[1]/div/div/footer/button[2]");
    await page.mainFrame().waitForTimeout(4000);

    await page.click("text=Assign to me");

    await page.click("//html/body/div[3]/div/div[3]/main/form/div[7]/input");
    await page.click(
      "//html/body/div[3]/div/div[3]/main/div[2]/div[2]/div[3]/div[1]/div/section/div/div[2]/div[3]/div/div[1]/div[1]/div[2]/div/div[1]/button/span"
    );
    await page.mainFrame().waitForTimeout(2000);
    if (cherryBranch[cherryBranch.length - 1] !== branch) {
      await page.goto(path);
    }
  }

  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
