# Native Demo App Automation

## Guia completo de ambiente, execução, CI/CD, Docker, BrowserStack e Allure

Este documento registra como eu configurei, executo e mantenho meu projeto de automação mobile.

Meu objetivo com esta documentação é conseguir reconstruir o ambiente e executar o projeto novamente mesmo depois de desligar o computador, além de registrar as decisões técnicas que tomei durante a construção da solução.

Eu também utilizo este documento como material de estudo para entender como todas as partes do projeto se conectam:

```text
Código
   ↓
Git
   ↓
GitHub
   ↓
Webhook
   ↓
GitLab CI/CD
   ↓
GitLab Runner
   ↓
Node.js
   ↓
WebdriverIO
   ↓
Appium
   ↓
BrowserStack
   ↓
Android real
   ↓
Testes
   ↓
Screenshots + Allure
   ↓
GitLab Artifacts
```

---

# 1. Objetivo do projeto

Meu objetivo é desenvolver uma solução de automação de testes mobile utilizando o aplicativo Native Demo App.

A solução foi construída pensando não somente na criação dos testes, mas também em:

* organização do código;
* reutilização;
* Page Object;
* execução local;
* execução em dispositivo Android;
* execução em dispositivo real através do BrowserStack;
* geração de evidências;
* geração de resultados para Allure;
* containerização com Docker;
* integração contínua;
* rastreabilidade do commit executado;
* execução automática;
* execução manual;
* armazenamento dos artefatos da execução.

A ideia principal foi construir uma estrutura que pudesse ser apresentada como um projeto de QA Automation completo, e não apenas como um conjunto de testes.

---

# 2. Tecnologias utilizadas

Minha stack atual é:

```text
JavaScript
Node.js
npm
WebdriverIO
Appium
Cucumber
Mocha/Cucumber runner
Chai
Allure Reporter
Docker
Git
GitHub
GitLab CI/CD
BrowserStack
Android
```

Versões que foram validadas durante a construção:

```text
Node.js       24.21.0
npm           11.19.0
WebdriverIO   9.32.0
Appium        3.8.0
Chai          6.2.2
Cucumber      13.2.1
Allure        9.32.0
BrowserStack  9.39.0
UiAutomator2  8.7.0
Docker        29.7.2
```

---

# 3. Estrutura geral do projeto

Minha estrutura principal ficou organizada da seguinte forma:

```text
native-demo-app-automation/
│
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
│   ├── exploration-signup.js
│   │
│   ├── features/
│   │   ├── forms.feature
│   │   ├── login.feature
│   │   └── signup.feature
│   │
│   ├── pages/
│   │   ├── FormsPage.js
│   │   ├── LoginPage.js
│   │   └── SignUpPage.js
│   │
│   ├── step-definitions/
│   │   ├── common.steps.js
│   │   ├── forms.steps.js
│   │   ├── login.steps.js
│   │   └── signup.steps.js
│   │
│   └── specs/
│       ├── login.spec.js
│       ├── signup-page.spec.js
│       │
│       └── doc/
│           ├── ADR-001-estrategia-containerizacao.md
│           ├── cenarios-exploratorios-validados.md
│           ├── execucao.md
│           └── jornada-etapa-atual.md
│
└── apps/
    └── native-demo-app.apk
```

---

# 4. Como eu penso a arquitetura

Eu separei o projeto em algumas responsabilidades diferentes.

## 4.1 Código de teste

Os arquivos `.feature` representam os cenários funcionais.

Exemplo:

```text
test/features/login.feature
```

Neles eu descrevo o comportamento que quero validar.

---

## 4.2 Step Definitions

Os Steps conectam o Gherkin com o código JavaScript.

```text
test/step-definitions/
```

A responsabilidade dessa camada é interpretar os passos:

```text
Given
When
Then
```

e chamar os métodos apropriados.

---

## 4.3 Page Object

Os Page Objects concentram os elementos e ações das telas.

```text
test/pages/
```

Minha ideia foi evitar colocar seletores e detalhes da interface diretamente nos cenários.

Assim eu mantenho uma separação:

```text
Cenário
   ↓
Step Definition
   ↓
Page Object
   ↓
Aplicativo
```

