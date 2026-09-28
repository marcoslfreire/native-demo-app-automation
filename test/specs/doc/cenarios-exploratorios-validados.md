# Cenários Exploratórios Validados

## Objetivo

Registrar os cenários exploratórios executados e validados durante a exploração do aplicativo Android.

Este documento será utilizado como base para a documentação da estratégia de testes e, posteriormente, poderá ser transformado em uma matriz de cenários com rastreabilidade entre cenário exploratório e automação.

---

# 1. Login

## EXP-LOGIN-001 — Campos de login vazios

### Objetivo

Validar o comportamento do formulário de Login quando os campos de e-mail e senha não são preenchidos.

### Pré-condições

* Aplicativo aberto.
* Tela de Login exibida.
* Campos de e-mail e senha vazios.

### Dados utilizados

* E-mail: vazio
* Senha: vazia

### Passos executados

1. Acessar a tela de Login.
2. Manter o campo de e-mail vazio.
3. Manter o campo de senha vazio.
4. Acionar a ação de Login.

### Resultado esperado

O aplicativo deve impedir o Login e apresentar mensagens de validação para os campos obrigatórios.

### Resultado observado

O Login não foi realizado e a tela permaneceu no Login.

Foram apresentadas as mensagens:

* `Please enter a valid email address`
* `Please enter at least 8 characters`

### Status

**VALIDADO**

---

## EXP-LOGIN-002 — E-mail inválido e senha vazia

### Objetivo

Validar o comportamento do formulário quando o e-mail informado é inválido e a senha permanece vazia.

### Pré-condições

* Aplicativo aberto.
* Tela de Login exibida.

### Dados utilizados

* E-mail: `teste`
* Senha: vazia

### Passos executados

1. Acessar a tela de Login.
2. Informar `teste` no campo de e-mail.
3. Manter o campo de senha vazio.
4. Acionar a ação de Login.

### Resultado esperado

O aplicativo deve impedir o Login e apresentar as validações correspondentes ao e-mail e à senha.

### Resultado observado

O Login não foi realizado e a tela permaneceu no Login.

Foram apresentadas as mensagens:

* `Please enter a valid email address`
* `Please enter at least 8 characters`

### Status

**VALIDADO**

---

## EXP-LOGIN-003 — E-mail inválido e senha com menos de 8 caracteres

### Objetivo

Validar o comportamento do formulário quando o e-mail informado é inválido e a senha possui menos de 8 caracteres.

### Pré-condições

* Aplicativo aberto.
* Tela de Login exibida.

### Dados utilizados

* E-mail: `teste`
* Senha: `123`

### Passos executados

1. Acessar a tela de Login.
2. Informar `teste` no campo de e-mail.
3. Informar `123` no campo de senha.
4. Acionar a ação de Login.

### Resultado esperado

O aplicativo deve impedir o Login e apresentar as validações referentes ao formato do e-mail e ao tamanho mínimo da senha.

### Resultado observado

O Login não foi realizado e a tela permaneceu no Login.

Foram apresentadas as mensagens:

* `Please enter a valid email address`
* `Please enter at least 8 characters`

### Status

**VALIDADO**

---

## EXP-LOGIN-004 — E-mail válido e senha com menos de 8 caracteres

### Objetivo

Validar o comportamento do formulário quando o e-mail possui formato válido, mas a senha possui menos de 8 caracteres.

### Pré-condições

* Aplicativo aberto.
* Tela de Login exibida.

### Dados utilizados

* E-mail: `teste@gmail.com`
* Senha: `123`

### Passos executados

1. Acessar a tela de Login.
2. Informar `teste@gmail.com` no campo de e-mail.
3. Informar `123` no campo de senha.
4. Acionar a ação de Login.

### Resultado esperado

O aplicativo deve impedir o Login devido ao tamanho insuficiente da senha.

### Resultado observado

O e-mail foi aceito pelo formulário.

O Login não foi realizado e a tela permaneceu no Login.

Foi apresentada somente a mensagem:

