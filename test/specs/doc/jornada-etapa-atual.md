# Jornada do Projeto — Etapa Atual

## 1. Objetivo do projeto

Este projeto foi criado para o desafio de **Automação de Testes Mobile** utilizando o Native Demo App da WebdriverIO.

O objetivo desta etapa foi construir uma automação mobile real, organizada e reproduzível, cobrindo:

* Login;
* Cadastro;
* Navegação;
* Formulários;
* mensagens de validação;
* Page Object;
* execução local;
* execução remota no BrowserStack;
* evidências e relatórios;
* padronização do ambiente de execução com Docker.

O GitLab CI/CD ainda não foi implementado nesta etapa.

---

## 2. Arquitetura atual

### Execução local

```text
Windows
  ↓
Node.js / npm
  ↓
WebDriverIO
  ↓
Cucumber
  ↓
Appium
  ↓
Android
  ↓
Native Demo App
```

### Execução Docker + BrowserStack

```text
Docker
  ↓
Node.js / npm
  ↓
WebDriverIO
  ↓
Cucumber
  ↓
BrowserStack App Automate
  ↓
Appium / infraestrutura BrowserStack
  ↓
Samsung Galaxy S22
Android 12
  ↓
Native Demo App
```

O container Docker padroniza o ambiente da automação, mas não contém o dispositivo Android real.

---

## 3. Tecnologias configuradas

### Automação

* JavaScript
* Node.js
* WebDriverIO
* Appium
* Cucumber
* Chai

### Relatórios e evidências

* Allure
* screenshots automáticos por step
* logs de execução
* vídeos e evidências fornecidos pelo BrowserStack

### Containerização

* Docker
* Dockerfile
* Node.js 24
* npm
* `package-lock.json` para instalação reproduzível das dependências

### Versionamento

* Git
* GitHub

### Execução remota

* BrowserStack App Automate

---

## 4. Estrutura de execução criada

O projeto foi organizado com configurações separadas por plataforma.

```text
wdio.base.conf.js
wdio.android.conf.js
wdio.ios.conf.js
wdio.android.browserstack.conf.js
```

### `wdio.base.conf.js`

Concentra a configuração compartilhada:

* Cucumber;
* specs;
* timeout;
* reporters;
* Allure;
* screenshots;
* hooks de execução;
* parâmetros comuns;
* organização das evidências.

O `onPrepare()` também é responsável por criar o diretório específico da execução.

### `wdio.android.conf.js`

Configura a execução Android local utilizando:

* Appium;
* UiAutomator2;
* APK local;
* pacote `com.wdiodemoapp`;
* `MainActivity`.

### `wdio.ios.conf.js`

Deixa a estrutura preparada para execução iOS.

A configuração exige:

```text
IOS_DEVICE_NAME
IOS_PLATFORM_VERSION
IOS_APP_PATH
```

A execução iOS ainda depende de um artefato `.app`/`.ipa` e ambiente compatível.

Não foi inventado nenhum dispositivo, caminho ou bundle ID iOS.

### `wdio.android.browserstack.conf.js`

Configura a execução Android no BrowserStack.

Ambiente atualmente validado:

```text
Dispositivo: Samsung Galaxy S22
Android: 12.0
Automation: UiAutomator2
BrowserStack: App Automate
```

As credenciais são obtidas por variáveis de ambiente.

---

## 5. Native Demo App

O aplicativo utilizado é o **Native Demo App** da WebdriverIO.

Versão utilizada:

```text
v2.2.0
```

APK Android utilizado localmente:

```text
apps/android.wdio.native.app.v2.2.0.apk
```

A pasta `apps/` foi colocada no `.gitignore`.

O APK local não é versionado no Git.

Também foi validado o upload do APK para o BrowserStack, que retornou um identificador no formato:

```text
bs://...
```

Esse identificador é utilizado para indicar ao BrowserStack qual aplicativo deve ser instalado durante a execução.

---

## 6. Cenários automatizados

Foram definidos 10 cenários finais:

### Login

1. `EXP-LOGIN-001` — Campos de login vazios
2. `EXP-LOGIN-004` — E-mail válido e senha com menos de 8 caracteres

### Cadastro

3. `EXP-SIGNUP-003` — Cadastro com dados válidos
4. `EXP-SIGNUP-001` — Todos os campos vazios
5. `EXP-SIGNUP-002` — Confirmação de senha diferente
6. `EXP-SIGNUP-006` — E-mail inválido com senha válida

### Formulários

