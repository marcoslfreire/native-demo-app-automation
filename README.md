# Native Demo App Automation

Projeto de **Automação de Testes Mobile** desenvolvido com JavaScript, WebdriverIO e Appium, utilizando Cucumber, Page Object, Allure, Docker, GitHub, GitLab CI/CD e BrowserStack.

O objetivo deste projeto é demonstrar uma solução de automação mobile organizada, reproduzível e integrada a um fluxo de CI/CD, com execução em Android e dispositivo real através do BrowserStack.

---

## 🚀 Stack

| Tecnologia   | Utilização               |
| ------------ | ------------------------ |
| JavaScript   | Linguagem                |
| Node.js      | Runtime                  |
| WebdriverIO  | Framework de automação   |
| Appium       | Automação mobile         |
| Cucumber     | BDD / cenários           |
| Chai         | Assertions               |
| Allure       | Relatórios e resultados  |
| Docker       | Padronização do ambiente |
| Git          | Controle de versão       |
| GitHub       | Repositório principal    |
| GitLab CI/CD | Pipeline                 |
| BrowserStack | Dispositivo Android real |

---

## 📱 Aplicativo

O projeto utiliza o **Native Demo App** como aplicação alvo dos testes.

Os cenários automatizados contemplam funcionalidades relacionadas a:

* Login
* Cadastro
* Navegação
* Formulários
* Mensagens de erro

Atualmente existem:

**10 cenários Gherkin automatizados e 47 steps executados com sucesso na validação realizada.**

> 10 é o número de cenários.
> 47 é o número total de steps executados.

---

## 🏗️ Arquitetura

A solução foi construída seguindo esta estrutura:

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
WebdriverIO
   ↓
Appium
   ↓
Android
```

Para execução em dispositivo real:

```text
GitHub
   ↓
Webhook
   ↓
GitLab CI/CD
   ↓
GitLab Runner
   ↓
WebdriverIO
   ↓
BrowserStack
   ↓
Android real
   ↓
Native Demo App
```

Os resultados são armazenados como:

```text
Screenshots
     +
Allure Results
     ↓
GitLab Artifacts
```

---

## 📂 Estrutura do projeto

```text
native-demo-app-automation/
│
├── README.md
├── Dockerfile
├── .dockerignore
├── .gitlab-ci.yml
├── package.json
├── package-lock.json
│
├── wdio.base.conf.js
├── wdio.android.browserstack.conf.js
│
├── test/
│   ├── features/
│   ├── pages/
│   ├── step-definitions/
│   └── specs/
│
├── docs/
│   ├── guia-rapido.md
│   └── referencia-tecnica.md
│
└── apps/
```

---

# ▶️ Quick Start

## 1. Entrar no projeto

```bash
cd /c/projetos/native-demo-app-automation
```

## 2. Verificar ambiente

```bash
node --version
npm --version
npx wdio --version
npx appium --version
```

## 3. Instalar dependências

Se necessário:

```bash
npm ci
```

## 4. Verificar o Android

```bash
adb devices
emulator -list-avds
emulator -avd nightwatch-android-11
adb devices
npm run test:android
```

## 5. Executar os testes

Para execução local, utilize a configuração Android disponível no projeto.

Para execução no BrowserStack:

```bash
npx wdio wdio.android.browserstack.conf.js
```

---

# ☁️ BrowserStack

A execução em dispositivo real utiliza o BrowserStack.

Configuração validada:

```text
Device: Samsung Galaxy S22
Android: 12.0
Automation: UiAutomator2
```

As credenciais são fornecidas por variáveis de ambiente e **não ficam armazenadas no código**.

Variáveis utilizadas:

```text
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_ID
```

---

# 🐳 Docker

O projeto possui uma imagem Docker para padronizar o ambiente de execução.

Construção:

```bash
docker build -t native-demo-app-automation:1.5 .
```

Validação:

```bash
docker run --rm native-demo-app-automation:1.5 node --version
```

O Docker fornece o ambiente da aplicação, mas **não contém um dispositivo Android real**.

Na execução BrowserStack, o dispositivo é fornecido pela própria plataforma.

---

# 🔄 CI/CD

O GitHub é utilizado como repositório principal.

O GitLab é utilizado para CI/CD.

O fluxo automático é:

```text
git push
   ↓
GitHub
   ↓
Webhook
   ↓
GitLab
   ↓
validate_project
   ↓
test_android_browserstack
   ↓
BrowserStack
```

Também existe a possibilidade de executar o pipeline manualmente pelo GitLab:

```text
Build
→ Pipe
```
