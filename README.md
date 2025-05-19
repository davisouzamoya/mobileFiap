# AstraMentor Mobile

## Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── common/        # Componentes básicos (Button, Input, Card, etc)
│   └── layout/        # Componentes de layout (Header, Footer, Sidebar, etc)
│
├── screens/           # Telas da aplicação
│   ├── auth/         # Telas relacionadas à autenticação
│   │   ├── login/
│   │   └── register/
│   ├── home/         # Telas da home
│   └── profile/      # Telas de perfil
│
├── navigation/        # Configuração de navegação
│   ├── routes.ts     # Definição das rotas
│   └── types.ts      # Tipos para navegação
│
├── services/         # Serviços e integrações
│   ├── api/         # Configuração e chamadas de API
│   └── storage/     # Serviços de armazenamento local
│
├── hooks/           # Hooks personalizados
│   ├── useAuth.ts
│   └── useTheme.ts
│
├── contexts/        # Contextos do React
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── utils/           # Funções utilitárias
│   ├── formatters.ts
│   └── validators.ts
│
├── styles/          # Estilos globais
│   ├── theme.ts     # Configuração de tema
│   ├── global.ts    # Estilos globais
│   └── constants.ts # Constantes de estilo
│
├── assets/          # Recursos estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── types/           # Definições de tipos TypeScript
    ├── api.ts
    └── models.ts
```

## Instruções de Organização

1. Mover os arquivos da pasta `app/components` para `src/components/layout`
2. Mover as telas de autenticação de `app/(auth)` para `src/screens/auth`
3. Mover as telas do app de `app/(app)` para `src/screens`
4. Mover os arquivos de layout para `src/navigation`
5. Mover os hooks existentes para `src/hooks`
6. Mover os utilitários existentes para `src/utils`

## Próximos Passos

1. Criar os arquivos de configuração necessários:
   - `src/styles/theme.ts`
   - `src/styles/global.ts`
   - `src/styles/constants.ts`
   - `src/navigation/routes.ts`
   - `src/navigation/types.ts`

2. Configurar os contextos:
   - `src/contexts/AuthContext.tsx`
   - `src/contexts/ThemeContext.tsx`

3. Configurar os serviços:
   - `src/services/api/index.ts`
   - `src/services/storage/index.ts`

4. Adicionar tipos TypeScript:
   - `src/types/api.ts`
   - `src/types/models.ts`
