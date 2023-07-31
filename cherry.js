const { chromium } = require("playwright");
const fs = require("fs");

const config = require("./config.json");
const axios = require("axios");

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  // Create pages, interact with UI elements, assert values

  const page = await browser.newPage();
  const username = config.username;
  const password = config.password;
  const cherryBranch = config.cherryBranch;
  const cheryPickPath = config.cherryPath;
  const assignee = config.assignee;

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

    if (branch === "develop") {
      // click unassigned
      await page.click(
        '//*[@id="new_merge_request"]/div[5]/div/div[1]/div/div/div/button/span'
      );
      // input assignee
      await page.fill(
        '//*[@id="new_merge_request"]/div[5]/div/div[1]/div/div/div/div/div[2]/input',
        assignee
      );
      // select assignee
      await page.click(
        '//*[@id="new_merge_request"]/div[5]/div/div[1]/div/div/div/div/div[3]/ul/li/a'
      );
      // create merge request
      await page.click("//html/body/div[3]/div/div[3]/main/form/div[7]/input", {
        timeout: 10000,
      });

      // writes the url to the file
      const url = await page.url();
      // fs.writeFile("url.txt", url, (err) => {
      //   if (err) throw err;
      // });
      // sned message to lark team
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
                    text: "博文 develop MR 已经提交，麻烦帮忙合并一下",
                  },
                  {
                    tag: "a",
                    text: "点击跳转对应页面",
                    href: url,
                  },
                  {
                    tag: "at",
                    user_id: "ou_90a064ca6fb0e7059153721f7b228e85",
                  },
                ],
              ],
            },
          },
        },
      };

      try {
        let data = postData;
        await axios.post(config.webHookUrl, data);
      } catch (error) {
        console.log(error);
      }
    } else {
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
  }

  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
