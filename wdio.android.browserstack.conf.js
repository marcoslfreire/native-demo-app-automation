const baseConfig = require('./wdio.base.conf').config

exports.config = {
    ...baseConfig,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    hostname: 'hub.browserstack.com',
    port: 443,
    protocol: 'https',

    services: ['browserstack'],

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Samsung Galaxy S22',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_ID,
        'appium:autoGrantPermissions': true,
        'bstack:options': {
            projectName: 'Native Demo App Automation',
            buildName: 'native-demo-app-automation',
            sessionName: 'Android Mobile Tests',
            debug: true,
            networkLogs: true,
            deviceLogs: true
        }
    }]
}