/**
 * Módulo `Pages` — cliente de operação para páginas estáticas.
 *
 * Fornece wrappers de alto nível para recuperar, criar/atualizar e remover
 * representações HTML de páginas hospedadas em um domínio específico. Cada
 * operação delega a chamada HTTP para funções em `./http/*` e propaga erros
 * retornados pelo cliente HTTP subjacente.
 *
 */
import type { CoreClient } from "../../client";
import { deletePage } from "./http/delete";
import { getPage } from "./http/get";
import { upsertPage } from "./http/upsert";

/**
 * Representa uma página
 */
/**
 * Representa uma página estática gerida pela API.
 *
 * Propriedades:
 * - `domain`: Identificador único da página. Geralmente host ou host+path.
 * - `html`: Conteúdo HTML completo que será servido para esse domínio.
 * - `template`: (opcional) nome do template ou layout que o servidor pode aplicar.
 *
 * ```
 */
export type Page = {
  domain: string;
  html: string;
  template?: string;
};

/**
 * Client de alto nível para operações relacionadas a `Page`.
 *
 * Instancie com um `CoreClient` já autenticado/configurado. Os métodos desta
 * classe são pequenos wrappers que delegam a execução para as funções HTTP
 * específicas em `./http/*`, mantendo a assinatura orientada ao domínio.
 */
export class Pages {
  /**
   * Construtor.
   * @param core - Instância de `CoreClient` usada para efetuar chamadas HTTP.
   */
  constructor(private core: CoreClient) { }

  /**
   * Recupera a página associada ao `domain` informado.
   *
   * @param domain - Identificador da página a recuperar (ex.: "exemplo.com").
   * @returns Uma promise que resolve com o objeto `Page` caso exista.
   * @throws Erros de rede/HTTP ou erro retornado pela API se a página não existir.
   *
   */
  get(domain: string) {
    return getPage(this.core, domain);
  }

  /**
   * Cria ou atualiza uma página.
   *
   * Se a página para o `domain` já existir, o servidor realizará um update;
   * caso contrário, criará uma nova entrada.
   *
   * @param input - Objeto com os dados da página:
   *   - `domain`: chave única da página.
   *   - `html`: conteúdo HTML completo.
   *   - `template` (opcional): nome do template a aplicar.
   * @returns Uma promise que resolve com o `Page` criado/atualizado ou com metadados retornados pela API.
   * @throws Erros de validação, rede ou HTTP conforme a resposta da API.
   *
   */
  upsert(input: { domain: string; html: string; template?: string }) {
    return upsertPage(this.core, input);
  }

  /**
   * Remove a página associada ao `domain`.
   *
   * @param domain - Identificador da página a remover.
   * @returns Uma promise que resolve quando a exclusão for confirmada pelo servidor.
   * @throws Erro se a operação falhar (por exemplo, página não encontrada ou erro de permissão).
   *
   */
  delete(domain: string) {
    return deletePage(this.core, domain);
  }
}
