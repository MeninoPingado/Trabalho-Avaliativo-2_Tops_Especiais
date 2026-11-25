# PokéDex App

Aplicativo acadêmico desenvolvido em TypeScript com React Native e Expo, que consome a API pública PokéAPI para consultar os 151 Pokémon da primeira geração.

## Integrantes

- João Lucas Salem
- Tiago Bezerra
- Valdir Dantas

## Funcionalidades

1. **Início:** apresentação do projeto e acesso ao catálogo.
2. **Pokédex:** listagem dos 151 Pokémon, imagens, identificação e busca por nome ou número.
3. **Detalhes:** imagem, tipos, altura, peso, habilidades e estatísticas base de cada Pokémon.

O aplicativo possui indicadores de carregamento, mensagens de erro com opção de tentar novamente e navegação entre as telas.

## Tecnologias

TypeScript, React Native, Expo SDK 58 e Fetch API.

## API pública

- Documentação: https://pokeapi.co/docs/v2
- Lista: `GET https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
- Detalhes: `GET https://pokeapi.co/api/v2/pokemon/{id}/`
- Imagens: repositório público de sprites da PokéAPI.

Não é necessária uma chave de API. É necessário acesso à internet. As habilidades são apresentadas com os nomes fornecidos pela API, formatados para leitura. A altura (decímetros) e o peso (hectogramas) são convertidos para metros e quilogramas.

## Como executar

Pré-requisitos: Node.js 22.13 ou superior (preferencialmente LTS compatível com o Expo SDK), npm e VS Code. Para testar no celular, instale uma versão do Expo Go compatível com SDK 58.

Abra esta pasta em um terminal e execute:

```bash
npm install
npx expo install --fix
npm start
```

- No celular: use o QR Code com Expo Go (computador e celular na mesma rede).
- No navegador: pressione `w` no terminal, ou execute `npm run web`.
- No Android: pressione `a` se houver emulador configurado.
- Para verificar os tipos: `npm run typecheck`.

Se o celular não se conectar pela rede local, tente `npx expo start --tunnel` (o Expo poderá pedir a instalação de uma dependência adicional).

## Organização

```text
App.tsx                     Navegação e layout geral
index.ts                    Ponto de entrada Expo
src/
  components/State.tsx      Estados de carregamento e erro
  screens/HomeScreen.tsx    Tela inicial
  screens/ListScreen.tsx    Catálogo e pesquisa
  screens/DetailScreen.tsx  Informações do Pokémon
  services/pokeapi.ts       Tipagem e requisições HTTP
  theme.ts                  Cores e traduções
```

## Entrega

Crie um repositório vazio no GitHub, sem README adicional, e execute os comandos abaixo substituindo `SEU-USUARIO` pelo usuário do GitHub:

```bash
git init
git add .
git commit -m "Cria aplicativo PokéDex com integração à PokéAPI"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/pokedex-app.git
git push -u origin main
```

Após testar o aplicativo, envie o endereço do repositório ao professor.

## Créditos

Dados e imagens disponibilizados pela PokéAPI. Pokémon e seus personagens pertencem aos respectivos titulares. Projeto educacional não oficial.
