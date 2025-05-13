## Informações do Aluno
- **Nome:** João Pedro H Neves
- **Curso:** Engenharia de Software
- **Instituição:** FAG Toledo

## Sobre o Projeto
Este projeto foi desenvolvido como parte da atividade avaliativa da disciplina de Desenvolvimento de Software para Dispositivos Móveis. Consiste em um protótipo de interface de autenticação para um aplicativo móvel.

### Funcionalidades
- Tela de login com validação de email e senha
- Sistema de múltiplos usuários para teste
- Proteção contra tentativas excessivas de login
- Tela de perfil com informações do usuário
- Sistema de logout

### Usuários para Teste
O sistema possui três usuários pré-configurados para teste:
- ddm@gmail.com
- aluno@gmail.com
- professor@gmail.com

**Senha para todos os usuários:** 123456

### Requisitos de Senha
- Mínimo de 6 caracteres
- Deve conter pelo menos um número

### Tecnologias Utilizadas
- React Native com Expo
- TypeScript
- Zod para validação de dados
- Context API para gerenciamento de estado
- Expo Router para navegação

### Como Executar
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute o projeto:
```bash
npx expo start
```

### Estrutura do Projeto
- `app/index.tsx` → Tela de login
- `app/profile.tsx` → Tela de perfil do usuário
- `app/contexts/authContext.tsx` → Contexto de autenticação
- `app/_layout.tsx` → Provider global da aplicação
