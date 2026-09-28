# CI/CD — Integração GitHub → Webhook → GitLab

## 1. Objetivo

Esta etapa teve como objetivo implementar e validar uma integração de CI/CD para o projeto de automação mobile.

A arquitetura adotada utiliza:

* **GitHub** como repositório principal do código-fonte;
* **GitHub Webhook** como mecanismo de notificação de novos pushes;
* **GitLab CI/CD** como executor do pipeline;
* **Node.js 24** como ambiente de execução do pipeline;
* **npm** para instalação das dependências;
* **WebdriverIO** e **Appium** para validação das ferramentas de automação;
* validações estruturais para garantir que os principais componentes do projeto estejam presentes.

O objetivo desta etapa não foi executar os testes mobile no runner do GitLab, mas estabelecer e validar o mecanismo automático de integração entre o repositório principal e o pipeline.

---

# 2. Contexto da arquitetura

O projeto possui o GitHub como repositório principal:

```text
GitHub
https://github.com/marcoslfreire/native-demo-app-automation
```

Também existe um projeto no GitLab utilizado para CI/CD.

A arquitetura final adotada foi:

```text
┌──────────────────────────────┐
│           GitHub             │
│                              │
│ Repositório principal        │
│ native-demo-app-automation   │
└──────────────┬───────────────┘
               │
               │ push
               ▼
┌──────────────────────────────┐
│       GitHub Webhook         │
│                              │
│ Envia evento para o GitLab   │
│ contendo o SHA do commit     │
└──────────────┬───────────────┘
               │
               │ trigger
               ▼
┌──────────────────────────────┐
│          GitLab CI           │
│                              │
│ Pipeline automático          │
└──────────────┬───────────────┘
               │
               │ recebe SHA
               ▼
┌──────────────────────────────┐
│       GitHub Repository      │
│                              │
│ clone do repositório         │
│ checkout do SHA recebido     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Validação CI           │
│                              │
│ Node.js                      │
│ npm                          │
│ WebdriverIO                  │
│ Appium                       │
│ estrutura do projeto         │
│ Dockerfile                   │
│ .dockerignore                │
└──────────────────────────────┘
```

---

# 3. Por que GitHub e GitLab possuem papéis diferentes?

O GitHub permanece como a fonte principal do código.

O GitLab foi utilizado para atender à necessidade de CI/CD do desafio e executar o pipeline.

Não foi adotada uma estratégia de manter dois repositórios independentes sincronizados manualmente.

O fluxo implementado foi:

```text
GitHub = fonte do código
GitLab = executor do CI/CD
```

Dessa maneira, um push realizado no GitHub dispara automaticamente o pipeline no GitLab.

---

# 4. Problema encontrado durante a implementação

Inicialmente, o projeto do GitLab possuía uma cópia do repositório que não acompanhava automaticamente todas as alterações realizadas posteriormente no GitHub.

Isso criava um problema importante:

```text
GitHub
   │
   │ código atualizado
   ▼
GitLab
   │
   └── cópia potencialmente desatualizada
```

Nesse cenário, simplesmente executar o pipeline usando o conteúdo local do projeto GitLab não garantiria que o pipeline estivesse validando o código que acabou de ser enviado ao GitHub.

Era necessário estabelecer uma relação determinística:

```text
Push no GitHub
      ↓
SHA do commit
      ↓
GitLab recebe o SHA
      ↓
GitLab clona o GitHub
      ↓
GitLab faz checkout exatamente daquele SHA
      ↓
Pipeline valida aquele código
```

Essa foi a solução adotada.

---

# 5. GitHub Webhook

Foi configurado um webhook no GitHub para eventos de push.

O webhook possui como finalidade disparar o pipeline do GitLab sempre que houver um novo commit no branch monitorado.

O fluxo é:

```text
git push
    ↓
GitHub registra o novo commit
    ↓
GitHub dispara o webhook
    ↓
GitLab recebe a requisição
    ↓
GitLab cria um pipeline de trigger
```

O payload enviado pelo GitHub contém informações sobre o evento, incluindo o SHA do commit.

O pipeline utiliza esse SHA para identificar exatamente qual versão do projeto deve ser validada.

---

# 6. Uso do SHA do commit

A informação mais importante recebida pelo pipeline é o SHA do commit.

No pipeline foi implementada a leitura do payload do webhook:

```bash
GITHUB_SHA=$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.env.TRIGGER_PAYLOAD, 'utf8')); console.log(p.after)")
```

O valor é então armazenado na variável:

```text
GITHUB_SHA
```

Em seguida, o pipeline clona o repositório:

```bash
git clone "$GITHUB_REPOSITORY_URL" github-source
```

Depois entra no diretório:

```bash
cd github-source
```

E executa:

```bash
git checkout "$GITHUB_SHA"
```

Dessa forma, o pipeline não depende simplesmente da versão atual do branch.

Ele valida exatamente o commit informado pelo webhook.