* `Please enter at least 8 characters`

### Status

**VALIDADO**

---

# 2. Cadastro

## EXP-SIGNUP-001 — Todos os campos vazios

### Objetivo

Validar o comportamento da tela de cadastro quando nenhum campo é preenchido.

### Pré-condições

* Aplicativo aberto.
* Acesso à tela de cadastro (`Sign Up`).

### Dados utilizados

Todos os campos vazios.

### Passos executados

1. Acessar a tela de Login.
2. Acessar a opção `Sign Up`.
3. Manter todos os campos vazios.
4. Acionar a ação de cadastro.

###
## EXP-SIGNUP-004 — Cadastro com e-mail já cadastrado

### Objetivo

Validar o comportamento do aplicativo ao realizar um novo cadastro utilizando um e-mail que já havia sido utilizado anteriormente.

### Pré-condições

* Aplicativo aberto.

* Acesso à tela de cadastro (`Sign Up`).

* E-mail `teste@gmail.com` já utilizado em um cadastro anterior.

### Dados utilizados

* E-mail: `teste@gmail.com`

* Senha: `Teste123`

* Repetir senha: `Teste123`

### Passos executados

1. Acessar a tela de Login.

2. Acessar a opção `Sign Up`.

3. Informar `teste@gmail.com` no campo de e-mail.

4. Informar `Teste123` no campo de senha.

5. Informar `Teste123` no campo de confirmação de senha.

6. Acionar a ação de cadastro.

### Resultado esperado

O aplicativo deve validar o e-mail informado e, caso não permita múltiplos cadastros com o mesmo endereço, impedir o cadastro e apresentar uma mensagem informando que o e-mail já está cadastrado.

### Resultado observado

O aplicativo permitiu o cadastro utilizando novamente o e-mail `teste@gmail.com`.

Foi exibido um diálogo de confirmação contendo:

* `Signed Up!`

* `You successfully signed up!`

O aplicativo não apresentou mensagem indicando que o e-mail já estava cadastrado.

### Status

**VALIDADO**

### Observação

Durante a exploração, não foi identificada uma validação de unicidade do e-mail para impedir novos cadastros com o mesmo endereço.

---

## EXP-SIGNUP-005 — Cadastro com senha menor que 8 caracteres

### Objetivo

Validar o comportamento do aplicativo ao realizar um cadastro utilizando uma senha com menos de 8 caracteres.

### Pré-condições

* Aplicativo aberto.

* Acesso à tela de cadastro (`Sign Up`).

### Dados utilizados

* E-mail: `teste2@gmail.com`

* Senha: `123`

* Repetir senha: `123`

### Passos executados

1. Acessar a tela de Login.

2. Acessar a opção `Sign Up`.

3. Informar `teste2@gmail.com` no campo de e-mail.

4. Informar `123` no campo de senha.

5. Informar `123` no campo de confirmação de senha.

6. Acionar a ação de cadastro.

### Resultado esperado

O aplicativo deve impedir o cadastro e apresentar uma validação informando que a senha possui menos de 8 caracteres.

### Resultado observado

O aplicativo permitiu o cadastro mesmo com uma senha de apenas 3 caracteres.

Após a ação de cadastro, a tela principal foi exibida e o elemento `Forms` foi localizado e confirmado como visível.

Não foi apresentada mensagem de validação referente ao tamanho da senha.

### Status

**VALIDADO**

### Observação

Durante a exploração, foi identificado que o cadastro aceita uma senha com menos de 8 caracteres, apesar de o formulário de Login apresentar anteriormente a validação `Please enter at least 8 characters`.

### EXP-SIGNUP-006 — E-mail inválido com senha válida

**Objetivo:**  
Verificar se o cadastro é bloqueado quando o e-mail informado é inválido, mantendo senha e confirmação válidas.

**Pré-condição:**  
Usuário acessando a tela de cadastro (Sign Up).

**Dados utilizados:**
- E-mail: `teste`
- Senha: `Teste123`
- Confirmação de senha: `Teste123`

