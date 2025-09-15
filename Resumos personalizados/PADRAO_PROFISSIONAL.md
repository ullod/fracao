# 📋 Padrão Profissional - Banca Exata

## 🎨 Identidade Visual

### Paleta de Cores
```css
/* Cores Principais */
--primary-color: #fac95f;      /* Amarelo principal - Destaque e CTAs */
--secondary-color: #00bf63;    /* Verde - Sucesso e confirmações */
--accent-color: #b3d8dd;       /* Azul claro - Elementos suaves */
--tertiary-color: #f0c36f;     /* Amarelo claro - Variações e hover */

/* Cores Neutras */
--dark-color: #2c3e50;         /* Textos principais */
--light-color: #ecf0f1;        /* Backgrounds claros */
--white: #ffffff;              /* Fundo principal */
--gray-light: #f8f9fa;         /* Seções alternadas */
--gray-medium: #6c757d;        /* Textos secundários */
--gray-dark: #495057;          /* Textos de apoio */
```

### Gradientes
```css
--gradient-primary: linear-gradient(135deg, #fac95f 0%, #f0c36f 100%);
--gradient-secondary: linear-gradient(135deg, #00bf63 0%, #00a055 100%);
--gradient-accent: linear-gradient(135deg, #b3d8dd 0%, #9bc5ca 100%);
```

## 📝 Tipografia

### Fonte Principal
- **Família:** Inter (Google Fonts)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Pesos de Fonte
```css
--font-weight-light: 300;      /* Textos delicados */
--font-weight-normal: 400;     /* Texto padrão */
--font-weight-medium: 500;     /* Destaques suaves */
--font-weight-semibold: 600;   /* Subtítulos */
--font-weight-bold: 700;       /* Títulos principais */
```

### Hierarquia Tipográfica
- **H1 (Hero):** clamp(2rem, 5vw, 3.5rem) - Bold
- **H2 (Seções):** clamp(1.8rem, 4vw, 2.5rem) - Bold
- **H3 (Cards):** 1.3rem - Semibold
- **H4 (Subtítulos):** 1.1rem - Semibold
- **Corpo:** 1rem - Normal
- **Pequeno:** 0.85rem - Medium

## 📐 Espaçamentos

### Sistema de Espaçamento
```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 1.5rem;    /* 24px */
--spacing-lg: 2rem;      /* 32px */
--spacing-xl: 3rem;      /* 48px */
--spacing-xxl: 4rem;     /* 64px */
```

### Aplicação
- **Entre seções:** var(--spacing-xxl)
- **Padding de cards:** var(--spacing-lg)
- **Gaps em grids:** var(--spacing-lg)
- **Margens pequenas:** var(--spacing-sm)
- **Espaçamentos internos:** var(--spacing-md)

## 🎯 Componentes

### 1. Header
```css
/* Características */
- Position: fixed
- Background: white com sombra sutil
- Altura: ~60px
- Logo: 40px altura
- Efeito scroll: backdrop blur
```

### 2. Hero Section
```css
/* Características */
- Background: gradient-primary
- Padding top: considera altura do header
- Texto: branco com text-shadow
- Botões: primário (branco) + secundário (outline)
```

### 3. Cards de Resumo
```css
/* Estrutura */
- Header: gradient-primary
- Conteúdo: fundo branco
- Hover: translateY(-4px)
- Border-radius: var(--border-radius-lg)
- Box-shadow: var(--shadow-md)
```

### 4. Cards de Questões
```css
/* Estrutura */
- Header: gradient-secondary
- Tags: background rgba com opacity
- Alternativas: hover com border colorida
- Feedback visual: cores de sucesso/erro
```

### 5. Botões
```css
/* Tipos */
.btn-primary: fundo branco, texto escuro
.btn-secondary: outline branco, hover preenchido
.btn-resposta: gradient-secondary

/* Estados */
- Hover: translateY(-2px) + sombra maior
- Efeito shine: pseudo-elemento com gradiente
```

## 🎨 Elementos Visuais

### Bordas e Raios
```css
--border-radius-sm: 8px;     /* Elementos pequenos */
--border-radius-md: 12px;    /* Botões e inputs */
--border-radius-lg: 16px;    /* Cards */
--border-radius-xl: 24px;    /* Elementos grandes */
```