---

# 7. Validação do SHA recebido

Durante a execução do pipeline foi utilizado um commit de teste:

```text
db246c0fdec44145656b95a2983504988036a0cb
```

O log do GitLab confirmou:

```text
Obtendo commit enviado pelo webhook do GitHub...

Commit do GitHub recebido:

db246c0fdec44145656b95a2983504988036a0cb
```

Esse resultado comprovou que:

1. o GitHub realizou o push;
2. o webhook foi acionado;
3. o GitLab recebeu o evento;
4. o payload ficou disponível no pipeline;
5. o SHA do commit foi extraído corretamente.

---

# 8. Configuração do GitLab CI

O pipeline foi configurado com uma única etapa:

```yaml
stages:
  - validate
```

A finalidade desta etapa é validar o ambiente e a estrutura necessária para a automação.

Foram definidas as seguintes variáveis:

```yaml
variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"
  GITHUB_REPOSITORY_URL: "https://github.com/marcoslfreire/native-demo-app-automation.git"
```

A variável `npm_config_cache` permite utilizar o cache do npm entre execuções.

A variável `GITHUB_REPOSITORY_URL` identifica o repositório que deve ser utilizado como fonte do código.

---

# 9. Ambiente utilizado pelo pipeline

O runner utiliza:

```yaml
image: node:24-bookworm
```

Portanto, a execução ocorre dentro de um ambiente baseado em Node.js 24 com Debian Bookworm.

Antes das validações são exibidas as versões das principais ferramentas:

```bash
node --version
npm --version
git --version
```

Isso facilita a identificação do ambiente utilizado pelo CI.

---

# 10. Instalação das dependências

Depois de obter o código correto do GitHub, o pipeline executa:

```bash
npm ci
```

O `npm ci` foi escolhido porque utiliza o `package-lock.json` para instalar as versões registradas das dependências.

Isso é importante para CI porque reduz diferenças entre:

```text
ambiente local
        ↓
ambiente do pipeline
```

A instalação também é adequada para ambientes automatizados e reproduzíveis.

---

# 11. Validação do WebdriverIO

O pipeline executa:

```bash
npx wdio --version
```

Na execução validada, o resultado foi:

```text
9.32.0
```

Portanto:

```text
WebdriverIO 9.32.0
```

foi corretamente instalado e disponibilizado no ambiente do CI.

---

# 12. Validação do Appium

O pipeline executa:

```bash
npx appium --version
```

O resultado validado foi:

```text
3.8.0
```

Portanto:

```text
Appium 3.8.0
```

está disponível no ambiente utilizado pelo pipeline.

---

# 13. Validação da estrutura do projeto

Além das ferramentas, o pipeline verifica a presença dos principais componentes do projeto.

### Configuração principal

```bash
test -f wdio.base.conf.js
```

Valida a existência da configuração base do WebdriverIO.

### Docker

```bash
test -f Dockerfile
```

Valida a presença do Dockerfile.

### Docker ignore

```bash
test -f .dockerignore
```

Valida a presença das regras de exclusão do contexto Docker.

### Features

```bash
test -d test/features
```

Valida o diretório dos arquivos Gherkin.

### Step Definitions

```bash
test -d test/step-definitions
```

Valida o diretório responsável pela implementação dos passos Gherkin.

### Page Objects

```bash
test -d test/pages
```

Valida a presença da camada Page Object.

---

# 14. Mensagem final da validação

Depois que todas as verificações são concluídas, o pipeline executa:

```bash
echo "Validacao da estrutura e das ferramentas concluida com sucesso."
```

O resultado observado foi:

```text
Validacao da estrutura e das ferramentas concluida com sucesso.
```

---

# 15. Cache do npm

Ao final da execução, o GitLab armazenou o cache do npm.

O log apresentou:

```text
.npm/: found 4055 matching artifact files and directories
```

e:

```text
Created cache
```

Isso confirma que o mecanismo de cache configurado no pipeline foi executado corretamente.

O cache tem como objetivo reduzir trabalho repetitivo entre execuções futuras.

---

# 16. Resultado final do pipeline

A execução terminou com:

```text
Job succeeded
```

Portanto, a integração foi validada de ponta a ponta.

O fluxo comprovado foi:

```text
GitHub Push
     │
     ▼
Webhook
     │
     ▼
GitLab Trigger Pipeline
     │
     ▼
Recebimento do TRIGGER_PAYLOAD
     │
     ▼
Extração do SHA
     │
     ▼
Clone do GitHub
     │
     ▼
Checkout do SHA recebido
     │
     ▼
npm ci
     │
     ▼
WebdriverIO 9.32.0
     │
     ▼
Appium 3.8.0
     │
     ▼
Validação da estrutura
     │
     ▼
Cache
     │
     ▼
Job succeeded
```

---

# 17. O que esta etapa comprova

A etapa comprova tecnicamente que o projeto possui uma integração funcional entre:

