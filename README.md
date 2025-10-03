# PREÇO.BET - Landing Page

Landing page "Coming Soon" para a plataforma PREÇO.BET.

## 🚀 Como Hospedar no GitHub Pages

### 1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nome sugerido: `preco-bet-landing`
4. Marque como "Public"
5. Clique em "Create repository"

### 2. Upload dos Arquivos

#### Opção A: Via Interface Web

1. No repositório criado, clique em "uploading an existing file"
2. Arraste o arquivo `index.html` para a área de upload
3. Clique em "Commit changes"

#### Opção B: Via Git (Terminal)

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/preco-bet-landing.git
cd preco-bet-landing

# Copie o arquivo index.html para o repositório
cp /caminho/para/index.html .

# Commit e push
git add index.html
git commit -m "Add landing page"
git push origin main
```

### 3. Ativar GitHub Pages

1. No repositório, vá em "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main" e pasta "/ (root)"
5. Clique em "Save"

### 4. Acessar o Site

Após alguns minutos, seu site estará disponível em:
```
https://SEU_USUARIO.github.io/preco-bet-landing/
```

## 📝 Características

- ✅ **HTML puro** - Sem dependências externas
- ✅ **Responsivo** - Funciona em desktop e mobile
- ✅ **Rápido** - Carrega instantaneamente
- ✅ **SEO otimizado** - Meta tags configuradas
- ✅ **Design moderno** - Gradientes e animações CSS
- ✅ **Formulário de cadastro** - Para capturar emails

## 🎨 Personalização

### Alterar Cores

As cores principais estão definidas no CSS:
- Gradiente principal: `#667eea` e `#764ba2`
- Para alterar, busque por esses valores no arquivo `index.html`

### Adicionar Screenshots Reais

Substitua os placeholders por imagens reais:

1. Adicione suas imagens na mesma pasta do `index.html`
2. Substitua as divs `.screenshot-placeholder` por:

```html
<img src="screenshot1.png" alt="Descrição" style="width: 100%; height: 250px; object-fit: cover;">
```

### Integrar Formulário de Email

Para capturar emails reais, integre com serviços como:

- **Mailchimp**: [mailchimp.com](https://mailchimp.com)
- **ConvertKit**: [convertkit.com](https://convertkit.com)
- **EmailOctopus**: [emailoctopus.com](https://emailoctopus.com)

Substitua a função `handleSubmit()` pelo código fornecido pelo serviço.

## 🔧 Manutenção

### Atualizar Conteúdo

Edite o arquivo `index.html` diretamente e faça commit:

```bash
git add index.html
git commit -m "Update content"
git push origin main
```

As mudanças aparecerão no site em alguns minutos.

## 📱 Domínio Personalizado

Para usar um domínio próprio (ex: preco.bet):

1. No GitHub Pages settings, adicione seu domínio em "Custom domain"
2. No seu provedor de DNS, adicione um registro CNAME apontando para:
   ```
   SEU_USUARIO.github.io
   ```

## 🌐 Alternativas ao GitHub Pages

Você também pode hospedar em:

- **Netlify**: Arraste e solte o arquivo HTML
- **Vercel**: Deploy automático via Git
- **Cloudflare Pages**: Rápido e com CDN global
- **Firebase Hosting**: Integração com Google

## 📄 Licença

Este arquivo é parte do projeto PREÇO.BET.
