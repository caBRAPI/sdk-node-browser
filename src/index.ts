import { type ClientOptions, CoreClient } from "./core/client";
import { Pages } from "./core/module/pages/index";
import { Stores } from "./core/module/stores/index";
import { Webhooks } from "./core/module/webhooks/index";

/**
 * SDK principal da caBRAPI
 */
export class caBRAPI {
  public pages: Pages;
  public stores: Stores;
  public webhooks: Webhooks;

  constructor(options: ClientOptions) {
    const core = new CoreClient(options);

    this.pages = new Pages(core);
    this.stores = new Stores(core);
    this.webhooks = new Webhooks(core);
  }
}