```text
GitHub
   +
Webhook
   +
GitLab CI/CD
```

Também comprova que o pipeline consegue:

* receber um evento originado no GitHub;
* identificar o commit enviado;
* obter o SHA do commit;
* clonar o repositório principal;
* selecionar exatamente o SHA recebido;
* instalar as dependências;
* executar comandos do projeto;
* verificar WebdriverIO;
* verificar Appium;
* verificar a estrutura da automação;
* utilizar cache do npm;
* finalizar com sucesso.

---

# 18. O que o pipeline ainda NÃO faz

É importante registrar essa diferença para evitar uma documentação incorreta.

O pipeline atual **não executa os testes mobile contra um dispositivo Android ou iOS**.

A validação atual é de:

```text
ambiente
+
dependências
+
ferramentas
+
estrutura
```

e não de:

```text
Appium
+
emulador/dispositivo
+
aplicativo mobile
+
execução dos 10 cenários
```

Isso ocorre porque o runner padrão do GitLab não possui automaticamente o ambiente Android/iOS utilizado durante o desenvolvimento local.

Também não foi adicionada uma execução automática via BrowserStack nesta etapa, para evitar transformar cada commit em uma execução remota que consuma recursos da conta.

A execução mobile já foi validada separadamente nos ambientes disponíveis no projeto.

---

# 19. Relação com Docker

O Docker possui uma função diferente do GitLab CI.

A arquitetura ficou:

```text
Docker
   │
   └── padroniza o ambiente da aplicação de testes

GitLab CI
   │
   └── automatiza validações após alterações no código

BrowserStack
   │
   └── fornece dispositivo real remoto quando utilizado
```

Portanto, Docker não substitui o CI/CD.

O Docker fornece um ambiente reproduzível.

O GitLab CI automatiza o processo.

O BrowserStack fornece infraestrutura de dispositivo real.

---

# 20. Decisão arquitetural

### Decisão

Manter:

```text
GitHub = repositório principal
GitLab = CI/CD
Webhook = integração entre os dois
```

### Motivo

O desafio solicita GitLab CI/CD, enquanto o projeto está mantido no GitHub.

A utilização do webhook permite cumprir essa necessidade sem transformar o GitLab em uma segunda fonte de verdade do código.

### Estratégia de sincronização

O pipeline recebe o SHA enviado pelo webhook e faz checkout explícito desse commit.

Isso fornece rastreabilidade:

```text
Commit no GitHub
        ↓
SHA
        ↓
Pipeline
        ↓
Mesmo SHA validado
```

---

# 21. Evidência da validação

A execução final utilizada para validar a integração apresentou:

```text
WebdriverIO: 9.32.0
Appium:      3.8.0

Estrutura:
- wdio.base.conf.js      OK
- Dockerfile              OK
- .dockerignore           OK
- test/features            OK
- test/step-definitions    OK
- test/pages               OK

Resultado:
Job succeeded
```

Commit utilizado na validação:

```text
db246c0fdec44145656b95a2983504988036a0cb
```

---

# 22. Estado da etapa

```text
[OK] GitHub como repositório principal
[OK] GitHub Webhook
[OK] GitLab Trigger Pipeline
[OK] Recebimento do payload
[OK] Extração do SHA
[OK] Clone do GitHub
[OK] Checkout do SHA recebido
[OK] Node.js 24
[OK] npm
[OK] npm ci
[OK] WebdriverIO 9.32.0
[OK] Appium 3.8.0
[OK] Validação do Dockerfile
[OK] Validação do .dockerignore
[OK] Validação das features
[OK] Validação dos step definitions
[OK] Validação dos Page Objects
[OK] Cache npm
[OK] Pipeline concluído com sucesso

[PARCIAL] Execução mobile automática dentro do GitLab CI
[PENDENTE] Execução efetiva no iOS
```

---

# 23. Próximas possibilidades

A evolução natural desta arquitetura poderá ser:

```text
GitHub
   ↓
Webhook
   ↓
GitLab CI
   ↓
Validação
   ↓
Execução mobile
   ↓
Allure
   ↓
Artefatos
```

Para isso será necessário disponibilizar ao runner uma infraestrutura de execução mobile, por exemplo:

* emulador Android no próprio runner;
* dispositivo Android remoto;
* BrowserStack;
* outro provedor de dispositivos.

Essa evolução não faz parte da validação atual e deve ser tratada como uma etapa separada.

---

# 24. Conclusão da etapa

A integração GitHub → Webhook → GitLab CI/CD foi implementada e validada com sucesso.

O ponto central da solução é que o pipeline não depende apenas da cópia existente no GitLab.

Ele recebe o SHA do commit originado no GitHub, clona o repositório principal e faz checkout exatamente desse commit antes de executar as validações.

Com isso, a etapa atual estabelece uma base de CI/CD rastreável e reproduzível para o projeto de automação mobile.

**Status: CONCLUÍDA**
