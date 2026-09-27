const LoginPage = require('./pages/LoginPage')

describe('Mapeamento do botão LOGIN', () => {

    it('deve localizar os elementos da tela de Login', async () => {

        await LoginPage.abrir()

        const pageSource = await browser.getPageSource()

        console.log('\n========== ELEMENTOS COM LOGIN ==========')

        const elementosLogin = pageSource
            .split('\n')
            .filter(linha => linha.includes('LOGIN'))

        console.log(elementosLogin.join('\n'))

        console.log('\n========== CONTENT-DESC ==========')

        const contentDesc = [...pageSource.matchAll(/content-desc="([^"]*)"/g)]
            .map(match => match[1])
            .filter(valor => valor.toLowerCase().includes('login'))

        console.log(contentDesc)

        console.log('\n========== RESOURCE-ID ==========')

        const resourceIds = [...pageSource.matchAll(/resource-id="([^"]*)"/g)]
            .map(match => match[1])
            .filter(valor => valor.toLowerCase().includes('login'))

        console.log(resourceIds)

        console.log('\n========== TEXT ==========')

        const textos = [...pageSource.matchAll(/text="([^"]*)"/g)]
            .map(match => match[1])
            .filter(valor => valor.toLowerCase().includes('login'))

        console.log(textos)
    })

})