/**
 * Erro de dominio: AppError
 * Base com status HTTP; subclasses NaoEncontrado (404), Proibido (403), Conflito (409), DadosInvalidos (400).
 * (Esqueleto organizacional - a implementacao atual esta no projeto GameVault de Programacao Web.)
 */
class AppError {}

module.exports = { AppError };
