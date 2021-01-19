const webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;;
const chai = require('chai');
const expect = chai.expect;

describe('Homepage Test', function() {
    this.timeout(5000);
    const driver = new webdriver.Builder().forBrowser('firefox').build();
    it("go to home url and check the title", async () => {
        await driver.get("http://localhost:3000/");
        await driver.sleep(1000);
        const title = await driver.getTitle();
        expect(title).to.equal('UnitHangar');
    });
    after(async () => driver.quit());
});
describe('Create Team Test', function() {
    this.timeout(5000);
    const driver = new webdriver.Builder().forBrowser('firefox').build();
    it("make sure creating a team works", async () => {
        await driver.get("http://localhost:3000/");
        await driver.findElement(By.id('ctlink')).click();
        await driver.findElement(By.name('name')).sendKeys('TestTeam');
        await driver.findElement(By.name('submit_button')).click();
        await driver.sleep(1000);
        const title = await driver.getTitle();
        expect(title).to.equal('UnitHangar');
    });
    after(async () => driver.quit());
});
describe('Create Unit Test', function() {
    this.timeout(5000);
    const driver = new webdriver.Builder().forBrowser('firefox').build();
    it("make sure creating a unit works", async () => {
        await driver.get("http://localhost:3000/");
        await driver.findElement(By.id('teamTestTeam')).click();
        await driver.findElement(By.id('culink')).click();
        await driver.findElement(By.name('name')).sendKeys('TestUnit');
        await driver.findElement(By.name('pilots')).sendKeys('TestPilot');
        await driver.findElement(By.name('type')).sendKeys('TestType');
        await driver.findElement(By.name('attacks')).sendKeys('1');
        await driver.findElement(By.name('HP')).sendKeys('5000');
        await driver.findElement(By.name('submit_button')).click();
        await driver.sleep(1000);
        const title = await driver.getTitle();
        expect(title).to.equal('UnitHangar');
    });
    after(async () => driver.quit());
});
describe('Find Team Test', function() {
    this.timeout(5000);
    const driver = new webdriver.Builder().forBrowser('firefox').build();
    it("make sure finding a specific team works", async () => {
        await driver.get("http://localhost:3000/");
        await driver.findElement(By.name('teamname')).sendKeys('TestTeam');
        await driver.findElement(By.name('submit_button')).click();
        await driver.sleep(1000);
        const title = await driver.getTitle();
        expect(title).to.equal('UnitHangar');
    });
    after(async () => driver.quit());
})
