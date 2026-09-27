class SignUpPage {

    get emailInput() {
        return $('~input-email')
    }

    get passwordInput() {
        return $('~input-password')
    }

    get repeatPasswordInput() {
        return $('~input-repeat-password')
    }

    get signUpButton() {
        return $('~button-SIGN UP')
    }

    get mensagemConfirmacaoSenha() {
        return $('android=new UiSelector().text("Please enter the same password")')
    }

    get mensagemSenhaInvalida() {
        return $('android=new UiSelector().text("Please enter at least 8 characters")')
    }

    async mensagemSenhaInvalidaEstaVisivel() {
        return await this.mensagemSenhaInvalida.isDisplayed()
    }

    async mensagemConfirmacaoSenhaEstaVisivel() {
        return await this.mensagemConfirmacaoSenha.isDisplayed()
    }

    async abrir() {
        const loginNavigation = await $('~Login')
        await loginNavigation.click()

        const signUpNavigation = await $('~button-sign-up-container')
        await signUpNavigation.click()
    }

    async preencherEmail(email) {
        await this.emailInput.setValue(email)
    }

    async preencherSenha(password) {
        await this.passwordInput.setValue(password)
    }

    async preencherConfirmacaoSenha(password) {
        await this.repeatPasswordInput.setValue(password)
    }

    async clicarSignUp() {
        await this.signUpButton.click()
    }

    async preencherCadastro(email, password, repeatPassword) {
        await this.preencherEmail(email)
        await this.preencherSenha(password)
        await this.preencherConfirmacaoSenha(repeatPassword)
    }

    async limparCampos() {
        await this.emailInput.clearValue()
        await this.passwordInput.clearValue()
        await this.repeatPasswordInput.clearValue()
    }
}

module.exports = new SignUpPage()