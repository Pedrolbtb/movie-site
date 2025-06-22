# PlanetaCine

Este site, desenvolvido com Angular, utiliza a API do TMDB para listar e exibir informações detalhadas sobre filmes e séries já lançados. A aplicação conta com funcionalidades como busca inteligente por nome, gênero ou ano de lançamento, listagem dinâmica com paginação e rolagem infinita, além da possibilidade de trocar o idioma da interface entre português e inglês. 
<br> <br>
Você pode testar o site aqui: <a>https://movie-site-chi-rose.vercel.app/</a>

# Tecnologias
Neste projeto foi utilizado: [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.
Com as seguintes bibliotecas:

- **@angular/common**: Fornece diretivas e pipes comuns (*ngIf, *ngFor, DatePipe, etc.) e utilitários como isPlatformBrowser. Facilitando a criação de templates dinâmicos e o suporte a internacionalização, além de ajudar a detectar o ambiente (SSR ou browser).
- **@angular/router**: Gerencia as rotas da aplicação (navegação entre páginas, parâmetros de URL, etc). Permitindo criar uma SPA (Single Page Application) com navegação fluida e URLs amigáveis.
- **@angular/common/http**: Permite fazer requisições HTTP para APIs externas (como a do TMDB). Facilitando a comunicação com backends e APIs REST de forma segura e tipada.
- **@angular/platform-browser e @angular/platform-browser/animations**: Suporte ao ambiente de browser e animações do Angular. Garantindo que sua aplicação rode corretamente no navegador e permite usar animações modernas.
- **@angular/forms**: Gerencia formulários reativos e template-driven (usado, por exemplo, no SearchDialog). Facilita a validação, controle e interação com formulários de maneira robusta.
- **@angular/material**: Fornece componentes visuais prontos (botões, cards, chips, ícones, listas, menus, diálogos, paginadores, etc). Permitindo criar uma interface bonita, responsiva e consistente rapidamente, seguindo o Material Design.
- **rxjs**: Gerencia programação reativa com Observables, operadores (map, takeUntil, etc). Facilitando o tratamento de dados assíncronos, como respostas de API, timers, eventos, etc, de forma eficiente e escalável.
- **@angular/ssr**: Permite renderizar a aplicação no servidor para melhor SEO e performance inicial. Melhorando o carregamento inicial e a indexação por mecanismos de busca.

# Galeria de imagens

<p align="center">
  <img src="https://github.com/user-attachments/assets/fc1e9687-4020-4894-b230-2c9b242cb121" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/133928bc-7c0b-4ba8-94c3-b49902826375" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/011175c3-514d-41a2-9cf3-15c192dfe529" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/75d6b7cb-ef84-4b0e-8d5d-850fd13d7ee0" width="80%" />
</p>


## Como rodar?

Baixe o .zip do projeto e rode o seguinte comando na pasta raiz

```bash
npm install
```

Em sequência quando terminar a instação rode

```bash
ng serve
```
Clique com o ctrl + botão do mouse no link do localhost

