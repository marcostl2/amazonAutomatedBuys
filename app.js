var webdriver = require('selenium-webdriver')
// const webdriver = require('selenium-webdriver/safari')
var By = require('selenium-webdriver').By
var until = require('selenium-webdriver').until
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Keyboard } = require('selenium-webdriver/lib/input');
// chrome.setDefaultService(new chrome.ServiceBuilder('./chromedriver.exe').build());

const email=''
const password=''

async function teste() {
    //ABRIR CHROME
    var driver = await new Builder().forBrowser('chrome').build()
    //MAXIMIZAR A JANELA
    await driver.manage().window().setRect(1920, 977)
    for (let j = 42; j < 43; j++) {
        try {

            //NAVEGAR PARA GOOGLE.COM

            // await driver.switchTo().newWindow('tab');
            // await driver.navigate().refresh();
            // await driver.findElement(By.id('searchInput')).sendKeys('iae')
            // await driver.quit()

            if (j === 42) {

                await driver.get(`https://www.amazon.com.br/`)

                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('#nav-link-accountList')`)
                ))).click();
                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('#ap_email')`)
                ))).sendKeys(email);
                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('#continue')`)
                ))).click();
                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('#ap_password')`)
                ))).sendKeys(password);
                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('input[name="rememberMe"]')`)
                ))).click();
                await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelector('#signInSubmit')`)
                ))).click();
                await driver.sleep(2000)
            }
            await driver.get(`https://www.amazon.com.br/s?i=digital-text&bbn=5475882011&rh=n%3A5308307011%2Cn%3A5308308011%2Cn%3A5475882011%2Cp_36%3A5560478011&dc&page=${j}&language=pt_BR&fst=as%3Aoff&linkCode=sl2&linkId=0342336f8defa3488d5598ffe0dfdb8d&qid=1592962505&ref=sr_pg_1`)
            var btnArray = await driver.findElements(By.css('.a-button.a-button-oneclick.a-button-icon'))

            // console.log(btnArray)

            var urls=[]

            for (let i = 2; i <= btnArray.length + 1; i++) {
                urls.push(await (await driver.wait(until.elementLocated(
                    By.js(`return document.querySelectorAll('#a-autoid-${i}-announce')`)
                ))).getAttribute('href'))
            }
            var original=await driver.getWindowHandle()

            for (let i = 0; i < urls.length; i++) {
                let driv = driver
                await driv.switchTo().newWindow('tab')
                driv.get(urls[i])
                await driv.sleep(2000)
                await driv.close()
                await driver.switchTo().window(original)
            }

            //     await driver.switchTo().newWindow('tab')
            //     await driver.navigate().refresh()
            //     await driver.get('https://www.google.com')
            //     await driver.close()
            //     await driver.switchTo().window(original)
            //     await driver.get('https://www.google.com')
            // await driver.get(url)
            // await driver.sleep(3000)
            // await driver.close()
            // await driver.navigate().back()
            // await driver.sleep(3000)
            // }

        } catch (err) {
            console.log(err)
        } finally {
            // await driver.quit()
        }
        // setTimeout(()=>driver.quit(),3000)
    }
    //)
}
teste()
