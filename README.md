# App de Receitas

## Descrição

Aplicativo mobile feito com React Native e Expo para consultar e cadastrar receitas. É possível buscar por nome, filtrar por categoria, ver os detalhes de cada receita e adicionar novas receitas.

## Aluno

João Dantas — RGM: 42864771

## Telas

* **Home**: lista de receitas, busca por nome, filtro por categoria e botão para adicionar.
* **Detalhes**: mostra ingredientes e modo de preparo, tem cronômetro de tempo na tela e botão de favoritar.
* **Formulario**: cadastro de nova receita com campos controlados.

## Fonte de dados

Dados locais (`data/receitas.js`), sem API.

## Onde estão os requisitos

* Componentes: `components/Card.js`, `components/Botao.js`, `components/Cabecalho.js`, `components/CampoTexto.js` (o `Card` e o `Botao` são reutilizados várias vezes)
* Props com callback: `aoPressionar` no `Card` e no `Botao`; `aoMudarTexto` no `CampoTexto`; `aoSalvar` na tela `Formulario`
* useState: `screens/Home.js` (busca, categoria, carregando), `screens/Detalhes.js` (favorita, segundos), `screens/Formulario.js` (form como objeto, erro), `App.js` (lista de receitas)
* useEffect: `screens/Home.js` (carregamento simulado com cleanup e título dinâmico com dependência) e `screens/Detalhes.js` (cronômetro com `setInterval` e cleanup)
* Navegação com parâmetros: `App.js` (Stack e títulos); `Home.js` envia a receita com `navigation.navigate('Detalhes', { receita })` e `Detalhes.js` lê com `route.params`

## Vídeo de demonstração

`demo/demo.mp4`

## Como executar

```
npm install
npx expo start
```

