
# 🚀 @cabrapi/sdk

## 📋 Visão geral

O `@cabrapi/sdk` fornece uma interface unificada e tipada para comunicação com os serviços da caBRAPI, suportando dois modos de autenticação:

| Modo | Ambiente | Emoji |
|------|----------|-------|
| **Público** (`public`) | Cliente (navegador) | 🌐 |
| **Privado** (`private`) | Servidor (Node.js) | 🔒 |

## 📦 Instalação

```bash
npm install @cabrapi/sdk
```

## 🎯 Modos de uso

### 🌐 Modo público (client-side)

> Ideal para SPAs, React, Vue, Angular e qualquer aplicação que rode no navegador.

```typescript
import { caBRAPI } from '@cabrapi/sdk';

const client = new caBRAPI({
  type: 'public',
  config: {} // Configuração vazia para modo público
});
```

### 🔒 Modo privado (server-side)

> Para operações seguras no backend com chave de API.

```typescript
import { caBRAPI } from '@cabrapi/sdk';

const client = new caBRAPI({
  type: 'private',
  config: {
    key: 'SUA_API_KEY' // 🔑 Sua chave de acesso
  }
});
```

### ☁️ CDN 

> Use diretamente no navegador sem ferramentas de build.

```html
<script type="module">
  import { caBRAPI } from 'https://cdn.jsdelivr.net/npm/@cabrapi/sdk/dist/index.js';
  
  const client = new caBRAPI({
    type: 'public',
    config: {}
  });
</script>
```

## ⚙️ Configuração

### Opções do cliente

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `type` | `'public' \| 'private'` | ✅ | Modo de autenticação |
| `config` | `PublicConfig \| PrivateConfig` | ✅ | Configurações específicas |

### 📂 Configuração pública (`public`)

| Propriedade | Tipo | Descrição |
|-------------|------|-------------|
| - | - | Nenhuma configuração necessária |

### 🔐 Configuração privada (`private`)

| Propriedade | Tipo | Descrição |
|-------------|------|-------------|
| `key` | `string` | 🔑 Chave da API para autenticação |

## 📌 Requisitos

| Ambiente | Versão |
|----------|--------|
| **Node.js** (modo privado) | `>= 18.x` |
| **Browsers** (modo público) | ES2020+ |
| **TypeScript** | Suporte nativo ✅ |

## 📞 Suporte

• 📚 Documentação: https://docs.cabrapi.com.br

• 🐛 Issues: https://github.com/cabrapi/sdk-node-browser/issues
