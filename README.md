# Solidify-API

O **solidify-api** é um projeto focado em estudos, onde estou aplicando conceitos avançados de arquitetura de software e boas práticas de desenvolvimento. A aplicação tem como objetivo gerenciar academias e seus usuários, oferecendo funcionalidades como cadastro, autenticação, check-ins, busca de academias, e validação de check-ins, tudo de acordo com regras de negócio claras e bem definidas, como evitar check-ins duplicados ou fora da proximidade da academia.

Além disso, o projeto prioriza segurança e eficiência, utilizando criptografia de senhas, autenticação via **JWT (JSON Web Token)** e armazenamento dos dados em um banco de dados **PostgreSQL**. A estruturação da aplicação também inclui paginação de listas de dados, otimizando a performance e garantindo uma experiência fluida para o usuário.

---

## Requisitos Funcionais (RFs)

- ✅ Deve ser possível realizar cadastro de usuários
- ✅ Deve ser possível realizar autenticação de usuários
- ✅ Deve ser possível obter o perfil de um usuário logado
- ✅ Deve ser possível obter o número de check-ins realizados pelo usuário logado
- ✅ Deve ser possível visualizar o histórico de check-ins de um usuário
- ✅ Deve ser possível buscar academias próximas (até 10km)
- ✅ Deve ser possível buscar academias pelo nome
- ✅ Deve ser possível realizar check-in em uma academia
- ✅ Deve ser possível validar o check-in de um usuário
- ✅ Deve ser possível cadastrar uma academia

---

## Regras de Negócio (RNs)

- ✅ O usuário não deve poder se cadastrar com um e-mail duplicado
- ✅ O usuário não pode realizar mais de um check-in por dia
- ✅ O usuário só pode realizar check-in se estiver perto (100m) da academia
- ✅ O check-in só pode ser validado até 20 minutos após a sua criação
- ✅ O check-in só pode ser validado por administradores
- ✅ Apenas administradores podem cadastrar academias

---

## Requisitos Não Funcionais (RNFs)

- ✅ A senha do usuário deve ser criptografada
- ✅ Os dados da aplicação devem ser persistidos em um banco **PostgreSQL**
- ✅ Todas as listas de dados devem ser paginadas com 20 itens por página
- ✅ A autenticação do usuário deve ser feita via **JWT (JSON Web Token)**
