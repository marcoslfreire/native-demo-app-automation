const path = require('path')
const fs = require('fs')
exports.config = {
    runner: 'local',
    port: 4723,

    specs: [
        './test/features/**/*.feature'
    ],

    cucumberOpts: {
        require: [
            './test/step-definitions/**/*.js'
        ],
        timeout: 60000
    },

    services: ['appium'],

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results' }]
    ],

    maxInstances: 1,

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    beforeStep: function (step, scenario, context) {
        context.numeroStep = (context.numeroStep || 0) + 1
    },

    afterStep: async function (
        step,
        scenario,
        { error, result, passed, duration },
        context
    ) {
        const data = new Date()

        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()

        const dataFormatada = `${dia}-${mes}-${ano}`

        function normalizarNome(nome) {
            return nome
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
                .toLowerCase()
        }

        const feature = normalizarNome(
            scenario.uri
                ? path.basename(scenario.uri, '.feature')
                : 'feature'
        )

        const cenario = normalizarNome(scenario.name)

        const nomeStep = normalizarNome(step.text)

        const diretorio = path.join(
            process.cwd(),
            'relatorio',
            dataFormatada,
            feature,
            cenario
        )

        if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio, { recursive: true })
        }

        const numeroStep = String(context.numeroStep).padStart(2, '0')

        const nomeArquivo = `${numeroStep}-${nomeStep}.png`

        const caminhoCompleto = path.join(
            diretorio,
            nomeArquivo
        )

        await browser.saveScreenshot(caminhoCompleto)

        console.log(`Screenshot salvo: ${caminhoCompleto}`)
    },

    afterTest: async function (
        test,
        context,
        { error, result, duration, passed, retries }
    ) {
        if (!passed) {
            await browser.takeScreenshot()
        }
    }
}