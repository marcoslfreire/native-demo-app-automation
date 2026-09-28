Feature: Cadastro

    Scenario: Realizar cadastro com dados válidos
        Given que estou na tela de cadastro
        When eu informo o e-mail "teste@gmail.com"
        And eu informo a senha "Teste123"
        And eu confirmo a senha "Teste123"
        And eu clico no botão de cadastro
        Then devo visualizar a tela principal


    Scenario: Validar todos os campos de cadastro vazios
        Given que estou na tela de cadastro
        When eu limpo os campos de cadastro
        And eu clico no botão de cadastro
        Then devo visualizar a mensagem de e-mail inválido
        And devo visualizar a mensagem de senha inválida no cadastro
        And devo visualizar a mensagem de confirmação de senha

    Scenario: Validar confirmação de senha diferente
        Given que estou na tela de cadastro
        When eu informo o e-mail "teste@gmail.com"
        And eu informo a senha "Teste123"
        And eu confirmo a senha "Teste456"
        And eu clico no botão de cadastro
        Then devo visualizar a mensagem de confirmação de senha

    Scenario: Validar e-mail inválido com senha válida
        Given que estou na tela de cadastro
        When eu informo o e-mail "teste"
        And eu informo a senha "Teste123"
        And eu confirmo a senha "Teste123"
        And eu clico no botão de cadastro
        Then devo visualizar a tela principal