7. `EXP-FORMS-002` — Preenchimento do campo de texto
8. `EXP-FORMS-008` — Limpeza do campo de texto
9. `EXP-FORMS-009` — Alternância do Switch duas vezes
10. `EXP-FORMS-007` — Persistência da opção selecionada no Dropdown

---

## 7. Page Objects

Foram criados Page Objects para separar localização de elementos e ações dos cenários.

```text
test/
├── features/
├── pages/
│   ├── LoginPage.js
│   ├── SignUpPage.js
│   └── FormsPage.js
└── step-definitions/
```

A ideia é evitar que os arquivos `.feature` conheçam detalhes de implementação dos elementos.

Fluxo:

```text
Feature
  ↓
Step Definition
  ↓
Page Object
  ↓
Appium / WebDriverIO
  ↓
Aplicativo
```

---

## 8. Cucumber

Os cenários foram separados em três features:

```text
test/features/
├── login.feature
├── signup.feature
└── forms.feature
```

Quantidade:

```text
Login:       2 cenários
Cadastro:    4 cenários
Formulários: 4 cenários
------------------------
Total:      10 cenários
```

A execução validada apresentou:

```text
3 spec files passed
47 step-level checks passed
100%
```

É importante diferenciar:

* **10 cenários automatizados**
* **47 steps executados com sucesso**

Os 47 representam passos do Cucumber, não 47 cenários.

---

## 9. Screenshots automáticos

Foi implementado screenshot automático por step.

A organização inicial utilizava diretamente a data como raiz:

```text
relatorio/
└── DD-MM-YYYY/
    └── feature/
        └── cenario/
            ├── 01-step.png
            ├── 02-step.png
            └── ...
```

Durante esta etapa foi identificada a necessidade de separar diferentes execuções realizadas no mesmo dia.

A estrutura foi então evoluída para:

```text
relatorio/
└── DD-MM-YYYY/
    └── executado-as-HHmm/
        ├── forms/
        │   └── cenario/
        ├── login/
        │   └── cenario/
        └── signup/
            └── cenario/
```

Exemplo:

```text
relatorio/
└── 27-09-2026/
    └── executado-as-19h53/
        ├── forms/
        ├── login/
        └── signup/
```

O diretório da execução é criado automaticamente pelo `onPrepare()`.

O caminho é armazenado em:

```javascript
process.env.REPORT_EXECUTION_DIR
```

O `afterStep()` utiliza esse diretório para salvar as evidências.

---

## 10. Decisão sobre o formato do horário

Inicialmente foi considerada uma nomenclatura utilizando `:`:

```text
executado-as-19:53H
```

Durante a validação no Windows foi identificado que `:` não pode ser utilizado em nomes de diretórios.

Por isso foi adotado o formato:

```text
executado-as-19h53
```

Essa nomenclatura mantém a informação de hora e minuto e é compatível com Windows, Docker e outros ambientes.

A implementação atual utiliza:

```javascript
const execucao = `executado-as-${hora}h${minuto}`
```

---

## 11. Preservação das execuções

A organização por data e horário permite manter diferentes execuções no mesmo dia.

Exemplo:

```text
relatorio/
└── 27-09-2026/
    ├── executado-as-15h00/
    ├── executado-as-19h49/
    └── executado-as-22h56/
```

Cada execução possui seus próprios diretórios de:

```text
forms/
login/
signup/
```

As evidências de uma execução não precisam sobrescrever as evidências de outra execução.

Durante o desenvolvimento também existe uma pasta de uma execução anterior utilizando a nomenclatura:

```text
execucao-22-22-27
```

Essa pasta representa uma execução histórica realizada antes da padronização atual.

---

## 12. Allure

O projeto utiliza:

```text
@wdio/allure-reporter
```

Os resultados são gerados em:

```text
allure-results/
```

O ambiente documentado inclui informações como:

```text
OS
Automation
Framework
Language
Platform
App
Node.js
Appium
WebDriverIO
Allure
Cucumber
```

Os arquivos de resultado não são versionados.

---

## 13. BrowserStack

A integração com BrowserStack foi implementada depois que a execução local estava funcionando.

O fluxo foi:

```text
1. Instalação do BrowserStack service
2. Configuração das credenciais por variável de ambiente
3. Autenticação
4. Upload do APK
5. Obtenção do BROWSERSTACK_APP_ID
6. Configuração do dispositivo
7. Execução dos testes
8. Validação dos resultados
```

Comando utilizado:

```bash
npm run test:android:browserstack
```

A execução foi validada no:

```text
Samsung Galaxy S22
Android 12
```

O BrowserStack apresentou:

