# ADR — Estratégia de Containerização do Ambiente de Automação Mobile

**Status:** Accepted

**Data:** 27/09/2026

**Decisão:** Containerizar o ambiente de execução dos testes de automação, mantendo o Android Emulator e o BrowserStack como ambientes externos ao container.

---

## 1. Contexto

O projeto utiliza automação de testes mobile baseada em:

* Node.js;
* WebdriverIO;
* Appium;
* Cucumber;
* Android Emulator para execução local;
* BrowserStack para execução em dispositivos/ambientes remotos;
* GitLab CI/CD como ambiente futuro de integração contínua.

Durante a evolução do projeto, foi identificada a necessidade de tornar o ambiente de execução dos testes mais previsível e reproduzível.

A execução depende de componentes como:

* versão do Node.js;
* versão do npm;
* versão do WebdriverIO;
* versão do Appium;
* dependências npm;
* configurações do projeto.

Além disso, o projeto deverá futuramente ser executado em um pipeline de CI/CD, tornando importante reduzir diferenças entre:

* ambiente local do desenvolvedor;
* ambiente utilizado para execução dos testes;
* ambiente do GitLab CI/CD.

A utilização de Docker foi analisada como mecanismo para padronizar esse ambiente.

Após a análise, a containerização foi implementada e validada no projeto.

---

## 2. Problema

Foi necessário definir qual parte da arquitetura deveria ser containerizada e quais componentes deveriam permanecer externos ao container.

As principais questões analisadas foram:

1. O que Docker resolve?
2. O que Docker não resolve?
3. Onde Docker entra na arquitetura?
4. Quais componentes fazem parte da imagem?
5. O Android Emulator deve ficar dentro ou fora do container?
6. Como o BrowserStack será acessado?
7. Como o mesmo ambiente poderá ser utilizado posteriormente pelo GitLab CI/CD?
8. Como controlar versões e dependências?
9. Como preservar relatórios e screenshots produzidos dentro do container?
10. Como fornecer credenciais sem gravá-las na imagem?

---

## 3. Decisão

Foi decidido utilizar Docker para **padronizar o ambiente de execução da automação de testes**.

A imagem Docker contém os componentes necessários para executar o projeto de automação, incluindo:

* Node.js;
* npm;
* código da automação;
* WebdriverIO;
* Appium e dependências relacionadas;
* Cucumber;
* demais dependências definidas pelo projeto;
* configurações necessárias para execução dos testes.

O `package-lock.json` é utilizado durante a instalação das dependências para aumentar a reprodutibilidade do ambiente.

A implementação atual utiliza:

```text
Node.js 24.21.0
npm 11.19.0
WebdriverIO 9.32.0
Appium 3.8.0
```

As versões acima foram verificadas no ambiente utilizado para a construção e validação da imagem.

### Android Emulator

O Android Emulator permanece fora do container.

Ele é tratado como infraestrutura externa para a execução Android local.

### BrowserStack

O BrowserStack permanece externo ao container.

O container executa a automação e se comunica com o BrowserStack pela rede.

Na configuração específica do BrowserStack, o serviço local de Appium definido na configuração base é substituído pelo serviço do BrowserStack.

Portanto, a execução BrowserStack não inicia um Appium local dentro do container.

### GitLab CI/CD

O GitLab CI/CD ainda não foi implementado.

A arquitetura Docker, entretanto, foi construída considerando sua utilização futura no pipeline.

---

## 4. Implementação realizada

A containerização deixou de ser apenas uma decisão arquitetural e foi efetivamente implementada.

Foram criados:

```text
Dockerfile
.dockerignore
```

A imagem foi construída utilizando:

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

O `npm ci` permite instalar as dependências de acordo com o lockfile versionado.

---

## 5. Imagem Docker

Durante a evolução da implementação foram criadas versões incrementais:

```text
native-demo-app-automation:1.1
native-demo-app-automation:1.2
native-demo-app-automation:1.3
native-demo-app-automation:1.4
```

A imagem correspondente ao estado atual deste ADR é:

```text
native-demo-app-automation:1.4
```

A imagem `1.4` foi construída com sucesso e validada.

Foi verificado que o container possui:

```text
Node.js 24.21.0
npm 11.19.0
Appium 3.8.0
WebdriverIO 9.32.0
```

---

## 6. Dockerfile

A implementação atual utiliza a seguinte estratégia:

```dockerfile
FROM node:24-bookworm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "test:android:browserstack"]
```

