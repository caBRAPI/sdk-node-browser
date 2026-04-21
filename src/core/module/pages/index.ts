import type { CoreClient } from "../../client";
import { deletePage } from "./http/delete";
import { getPage } from "./http/get";
import { upsertPage } from "./http/upsert";

/**
 * Representa uma página
 */
export type Page = {
  domain: string;
  html: string;
  template?: string;
};

export class Pages {
  constructor(private core: CoreClient) {}

  get(domain: string) {
    return getPage(this.core, domain);
  }

  upsert(input: { domain: string; html: string; template?: string }) {
    return upsertPage(this.core, input);
  }

  delete(domain: string) {
    return deletePage(this.core, domain);
  }
}
