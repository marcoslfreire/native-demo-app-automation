# Jornada do Projeto — Etapa Atual

## 1. Objetivo do projeto

Este projeto foi criado para o desafio de **Automação de Testes Mobile** utilizando o Native Demo App da WebdriverIO.

O objetivo desta etapa foi construir uma automação mobile real, organizada e reproduzível, cobrindo:

- Login;
- Cadastro;
- Navegação;
- Formulários;
- mensagens de validação;
- Page Object;
- execução local;
- execução remota no BrowserStack;
- evidências e relatórios.

O projeto ainda não utiliza Docker nem GitLab CI/CD nesta etapa.

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

### Execução BrowserStack

```text
Windows
  ↓
Node.js / npm
  ↓
WebDriverIO
  ↓
Cucumber
  ↓
BrowserStack App Automate
  ↓
Appium
  ↓
Samsung Galaxy S22
Android 12
  ↓
Native Demo App
```

---

## 3. Tecnologias configuradas

### Automação

- JavaScript
- Node.js
- WebDriverIO
- Appium
- Cucumber
- Chai

### Relatórios e evidências

- Allure
- screenshots automáticos por step
- logs de execução
- vídeos e evidências fornecidos pelo BrowserStack

### Versionamento

- Git
- GitHub

### Execução remota

- BrowserStack App Automate

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

- Cucumber;
- specs;
- timeout;
- reporters;
- Allure;
- screenshots;
- hooks de execução;
- parâmetros comuns.

### `wdio.android.conf.js`

Configura a execução Android local utilizando:

- Appium;
- UiAutomator2;
- APK local;
- pacote `com.wdiodemoapp`;
- `MainActivity`.

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

Exemplo:

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
Login:      2 cenários
Cadastro:   4 cenários
Formulários: 4 cenários
-----------------------
Total:     10 cenários
```

A execução mais recente validada apresentou:

```text
3 spec files passed
47 step-level checks passed
100%
```

---

## 9. Screenshots automáticos

Foi implementado screenshot automático por step.

Os arquivos são organizados aproximadamente assim:

```text
relatorio/
└── DD-MM-YYYY/
    └── feature/
        └── cenario/
            ├── 01-step.png
            ├── 02-step.png
            └── ...
```

A pasta `relatorio/` não é versionada.

Isso permite consultar visualmente o estado do aplicativo em cada etapa da execução local.

---

## 10. Allure

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

## 11. BrowserStack

A integração com BrowserStack foi implementada depois que a execução local estava funcionando.

O fluxo foi:

```text
1. Instalação do BrowserStack service
2. Configuração das credenciais por variável de ambiente
3. Autenticação na API
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

- execução dos cenários;
- passos;
- vídeo;
- screenshots;
- logs;
- status;
- duração da execução.

Portanto, a integração não é apenas uma configuração teórica: ela foi executada e validada.

---

## 12. Comandos atuais

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

---

## 13. O que NÃO existe ainda

É importante registrar explicitamente o estado atual.

### Docker

**Ainda não implementado.**

Não existe atualmente:

```text
Dockerfile
docker-compose.yml
imagem Docker
container de testes
```

### GitLab CI/CD

**Ainda não implementado.**

O projeto ainda não executa automaticamente pelo GitLab.

### Execução automática por commit

**Ainda não implementada.**

Hoje a execução é iniciada manualmente pelos comandos do projeto.

---

## 14. Por que não adicionar Docker ainda sem entender

Docker foi identificado como uma possível próxima etapa de infraestrutura, mas não deve ser adicionado apenas porque é uma tecnologia comum em projetos de QA.

Antes de implementar, precisamos entender:

1. o que Docker resolve;
2. o que ele não resolve;
3. onde ele entra na arquitetura;
4. se ele deve conter apenas Node/WebDriverIO;
5. se o Android Emulator deve ficar fora do container;
6. como o BrowserStack será acessado pelo container;
7. como o mesmo ambiente poderá ser utilizado no GitLab CI/CD;
8. quais arquivos e dependências devem ser congelados na imagem.

A decisão deve ser técnica e baseada no objetivo do projeto.

---

## 15. Próxima etapa de estudo: Docker

A arquitetura que será estudada é potencialmente:

```text
Docker
  ↓
Node.js
  ↓
WebDriverIO
  ↓
Cucumber
  ↓
BrowserStack
  ↓
Android real na nuvem
```

Isso é diferente de colocar o Android inteiro dentro do Docker.

Antes de implementar qualquer `Dockerfile`, será estudado:

- imagem;
- container;
- Dockerfile;
- volume;
- rede;
- variáveis de ambiente;
- diferença entre imagem e container;
- reprodução do ambiente;
- integração com BrowserStack;
- impacto no GitLab CI/CD.

Somente depois dessa análise será tomada a decisão de implementação.

---

## 16. Estado do projeto neste checkpoint

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

[ ] Docker
[ ] GitLab CI/CD
[ ] Pipeline automático
[ ] Execução iOS efetiva
```

Este documento representa o estado real do projeto neste checkpoint e deve ser atualizado quando uma nova infraestrutura for efetivamente implementada.