---

# 5. Configuração inicial do computador

Quando eu ligo o computador depois de algum tempo, primeiro verifico se as ferramentas principais continuam disponíveis.

Eu abro o Git Bash e entro no projeto:

```bash
cd /c/projetos/native-demo-app-automation
```

Depois verifico o Git:

```bash
git --version
```

Node:

```bash
node --version
```

npm:

```bash
npm --version
```

Docker:

```bash
docker --version
```

E verifico se o Docker está disponível:

```bash
docker info
```

Se `docker info` apresentar erro relacionado ao daemon, eu abro o Docker Desktop e aguardo até ele estar operacional.

---

# 6. Conferindo o projeto Git

Depois de ligar o computador, eu verifico o estado do repositório:

```bash
git status
```

Também verifico a branch:

```bash
git branch
```

E confirmo se estou na `main`:

```bash
git checkout main
```

Depois atualizo as referências do GitHub:

```bash
git fetch origin
```

E verifico se existe alguma diferença:

```bash
git status
```

---

# 7. Instalação das dependências

Quando o projeto já está configurado e eu apenas liguei o computador novamente, normalmente não preciso instalar tudo novamente.

Se `node_modules` estiver presente, posso verificar:

```bash
ls node_modules
```

Caso eu tenha clonado o projeto novamente, ou o diretório `node_modules` não exista, utilizo:

```bash
npm ci
```

Eu utilizo `npm ci` porque quero instalar exatamente as versões registradas no:

```text
package-lock.json
```

Isso torna a instalação mais previsível.

---

# 8. Verificando WebdriverIO

Eu posso verificar a versão instalada:

```bash
npx wdio --version
```

Resultado esperado:

```text
WebdriverIO 9.32.0
```

---

# 9. Verificando Appium

Eu verifico:

```bash
npx appium --version
```

Resultado esperado:

```text
3.8.0
```

---

# 10. Appium e Android

Para a execução local Android, o ambiente precisa possuir os componentes Android necessários.

Eu preciso ter:

```text
Android SDK
ADB
emulador/dispositivo Android
UiAutomator2
```

Posso verificar o ADB:

```bash
adb version
```

E:

```bash
adb devices
```

O objetivo é visualizar um dispositivo/emulador disponível.

---

# 11. Execução local

Minha execução local utiliza o ambiente Android configurado na máquina.

Antes de executar, eu verifico:

```bash
adb devices
```

Depois executo a configuração local correspondente do WebdriverIO.

Exemplo:

```bash
npx wdio wdio.android.conf.js
```

> Se o nome do arquivo de configuração local for alterado, eu devo utilizar o nome atual do arquivo existente no projeto.

A execução local é útil para desenvolvimento e depuração porque consigo validar alterações sem consumir uma sessão do BrowserStack.

---

# 12. Execução BrowserStack

Para execução em dispositivo real, utilizo o BrowserStack.

Minha configuração está em:

```text
wdio.android.browserstack.conf.js
```

A configuração utiliza:

```text
Samsung Galaxy S22
Android 12.0
UiAutomator2
```

O fluxo é:

```text
WebdriverIO
      ↓
BrowserStack
      ↓
Samsung Galaxy S22
      ↓
Android 12
      ↓
Native Demo App
```

---

# 13. Variáveis do BrowserStack

Eu nunca coloco minhas credenciais diretamente no código.

Utilizo:

```text
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_ID
```

No Windows/Git Bash, posso configurar temporariamente:

```bash
export BROWSERSTACK_USERNAME="meu_usuario"
export BROWSERSTACK_ACCESS_KEY="minha_chave"
export BROWSERSTACK_APP_ID="meu_app_id"
```

Depois verifico somente se a variável existe, sem imprimir a chave:

```bash
test -n "$BROWSERSTACK_USERNAME" && echo "USERNAME configurado"
test -n "$BROWSERSTACK_ACCESS_KEY" && echo "ACCESS_KEY configurado"
test -n "$BROWSERSTACK_APP_ID" && echo "APP_ID configurado"
```

Eu nunca adiciono essas informações ao Git.

---

# 14. Executando os testes diretamente no BrowserStack

