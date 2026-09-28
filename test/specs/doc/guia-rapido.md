# Guia Rápido — Native Demo App Automation

Este é meu guia operacional para voltar ao projeto depois de desligar o computador e executar os testes novamente.

---

## 1. Entrar no projeto

```bash
cd /c/projetos/native-demo-app-automation
```

---

## 2. Verificar o ambiente

```bash
node --version
npm --version
git --version
docker --version
```

Também verifico o Docker:

```bash
docker info
```

Se apresentar erro relacionado ao Docker daemon, abro o Docker Desktop e aguardo ele iniciar.

---

## 3. Atualizar o código

```bash
git checkout main
git pull origin main
```

---

## 4. Instalar dependências

Se for uma máquina nova ou o `node_modules` não existir:

```bash
npm ci
```

---

# Execução local Android

## 5. Verificar Android

```bash
adb devices
```

Preciso ter um dispositivo/emulador disponível.

## 6. Executar os testes locais

Utilizo a configuração Android local disponível no projeto:

```bash
npx wdio <configuracao-android-local>
```

---

# Execução BrowserStack

## 7. Configurar as variáveis

Preciso ter:

```text
BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_ID
```

No Git Bash:

```bash
export BROWSERSTACK_USERNAME="..."
export BROWSERSTACK_ACCESS_KEY="..."
export BROWSERSTACK_APP_ID="..."
```

Não adiciono essas informações ao Git.

## 8. Executar

```bash
npx wdio wdio.android.browserstack.conf.js
```

O dispositivo utilizado na configuração validada é:

```text
Samsung Galaxy S22
Android 12
UiAutomator2
```

---

# Allure

## 9. Gerar relatório

Depois de uma execução:

```bash
npx allure generate allure-results --clean -o allure-report
```

## 10. Abrir relatório

```bash
npx allure open allure-report
```

---

# Docker

## 11. Verificar imagens

```bash
docker images
```

## 12. Construir nova imagem

Quando houver alteração no ambiente/dependências:

```bash
docker build -t native-demo-app-automation:1.5 .
```

## 13. Validar a imagem

```bash
docker run --rm native-demo-app-automation:1.5 node --version
```

```bash
docker run --rm native-demo-app-automation:1.5 npx wdio --version
```

## 14. Executar Docker com BrowserStack

```bash
docker run --rm \
  -e BROWSERSTACK_USERNAME="$BROWSERSTACK_USERNAME" \
  -e BROWSERSTACK_ACCESS_KEY="$BROWSERSTACK_ACCESS_KEY" \
  -e BROWSERSTACK_APP_ID="$BROWSERSTACK_APP_ID" \
  native-demo-app-automation:1.5
```

---

# GitLab

## 15. Execução automática

Faço:

```bash
git add .
git commit -m "descricao da alteracao"
git push origin main
```

O fluxo é:

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

## 16. Execução manual

No GitLab:

```text
Build
→ Pipelines
→ New pipeline
→ main
→ Run pipeline
```

---

# Evidências

Depois da execução, verifico:

```text
allure-results/
relatorio/
```

No GitLab também posso acessar os artefatos do Job.

---

# Checklist rápido

```text
[ ] Docker Desktop ligado
[ ] Projeto atualizado
[ ] npm ci executado quando necessário
[ ] Android disponível para execução local
[ ] BrowserStack configurado quando necessário
[ ] Testes executados
[ ] Screenshots verificados
[ ] Allure gerado
[ ] GitLab pipeline verificado
```