**Resultado esperado:**  
O cadastro deve ser bloqueado e uma validação de e-mail inválido deve ser apresentada.

**Resultado observado:**  
O cadastro foi aceito mesmo com o e-mail inválido. Após clicar em `SIGN UP`, a aplicação navegou para a tela principal, confirmada pela presença do elemento `Forms`.

**Evidência da automação:**
- `Tela principal exibida: true`
- `Cadastro realizado mesmo com e-mail inválido.`
- Teste: `1 passing`

**Conclusão:**  
**VALIDADO** — a aplicação não bloqueou o cadastro utilizando o e-mail inválido `teste`.

**Observação:**  
Não foi identificada validação de formato de e-mail durante este cenário.


### EXP-SIGNUP-007 — Confirmação de senha vazia

**Objetivo:**  
Verificar se o cadastro é bloqueado quando a confirmação da senha não é preenchida.

**Pré-condição:**  
Usuário acessando a tela de cadastro (Sign Up).

**Dados utilizados:**
- E-mail: `teste3@gmail.com`
- Senha: `Teste123`
- Confirmação de senha: vazia

**Resultado esperado:**  
O cadastro deve ser bloqueado e uma validação informando que a confirmação da senha é obrigatória deve ser apresentada.

**Resultado observado:**  
O cadastro não foi realizado e a aplicação permaneceu na tela de cadastro.

Foi apresentada a mensagem:

`Please enter the same password`

**Evidência da automação:**
- Mensagem `Please enter the same password` encontrada no `pageSource`.
- Campo `Confirm password` permaneceu vazio.
- Teste: `1 passing`

**Conclusão:**  
**VALIDADO** — a aplicação bloqueou o cadastro quando a confirmação da senha não foi preenchida.

**Observação:**  
A validação apresentada utiliza a mesma mensagem usada para divergência entre as senhas.

---

### EXP-SIGNUP-008 — Senha vazia e confirmação de senha preenchida

**Objetivo:**  

Verificar o comportamento do cadastro quando a senha não é preenchida, mas a confirmação de senha é informada.

**Pré-condição:**  

Usuário acessando a tela de cadastro (Sign Up).

**Dados utilizados:**

- E-mail: `teste4@gmail.com`
- Senha: vazia
- Confirmação de senha: `Teste123`

**Resultado esperado:**  

O cadastro deve ser bloqueado e devem ser apresentadas as validações correspondentes à senha vazia e à divergência entre a senha e sua confirmação.

**Resultado observado:**  

O cadastro não foi realizado e a aplicação permaneceu na tela de cadastro.

Foram apresentadas as mensagens:

- `Please enter at least 8 characters`
- `Please enter the same password`

**Evidência da automação:**

- Campo `Password` permaneceu vazio.
- Campo `Confirm password` foi preenchido com `Teste123`.
- As duas mensagens de validação foram identificadas no `pageSource`.
- Teste: `1 passing`

**Conclusão:**  

**VALIDADO** — a aplicação bloqueou o cadastro quando a senha permaneceu vazia e a confirmação de senha foi preenchida.

**Observação:**  

Neste cenário, a aplicação apresentou simultaneamente a validação referente ao tamanho mínimo da senha e a validação referente à correspondência entre a senha e sua confirmação.


## EXP-SIGNUP-009 — Exploração complementar do Sign Up

**Objetivo:** explorar validações complementares do formulário de cadastro (Sign Up).

### Cenário 1 — Senha válida + confirmação diferente

**Dados utilizados:**

* E-mail: `teste5@gmail.com`
* Senha: `Teste123`
* Confirmação: `123`

**Resultado observado:**

* A aplicação permaneceu na tela de cadastro.
* Foi exibida a mensagem:

```text
Please enter the same password
```

**Status:** ✅ VALIDADO

---

### Cenário 2 — E-mail vazio + senha válida + confirmação válida

**Dados utilizados:**

* E-mail: vazio
* Senha: `Teste123`
* Confirmação: `Teste123`

