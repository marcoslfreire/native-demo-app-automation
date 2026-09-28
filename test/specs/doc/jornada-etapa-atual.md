# Jornada da Etapa Atual — Mobile QA Automation

## 1. Objetivo desta etapa

Esta etapa teve como objetivo estruturar, validar e documentar uma estratégia completa de execução do projeto de automação mobile, contemplando:

* automação dos cenários funcionais;
* organização com Page Object;
* execução Android;
* execução em dispositivo real através do BrowserStack;
* geração de screenshots;
* geração dos resultados do Allure;
* persistência dos artefatos no GitLab CI/CD;
* integração GitHub → GitLab através de webhook;
* execução automática por commit;
* execução manual pelo GitLab;
* containerização do ambiente com Docker;
* documentação das decisões técnicas e dos cenários exploratórios.

O objetivo foi manter a implementação reproduzível e demonstrável, sem introduzir tecnologias que não fossem necessárias ao desafio.

---

# 2. Estado final da etapa

## Automação

* [OK] WebdriverIO configurado
* [OK] Appium configurado
* [OK] Cucumber configurado
* [OK] Page Object implementado
* [OK] Cenários de Login automatizados
* [OK] Cenários de Cadastro automatizados
* [OK] Cenários de Forms automatizados
* [OK] 10 cenários Gherkin implementados
* [OK] 47 steps executados com sucesso na execução validada

## Android

* [OK] Execução Android local validada
* [OK] Configuração UiAutomator2
* [OK] Execução Android no BrowserStack
* [OK] Samsung Galaxy S22
* [OK] Android 12.0
* [OK] Sessão real no BrowserStack validada

## Relatórios e evidências

* [OK] Allure Reporter configurado
* [OK] `allure-results/` gerado durante a execução
* [OK] Screenshots automáticos por step
* [OK] Screenshots organizados por feature/cenário/step
* [OK] Screenshots de falha configurados
* [OK] Artefatos enviados pelo GitLab CI
* [OK] Retenção dos artefatos configurada para 7 dias

> Observação: o Allure está configurado como reporter e seus resultados são armazenados como artefatos do GitLab. O projeto ainda não possui Allure Report HTML publicado via GitLab Pages.

---

# 3. Cenários automatizados

O projeto possui três arquivos `.feature`:

```text
test/features/
├── forms.feature
├── login.feature
└── signup.feature
```

Quantidade de cenários:

| Feature   | Cenários |
| --------- | -------: |
| Forms     |        4 |
| Login     |        2 |
| Signup    |        4 |
| **Total** |   **10** |

Na execução validada no BrowserStack:

```text
forms.feature  → 13 steps passando
login.feature  → 10 steps passando
signup.feature → 24 steps passando

Total → 47 steps passando
```

Importante: **47 corresponde à quantidade de steps executados com sucesso, não à quantidade de cenários.**

---

# 4. Organização do projeto

A automação foi organizada separando responsabilidades:

```text
test/
├── exploration-signup.js
│
├── features/
│   ├── forms.feature
│   ├── login.feature
│   └── signup.feature
│
├── pages/
│   ├── FormsPage.js
│   ├── LoginPage.js
│   └── SignUpPage.js
│
├── specs/
│   ├── login.spec.js
│   ├── signup-page.spec.js
│   └── doc/
│       ├── ADR-001-estrategia-containerizacao.md
│       ├── cenarios-exploratorios-validados.md
│       ├── execucao.md
│       └── jornada-etapa-atual.md
│
└── step-definitions/
    ├── common.steps.js
    ├── forms.steps.js
    ├── login.steps.js
    └── signup.steps.js
```

A separação adotada permite manter:

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
Aplicativo
```

---

# 5. Estratégia de screenshots

Foi implementada captura automática após cada step do Cucumber.

A estrutura gerada segue o padrão:

```text
relatorio/
└── DD-MM-YYYY/
    └── executado-as-HHmm/
        ├── forms/
        │   └── nome-do-cenario/
        │       ├── 01-step.png
        │       ├── 02-step.png
        │       └── ...
        │
        ├── login/
        │   └── nome-do-cenario/
        │
        └── signup/
            └── nome-do-cenario/
