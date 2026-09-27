Feature: Login
Scenario: Validar campos de login vazios
  Given que estou na tela de Login
  When eu limpo os campos de login
  And eu clico no botão de Login
  Then devo visualizar a mensagem de e-mail inválido
  And devo visualizar a mensagem de senha inválida

  Scenario: Validar senha menor que 8 caracteres
    Given que estou na tela de Login
    When eu informo o e-mail "teste@gmail.com"
    And eu informo a senha "123"
    And eu clico no botão de Login
    Then devo visualizar a mensagem de senha inválida