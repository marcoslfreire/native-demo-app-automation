const path = require('path')
const baseConfig = require('./wdio.base.conf').config

exports.config = {
    ...baseConfig,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'nightwatch-android-11',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.resolve('./apps/android.wdio.native.app.v2.2.0.apk'),
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': false,
        'wdio:maxInstances': 1
    }]
}