Quando quero executar os testes Android no BrowserStack localmente, utilizo:

```bash
npx wdio wdio.android.browserstack.conf.js
```

Também existe o script utilizado pelo Docker:

```bash
npm run test:android:browserstack
```

A execução gera:

```text
allure-results/
relatorio/
```

---

# 15. Como funciona o BrowserStack

Eu não instalo um Android real dentro do Docker.

O Docker contém o ambiente da aplicação:

```text
Node.js
WebdriverIO
Appium
dependências
código
```

O dispositivo Android fica no BrowserStack.

Portanto:

```text
Docker / Runner
       ↓
WebdriverIO
       ↓
BrowserStack
       ↓
Samsung Galaxy S22 real
```

Essa separação foi importante porque o objetivo do Docker é padronizar meu ambiente de execução, e não substituir a infraestrutura de dispositivos do BrowserStack.

---

# 16. Docker

Eu criei o Docker para conseguir reproduzir o ambiente de execução.

O Dockerfile utiliza:

```dockerfile
FROM node:24-bookworm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "test:android:browserstack"]
```

---

# 17. Por que eu não coloquei o APK dentro da imagem

O APK possui aproximadamente 118 MB.

Como o BrowserStack já utiliza um aplicativo previamente disponibilizado, eu optei por não incorporar o APK à imagem Docker.

Além disso, meu `.dockerignore` impede que arquivos desnecessários sejam enviados para o contexto da imagem.

---

# 18. O que o `.dockerignore` protege

Meu `.dockerignore` contém:

```text
node_modules
allure-results
allure-report
relatorio
apps
.git
.gitignore
.env
.env.*
```

Eu faço isso para evitar:

* imagem desnecessariamente grande;
* inclusão de resultados antigos;
* inclusão de screenshots antigos;
* inclusão do repositório Git;
* inclusão de credenciais;
* inclusão do APK quando não é necessário.

---

# 19. Construindo a imagem Docker

Quando eu altero alguma coisa que afeta o ambiente ou as dependências, reconstruo a imagem.

Primeiro verifico:

```bash
docker images
```

Depois construo:

```bash
docker build -t native-demo-app-automation:1.5 .
```

Eu incremento a versão da tag conforme a mudança:

```text
1.4
1.5
1.6
...
```

---

# 20. Quando preciso reconstruir a imagem

Eu reconstruo a imagem quando altero, por exemplo:

```text
Dockerfile
package.json
package-lock.json
.dockerignore
versão do Node
dependências instaladas
configuração necessária dentro do container
```

Se alterei apenas um arquivo de teste e a imagem já contém um ambiente adequado, não necessariamente preciso reconstruí-la.

---

# 21. Verificando a imagem

Depois do build:

```bash
docker images
```

Posso verificar:

```bash
docker image inspect native-demo-app-automation:1.5
```

---

# 22. Testando o ambiente dentro do Docker

Eu posso validar as versões diretamente dentro do container:

```bash
docker run --rm native-demo-app-automation:1.5 node --version
```

```bash
docker run --rm native-demo-app-automation:1.5 npm --version
```

```bash
docker run --rm native-demo-app-automation:1.5 npx wdio --version
```

```bash
docker run --rm native-demo-app-automation:1.5 npx appium --version
```

Isso me permite confirmar que o ambiente do container está correto.

---

# 23. Executando o Docker com variáveis do BrowserStack

Como minhas credenciais não ficam dentro da imagem, eu passo as variáveis em tempo de execução.

Exemplo:

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.5
```

Assim:

```text
Imagem Docker
      ↓
recebe variáveis
      ↓
WebdriverIO
      ↓
BrowserStack
```

---

# 24. O Docker não substitui o GitLab Runner

É importante separar os conceitos.

No meu computador:

```text
Docker Desktop
    ↓
container local
```

No GitLab:

```text
GitLab
   ↓
GitLab Runner
   ↓
node:24-bookworm
```

O container que utilizo localmente para padronização não é necessariamente o mesmo container utilizado pelo GitLab CI.

No meu pipeline atual, o GitLab utiliza:

```yaml
image: node:24-bookworm
```

---

# 25. GitHub como fonte principal

Eu mantive o GitHub como fonte principal do código:

```text
https://github.com/marcoslfreire/native-demo-app-automation.git
```

O GitLab é utilizado principalmente para CI/CD.

Isso significa:

```text
GitHub
   ↓