O Dockerfile possui duas características importantes.

Primeiro, o `package.json` e o `package-lock.json` são copiados antes do restante do projeto, permitindo melhor aproveitamento do cache das camadas Docker.

Segundo, as dependências são instaladas utilizando:

```text
npm ci
```

Isso evita depender do estado de `node_modules` da máquina host.

---

## 7. `.dockerignore`

Foi criado um `.dockerignore` para evitar o envio de arquivos desnecessários ou sensíveis para o contexto de build.

Entre os itens ignorados estão:

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

### Motivos principais

`node_modules`:

* não precisa ser enviado;
* as dependências são instaladas pelo `npm ci`.

`relatorio` e `allure-results`:

* são artefatos gerados durante as execuções;
* não fazem parte do código necessário para construir a imagem.

`apps`:

* contém o APK local;
* o APK não precisa ser incorporado à imagem para a execução BrowserStack atualmente utilizada.

`.env`:

* pode conter credenciais;
* não deve ser incorporado à imagem.

---

## 8. Segurança das credenciais

As credenciais do BrowserStack não são gravadas na imagem Docker.

São fornecidas durante a execução através de variáveis de ambiente.

As variáveis utilizadas atualmente são:

```text
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_ID
```

Foi realizada uma validação passando essas variáveis ao container através de um arquivo de ambiente.

O container conseguiu recebê-las sem que fossem incorporadas à imagem.

O `.env` permanece fora do contexto da imagem através do `.dockerignore`.

No futuro, em CI/CD, essas informações deverão ser fornecidas através dos mecanismos de secrets/variables do GitLab.

---

## 9. Arquitetura definida

A arquitetura implementada é:

```text
                    ┌─────────────────────────┐
                    │         Docker          │
                    │                         │
                    │ Node.js                 │
                    │ npm                     │
                    │ WebdriverIO             │
                    │ Appium                  │
                    │ Cucumber                │
                    │ Testes                  │
                    │ Dependências            │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          Android Emulator             BrowserStack
               local                       Cloud
```

O Docker representa a camada de padronização do ambiente de automação.

Os ambientes mobile permanecem desacoplados.

---

## 10. Execução Android local

Na execução local, o fluxo conceitual permanece:

```text
Docker / ambiente local
        ↓
WebdriverIO
        ↓
Appium
        ↓
Android Emulator
        ↓
Native Demo App
```

O Android Emulator não faz parte da imagem Docker.

A infraestrutura Android local continua sendo fornecida pelo ambiente host.

---

## 11. Execução BrowserStack

Na execução BrowserStack, o fluxo é:

```text
Docker
  ↓
WebdriverIO
  ↓
Cucumber
  ↓
BrowserStack
  ↓
Appium / infraestrutura BrowserStack
  ↓
Samsung Galaxy S22
Android 12
  ↓
Native Demo App
```

A configuração:

```text
wdio.android.browserstack.conf.js
```

utiliza:

```javascript
services: ['browserstack']
```

substituindo o serviço local:

```javascript
services: ['appium']
```

presente na configuração base.

Portanto, a execução BrowserStack não depende de um Appium local iniciado pelo container.

---

## 12. Validação do ambiente Docker

A imagem foi validada diretamente através do container.

Foram verificadas as versões:

```text
Node.js → 24.21.0
npm     → 11.19.0
Appium  → 3.8.0
WDIO    → 9.32.0
```

Também foi validada a execução da configuração `onPrepare()` dentro do container.

A validação produziu um diretório no formato:

```text
/app/relatorio/27-09-2026/executado-as-23h03
```

Isso confirmou que a lógica atual de organização das execuções também funciona dentro do ambiente Docker.

---

## 13. Persistência dos artefatos

Como o container possui filesystem próprio, os artefatos gerados durante a execução precisam ser persistidos através de volumes quando for necessário acessá-los no host.

Foi validada a utilização de bind mounts para:

```text
relatorio/
allure-results/
```

Conceitualmente:

```text
Host
 │
 ├── relatorio/
 │       ↕
 │   /app/relatorio
 │
 └── allure-results/
         ↕
     /app/allure-results
        Container
```

Essa estratégia permite manter screenshots e resultados produzidos dentro do container após o término da execução.

---

## 14. Organização dos relatórios

A implementação atual organiza os screenshots por:

1. data;
2. horário da execução;
3. feature;
4. cenário;
5. step.

Exemplo:

