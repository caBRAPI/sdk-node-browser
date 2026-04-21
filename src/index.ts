import { type ClientOptions, CoreClient } from "./core/client";
import { Pages } from "./core/module/pages/index";

/**
 * SDK principal da caBRAPI
 */
export class caBRAPI {
  public pages: Pages;

  constructor(options: ClientOptions) {
    const core = new CoreClient(options);

    this.pages = new Pages(core);
  }
}
