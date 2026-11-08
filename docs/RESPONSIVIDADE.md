# Verificação de responsividade mobile

Esta atualização reorganiza a interface existente, sem alterar as regras do jogo nem o simulador de cache.

## Validação sugerida no navegador

Utilize o modo responsivo do navegador e confira larguras de **320, 360, 375, 390, 430, 768 e 1024 px**.

- [ ] O cabeçalho mostra **Início**, **Jogo** e **Arquitetura AWS** sem sobreposição; todos os links são tocáveis.
- [ ] O título e os chips de tecnologias são legíveis; a ilustração decorativa não cria espaço vazio excessivo.
- [ ] O tabuleiro 3×3 fica inteiro na tela sem rolagem horizontal.
- [ ] Os botões **Nova partida** e **Reiniciar placar** cabem e podem ser tocados.
- [ ] O placar, os cartões de tecnologias e a seção de informações mantêm os textos legíveis.
- [ ] O diagrama AWS aparece na vertical em celulares, com **Usuário → CloudFront → S3** e setas entre os cartões.
- [ ] Clicar nos três serviços destaca o cartão e atualiza a explicação.
- [ ] Alternar **cache hit / miss** e usar **Iniciar / Pausar / Próxima etapa / Reiniciar** funciona.
- [ ] Os cartões e a evolução futura não ultrapassam a largura do dispositivo.
- [ ] Em modo **redução de movimento**, não há animações pulsantes.
- [ ] O teclado alcança as células do jogo e os controles AWS; o foco permanece visível.

## Comandos de teste

```bash
npm test
npm run start
```

Abra `http://localhost:5173` e use o modo de dispositivos do navegador.

> A verificação estática da branch confirmou que `css/mobile.css` está carregado após `css/styles.css`, as chaves CSS estão balanceadas e os novos breakpoints estão presentes. **Os testes visuais e de toque precisam ser executados num navegador real**, pois não foram executados por esta alteração remota.

## Notas de implementação

- Até 780 px, o diagrama passa de coordenadas absolutas com largura mínima de 760 px para três cartões responsivos verticais.
- As linhas SVG de desktop ficam ocultas no mobile. As setas entre cartões e o destaque de etapa preservam a compreensão do fluxo.
- Até 380 px, os botões usam coluna única para manter uma área de toque confortável.
- Entre 781 e 1000 px, a ilustração do início reduz seu tamanho real em vez de ocupar uma caixa escalada.
- A organização de CSS em arquivo complementar permite revisar e reverter apenas a intervenção mobile.