código principal
```

e:

```text
GitLab
   ↓
pipeline
```

---

# 26. Webhook GitHub → GitLab

Configurei um webhook no GitHub para disparar o pipeline do GitLab quando existe um push na `main`.

O fluxo é:

```text
git push
   ↓
GitHub
   ↓
Webhook
   ↓
GitLab Trigger
   ↓
Pipeline
```

---

# 27. Como o GitLab sabe qual commit executar

Essa foi uma decisão importante da arquitetura.

Quando o GitHub dispara o webhook, o GitLab recebe o payload do evento.

Eu extraio:

```text
TRIGGER_PAYLOAD
       ↓
after
       ↓
SHA do commit
```

Depois o pipeline executa:

```bash
git clone "$GITHUB_REPOSITORY_URL" github-source
cd github-source
git checkout "$GITHUB_SHA"
```

Assim eu garanto que o teste está associado ao commit que originou o evento.

---

# 28. Pipeline automático

Quando faço:

```bash
git add .
git commit -m "minha alteracao"
git push origin main
```

acontece:

```text
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

---

# 29. Pipeline manual

Também posso executar diretamente pelo GitLab.

No GitLab:

```text
Build
  ↓
Pipelines
  ↓
New pipeline
```

Seleciono:

```text
main
```

e executo.

Nesse caso, o pipeline detecta:

```text
CI_PIPELINE_SOURCE=web
```

e consulta o commit atual da `main` do GitHub:

```bash
git ls-remote "$GITHUB_REPOSITORY_URL" refs/heads/main
```

Depois executa esse commit.

---

# 30. Diferença entre execução automática e manual

## Automática

```text
GitHub Push
    ↓
Webhook
    ↓
GitLab
    ↓
SHA enviado pelo GitHub
```

## Manual

```text
GitLab Run Pipeline
    ↓
GitHub main
    ↓
SHA atual
```

Nos dois casos:

```text
GitHub
   ↓
GitLab Runner
   ↓
BrowserStack
```

---

# 31. Etapa validate_project

Meu pipeline possui uma primeira etapa chamada:

```text
validate_project
```

Ela verifica:

```text
Node
npm
Git
WebdriverIO
Appium
estrutura do projeto
configurações
Dockerfile
.dockerignore
features
step definitions
Page Objects
```

Isso permite identificar problemas estruturais antes de iniciar uma execução mobile.

---

# 32. Etapa test_android_browserstack

Depois da validação, o pipeline executa:

```bash
npx wdio wdio.android.browserstack.conf.js
```

Essa etapa inicia a execução real no BrowserStack.

---

# 33. Artefatos do GitLab

Depois da execução, o GitLab preserva:

```text
allure-results/
relatorio/
```

A configuração utiliza:

```yaml
artifacts:
  when: always
```

Isso significa que os artefatos devem ser preservados mesmo quando a execução falha.

Atualmente a retenção está configurada para:

```text
7 dias
```

---

# 34. Screenshots

Minha configuração captura screenshots automaticamente depois de cada Step.

A estrutura é:

```text
relatorio/
└── data/
    └── executado-as-HHmm/
        ├── forms/
        ├── login/
        └── signup/
```

Dentro de cada cenário existem os screenshots numerados:

```text
01-step.png
02-step.png
03-step.png
...
```

Isso facilita a investigação de uma falha.

---

# 35. Allure

O projeto possui o Allure Reporter integrado ao WebdriverIO.

Durante a execução:

```text
Teste
 ↓
Allure Reporter
 ↓
allure-results/
```

O diretório `allure-results` contém os dados necessários para gerar o relatório HTML.

---

# 36. Gerando o relatório Allure

Depois de uma execução local, eu posso gerar o relatório com:

```bash
npx allure generate allure-results --clean -o allure-report
```

Depois posso abrir:

```bash
npx allure open allure-report
```

O navegador abrirá o relatório.

---

# 37. Se o comando Allure não estiver disponível