```

O formato do horário utiliza `HHmm` porque o Windows não permite `:` em nomes de diretórios.

Além das capturas por step, existe tratamento específico para falhas.

---

# 6. Allure

O Allure foi integrado ao WebdriverIO:

```text
WebdriverIO
    ↓
Allure Reporter
    ↓
allure-results/
```

O diretório `allure-results/` é preservado pelo GitLab CI como artefato.

Atualmente a solução não publica automaticamente o relatório HTML do Allure em uma página do GitLab.

Isso foi mantido dessa forma porque o objetivo desta etapa foi garantir primeiro:

1. geração dos resultados;
2. preservação dos artefatos;
3. rastreabilidade da execução;
4. estabilidade do pipeline.

A publicação do Allure HTML via GitLab Pages pode ser adicionada futuramente como melhoria independente.

---

# 7. Docker

O Docker foi introduzido para padronizar o ambiente de execução do projeto.

O Dockerfile utiliza:

```text
node:24-bookworm
```

e instala as dependências através de:

```bash
npm ci
```

A imagem atual validada foi:

```text
native-demo-app-automation:1.4
```

O Docker contém o ambiente Node/WebdriverIO/Appium necessário para executar o projeto.

Entretanto, o container **não contém um emulador Android**.

A arquitetura utilizada é:

```text
Docker
   ↓
Node.js
WebdriverIO
Appium
   ↓
BrowserStack
   ↓
Samsung Galaxy S22
Android 12
```

O APK não é incorporado à imagem Docker porque o arquivo é grande e a execução BrowserStack utiliza o aplicativo previamente disponibilizado na plataforma.

Segredos também não são incorporados à imagem.

---

# 8. Integração GitHub → GitLab

O GitHub permanece como repositório principal do projeto.

```text
GitHub
  │
  │ Push
  ▼
Webhook
  │
  ▼
GitLab Pipeline
  │
  ▼
GitLab Runner
```

O webhook envia o evento para o GitLab através de um pipeline trigger.

Quando o pipeline é originado pelo webhook, o SHA enviado pelo GitHub é extraído do payload:

```text
TRIGGER_PAYLOAD
      ↓
GitHub SHA
      ↓
git checkout <SHA>
      ↓
Execução
```

Isso garante que o pipeline execute exatamente o commit que originou o evento.

---

# 9. Execução automática

O fluxo automático validado é:

```text
1. Alteração no projeto
        ↓
2. Commit no GitHub
        ↓
3. Push para main
        ↓
4. GitHub dispara webhook
        ↓
5. GitLab recebe o trigger
        ↓
6. GitLab identifica o SHA do GitHub
        ↓
7. GitLab clona o repositório GitHub
        ↓
8. GitLab faz checkout do SHA recebido
        ↓
9. Validação do projeto
        ↓
10. Execução WebdriverIO
        ↓
11. BrowserStack
        ↓
12. Android real
        ↓
13. Resultados + screenshots
        ↓
14. Artefatos no GitLab
```

Esse fluxo foi executado e validado com sucesso.

---

# 10. Execução manual pelo GitLab

Também foi adicionada a possibilidade de iniciar o pipeline manualmente através do GitLab.

O `.gitlab-ci.yml` agora aceita:

```yaml
rules:
  - if: '$CI_PIPELINE_SOURCE == "trigger"'
  - if: '$CI_PIPELINE_SOURCE == "web"'
```

Os dois modos possuem comportamentos diferentes.

### Pipeline automático

Quando:

```text
CI_PIPELINE_SOURCE=trigger
```

o pipeline utiliza o SHA recebido pelo webhook.

### Pipeline manual

Quando:

```text
CI_PIPELINE_SOURCE=web
```

o pipeline consulta a branch `main` do GitHub:

```bash
git ls-remote "$GITHUB_REPOSITORY_URL" refs/heads/main
```

Depois clona o repositório e executa o SHA encontrado.

Dessa forma, o GitHub continua sendo a fonte principal do código mesmo quando a execução é iniciada manualmente pelo GitLab.

---

# 11. Estrutura do pipeline

O pipeline possui duas etapas:

```text
validate
   ↓
