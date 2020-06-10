let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials1 = JSON.parse(data);
    login = credentials1.url;
    email = credentials1.email;
    pwd = credentials1.pwd;
    search=credentials1.search;
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo:100
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(login, {
        waitUntil: "networkidle2"
        
    });
     //wait for element
     await tab.waitForSelector("#email");
     await tab.type("#email", email, { delay: 100 });
      console.log("Email entered");
     await tab.waitForSelector("input[formcontrolname='user_authkey']");
     await tab.type("input[formcontrolname='user_authkey']", pwd, { delay: 100 });
        
     await tab.waitForSelector(".button.button-shadow.button-green.bold");
     await navigationHelper(tab,".button.button-shadow.button-green.bold");
     await tab.waitForSelector(".ng-tns-c7-1.ui-inputtext");
await tab.type(".ng-tns-c7-1.ui-inputtext",search,{delay:100});
console.log("search notes entered");

await tab.waitForSelector(".ui-autocomplete-items li[role='option']");
await navigationHelper(tab,".ui-autocomplete-items li[role='option']");


 console.log("notess of ds");


    await tab.waitForSelector(".col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted");
   let notes = await tab.$$(".col-lg-4.col-md-4.col-sm-6.col-xs-12.ng-star-inserted");
   await Promise.all([notes[1].click(), tab.waitForNavigation({
    waitUntil: "networkidle2",
   })])

 
  
  await tab.waitForSelector(".button-raised.button-green.bold.ng-star-inserted");
  await navigationHelper(tab,".button-raised.button-green.bold.ng-star-inserted")
  await browser.newPage();

  console.log("downloaded");

})()
async function navigationHelper(tab,selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}

