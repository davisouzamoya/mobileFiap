
# AstraMentor Mobile 📱

<div align="center">
  <img src="assets/logo.png" alt="AstraMentor Logo" width="200"/>

  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
</div>

## 📋 Visão Geral

O AstraMentor Mobile é uma plataforma educacional inovadora que conecta professores e alunos, facilitando o processo de ensino-aprendizado através de uma interface moderna e intuitiva. Desenvolvido como projeto de pós-graduação, o aplicativo demonstra as melhores práticas de desenvolvimento mobile com React Native e Expo.

## 🚀 Stack Tecnológica

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React Native, Expo, TypeScript |
| **Backend** | Supabase (Auth, Database, Storage) |
| **Estilização** | Styled Components, React Native Paper |
| **Navegação** | React Navigation v6 |
| **Gerenciamento de Estado** | Context API, React Query |
| **Formulários** | React Hook Form, Yup |
| **Testes** | Jest, React Native Testing Library |
| **Linting/Formatting** | ESLint, Prettier |
| **CI/CD** | GitHub Actions |

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── common/
│   └── layout/
├── screens/
│   ├── auth/
│   ├── home/
│   └── profile/
├── navigation/
├── services/
├── hooks/
├── contexts/
├── utils/
├── styles/
├── assets/
└── types/
```

## ✨ Funcionalidades Implementadas

- 🔐 **Autenticação**
- 🎯 **Navegação**
- 👤 **Perfil**
- 📚 **Conteúdo Educacional**



## 🔌 Integrações Supabase

### Autenticação
- JWT, sessões, políticas

### Banco de Dados
- Relacional, real-time


## 📦 Scripts Disponíveis

```bash
npm install
npm start
```

## 🛠️ Variáveis de Ambiente

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
APP_ENV=development
```

## 🧩 Arquitetura Técnica

```mermaid
flowchart LR
    A[App React Native] --> B[Expo Router]
    B --> C[Context API + Hooks]
    C --> D[Supabase Auth]
    C --> E[Supabase DB]
    C --> F[Supabase Storage]
    E --> G[Real-time Updates]
    F --> H[Public/Private Buckets]
```

## 💡 Boas Práticas

- Clean Architecture
- Componentização
- TypeScript strict
- ESLint + Prettier
- Lazy loading
- Memoização

## 🚀 Instalação e Execução

```bash
git clone https://github.com/seu-usuario/astramentor-mobile.git
cd astramentor-mobile
npm install
cp .env.example .env
npm start
```

## 👥 Créditos

- **Desenvolvimento**: Davi, Marlon e Marcelo
- **Instituição**: FIAP

## 🎓 Considerações Acadêmicas

Projeto desenvolvido como parte da pós-graduação em Full Stack Development da FIAP. Envolve:
- Arquitetura de software
- Integração backend
- UX/UI
- Boas práticas

## 📝 Licença

MIT — veja [LICENSE](LICENSE).