Se o projeto não possuir a CLI do Allure instalada localmente, posso executar através do `npx`.

Também posso verificar:

```bash
npx allure --version
```

Se necessário:

```bash
npx allure generate allure-results --clean -o allure-report
```

---

# 38. Importante sobre o Allure no GitLab

Atualmente eu tenho:

```text
Allure Reporter
      ↓
allure-results
      ↓
GitLab Artifacts
```

Eu ainda não publiquei o relatório HTML do Allure como GitLab Pages.

Portanto, não devo confundir:

```text
allure-results
```

com:

```text
allure-report
```

O primeiro contém os resultados brutos.

O segundo é o relatório HTML gerado a partir deles.

---

# 39. Como baixar os resultados do GitLab

No GitLab:

```text
Build
  ↓
Pipelines
  ↓
Seleciono o pipeline
  ↓
Job
  ↓
Artifacts
```

Posso baixar os artefatos gerados.

Entre eles estarão:

```text
allure-results/
relatorio/
```

---

# 40. Como estudar uma execução que falhou

Quando um teste falhar, primeiro verifico:

```text
Pipeline
   ↓
Job
   ↓
Logs
```

Depois verifico:

```text
relatorio/
```

para encontrar os screenshots.

Também verifico os resultados:

```text
allure-results/
```

Se a execução foi no BrowserStack, também verifico os logs disponibilizados pela própria plataforma.

---

# 41. Se eu alterar o código de teste

Se eu alterar apenas:

```text
.feature
.js de Step Definition
Page Object
```

normalmente não preciso reconstruir o Docker.

Posso executar localmente:

```bash
npx wdio ...
```

ou fazer:

```bash
git add .
git commit -m "test: atualiza cenarios"
git push origin main
```

O GitHub disparará automaticamente o pipeline.

---

# 42. Se eu alterar dependências

Se eu alterar:

```text
package.json
```

eu também devo atualizar:

```text
package-lock.json
```

Utilizo:

```bash
npm install
```

ou a estratégia apropriada para a alteração.

Depois valido:

```bash
npm ci
```

E, se a imagem Docker depende dessas dependências, reconstruo a imagem:

```bash
docker build -t native-demo-app-automation:1.5 .
```

---

# 43. Se eu alterar o Dockerfile

Se eu alterar:

```text
Dockerfile
```

devo reconstruir a imagem.

Exemplo:

```bash
docker build -t native-demo-app-automation:1.5 .
```

Depois valido:

```bash
docker run --rm native-demo-app-automation:1.5 node --version
```

e:

```bash
docker run --rm native-demo-app-automation:1.5 npx wdio --version
```

---

# 44. Se eu alterar a configuração do BrowserStack

Se eu alterar:

```text
wdio.android.browserstack.conf.js
```

primeiro valido localmente, se possível.

Depois:

```bash
git status
```

```bash
git diff
```

```bash
git diff --check
```

Depois faço o commit:

```bash
git add .
git commit -m "ci: atualiza configuracao BrowserStack"
git push origin main
```

O webhook dispara o pipeline.

---

# 45. Se eu alterar o `.gitlab-ci.yml`

Esse arquivo possui uma particularidade importante na minha arquitetura.

Meu código principal está no GitHub, mas o pipeline é executado pelo GitLab.

Por isso, uma alteração no `.gitlab-ci.yml` precisa ser tratada com atenção.

Depois de alterar, valido localmente:

```bash
npx --yes yaml-lint .gitlab-ci.yml
```

Depois:

```bash
git diff --check
```

Depois:

```bash
git diff -- .gitlab-ci.yml
```

Só depois faço o commit:

```bash
git add .gitlab-ci.yml
git commit -m "ci: atualiza pipeline"
git push origin main
```

Também preciso garantir que a configuração utilizada pelo GitLab esteja atualizada.

---

# 46. Antes de fazer qualquer alteração importante

Minha sequência de segurança é:

```bash
git status
```

Depois:

```bash
git diff
```

Depois:

```bash
git diff --check
```

Se for configuração YAML:

```bash
npx --yes yaml-lint .gitlab-ci.yml
```

Só então:

```bash
git add .
git commit -m "..."
git push origin main
```

---

