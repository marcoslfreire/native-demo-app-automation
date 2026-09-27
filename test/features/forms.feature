Feature: Formulários

    Scenario: Preencher campo de texto
        Given que estou na tela de Forms
        When eu informo "Teste Forms" no campo de texto
        Then devo visualizar "Teste Forms" no resultado do campo

    Scenario: Selecionar uma opção no Dropdown
        Given que estou na tela de Forms
        When eu seleciono "Appium is awesome" no Dropdown
        Then devo visualizar "Appium is awesome" no Dropdown

    Scenario: Limpar campo de texto
        Given que estou na tela de Forms
        When eu informo "Teste Forms" no campo de texto
        And eu limpo o campo de texto
        Then o campo de texto deve estar vazio

    Scenario: Alternar o Switch duas vezes
        Given que estou na tela de Forms
        When eu alterno o Switch duas vezes
        Then o Switch deve estar no estado inicial