**Resultado observado:**

* A aplicação permaneceu na tela de cadastro.
* O campo de e-mail permaneceu sem valor.
* Foi exibida a mensagem:

```text
Please enter a valid email address
```

**Status:** ✅ VALIDADO

---

### Cenário 3 — E-mail incompleto

**Dados utilizados:**

* E-mail: `teste@`
* Senha: `Teste123`
* Confirmação: `Teste123`

**Resultado observado:**

* A aplicação permaneceu na tela de cadastro.
* Foi exibida a mensagem:

```text
Please enter a valid email address
```

**Status:** ✅ VALIDADO

---

### Cenário 4 — E-mail sem `@`

**Dados utilizados:**

* E-mail: `teste.com`
* Senha: `Teste123`
* Confirmação: `Teste123`

**Resultado observado:**

* A aplicação permaneceu na tela de cadastro.
* Foi exibida a mensagem:

```text
Please enter a valid email address
```

**Status:** ✅ VALIDADO

---

### Cenário 5 — E-mail sem parte local

**Dados utilizados:**

* E-mail: `@gmail.com`
* Senha: `Teste123`
* Confirmação: `Teste123`

**Resultado observado:**

* A aplicação permaneceu na tela de cadastro.
* Foi exibida a mensagem:

```text
Please enter a valid email address
```

**Status:** ✅ VALIDADO

---

### Cenário 6 — Senha com caractere especial

**Dados utilizados:**

* E-mail: `teste6@gmail.com`
* Senha: `Teste@123`
* Confirmação: `Teste@123`

**Resultado observado:**

* Os dois campos de senha permaneceram preenchidos.
* Não foi exibida mensagem de validação.
* Não foi identificada, neste cenário, uma mensagem explícita de sucesso do cadastro.

**Observação:** o teste automatizado foi concluído sem erro técnico (`1 passing`), porém isso não foi considerado evidência suficiente para afirmar que o cadastro foi concluído com sucesso.

**Status:** ⚠️ VALIDADO — comportamento observado sem mensagem de validação
## EXP-FORMS-002 — Preenchimento do campo de texto

**Objetivo:** validar o preenchimento do campo de texto do formulário e verificar se o valor informado é refletido no resultado exibido pela aplicação.

**Dados utilizados:**

* Campo: `text-input`
* Valor informado: `Teste Forms`
* Resultado: `input-text-result`

**Procedimento:**

1. Acessar a tela `Forms`.
2. Localizar o campo de texto.
3. Informar `Teste Forms`.
4. Consultar o elemento de resultado.

**Resultado observado:**

* O valor `Teste Forms` foi aceito pelo campo.
* O elemento `input-text-result` exibiu exatamente o valor informado:

```text
Teste Forms
```

**Evidência da automação:**

```text
Resultado exibido: Teste Forms
1 passing
```

**Status:** ✅ VALIDADO
## EXP-FORMS-003 — Alternância do Switch

**Objetivo:** validar a interação com o componente Switch e verificar a alteração do texto associado ao seu estado.

**Procedimento:**

1. Acessar a tela `Forms`.
2. Localizar o Switch.
3. Verificar o estado inicial e o texto associado.
4. Clicar no Switch.
5. Verificar o comportamento após a interação.

**Resultado observado:**

**Estado inicial:**

* `isSelected()`: `false`
* Texto: `Click to turn the switch ON`

**Após o clique:**

* `isSelected()`: `false`
* Texto: `Click to turn the switch OFF`

A alteração do texto de `Click to turn the switch ON` para `Click to turn the switch OFF` indica que o componente alternou seu estado após a interação.

**Observação técnica:** o método `isSelected()` permaneceu retornando `false` antes e depois do clique. Portanto, para este componente, o texto associado foi utilizado como evidência observável da alteração de estado.

**Evidência da automação:**

```text
--- ESTADO INICIAL ---
Switch selecionado: false
Texto: Click to turn the switch ON

Clicando no Switch...

--- ESTADO APÓS CLIQUE ---
Switch selecionado: false
Texto: Click to turn the switch OFF

1 passing
```