# 47. Como verificar se estou limpo antes de começar

Eu utilizo:

```bash
git status
```

O estado esperado é:

```text
nothing to commit, working tree clean
```

---

# 48. Como atualizar o projeto depois de um tempo

Quando volto ao projeto depois de alguns dias:

```bash
cd /c/projetos/native-demo-app-automation
```

Depois:

```bash
git checkout main
```

```bash
git fetch origin
```

```bash
git pull origin main
```

Depois:

```bash
npm ci
```

Se precisar trabalhar com Docker:

```bash
docker info
```

e:

```bash
docker images
```

---

# 49. Checklist rápido depois de ligar o computador

Minha rotina básica é:

```bash
cd /c/projetos/native-demo-app-automation
```

```bash
git status
```

```bash
node --version
```

```bash
npm --version
```

```bash
docker --version
```

```bash
docker info
```

```bash
npx wdio --version
```

```bash
npx appium --version
```

Se vou executar Android local:

```bash
adb devices
```

Se vou executar BrowserStack:

```bash
test -n "$BROWSERSTACK_USERNAME" && echo "BrowserStack username OK"
```

```bash
test -n "$BROWSERSTACK_ACCESS_KEY" && echo "BrowserStack access key OK"
```

```bash
test -n "$BROWSERSTACK_APP_ID" && echo "BrowserStack app ID OK"
```

---

# 50. Checklist para execução local

```text
[ ] Docker Desktop ligado, se for utilizar Docker
[ ] Node instalado
[ ] npm funcionando
[ ] node_modules disponível
[ ] Android disponível
[ ] ADB reconhecendo dispositivo/emulador
[ ] variáveis BrowserStack configuradas, se necessário
[ ] código atualizado
```

---

# 51. Checklist para execução BrowserStack

```text
[ ] Internet funcionando
[ ] BROWSERSTACK_USERNAME configurado
[ ] BROWSERSTACK_ACCESS_KEY configurado
[ ] BROWSERSTACK_APP_ID configurado
[ ] configuração BrowserStack válida
[ ] aplicativo disponível no BrowserStack
```

Execução:

```bash
npx wdio wdio.android.browserstack.conf.js
```

---

# 52. Checklist para execução via GitLab

```text
[ ] código atualizado no GitHub
[ ] webhook ativo
[ ] GitLab acessível
[ ] pipeline configurado
[ ] variáveis do BrowserStack configuradas no GitLab
```

Execução automática:

```text
git push origin main
```

Execução manual:

```text
GitLab
→ Build
→ Pipelines
→ New pipeline
→ main
→ Run pipeline
```

---

# 53. Fluxo completo que eu construí

Minha arquitetura final pode ser representada assim:

```text
                    ┌──────────────────┐
                    │     GitHub       │
                    │ código principal │
                    └────────┬─────────┘
                             │
                         git push
                             │
                             ▼
                    ┌──────────────────┐
                    │     Webhook      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     GitLab       │
                    │      CI/CD       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  GitLab Runner   │
                    │   Node 24        │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │    WebdriverIO  │
                    └────────┬────────┘
                             │
                         Appium
                             │
                             ▼
                    ┌──────────────────┐
                    │   BrowserStack   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Samsung Galaxy   │
                    │ Android 12       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Native Demo App  │
                    └────────┬─────────┘
                             │
                             ▼
                 ┌────────────────────────┐
                 │ Screenshots + Allure   │
                 └────────────┬───────────┘
                              │
                              ▼
                     GitLab Artifacts
```

---

# 54. Arquitetura Docker separada

Minha arquitetura Docker local é:

```text
              Docker Desktop
                    │
                    ▼
        native-demo-app-automation
                    │
        ┌───────────┴───────────┐
        │                       │
     Node 24                npm ci
        │
        ├── WebdriverIO
        ├── Appium
        ├── Cucumber
        └── Testes
                    │
                    ▼
               BrowserStack
                    │
                    ▼
              Android real
```

O Docker não possui um emulador Android.

---

# 55. Estado atual do projeto

Atualmente considero concluídas:

