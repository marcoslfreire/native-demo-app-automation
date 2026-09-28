# Jornada da Etapa Atual

## Checkpoint do projeto

```text
[OK] Project created
[OK] WebdriverIO
[OK] Appium
[OK] Cucumber
[OK] Page Objects
[OK] 10 scenarios
[OK] Android local
[OK] Screenshots
[OK] Allure
[OK] BrowserStack
[OK] Android 12 / Samsung Galaxy S22
[OK] Remote execution validated
[OK] Docker
[OK] Dockerfile
[OK] .dockerignore
[OK] Docker image 1.4
[OK] Config validation inside Docker
[OK] Artifact persistence via volume
[OK] GitHub → Webhook → GitLab CI/CD
[OK] Automatic pipeline trigger
[OK] GitHub commit SHA received by GitLab
[OK] Exact GitHub commit validated by pipeline
[OK] CI environment and project structure validated
[ ] Automatic mobile test execution inside GitLab CI
[ ] Effective iOS execution
```

## Marco CI/CD concluído

Foi concluída a integração entre o repositório principal do projeto no GitHub e o GitLab CI/CD.

O fluxo validado foi:

```text
GitHub
   │
   │ push
   ▼
GitHub Webhook
   │
   │ trigger + payload
   ▼
GitLab CI/CD
   │
   ├── recebe o SHA do commit
   ├── clona o repositório GitHub
   ├── checkout do SHA recebido
   ├── executa npm ci
   ├── valida WebdriverIO
   ├── valida Appium
   ├── valida estrutura do projeto
   └── finaliza com sucesso
```

### Evidência da execução

O pipeline recebeu o commit:

```text
db246c0fdec44145656b95a2983504988036a0cb
```

A execução confirmou:

```text
WebdriverIO: 9.32.0
Appium:      3.8.0

wdio.base.conf.js:      OK
Dockerfile:             OK
.dockerignore:          OK
test/features:          OK
test/step-definitions:  OK
test/pages:             OK

Job succeeded
```

### Decisão arquitetural

O GitHub permanece como **fonte principal do código**.

O GitLab é utilizado como **executor do CI/CD**.

O webhook faz a ligação entre os dois ambientes.

O pipeline não utiliza simplesmente uma cópia potencialmente desatualizada do projeto no GitLab. O SHA recebido no evento do GitHub é utilizado para fazer checkout explícito do commit que originou o pipeline.

Dessa forma, existe rastreabilidade:

```text
Commit criado no GitHub
        ↓
SHA enviado pelo webhook
        ↓
Pipeline do GitLab
        ↓
Checkout do mesmo SHA
        ↓
Validação
```

## Limite atual do CI/CD

O pipeline atualmente valida o ambiente e a estrutura necessária para a automação.

Ele ainda **não executa os 10 cenários mobile automaticamente dentro do runner do GitLab**.

A execução mobile continua sendo realizada nos ambientes configurados para o projeto, incluindo a execução Android local e a execução remota validada anteriormente.

A execução mobile automática dentro do CI será tratada como uma etapa posterior, caso seja necessário disponibilizar um emulador Android, dispositivo remoto ou outro ambiente de execução ao runner.

## Estado da etapa

```text
CI/CD — INTEGRAÇÃO CONCLUÍDA

GitHub
  [OK]

Webhook
  [OK]

GitLab Pipeline
  [OK]

Recebimento do SHA
  [OK]

Checkout do commit correto
  [OK]

Validação das ferramentas
  [OK]

Validação da estrutura
  [OK]

Execução mobile automática no CI
  [PENDENTE]

iOS
  [PENDENTE]
```

Documento complementar:

```text
test/specs/doc/CI-CD-GitHub-GitLab.md
```

Este documento contém o detalhamento técnico da implementação e das decisões tomadas nesta etapa.