**Status:** ✅ VALIDADO
## EXP-FORMS-004 — Seleção de opção no Dropdown

**Objetivo:** validar a interação com o componente Dropdown e verificar se uma opção pode ser selecionada e se o diálogo de opções é fechado após a seleção.

**Procedimento:**

1. Acessar a tela `Forms`.
2. Localizar o componente `Dropdown`.
3. Abrir o Dropdown.
4. Selecionar a opção `Appium is awesome`.
5. Verificar o comportamento da interface após a seleção.

**Opções observadas no Dropdown:**

* `Select an item...`
* `webdriver.io is awesome`
* `Appium is awesome`
* `This app is awesome`

**Resultado observado:**

* A opção `Appium is awesome` foi localizada com sucesso.
* O clique na opção foi executado com sucesso.
* Após a seleção, o diálogo de opções foi fechado.
* O `pageSource` após a interação não apresentou mais o elemento `select_dialog_listview`.
* O teste foi concluído sem erro técnico.

**Evidência da automação:**

```text
Selecionando: Appium is awesome

--- VERIFICANDO SE O DIÁLOGO FOI FECHADO ---
Opção Appium is awesome ainda visível: false

--- PAGE SOURCE APÓS SELEÇÃO ---
Diálogo fechado.

1 passing
```

**Observação técnica:** o elemento `~Dropdown` não disponibilizou o texto da opção selecionada por meio de `getText()`. Portanto, não foi utilizada essa informação como evidência de que `Appium is awesome` ficou exibido como valor selecionado. A validação está restrita ao comportamento efetivamente observado: a opção foi clicada e o diálogo foi fechado.

**Status:** ✅ VALIDADO


## EXP-FORMS-005 — Comportamento do botão Active

**Objetivo:** validar a interação com o botão `Active` da tela `Forms` e observar o comportamento apresentado pela aplicação após o clique.

**Procedimento:**

1. Acessar a tela `Forms`.
2. Localizar o botão `button-Active`.
3. Verificar se o botão está disponível para interação.
4. Clicar no botão `Active`.
5. Observar o conteúdo apresentado após a interação.

**Estado inicial observado:**

* `displayed`: `true`
* `enabled`: `true`
* `clickable`: `true`

**Resultado observado:**

* O botão `Active` respondeu ao clique.
* Após a interação, a aplicação apresentou um diálogo.
* Os textos encontrados no diálogo foram:

```text
This button is
This button is active
ASK ME LATER
CANCEL
OK
```

**Evidência da automação:**

```text
--- TEXTOS DA TELA ---
[
  'This button is',
  'This button is active',
  'ASK ME LATER',
  'CANCEL',
  'OK'
]

1 passing
```

**Observação:** neste cenário foi validada somente a abertura do diálogo após o clique em `Active`. O comportamento dos botões `ASK ME LATER`, `CANCEL` e `OK` não foi explorado neste cenário.

**Status:** ✅ VALIDADO
## EXP-FORMS-006 — Comportamento do botão Inactive

**Objetivo:** validar a interação com o botão `Inactive` da tela `Forms` e observar o comportamento apresentado pela aplicação após o clique.

**Procedimento:**
1. Acessar a tela `Forms`.
2. Localizar o botão `button-Inactive`.
3. Verificar se o botão está disponível para interação.
4. Clicar no botão `Inactive`.
5. Observar o conteúdo apresentado após a interação.

**Estado inicial observado:**
- O botão estava exibido na tela.
- O botão estava habilitado para interação.

**Resultado observado:**
- O clique no botão `Inactive` foi executado com sucesso.
- Após o clique, a aplicação permaneceu na tela `Forms`.
- O botão `Active` continuou presente na tela.
- O botão `Inactive` continuou presente na tela.
- Nenhum diálogo foi apresentado.
- Nenhuma mensagem adicional foi exibida.
- Não foi observada alteração textual na tela após o clique.

