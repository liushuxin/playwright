const { chromium } = require("playwright");

const config = require("./config.json");

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  // Create pages, interact with UI elements, assert values

  const page = await browser.newPage();
  const username = config.username;
  const password = config.password;
  const cherryBranch = config.cherryBranch;
  const path = config.cherryPath;

  await page.goto(path);

  await page.fill("#user_login", username);
  await page.fill("#user_password", password);
  await page.click(".gl-button,.btn,.btn-confirm");

  for await (const branch of cherryBranch) {
    await page.click(
      '//*[@id="notes"]/div/section/div/div[2]/div[4]/div/div[1]/div[2]/div/button[2]'
    );

    await page.mainFrame().waitForTimeout(2000);
    await page.click(
      "//html/body/div[6]/div[1]/div/div/div/form/div[1]/div/div/button/span"
    );
    await page.fill(
      "//html/body/div[6]/div[1]/div/div/div/form/div[1]/div/div/ul/div/div[2]/div/input",
      branch
    );

    await page.click(
      "//html/body/div[6]/div[1]/div/div/div/form/div[1]/div/div/ul/div/div[2]/li[1]/button/div"
    );
    await page.click("//html/body/div[6]/div[1]/div/div/footer/button[2]");
    await page.mainFrame().waitForTimeout(3000);

    //assign to me
    await page.click("text=Assign to me");

    await page.click("//html/body/div[3]/div/div[3]/main/form/div[7]/input");
    await page.click(
      "//html/body/div[3]/div/div[3]/main/div[2]/div[2]/div[3]/div[2]/div/section/div/div[2]/div[4]/div/div[1]/div[1]/div[2]/div/div[1]/button/span",
      { timeout: 240000 }
    );
    if (cherryBranch[cherryBranch.length - 1] !== branch) {
      await page.goto(path);
    }
  }

  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
