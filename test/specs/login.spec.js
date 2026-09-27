const LoginPage = require('../pages/LoginPage')
const { expect } = require('chai')

describe('Login', () => {

    it('deve validar senha menor que 8 caracteres', async () => {

        await LoginPage.abrir()

        await LoginPage.preencherEmail('teste@gmail.com')
        await LoginPage.preencherSenha('123')

        await LoginPage.clicarLogin()

        const mensagemVisivel = await LoginPage.mensagemSenhaInvalidaEstaVisivel()

        expect(mensagemVisivel).to.equal(true)

    })

    it('deve validar campos de login vazios', async () => {

        await LoginPage.abrir()

        await LoginPage.limparCampos()

        await LoginPage.clicarLogin()

        const mensagemEmailVisivel =
            await LoginPage.mensagemEmailInvalidoEstaVisivel()

        const mensagemSenhaVisivel =
            await LoginPage.mensagemSenhaInvalidaEstaVisivel()

        expect(mensagemEmailVisivel).to.equal(true)
        expect(mensagemSenhaVisivel).to.equal(true)

    })

})