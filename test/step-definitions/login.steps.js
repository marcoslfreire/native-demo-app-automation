const { Given, When, Then } = require('@wdio/cucumber-framework')
const { expect } = require('chai')

const LoginPage = require('../pages/LoginPage')

Given('que estou na tela de Login', async () => {
    await LoginPage.abrir()
})

When('eu clico no botão de Login', async () => {
    await LoginPage.clicarLogin()
})


When('eu limpo os campos de login', async () => {
    await LoginPage.limparCampos()
})

Then('devo visualizar a mensagem de e-mail inválido', async () => {
    const mensagemVisivel =
        await LoginPage.mensagemEmailInvalidoEstaVisivel()

    expect(mensagemVisivel).to.equal(true)
})

Then('devo visualizar a mensagem de senha inválida', async () => {
    const mensagemVisivel =
        await LoginPage.mensagemSenhaInvalidaEstaVisivel()

    expect(mensagemVisivel).to.equal(true)
})