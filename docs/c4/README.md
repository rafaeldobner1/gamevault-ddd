# Diagramas C4 (código PlantUML)

Escritos com a biblioteca C4-PlantUML. Para gerar as imagens, use a extensão PlantUML no VS Code ou rode:

```
java -jar plantuml.jar docs/c4/*.puml
```

- `c4_1_contexto.puml`: nível 1, contexto
- `c4_2_conteineres.puml`: nível 2, contêineres, com a nova camada de mensageria (Kafka)
- `c4_3_componentes.puml`: nível 3, componentes da camada de comunicação (exclusão de publicação)
