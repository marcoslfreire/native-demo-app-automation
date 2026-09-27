class LoginPage {

    get emailInput() {
        return $('~input-email')
    }

    get passwordInput() {
        return $('~input-password')
    }

    get loginButton() {
        return $('~button-LOGIN')
    }

    get mensagemEmailInvalido() {
        return $('android=new UiSelector().text("Please enter a valid email address")')
    }

    get mensagemSenhaInvalida() {
        return $('android=new UiSelector().text("Please enter at least 8 characters")')
    }

    async abrir() {
        const loginNavigation = await $('~Login')
        await loginNavigation.click()
    }

    async preencherEmail(email) {
        await this.emailInput.setValue(email)
    }

    async preencherSenha(password) {
        await this.passwordInput.setValue(password)
    }

    async limparCampos() {
        await this.emailInput.clearValue()
        await this.passwordInput.clearValue()
    }

    async clicarLogin() {
        await this.loginButton.click()
    }

    async mensagemEmailInvalidoEstaVisivel() {
        return await this.mensagemEmailInvalido.isDisplayed()
    }

    async mensagemSenhaInvalidaEstaVisivel() {
        return await this.mensagemSenhaInvalida.isDisplayed()
    }

    async realizarLogin(email, password) {
        await this.preencherEmail(email)
        await this.preencherSenha(password)
        await this.clicarLogin()
    }
}

module.exports = new LoginPage()