const { When } = require('@wdio/cucumber-framework')
const LoginPage = require('../pages/LoginPage')

When('eu informo o e-mail {string}', async (email) => {
    await LoginPage.preencherEmail(email)
})

When('eu informo a senha {string}', async (password) => {
    await LoginPage.preencherSenha(password)
})