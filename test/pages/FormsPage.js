class FormsPage {

    get textInput() {
        return $('~text-input')
    }

    get textInputResult() {
        return $('~input-text-result')
    }

    get switch() {
        return $('~switch')
    }

    get switchText() {
        return $('~switch-text')
    }

    get dropdown() {
        return $('~Dropdown')
    }

    async abrir() {
        const formsNavigation = await $('~Forms')
        await formsNavigation.click()
    }

    async preencherCampoTexto(texto) {
        await this.textInput.setValue(texto)
    }

    async limparCampoTexto() {
        await this.textInput.clearValue()
    }

    async clicarSwitch() {
        await this.switch.click()
    }

    async abrirDropdown() {
        await this.dropdown.click()
    }

    async selecionarOpcao(opcao) {
        const elemento = await $(
            `android=new UiSelector().text("${opcao}")`
        )

        await elemento.click()
    }
    async opcaoSelecionadaEstaVisivel(opcao) {
    const elemento = await $(
        `android=new UiSelector().text("${opcao}")`
    )

    return await elemento.isDisplayed()
}
}

module.exports = new FormsPage()