**Evidência da automação:**

```text
--- TEXTOS DA TELA ---
[
  'Form components',
  'Input field:',
  'Type something',
  'You have typed:',
  'Switch:',
  'Click to turn the switch ON',
  'Dropdown:',
  'Select an item...',
  '&#983360;',
  'Buttons',
  'Active',
  'Inactive',
  '&#984737;',
  'Home',
  '&#984479;',
  'Web',
  '&#983874;',
  'Login',
  '&#984043;',
  'Forms',
  '&#985404;',
  'Swipe',
  '&#983515;',
  'Drag',
  '&#983900;',
  'Menu'
]

1 passing

## EXP-FORMS-007 — Persistência da opção selecionada no Dropdown

**Objetivo:** verificar se a opção selecionada no Dropdown é refletida no campo exibido na tela `Forms` após o fechamento do diálogo de opções.

**Procedimento:**
1. Acessar a tela `Forms`.
2. Localizar o componente `Dropdown`.
3. Abrir o Dropdown.
4. Selecionar a opção `Appium is awesome`.
5. Aguardar o fechamento do diálogo.
6. Inspecionar o `pageSource` e verificar o valor apresentado no campo do Dropdown.

**Resultado observado:**
- A opção `Appium is awesome` foi localizada e selecionada.
- O diálogo de opções foi fechado após a seleção.
- Após a seleção, o valor `Appium is awesome` passou a ser apresentado no campo do Dropdown.
- No `pageSource`, o valor foi identificado em um elemento `android.widget.EditText`:

```text
class="android.widget.EditText"
text="Appium is awesome"
enabled="false"
selected="false"
checked="false"
displayed="true"


## EXP-FORMS-008 — Limpeza do campo de texto

**Objetivo:** validar o comportamento do campo de texto após a remoção do valor informado e verificar o estado do resultado associado.

**Procedimento:**
1. Acessar a tela `Forms`.
2. Localizar o campo `text-input`.
3. Informar o valor `Teste Forms`.
4. Verificar o resultado exibido.
5. Limpar o conteúdo do campo utilizando `clearValue()`.
6. Verificar o valor apresentado no campo e no resultado associado.

**Resultado observado:**

**Antes da limpeza:**
- Valor do campo: `Teste Forms`
- Resultado exibido: `Teste Forms`

**Após a limpeza:**
- O campo retornou para o texto inicial `Type something`.
- O resultado associado ficou vazio.

**Evidência da automação:**

```text
--- PREENCHENDO O CAMPO ---
Valor informado: Teste Forms
Resultado exibido: Teste Forms

--- LIMPANDO O CAMPO ---
Valor após limpeza: Type something
Resultado após limpeza:

1 passing


## EXP-FORMS-009 — Alternância do Switch duas vezes

**Objetivo:** validar se o componente Switch alterna seu estado textual a cada interação consecutiva.

**Procedimento:**
1. Acessar a tela `Forms`.
2. Localizar o componente `Switch`.
3. Registrar o estado textual inicial.
4. Clicar no Switch pela primeira vez.
5. Registrar o estado textual após o primeiro clique.
6. Clicar no Switch pela segunda vez.
7. Registrar o estado textual após o segundo clique.

**Resultado observado:**

**Estado inicial:**
- Texto: `Click to turn the switch ON`
- `isSelected()`: `false`

**Após o primeiro clique:**
- Texto: `Click to turn the switch OFF`
- `isSelected()`: `false`

**Após o segundo clique:**
- Texto: `Click to turn the switch ON`
- `isSelected()`: `false`

O texto associado ao componente alternou corretamente entre `ON` e `OFF` a cada clique, retornando ao estado textual inicial após a segunda interação.

**Evidência da automação:**

```text
--- ESTADO INICIAL ---
Texto: Click to turn the switch ON
isSelected: false

--- PRIMEIRO CLIQUE ---
Texto: Click to turn the switch OFF
isSelected: false

--- SEGUNDO CLIQUE ---
Texto: Click to turn the switch ON
isSelected: false