```text
relatorio/
└── 27-09-2026/
    └── executado-as-19h53/
        ├── forms/
        │   └── cenario/
        │       ├── 01-step.png
        │       └── 02-step.png
        ├── login/
        │   └── cenario/
        └── signup/
            └── cenario/
```

O diretório da execução é criado pelo hook:

```text
onPrepare()
```

e disponibilizado através de:

```javascript
process.env.REPORT_EXECUTION_DIR
```

O `afterStep()` utiliza essa referência para armazenar as evidências.

---

## 15. O que Docker resolve

A adoção do Docker resolve principalmente:

### 15.1 Reprodutibilidade

Permite definir um ambiente conhecido para execução da automação.

### 15.2 Padronização

Reduz diferenças entre máquinas com configurações diferentes.

### 15.3 Controle de versões

Permite controlar versões importantes do ambiente, incluindo:

* Node.js;
* npm;
* WebdriverIO;
* Appium;
* dependências npm.

### 15.4 Integração futura com CI/CD

A imagem poderá ser utilizada posteriormente como ambiente de execução no GitLab CI/CD.

### 15.5 Onboarding

Um novo integrante poderá utilizar a imagem como referência para reproduzir o ambiente de automação.

### 15.6 Separação de responsabilidades

O Docker passa a representar o ambiente da automação, enquanto o dispositivo/emulador mobile permanece como infraestrutura externa.

---

## 16. O que Docker não resolve

Docker não substitui:

* WebdriverIO;
* Appium;
* Android Emulator;
* BrowserStack;
* GitLab CI/CD;
* os testes automatizados;
* gerenciamento dos cenários;
* manutenção dos testes.

Docker também não garante, sozinho, estabilidade dos testes.

Problemas relacionados a:

* sincronização;
* seletores;
* comportamento da aplicação;
* disponibilidade de dispositivos;
* rede;
* serviços externos;

continuam existindo independentemente da utilização de Docker.

---

## 17. Android Emulator

O Android Emulator não será incluído inicialmente na imagem Docker.

### Motivo

Executar um Android Emulator dentro de um container adicionaria complexidade relacionada a:

* virtualização;
* aceleração de hardware;
* KVM;
* consumo de CPU e memória;
* permissões;
* configuração de rede;
* integração com o sistema operacional;
* execução em CI/CD.

Neste momento, essa complexidade não é necessária para o objetivo da containerização.

O emulator permanece como infraestrutura externa para execução Android local.

Essa decisão poderá ser revisada futuramente caso exista uma necessidade concreta de executar o emulator dentro do ambiente de CI.

---

## 18. BrowserStack

O BrowserStack permanece como serviço externo.

A comunicação ocorre conceitualmente através de:

```text
Docker
  │
  │ HTTPS / Internet
  ▼
BrowserStack
  │
  └── Ambiente mobile remoto
```

As credenciais são fornecidas em tempo de execução.

Nenhuma credencial deve ser incorporada à imagem.

---

## 19. GitLab CI/CD

O GitLab CI/CD ainda não foi implementado.

A arquitetura Docker foi construída considerando sua utilização futura.

O fluxo esperado é:

```text
Git push / Merge Request
          │
          ▼
     GitLab CI/CD
          │
          ▼
        Docker
          │
          ▼
  Testes WebdriverIO
          │
          ▼
     BrowserStack
          │
          ▼
       Resultado
```

A implementação futura deverá definir:

* quando executar os testes;
* quais testes executar;
* como fornecer credenciais;
* como armazenar screenshots;
* como publicar resultados Allure;
* como utilizar a imagem Docker;
* como controlar o consumo do BrowserStack.

---

## 20. Componentes controlados pela imagem

| Componente        | Estratégia                           |
| ----------------- | ------------------------------------ |
| Node.js           | Controlado pela imagem base          |
| npm               | Versão fornecida pelo ambiente Node  |
| WebdriverIO       | Dependência do projeto               |
| Appium            | Dependência do projeto               |
| Cucumber          | Dependência do projeto               |
| Dependências npm  | Controladas pelo `package-lock.json` |
| Código dos testes | Incluído na imagem                   |
| Configurações     | Versionadas no projeto               |
| Android Emulator  | Externo                              |
| BrowserStack      | Externo                              |
| GitLab CI/CD      | Externo                              |

---

## 21. Alternativas consideradas

### Alternativa A — Não utilizar Docker

Manter o ambiente totalmente dependente da máquina local.

