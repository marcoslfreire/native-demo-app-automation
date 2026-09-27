const { Given, When, Then } = require('@wdio/cucumber-framework')
const { expect } = require('chai')

const FormsPage = require('../pages/FormsPage')

Given('que estou na tela de Forms', async () => {
    await FormsPage.abrir()
})

When('eu informo {string} no campo de texto', async (texto) => {
    await FormsPage.preencherCampoTexto(texto)
})

Then('devo visualizar {string} no resultado do campo', async (texto) => {
    const resultado = await FormsPage.textInputResult.getText()

    expect(resultado).to.equal(texto)
})

When('eu seleciono {string} no Dropdown', async (opcao) => {
    await FormsPage.abrirDropdown()
    await FormsPage.selecionarOpcao(opcao)
})

Then('devo visualizar {string} no Dropdown', async (opcao) => {
    const opcaoVisivel = await FormsPage.opcaoSelecionadaEstaVisivel(opcao)

    expect(opcaoVisivel).to.equal(true)
})

When('eu limpo o campo de texto', async () => {
    await FormsPage.limparCampoTexto()
})

Then('o campo de texto deve estar vazio', async () => {
    const resultado = await FormsPage.textInputResult.getText()

    expect(resultado).to.equal('')
})

When('eu alterno o Switch duas vezes', async () => {
    await FormsPage.clicarSwitch()
    await FormsPage.clicarSwitch()
})

Then('o Switch deve estar no estado inicial', async () => {
    const textoSwitch = await FormsPage.switchText.getText()

    expect(textoSwitch).to.equal('Click to turn the switch ON')
})