test
```

### `validate_project`

Responsável por:

* identificar o commit;
* clonar o GitHub;
* fazer checkout do commit;
* instalar dependências;
* verificar versões;
* verificar estrutura do projeto;
* verificar configurações necessárias.

São validados, entre outros:

```text
wdio.base.conf.js
wdio.android.browserstack.conf.js
Dockerfile
.dockerignore
test/features
test/step-definitions
test/pages
```

### `test_android_browserstack`

Responsável pela execução real:

```bash
npx wdio wdio.android.browserstack.conf.js
```

Os artefatos são preservados independentemente do resultado:

```yaml
artifacts:
  when: always
```

---

# 12. Execução real validada no GitLab

A execução de referência do pipeline apresentou:

```text
Node.js       24.21.0
npm           11.19.0
WebdriverIO   9.32.0
Appium        3.8.0
```

Ambiente móvel:

```text
Plataforma:       Android
Versão:           12.0
Dispositivo:      Samsung Galaxy S22
Automação:        UiAutomator2
Execução:         BrowserStack
```

Resultado:

```text
Spec Files: 3 passed, 3 total
Steps:      47 passed
Cenários:   10
Resultado:  100%
```

O pipeline também confirmou:

```text
Allure results gerados
Screenshots gerados
BrowserStack logs enviados
GitLab artifacts enviados
```

---

# 13. Rastreamento do commit

Na execução validada, o webhook enviou ao GitLab:

```text
c87ec1581b1eeb25c0ee3418c11d0e762284e63e
```

O pipeline clonou o GitHub e realizou checkout exatamente desse commit.

Isso validou uma preocupação importante da arquitetura:

> O pipeline não executa simplesmente o estado atual do GitLab. Ele recupera o commit originado no GitHub e executa exatamente esse código.

---

# 14. Estado do iOS

A configuração para iOS existe no projeto, porém a execução efetiva em iOS não foi validada nesta etapa.

Portanto:

```text
[OK] Configuração existente
[ ] Execução iOS efetivamente validada
```

Não deve ser apresentado o iOS como uma execução concluída.

---

# 15. Estado final da jornada

```text
[OK] Estrutura do projeto
[OK] Page Object
[OK] Cucumber
[OK] WebdriverIO
[OK] Appium
[OK] Automação Login
[OK] Automação Signup
[OK] Automação Forms
[OK] 10 cenários automatizados
[OK] Execução Android local
[OK] Execução Android BrowserStack
[OK] Samsung Galaxy S22 / Android 12
[OK] 47 steps passando
[OK] Screenshots automáticos
[OK] Allure Reporter
[OK] Allure results
[OK] Artefatos GitLab
[OK] Docker
[OK] GitHub → Webhook → GitLab
[OK] Validação do SHA do GitHub
[OK] Pipeline automático
[OK] Pipeline manual
[OK] Logs do BrowserStack
[OK] Documentação da estratégia
[OK] Documentação dos cenários exploratórios
[OK] Documentação da execução

[ ] Execução iOS efetivamente validada
[ ] Publicação do Allure HTML via GitLab Pages
```

---

# 16. Conclusão da etapa

A etapa atual foi concluída com uma cadeia de execução funcional e rastreável:

```text
GitHub
   ↓
Webhook
   ↓
GitLab CI/CD
   ↓
GitLab Runner
   ↓
Node 24
   ↓
WebdriverIO
   ↓
Appium / BrowserStack
   ↓
Samsung Galaxy S22
   ↓
Android 12
   ↓
10 cenários
   ↓
47 steps
   ↓
Screenshots + Allure
   ↓
GitLab Artifacts
```

A solução possui dois modos de acionamento:

```text
AUTOMÁTICO
GitHub Push → GitLab → BrowserStack

MANUAL
GitLab Run Pipeline → GitHub main → BrowserStack
```

A arquitetura foi mantida deliberadamente simples e alinhada ao objetivo do desafio. Docker foi utilizado para padronização do ambiente, enquanto o dispositivo móvel real permanece sob responsabilidade do BrowserStack.

O próximo incremento técnico, caso necessário, pode ser tratado separadamente, sem alterar a base atualmente validada:

* publicação do Allure HTML;
* validação efetiva do iOS;
* evolução da estratégia de CI/CD;
* novos cenários automatizados.
