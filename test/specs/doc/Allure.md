# Colinha — Testes + Allure

## Quando criar ou alterar um cenário

Se quiser gerar um relatório Allure **limpo, somente com a execução atual**, siga esta ordem.

### 1. Entrar no projeto

```bash
cd /c/projetos/native-demo-app-automation
```

### 2. Limpar resultados anteriores

```bash
rm -rf allure-results allure-report
```

### 3. Executar os testes

```bash
npx wdio run wdio.android.conf.js
```

Aguarde a execução terminar e confirme o resultado.

### 4. Gerar o relatório Allure

```bash
npx allure generate allure-results --clean -o allure-report
```

Resultado esperado:

```text
Report successfully generated to allure-report
```

### 5. Abrir o relatório

```bash
npx allure open allure-report
```

## Resumo

```text
Criar/alterar cenário
        ↓
rm -rf allure-results allure-report
        ↓
npx wdio run wdio.android.conf.js
        ↓
npx allure generate allure-results --clean -o allure-report
        ↓
npx allure open allure-report
```

### Regra prática

Use a limpeza quando quiser que o Allure mostre **somente a execução atual**.

```bash
rm -rf allure-results allure-report
```

Depois execute os testes novamente.
