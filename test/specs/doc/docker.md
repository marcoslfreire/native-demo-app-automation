# Docker — Manutenção e Execução da Imagem

## 1. Verificar se o Docker está funcionando

Depois de ligar o computador:

```bash
docker --version
```

```bash
docker info
```

Se os dois funcionarem, o Docker está pronto.

---

# 2. Quando preciso atualizar a imagem?

Preciso reconstruir a imagem quando alterar algo que faça parte do ambiente do container:

```text
Dockerfile
package.json
package-lock.json
.dockerignore
versão do Node.js
dependências
configurações do ambiente
```

Se alterar somente:

```text
.feature
Step Definition
Page Object
```

normalmente não preciso reconstruir a imagem.

---

# 3. Atualizar a imagem

Quando necessário:

```bash
docker build -t native-demo-app-automation:1.6 .
```

Depois verifico:

```bash
docker images
```

---

# 4. Validar a imagem

Node:

```bash
docker run --rm native-demo-app-automation:1.6 node --version
```

WebdriverIO:

```bash
docker run --rm native-demo-app-automation:1.6 npx wdio --version
```

Appium:

```bash
docker run --rm native-demo-app-automation:1.6 npx appium --version
```

---

# 5. Executar os testes pelo Docker

Este é o comando principal para demonstrar a execução pelo Docker:

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.6
```

O `Dockerfile` já possui:

```dockerfile
CMD ["npm", "run", "test:android:browserstack"]
```

Por isso, ao executar o container, ele inicia automaticamente:

```text
Docker
  ↓
Node.js
  ↓
npm
  ↓
WebdriverIO
  ↓
Appium
  ↓
BrowserStack
  ↓
Samsung Galaxy S22
  ↓
Native Demo App
  ↓
Testes
```

---

# 6. O que deve acontecer durante a execução

No terminal serão exibidos os logs do teste.

Ao final, devo conseguir verificar:

```text
cenários executados
steps executados
pass/fail
screenshots
Allure results
```

O container é removido automaticamente porque usamos:

```bash
--rm
```

---

# 7. Importante sobre o Android

O Docker **não executa o Android dentro do container**.

A arquitetura é:

```text
┌─────────────────────────────┐
│ Docker                      │
│                             │
│ Node.js                     │
│ WebdriverIO                 │
│ Appium                      │
│ Testes                      │
└──────────────┬──────────────┘
               │
               ▼
        BrowserStack
               │
               ▼
      Samsung Galaxy S22
        Android 12
```

O dispositivo Android real continua sendo fornecido pelo BrowserStack.

---

# 8. Se quiser mostrar a execução durante uma apresentação

A sequência pode ser:

### Verificar Docker

```bash
docker --version
```

### Verificar imagem

```bash
docker images
```

### Executar

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.6
```

Enquanto o comando estiver executando, os logs aparecerão no terminal.

No BrowserStack também será possível acompanhar a sessão do dispositivo.

---

# 9. Se eu alterar o ambiente

```text
Alteração
   ↓
docker build
   ↓
nova imagem
   ↓
docker images
   ↓
validar imagem
   ↓
docker run
   ↓
BrowserStack
   ↓
testes
```

---

# 10. Regra rápida

### Alterei somente o teste:

```text
Não precisa rebuildar.
```

### Alterei ambiente/dependências:

```text
Precisa rebuildar.
```

```bash
docker build -t native-demo-app-automation:1.6 .
```

### Quero demonstrar a execução pelo Docker:

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.6
```

---

# 11. Comandos principais

```bash
docker --version
```

```bash
docker info
```

```bash
docker images
```

```bash
docker build -t native-demo-app-automation:1.6 .
```

```bash
docker run --rm native-demo-app-automation:1.6 node --version
```

```bash
docker run --rm native-demo-app-automation:1.6 npx wdio --version
```

```bash
docker run --rm native-demo-app-automation:1.6 npx appium --version
```

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.6
```

## Regra principal

> **Mudou o ambiente → atualiza a imagem.**
>
> **Mudou somente o teste → normalmente não precisa atualizar a imagem.**
>
> **Quer executar pelo Docker → `docker run` inicia o ambiente e executa os testes.**
