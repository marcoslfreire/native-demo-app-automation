const SignUpPage = require('../pages/SignUpPage')
const { expect } = require('chai')

describe('Sign Up Page Object', () => {

    it('deve preencher os campos de cadastro', async () => {

        await SignUpPage.abrir()

        await SignUpPage.preencherCadastro(
            'teste@gmail.com',
            'Teste123',
            'Teste123'
        )

        const email = await SignUpPage.emailInput.isDisplayed()
        const senha = await SignUpPage.passwordInput.isDisplayed()
        const confirmacao = await SignUpPage.repeatPasswordInput.isDisplayed()
        const botao = await SignUpPage.signUpButton.isDisplayed()

        expect(email).to.equal(true)
        expect(senha).to.equal(true)
        expect(confirmacao).to.equal(true)
        expect(botao).to.equal(true)
    })

})