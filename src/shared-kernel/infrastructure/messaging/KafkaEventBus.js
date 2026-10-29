/**
 * Adaptador: KafkaEventBus
 * kafkajs; grava na outbox e o relay produz em '<contexto>.eventos' com chave = ID do agregado.
 * (Esqueleto organizacional - a implementacao atual esta no projeto GameVault de Programacao Web.)
 */
class KafkaEventBus {}

module.exports = { KafkaEventBus };