* execução dos cenários;
* passos;
* vídeo;
* screenshots;
* logs;
* status;
* duração da execução.

Portanto, a integração não é apenas uma configuração teórica: ela foi executada e validada.

### Estratégia atual

Depois da validação da integração, as alterações relacionadas à organização dos relatórios passaram a ser validadas localmente e dentro do Docker sempre que possível.

Isso evita consumir execuções do BrowserStack durante alterações que não dependem do dispositivo real.

O BrowserStack fica reservado para uma execução final de demonstração ou validação quando o projeto estiver estável.

---

## 14. Docker

A containerização foi implementada nesta etapa para padronizar o ambiente de execução da automação.

### Dockerfile

Foi criado:

```text
Dockerfile
```

A imagem utiliza:

```text
node:24-bookworm
```

O processo de construção utiliza:

```text
package.json
package-lock.json
npm ci
código do projeto
```

A utilização do `package-lock.json` permite instalar as versões de dependências registradas no projeto de forma reproduzível.

### `.dockerignore`

Também foi criado:

```text
.dockerignore
```

Entre os itens ignorados estão:

```text
node_modules
allure-results
allure-report
relatorio
apps
.git
.env
.env.*
```

O APK não é colocado na imagem Docker porque a execução BrowserStack utiliza o identificador do aplicativo já enviado para a plataforma.

As credenciais também não são incorporadas à imagem.

---

## 15. Variáveis de ambiente no Docker

As credenciais e o identificador do aplicativo são fornecidos em tempo de execução.

Exemplo conceitual:

```text
Docker container
      ↓
variáveis de ambiente
      ↓
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_ID
```

O arquivo `.env` permanece fora da imagem.

A validação realizada confirmou que o container consegue receber essas variáveis sem gravá-las na imagem.

---

## 16. Volumes para evidências

Foi validada a utilização de volumes para persistir arquivos gerados pelo container.

Exemplo:

```text
Host
  ↓
relatorio/
  ↕
/app/relatorio
  ↑
Container
```

Também foi validada a persistência de:

```text
allure-results/
```

Dessa forma, os artefatos gerados durante uma execução dentro do container podem permanecer disponíveis no ambiente host.

---

## 17. Imagens Docker construídas

Durante a implementação foram utilizadas versões incrementais da imagem para validar a evolução da configuração.

```text
native-demo-app-automation:1.1
native-demo-app-automation:1.2
native-demo-app-automation:1.3
native-demo-app-automation:1.4
```

A imagem atualmente validada é:

```text
native-demo-app-automation:1.4
```

A versão `1.4` contém a configuração atual do `wdio.base.conf.js`.

Foi validado dentro do container:

```bash
docker run --rm \
  --entrypoint node \
  native-demo-app-automation:1.4 \
  -e "const c=require('./wdio.base.conf').config; c.onPrepare(); console.log(process.env.REPORT_EXECUTION_DIR)"
```

Resultado validado:

```text
/app/relatorio/27-09-2026/executado-as-23h03
```

Essa validação confirma que o container possui a lógica atual de criação do diretório de execução.

---

## 18. O que o Docker resolve

Neste projeto, o Docker resolve principalmente a padronização do ambiente de execução.

A imagem concentra:

```text
Node.js
npm
dependências do projeto
WebDriverIO
Cucumber
Appium
configurações da automação
```

Isso reduz a dependência das configurações específicas da máquina que executa o container.

O Docker também cria uma base que poderá ser reutilizada posteriormente em uma pipeline de CI/CD.

---

## 19. O que o Docker NÃO resolve

O Docker não cria automaticamente um dispositivo Android real.

A arquitetura atual não coloca:

```text
Android Emulator
```

dentro do container.

Também não transforma automaticamente a execução local em execução no BrowserStack.

No cenário atual:

```text
Docker
  ↓
ambiente da automação
  ↓
BrowserStack
  ↓
dispositivo Android real
```

A infraestrutura do dispositivo continua sendo responsabilidade da plataforma de execução remota.

---

## 20. Decisão arquitetural sobre Docker

A decisão desta etapa foi utilizar Docker para **padronizar o ambiente da automação**, e não tentar containerizar toda a infraestrutura mobile.

Foi considerado inicialmente que colocar Android Emulator dentro do mesmo container aumentaria significativamente a complexidade.

Por isso, a arquitetura adotada é:

```text
Container
├── Node.js
├── npm
├── WebDriverIO
├── Cucumber
├── Appium/configuração
└── projeto de automação

        ↓

Infraestrutura Android
        ↓

Local ou BrowserStack
```