1 passing



## EXP-FORMS-010 — Botão OK do diálogo Active

**Objetivo:** validar o comportamento do botão `OK` apresentado no diálogo aberto após a interação com o botão `Active`.

**Procedimento:**

1. Acessar a tela `Forms`.
2. Localizar o botão `Active`.
3. Clicar no botão `Active`.
4. Confirmar a abertura do diálogo.
5. Localizar o botão `OK`.
6. Clicar em `OK`.
7. Verificar o estado da tela após a interação.

**Resultado observado:**

* O botão `Active` abriu o diálogo.
* O diálogo apresentou a opção `OK`.
* O botão `OK` foi localizado e clicado com sucesso.
* Após o clique, o diálogo não estava mais presente.
* A aplicação permaneceu na tela `Forms`.
* Os componentes do formulário continuaram presentes na tela.

**Textos observados após o fechamento do diálogo:**

```text
Form components
Input field:
Type something
You have typed:
Switch:
Click to turn the switch ON
Dropdown:
Select an item...
Buttons
Active
Inactive
Home
Web
Login
Forms
Swipe
Drag
Menu
```

**Evidência da automação:**

```text
Diálogo não está mais presente.
Tela Forms presente.

1 passing
```

**Observação técnica:** a validação deste cenário está restrita ao comportamento observado após o clique em `OK`: o diálogo foi fechado e a aplicação permaneceu na tela `Forms`. Não foi inferida nenhuma ação adicional.

**Status:** ✅ VALIDADO


# Cenários finais selecionados para automação

Após a exploração das funcionalidades de Login, Sign Up e Forms, foram validados 22 cenários exploratórios.

Com base nos comportamentos observados, foram selecionados 10 cenários para compor a suíte final de automação.

A seleção busca contemplar diferentes tipos de comportamento da aplicação, incluindo fluxos positivos, validações negativas, mensagens de erro, preenchimento de formulário e interação com componentes nativos.

|  # | ID               | Funcionalidade | Cenário                                         | Tipo                    |
| -: | ---------------- | -------------- | ----------------------------------------------- | ----------------------- |
| 01 | `EXP-LOGIN-001`  | Login          | Campos de login vazios                          | Negativo                |
| 02 | `EXP-LOGIN-004`  | Login          | E-mail válido e senha com menos de 8 caracteres | Negativo                |
| 03 | `EXP-SIGNUP-003` | Sign Up        | Cadastro com dados válidos                      | Positivo                |
| 04 | `EXP-SIGNUP-001` | Sign Up        | Todos os campos vazios                          | Negativo                |
| 05 | `EXP-SIGNUP-002` | Sign Up        | Confirmação de senha diferente                  | Negativo                |
| 06 | `EXP-SIGNUP-006` | Sign Up        | E-mail inválido com senha válida                | Comportamento observado |
| 07 | `EXP-FORMS-002`  | Forms          | Preenchimento do campo de texto                 | Positivo                |
| 08 | `EXP-FORMS-008`  | Forms          | Limpeza do campo de texto                       | Interação               |
| 09 | `EXP-FORMS-009`  | Forms          | Alternância do Switch duas vezes                | Interação               |
| 10 | `EXP-FORMS-007`  | Forms          | Persistência da opção selecionada no Dropdown   | Interação + resultado   |

## Cobertura dos cenários finais

### Login

* Validação de campos vazios.
* Validação de senha com quantidade insuficiente de caracteres.

### Sign Up

* Fluxo de cadastro com dados válidos.
* Validação de campos obrigatórios.
* Validação da confirmação de senha.
* Comportamento observado para e-mail inválido.

### Forms

* Preenchimento de campo de texto.
* Limpeza de campo de texto.
* Alternância de componente Switch.
* Seleção e persistência de opção em Dropdown.

## Rastreabilidade

Os cenários finais mantêm os mesmos IDs utilizados durante a exploração.

Dessa forma, cada teste automatizado poderá ser rastreado desde:

```text
Exploração
    ↓
Cenário validado
    ↓
Cenário final selecionado
    ↓
Page Object
    ↓
Teste automatizado
    ↓
Evidência / relatório
```

**Total de cenários exploratórios validados:** 22

**Total de cenários selecionados para automação:** 10

**Status:** ✅ SELEÇÃO FINALIZADA


| #  | Cenário        | Status         |
| -- | -------------- | -------------- |
| 1  | EXP-LOGIN-004  | ✅ Automatizado |
| 2  | EXP-LOGIN-001  | ⏳              |
| 3  | EXP-SIGNUP-003 | ⏳              |
| 4  | EXP-SIGNUP-001 | ⏳              |
| 5  | EXP-SIGNUP-002 | ⏳              |
| 6  | EXP-SIGNUP-006 | ⏳              |
| 7  | EXP-FORMS-002  | ⏳              |
| 8  | EXP-FORMS-008  | ⏳              |
| 9  | EXP-FORMS-009  | ⏳              |
| 10 | EXP-FORMS-007  | ⏳              |
## 8. Cadastro — validação de e-mail inválido

### Objetivo

Validar o comportamento do aplicativo ao tentar realizar um cadastro utilizando um endereço de e-mail inválido.

### Cenário explorado

**Validar e-mail inválido com senha válida**

### Dados utilizados

* E-mail: `teste`
* Senha: `Teste123`
* Confirmação da senha: `Teste123`

### Fluxo explorado

1. Acessar a tela de Login.
2. Navegar para a tela de Cadastro.
3. Informar o e-mail `teste`.
4. Informar a senha `Teste123`.
5. Confirmar a senha `Teste123`.
6. Clicar no botão `SIGN UP`.
7. Validar a mensagem de erro apresentada pelo aplicativo.

### Comportamento observado

Ao informar o valor `teste` como e-mail e realizar a tentativa de cadastro, o aplicativo apresenta a mensagem:

```text
Please enter a valid email address
```

Nesse cenário, o cadastro não apresenta o diálogo de sucesso com o botão `OK`.

Portanto, o fluxo de e-mail inválido possui um comportamento diferente do cadastro realizado com dados válidos.

### Elemento identificado

A mensagem foi localizada utilizando:

```js
$('android=new UiSelector().text("Please enter a valid email address")')
```

No Page Object `SignUpPage.js`, foi criado o getter:

```js
get mensagemEmailInvalido() {
    return $('android=new UiSelector().text("Please enter a valid email address")')
}
```

E o método de validação:

```js
async mensagemEmailInvalidoEstaVisivel() {
    return await this.mensagemEmailInvalido.isDisplayed()
}
```

### Step Definition

Foi utilizado um Step específico para o cadastro:

```gherkin
Then devo visualizar a mensagem de e-mail inválido no cadastro
```

A diferenciação foi necessária porque já existia um Step com o mesmo nome relacionado ao fluxo de Login.

### Cenário automatizado

```gherkin
Scenario: Validar e-mail inválido com senha válida
    Given que estou na tela de cadastro
    When eu informo o e-mail "teste"
    And eu informo a senha "Teste123"
    And eu confirmo a senha "Teste123"
    And eu clico no botão de cadastro
    Then devo visualizar a mensagem de e-mail inválido no cadastro
```

### Resultado da validação

**VALIDADO — PASSOU**

Execução local:

```text
6 passing (9.8s)

Spec Files: 1 passed, 1 total
100% completed
```

### Decisão técnica

O cenário de e-mail inválido não deve utilizar o método de fechamento do diálogo de sucesso:

```js
fecharDialogoCadastroSucesso()
```

Esse comportamento pertence ao fluxo de cadastro válido.

Para o cenário negativo, a automação valida diretamente a mensagem de validação apresentada pelo aplicativo.

### Conclusão

O comportamento explorado foi reproduzido e automatizado com sucesso em ambiente Android local.

O cenário está **validado localmente** e pode permanecer como parte da cobertura automatizada do fluxo de Cadastro.
