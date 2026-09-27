const path = require('path')
const baseConfig = require('./wdio.base.conf').config

const iosDeviceName = process.env.IOS_DEVICE_NAME
const iosPlatformVersion = process.env.IOS_PLATFORM_VERSION
const iosAppPath = process.env.IOS_APP_PATH

if (!iosDeviceName || !iosPlatformVersion || !iosAppPath) {
    throw new Error(
        'Configuração iOS incompleta. Defina IOS_DEVICE_NAME, IOS_PLATFORM_VERSION e IOS_APP_PATH.'
    )
}

exports.config = {
    ...baseConfig,

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': iosDeviceName,
        'appium:platformVersion': iosPlatformVersion,
        'appium:automationName': 'XCUITest',
        'appium:app': path.resolve(iosAppPath),
        'appium:noReset': false,
        'wdio:maxInstances': 1
    }]
}