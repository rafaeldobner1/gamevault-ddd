# GameVault — Arquitetura DDD

Trabalho N2 — Projeto e Arquitetura de Software (Católica SC, Prof. Luiz C. Camargo) — Rafael Vinicius Dobner.

O GameVault é a rede social de gameplays e trailers desenvolvida na disciplina de Programação Web
(Vue 3 + Express + Sequelize/MySQL). Este repositório reorganiza sua arquitetura segundo
**Domain-Driven Design** e **Arquitetura Hexagonal**, com comunicação entre contextos por **eventos no Apache Kafka**.
O código atual organiza o back-end por `modules/` (user, game, like, comment, search). Aqui eles passam a ser **bounded contexts**.

## Bounded contexts
| Contexto | Tipo | Hoje (código atual) | Responsabilidade |
|---|---|---|---|
| `publicacoes` | Core | `modules/game` | Publicar, editar, excluir e transmitir gameplays/trailers |
| `interacoes` | Core | `modules/like`, `modules/comment` | Curtidas e comentários |
| `descoberta` | Suporte | `getFeedGames`, `modules/search`, contadores | Feed, busca, cartões, contadores (read models) |
| `moderacao` | Suporte | telas `admin/*` do front | Bloquear usuários e remover publicações |
| `identidade` | Genérico | `modules/user` | Cadastro, login JWT, perfil, papéis |
| `notificacoes` | Genérico | — | Avisos ao autor e aos seguidores |

## Camadas (em cada contexto)
```
domain/          model (agregados, value objects), events, ports (repositórios e serviços externos)
application/     use-cases, event-handlers
infrastructure/  http (Express), persistence (Sequelize/MySQL), messaging (Kafka), storage/security
```
Regra de dependência: `infrastructure → application → domain`.

## Eventos (Kafka: tópico `<contexto>.eventos`, chave = ID do agregado)
- `PublicacaoCriada` → Identidade (+1 publicação), Descoberta (feed/busca), Notificações
- `PublicacaoExcluida` → Interações remove curtidas/comentários, Identidade (−1), worker de mídia apaga o vídeo
- `CurtidaRegistrada` / `CurtidaRemovida` / `ComentarioPublicado` → Descoberta atualiza contadores, Notificações avisa o autor
- `VisualizacaoRegistrada` → worker de estatísticas soma as visualizações em lote
- `UsuarioBloqueado` → Identidade impede login, Descoberta oculta as publicações
