# LevaAqui - Marketplace IMETRO

Plataforma digital para venda e compra de produtos entre estudantes do Instituto Superior Politécnico de Angola (IMETRO).

## 📁 Arquivos do Projeto

Este projeto contém 3 arquivos principais:

### 1. **index.html** 
Estrutura completa da página em HTML5 puro, incluindo:
- Header com navegação
- Hero section com estatísticas
- Sistema de tabs (Produtos/Vendedores)
- Seções de produtos, vendedores, localiza��ão e sobre
- Footer
- Modais para admin e páginas de vendedor

### 2. **styles.css**
Todos os estilos da plataforma em CSS3 puro, com:
- Design responsivo para mobile e desktop
- Paleta de cores azul e amarelo
- Animações e efeitos de hover
- Gradientes modernos
- Sistema de grid flexível

### 3. **script.js**
Toda a funcionalidade em JavaScript vanilla (sem frameworks), incluindo:
- Sistema de gerenciamento de produtos e vendedores
- Persistência de dados com LocalStorage
- Filtros por categoria e busca
- Painel administrativo completo
- Sistema de autenticação simples

## 🚀 Como Usar

### Instalação Rápida
1. Baixe os 3 arquivos (`index.html`, `styles.css`, `script.js`)
2. Coloque todos os arquivos na mesma pasta
3. Abra o arquivo `index.html` no navegador

**Pronto! O site está funcionando.**

### Estrutura de Pastas Recomendada
```
levaaqui/
├── index.html
├── styles.css
└── script.js
```

## 🔑 Acesso ao Painel Admin

Para acessar o painel administrativo:
1. Clique no botão "Admin" no header
2. Digite a senha: **admin123**
3. Você poderá:
   - Adicionar novos vendedores
   - Editar informações dos vendedores
   - Deletar vendedores
   - Gerenciar produtos (através da edição de vendedores)

## 🎨 Funcionalidades Principais

### Área Pública
- **Página Inicial**: Hero section com estatísticas e informações
- **Produtos**: Grade de produtos com filtros por categoria
- **Barra de Pesquisa**: Pesquisa por nome de produto ou vendedor
- **Vendedores**: Lista completa de vendedores com informações
- **Páginas de Vendedor**: Página individual para cada vendedor
- **Contatos Sociais**: WhatsApp, Instagram e Facebook
- **Localização**: Informações sobre a localização no campus
- **Sobre**: Informações sobre o projeto

### Painel Administrativo
- **Autenticação**: Sistema de login com senha
- **Gestão de Vendedores**: CRUD completo (Criar, Ler, Atualizar, Deletar)
- **Informações do Vendedor**:
  - Nome completo
  - Sala de aula
  - Foto (URL)
  - Horário de funcionamento
  - Classificação em estrelas
  - Especialidade
  - WhatsApp (opcional)
  - Instagram (opcional)
  - Facebook (opcional)

## 📱 Design Responsivo

O site é totalmente responsivo e funciona em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1280px+)

## 🎨 Paleta de Cores

- **Azul Principal**: #2563eb (Blue-600)
- **Azul Claro**: #3b82f6 (Blue-500)
- **Azul Escuro**: #1e40af (Blue-800)
- **Amarelo**: #fbbf24 (Yellow-400)
- **Amarelo Claro**: #fde047 (Yellow-300)
- **Branco**: #ffffff
- **Cinza**: #6b7280

## 💾 Armazenamento de Dados

Os dados são salvos automaticamente no **LocalStorage** do navegador:
- `levaaqui_vendors`: Lista de vendedores
- `levaaqui_products`: Lista de produtos

**Nota**: Os dados persistem mesmo após fechar o navegador, mas são locais ao dispositivo.

## 🔧 Customização

### Alterar a Senha do Admin
No arquivo `script.js`, linha 1157:
```javascript
if (password === 'admin123') {
    // Altere 'admin123' para sua senha desejada
}
```

### Adicionar Novas Categorias
No arquivo `script.js`, adicione na seção de categorias e no HTML.

### Alterar Cores
No arquivo `styles.css`, modifique as cores nas classes com gradientes e backgrounds.

## 📋 Dados de Exemplo

O sistema vem com dados de exemplo pré-carregados:
- 6 vendedores fictícios
- 12 produtos em diversas categorias
- Todas as categorias representadas (gelados, bebidas, salgados, doces, roupas, acessórios, diversos)

## 🌐 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos puros com Flexbox e Grid
- **JavaScript (ES6+)**: Funcionalidade nativa sem bibliotecas

## 📱 Navegação

### Links do Menu
- **Início**: Volta ao topo da página
- **Produtos**: Seção de produtos
- **Vendedores**: Lista de vendedores
- **Localização**: Informações de localização
- **Sobre**: Informações sobre o projeto
- **Admin**: Acesso ao painel administrativo

## ⚡ Performance

O site é extremamente leve:
- **0 dependências externas**
- **0 frameworks**
- **0 bibliotecas**
- Carregamento instantâneo

## 🔒 Segurança

**IMPORTANTE**: Este é um sistema de demonstração. Para uso em produção:
- Implemente autenticação real no backend
- Use HTTPS
- Adicione validação de dados no servidor
- Implemente rate limiting
- Use um banco de dados real

## 📞 Suporte

Para dúvidas sobre o código:
1. Verifique os comentários nos arquivos
2. Leia este README completamente
3. Teste cada funcionalidade individualmente

## 📝 Licença

Projeto desenvolvido para o Instituto Superior Politécnico de Angola (IMETRO).

---

**Desenvolvido com ❤️ para os estudantes do IMETRO**
