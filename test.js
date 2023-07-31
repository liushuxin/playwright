const { chromium } = require("playwright");
const config = require("./config.json");
const axios = require("axios");

(async () => {
  //   const browser = await chromium.launch({ headless: false, slowMo: 500 });
  //   // Create pages, interact with UI elements, assert values

  //   const page = await browser.newPage();
  //   const username = config.username;
  //   const password = config.password;

  //   const bracnh1 = config.baseBranch;

  //   await page.goto(
  //     "https://gitlab.zatech.online/genesis/greatstaff/-/merge_requests?scope=all&utf8=%E2%9C%93&state=merged"
  //   );

  //   await page.fill("#user_login", username);
  //   await page.fill("#user_password", password);
  //   await page.click(".gl-button,.btn,.btn-confirm");
  //   await page.waitForSelector("a[data-username='shuxin.liu']");
  //   const elementLocator = page.locator("a[data-username='shuxin.liu']").first();

  //   const parentLocator = elementLocator
  //     .locator("..")
  //     .locator("..")
  //     .locator("..");
  //   parentLocator.locator(".merge-request-title-text a").click();
  //   await page.mainFrame().waitForTimeout(2000);
  //   const url = await page.url();

  //   console.log(url);

  const postData = {
    msg_type: "post",
    content: {
      post: {
        zh_cn: {
          title: "项目合并提醒",
          content: [
            [
              {
                tag: "text",
                text: "develop MR 已经提交，麻烦博文帮忙Review",
              },
              {
                tag: "a",
                text: "点击跳转对应页面",
                href: "http://www.baidu.com",
              },
            ],
          ],
        },
      },
    },
  };

  try {
    let data = postData;
    await axios.post(
      `https://open.larksuite.com/open-apis/bot/v2/hook/45df6325-f074-4a34-8864-d1ffd5a469c8`,
      data
    );
  } catch (error) {
    console.log(error);
  }

  // await page.screenshot({ path: `example.png` });
  // await browser.close();
})();