### Sombras
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);      /* Sutil */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);    /* Padrão */
--shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.15);    /* Destaque */
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.1);    /* Flutuante */
```

### Transições
```css
--transition-fast: 0.2s ease;      /* Micro-interações */
--transition-normal: 0.3s ease;    /* Padrão */
--transition-slow: 0.5s ease;      /* Animações complexas */
```

## 📱 Responsividade

### Breakpoints
- **Mobile:** ≤ 480px
- **Tablet:** ≤ 768px
- **Desktop:** > 768px

### Adaptações Mobile
- Grid: 1 coluna
- Espaçamentos: reduzidos em 25%
- Botões: largura 100% (max 300px)
- Header: layout vertical
- Animações: reduzidas para performance

## 🎯 Padrões de Conteúdo

### Estrutura de Resumo Teórico
1. **Card Header** - Título com ícone
2. **Definição** - Conceito principal
3. **Formula Box** - Fórmulas destacadas
4. **Exemplo** - Aplicação prática
5. **Dica** - Informação adicional

### Estrutura de Questões
1. **Header** - Banca, cargo, ano + tags
2. **Enunciado** - Texto da questão
3. **Alternativas** - Radio buttons estilizados
4. **Botão Resposta** - Revelar gabarito
5. **Resolução** - Passos detalhados

### Cores por Tipo de Elemento
- **Definições:** Fundo accent-color
- **Fórmulas:** Fundo primary com baixa opacity
- **Exemplos:** Fundo secondary com baixa opacity
- **Dicas:** Fundo tertiary com baixa opacity
- **Correções:** Fundo tertiary com baixa opacity

## 🔧 Implementação Técnica

### CSS Personalizado
```css
/* Base sempre presente */
:root { /* variáveis CSS */ }
* { box-sizing: border-box; }
body { font-family: var(--font-primary); }

/* Componentes modulares */
.container { max-width: 1200px; margin: 0 auto; }
.btn { /* padrão de botões */ }
.card { /* padrão de cards */ }
```

### JavaScript Funcionalidades
- Scroll suave para navegação
- Interatividade das questões
- Feedback visual nas alternativas
- Animações no scroll
- Responsividade otimizada

### Acessibilidade
- ARIA labels em elementos interativos
- Navegação por teclado
- Contraste adequado (WCAG AA)
- Textos alternativos para imagens
- Foco visível em elementos

## 📋 Checklist de Implementação

### ✅ Estrutura Base
- [ ] HTML semântico
- [ ] Meta tags de viewport
- [ ] Fontes Google carregadas
- [ ] Ícones Font Awesome

### ✅ Estilização
- [ ] Variáveis CSS definidas
- [ ] Grid responsivo implementado
- [ ] Animações configuradas
- [ ] Estados de hover/focus

### ✅ Funcionalidades
- [ ] Navegação suave
- [ ] Interatividade das questões
- [ ] Feedback visual
- [ ] Otimizações mobile

### ✅ Conteúdo
- [ ] Resumo teórico completo
- [ ] Questões com gabarito
- [ ] Resolução passo a passo
- [ ] Informações de contato

## 🎨 Exemplos de Uso

### Novo Card de Resumo
```html
<div class="resumo-card">
    <div class="card-header">
        <h3><i class="fas fa-icon"></i> Título do Tópico</h3>
    </div>
    <div class="card-content">
        <p><strong>Definição:</strong> Conceito principal</p>
        <div class="formula-box">
            <p><strong>Fórmula:</strong> <span class="formula">x = y + z</span></p>
        </div>
        <div class="exemplo">
            <h4>Exemplo:</h4>
            <p>Aplicação prática</p>
        </div>
    </div>
</div>
```

### Nova Questão
```html
<div class="questao-card" data-questao="X">
    <div class="questao-header">
        <h3>Questão X - Banca (Cargo - Ano)</h3>
        <div class="questao-tags">
            <span class="tag">Tópico</span>
        </div>
    </div>
    <div class="questao-content">
        <p>Enunciado da questão...</p>
        <div class="alternativas">
            <!-- Radio buttons com alternativas -->
        </div>
        <button class="btn-resposta" onclick="mostrarResposta(X)">Ver Resposta</button>
        <div class="resposta-comentada" id="respostaX">
            <!-- Resolução detalhada -->
        </div>
    </div>
</div>
```

---

## 🎯 Resumo para Reutilização

**Copie este padrão para novos resumos:**

1. **Cores:** #fac95f, #00bf63, #b3d8dd, #f0c36f
2. **Fonte:** Inter (Google Fonts)
3. **Espaçamentos:** Sistema de 8px (0.5rem base)
4. **Cards:** Header colorido + conteúdo branco
5. **Botões:** Gradiente + hover com elevação
6. **Animações:** Suaves (0.3s ease)
7. **Responsivo:** Mobile-first approach

**Estrutura de arquivos:**
- `index.html` - Estrutura principal
- `styles.css` - Estilos com variáveis CSS
- `script.js` - Interatividade e funcionalidades
- `img/logo.png` - Logo da identidade

**Contato padrão:**
- WhatsApp: (79) 98128-7635
- Instagram: @banca_exata