```text
[OK] WebdriverIO
[OK] Appium
[OK] Cucumber
[OK] Page Object
[OK] Login
[OK] Cadastro
[OK] Forms
[OK] 10 cenários automatizados
[OK] Android
[OK] BrowserStack
[OK] Samsung Galaxy S22
[OK] Android 12
[OK] Screenshots
[OK] Allure Reporter
[OK] Allure results
[OK] Docker
[OK] GitHub
[OK] GitLab
[OK] Webhook
[OK] Pipeline automático
[OK] Pipeline manual
[OK] GitLab artifacts
[OK] Documentação da jornada
```

Ainda não considero concluído:

```text
[ ] Execução efetiva dos testes em iOS
[ ] Publicação do Allure HTML através do GitLab Pages
```

Esses itens não devem ser apresentados como funcionalidades já validadas.

---

# 56. Comandos principais — resumo

## Entrar no projeto

```bash
cd /c/projetos/native-demo-app-automation
```

## Verificar Git

```bash
git status
```

## Atualizar código

```bash
git pull origin main
```

## Instalar dependências

```bash
npm ci
```

## WebdriverIO

```bash
npx wdio --version
```

## Appium

```bash
npx appium --version
```

## Android

```bash
adb devices
```

## BrowserStack

```bash
npx wdio wdio.android.browserstack.conf.js
```

## Allure

```bash
npx allure generate allure-results --clean -o allure-report
```

```bash
npx allure open allure-report
```

## Docker

```bash
docker info
```

```bash
docker images
```

```bash
docker build -t native-demo-app-automation:1.5 .
```

```bash
docker run --rm native-demo-app-automation:1.5 node --version
```

## Validar YAML

```bash
npx --yes yaml-lint .gitlab-ci.yml
```

## Validar alterações

```bash
git diff --check
```

## Commit

```bash
git add .
git commit -m "descricao da alteracao"
```

## Push

```bash
git push origin main
```

---

# 57. Minha regra para manutenção

Sempre que eu modificar alguma parte importante do projeto, sigo esta sequência:

```text
1. Alterar
   ↓
2. Executar localmente
   ↓
3. Verificar resultado
   ↓
4. Verificar git diff
   ↓
5. Validar configuração
   ↓
6. Commit
   ↓
7. Push
   ↓
8. GitHub dispara webhook
   ↓
9. GitLab executa pipeline
   ↓
10. Conferir resultado
   ↓
11. Atualizar documentação
```

Eu evito alterar várias partes diferentes ao mesmo tempo sem validar cada etapa.

---

# 58. Minha estratégia de evolução

Quando eu adicionar novos cenários, primeiro valido exploratoriamente o comportamento da aplicação.

Depois documento o cenário validado.

Depois implemento:

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
Execução local
   ↓
Execução BrowserStack
   ↓
Evidências
   ↓
Documentação
```

Isso mantém a rastreabilidade entre o comportamento esperado e a automação.

---

# 59. Por que construí a solução dessa maneira

Eu não quis apenas fazer os testes passarem.

Minha intenção foi construir uma solução que demonstrasse:

* organização de automação;
* separação de responsabilidades;
* preocupação com evidências;
* execução reproduzível;
* integração contínua;
* rastreabilidade;
* execução em dispositivo real;
* documentação;
* possibilidade de manutenção.

Por isso escolhi separar:

```text
Código
GitHub
CI/CD
Docker
BrowserStack
Relatórios
Documentação
```

Cada componente possui uma responsabilidade clara.

---

# 60. Minha visão final do projeto

Hoje eu consigo olhar para o projeto como uma cadeia completa:

```text
Eu desenvolvo
      ↓
GitHub armazena
      ↓
Webhook comunica
      ↓
GitLab executa
      ↓
Runner prepara ambiente
      ↓
WebdriverIO controla automação
      ↓
Appium fornece automação mobile
      ↓
BrowserStack fornece dispositivo real
      ↓
Testes validam o aplicativo
      ↓
Screenshots registram evidências
      ↓
Allure registra resultados
      ↓
GitLab armazena artefatos
```

Essa é a arquitetura que construí e validei nesta etapa.

O objetivo desta documentação é permitir que eu consiga voltar ao projeto depois de um período sem depender da memória de cada configuração feita anteriormente.
