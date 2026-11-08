# Jogo da Velha — AI/R Fellowship + Escola da Nuvem

Projeto educacional de Jogo da Velha em **HTML5, CSS3 e JavaScript ES6+**, com identidade visual neon e uma seção que demonstra uma arquitetura estática AWS.

## Funcionalidades
- Partida local para dois jogadores (X e O).
- Detecção de vitória, empate e jogadas inválidas.
- Placar em memória durante a sessão; novo jogo preserva o placar, reiniciar placar zera tudo.
- Interface adaptável a desktop e celular.
- Simulador educacional de distribuição AWS, com **cache hit** e **cache miss**, ações iniciar/pausar/continuar/avançar/reiniciar.
- Diagrama clicável com destaque das etapas e conexões animadas; respeita `prefers-reduced-motion`.

## Executar localmente
Execute um servidor HTTP na raiz (módulos ES não são confiáveis ao abrir `file://`).

```bash
npm run start
```

Abra `http://localhost:5173`. Alternativamente, utilize Live Server no editor.

## Testes

```bash
npm test
```

Os testes usam o runner integrado do Node e cobrem o domínio do jogo.

## Organização

- `index.html`: estrutura semântica e pontos de interação.
- `css/styles.css`: tema, componentes, efeitos e responsividade.
- `js/domain/gameRules.js`: regras de domínio puras e estado da partida.
- `js/presentation/gameView.js`: renderização do tabuleiro.
- `js/main.js`: composição, controle de placar e simulador.
- `tests/`: testes automatizados de domínio.
- `images/`: referências de design fornecidas para o projeto.

## Arquitetura de software

Aplicação frontend única, organizada por responsabilidades e funções sem dependência de framework. O domínio não acessa o DOM. O código existente foi preservado e o layout foi refeito. A aplicação pode ser subdividida em controladores menores conforme houver novas funcionalidades concretas.

## Arquitetura AWS — proposta, não implantada

**Navegador → CloudFront → S3 privado com OAC** (apenas em caso de cache miss). O CloudFront pode servir conteúdo diretamente de cache. Depois da entrega, o jogo é executado localmente pelo navegador. Nenhuma jogada necessita de chamadas AWS.

Não foram provisionados recursos AWS. Um futuro ranking compartilhado poderia justificar API Gateway, Lambda e DynamoDB, mas isso **não faz parte da implementação atual**.

## Limitações e cuidados

- A simulação AWS é educativa e não exibe requisições reais.
- O placar não persiste ao atualizar a página.
- Não há autenticação, adversário automático ou partidas remotas.
- A identidade visual AI/R e Escola da Nuvem é contextual/educacional, sem implicar endosso institucional.
- Não insira chaves AWS no código frontend.
