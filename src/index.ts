import { type ClientOptions, CoreClient } from "./core/client";
import { Pages } from "./core/module/pages/index";
import { Stores } from "./core/module/stores/index";

/**
 * SDK principal da caBRAPI
 */
export class caBRAPI {
  public pages: Pages;
  public stores: Stores;

  constructor(options: ClientOptions) {
    const core = new CoreClient(options);

    this.pages = new Pages(core);
    this.stores = new Stores(core);
  }
}