Essa decisão está registrada também no:

```text
test/specs/doc/ADR-001-estrategia-containerizacao.md
```

---

## 21. Comandos atuais

### Instalar dependências

```bash
npm ci
```

### Android local

```bash
npm run test:android
```

Atalho equivalente:

```bash
npm run wdio
```

### Android BrowserStack

```bash
npm run test:android:browserstack
```

### iOS

```bash
npm run test:ios
```

A execução iOS está preparada, mas depende do ambiente e do artefato iOS.

### Construir imagem Docker

```bash
docker build -t native-demo-app-automation:1.4 .
```

### Validar configuração dentro do Docker

```bash
docker run --rm \
  --entrypoint node \
  native-demo-app-automation:1.4 \
  -e "const c=require('./wdio.base.conf').config; c.onPrepare(); console.log(process.env.REPORT_EXECUTION_DIR)"
```

---

## 22. GitLab CI/CD

**Ainda não implementado.**

O projeto ainda não possui pipeline automática pelo GitLab.

A containerização, entretanto, deixa uma base preparada para que futuramente a pipeline possa utilizar a mesma imagem de execução.

O objetivo futuro é evitar que o ambiente da pipeline seja diferente do ambiente utilizado durante o desenvolvimento.

---

## 23. Execução automática por commit

**Ainda não implementada.**

Hoje a execução é iniciada manualmente pelos comandos do projeto.

A automação por commit/MR será implementada posteriormente através do GitLab CI/CD.

---

## 24. Execução iOS

A configuração iOS existe no projeto, porém a execução efetiva ainda não foi validada.

A configuração depende de:

```text
IOS_DEVICE_NAME
IOS_PLATFORM_VERSION
IOS_APP_PATH
```

Portanto, o estado correto é:

```text
Configuração iOS: criada
Execução iOS efetiva: ainda não validada
```

---

## 25. Estado do projeto neste checkpoint

```text
[OK] Projeto criado
[OK] WebDriverIO
[OK] Appium
[OK] Cucumber
[OK] Page Objects
[OK] 10 cenários
[OK] Android local
[OK] Screenshots
[OK] Allure
[OK] BrowserStack
[OK] Android 12 / Samsung Galaxy S22
[OK] Execução remota validada
[OK] Docker
[OK] Dockerfile
[OK] .dockerignore
[OK] Imagem Docker 1.4
[OK] Validação da configuração dentro do Docker
[OK] Persistência de artefatos via volume

[ ] GitLab CI/CD
[ ] Pipeline automático
[ ] Execução automática por commit/MR
[ ] Execução iOS efetiva
```

---

## 26. Estado real da etapa

Neste checkpoint, a infraestrutura de automação possui três formas principais de execução:

```text
                    Projeto
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Local         Docker     BrowserStack
          │            │            │
       Appium       Ambiente      Android
          │         padronizado    real
          ↓            │            ↓
       Android         └──────→ BrowserStack
```

A execução BrowserStack já foi validada anteriormente.

As alterações recentes de organização dos relatórios foram validadas sem necessidade de executar novamente o BrowserStack.

Isso permite preservar a utilização da plataforma para uma validação final ou demonstração do projeto.

---

## 27. Próxima etapa

Com Docker implementado e a organização dos relatórios estabilizada, a próxima etapa é evoluir a documentação e preparar a integração com CI/CD.

Antes de implementar o pipeline, será necessário definir:

1. qual imagem será utilizada;
2. como as variáveis de ambiente serão fornecidas;
3. como os resultados serão armazenados;
4. como screenshots e Allure serão publicados;
5. quando os testes serão executados;
6. como o BrowserStack será acionado;
7. como evitar exposição de credenciais;
8. quais execuções serão locais e quais serão remotas.

A implementação do GitLab CI/CD será feita somente depois dessa definição.

---

## 28. Registro deste checkpoint

Data:

```text
27-09-2026
```

Principais entregas desta etapa:

```text
[OK] Organização dos relatórios por data
[OK] Organização por horário da execução
[OK] Compatibilidade com nomes de diretório do Windows
[OK] REPORT_EXECUTION_DIR
[OK] Screenshots organizados por execução
[OK] Docker implementado
[OK] Dockerfile
[OK] .dockerignore
[OK] Imagem Docker 1.4
[OK] Validação da configuração dentro do container
[OK] Estratégia documentada
```

Este documento representa o estado real do projeto neste checkpoint e deve ser atualizado sempre que uma nova infraestrutura ou funcionalidade for efetivamente implementada e validada.
