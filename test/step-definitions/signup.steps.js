const { Given, When, Then } = require('@wdio/cucumber-framework')
const { expect } = require('chai')

const SignUpPage = require('../pages/SignUpPage')

Given('que estou na tela de cadastro', async () => {
    await SignUpPage.abrir()
})



When('eu confirmo a senha {string}', async (password) => {
    await SignUpPage.preencherConfirmacaoSenha(password)
})

When('eu clico no botão de cadastro', async () => {
    await SignUpPage.clicarSignUp()
})

Then('devo visualizar a mensagem de confirmação de senha', async () => {
    const mensagemVisivel =
        await SignUpPage.mensagemConfirmacaoSenhaEstaVisivel()

    expect(mensagemVisivel).to.equal(true)
})

Then('devo visualizar a tela principal', async () => {
    const telaPrincipal = await $('~Forms')

    const estaVisivel = await telaPrincipal.isDisplayed()

    expect(estaVisivel).to.equal(true)
})

Then('devo visualizar a mensagem de senha inválida no cadastro', async () => {
    const mensagemVisivel =
        await SignUpPage.mensagemSenhaInvalidaEstaVisivel()

    expect(mensagemVisivel).to.equal(true)
})

When('eu limpo os campos de cadastro', async () => {
    await SignUpPage.limparCampos()
})