**Desvantagens:**

* maior dependência da configuração de cada máquina;
* maior possibilidade de diferenças entre ambientes;
* menor padronização para CI/CD.

---

### Alternativa B — Colocar todo o ambiente mobile dentro do Docker

Incluir:

```text
Node.js
WebdriverIO
Appium
Android SDK
Android Emulator
```

**Desvantagens:**

* maior complexidade;
* maior consumo de recursos;
* problemas adicionais relacionados à virtualização;
* maior complexidade para execução local;
* maior complexidade para CI/CD.

Essa alternativa não será utilizada inicialmente.

---

### Alternativa C — Containerizar somente o ambiente de automação

Utilizar Docker para:

```text
Node.js
npm
WebdriverIO
Appium
Cucumber
dependências
testes
```

Mantendo:

```text
Android Emulator → externo
BrowserStack     → externo
GitLab CI/CD     → externo
```

**Decisão:** adotada e implementada.

---

## 22. Consequências positivas

A decisão proporciona:

* ambiente de execução mais previsível;
* maior reprodutibilidade;
* controle das versões;
* preparação para CI/CD;
* menor dependência da configuração individual da máquina;
* separação entre automação e infraestrutura mobile;
* possibilidade de reutilização da imagem no GitLab CI/CD;
* persistência controlada dos artefatos através de volumes.

---

## 23. Consequências negativas

Também existem custos:

* necessidade de manter o Dockerfile;
* necessidade de manter a imagem atualizada;
* necessidade de compreender volumes, rede e variáveis de ambiente;
* possíveis diferenças entre execução local e execução dentro do container;
* necessidade de administrar a comunicação entre container e infraestrutura mobile;
* aumento de uma camada na arquitetura do projeto.

---

## 24. Estado da implementação

Neste momento, a containerização encontra-se:

```text
[OK] Docker instalado
[OK] Dockerfile criado
[OK] .dockerignore criado
[OK] Dependências instaladas com npm ci
[OK] Imagem Docker construída
[OK] Imagem 1.4 validada
[OK] Node.js validado no container
[OK] npm validado no container
[OK] Appium validado no container
[OK] WebDriverIO validado no container
[OK] Variáveis BrowserStack validadas no container
[OK] Volumes para artefatos validados
[OK] Criação do diretório de execução validada no container
[OK] Estratégia BrowserStack validada anteriormente
[ ] GitLab CI/CD
[ ] Pipeline automática
[ ] Execução iOS efetiva
```

---

## 25. Limitação importante da validação atual

A imagem `native-demo-app-automation:1.4` foi validada quanto à configuração e ao ambiente do container.

A última execução completa validada no BrowserStack foi realizada anteriormente, utilizando a infraestrutura Docker já funcional.

As alterações posteriores de organização dos relatórios foram validadas sem realizar uma nova execução completa no BrowserStack.

Essa decisão foi tomada para evitar consumo desnecessário das execuções disponíveis enquanto eram realizadas alterações de infraestrutura que não dependiam do dispositivo remoto.

Portanto, este ADR não declara que a imagem `1.4` já realizou uma nova execução completa no BrowserStack.

---

## 26. Critério para revisão desta decisão

Esta arquitetura poderá ser revisada caso surja uma necessidade concreta de:

* executar Android Emulator dentro do CI;
* utilizar dispositivos físicos conectados ao ambiente Docker;
* executar múltiplos emuladores simultaneamente;
* reduzir significativamente o tempo de execução;
* criar uma infraestrutura mobile totalmente containerizada.

A revisão deverá ser baseada em uma necessidade técnica identificada.

---

## 27. Resultado da decisão

A arquitetura escolhida estabelece uma separação clara:

```text
┌─────────────────────────────────────────────┐
│                   Docker                    │
│                                             │
│ Node.js + npm                               │
│ WebdriverIO                                 │
│ Appium                                      │
│ Cucumber                                    │
│ Dependências                                │
│ Código dos testes                           │
└──────────────────────┬──────────────────────┘
                       │
              Comunicação externa
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
 Android Emulator             BrowserStack
      local                       cloud
```

O Docker é utilizado para **padronizar e reproduzir o ambiente de execução da automação**, enquanto os ambientes mobile permanecem desacoplados.

A containerização foi implementada e validada.

O próximo passo arquitetural previsto é a integração desse ambiente com o GitLab CI/CD, que permanece fora do escopo implementado neste checkpoint.
