import { type ClientOptions, CoreClient } from "./core/client";
import { Categories } from "./core/module/categories/index";
import { Pages } from "./core/module/pages/index";
import { Products } from "./core/module/products/index";
import { Stores } from "./core/module/stores/index";
import { Webhooks } from "./core/module/webhooks/index";

/**
 * SDK principal da caBRAPI
 */
export class caBRAPI {
  public categories: Categories;
  public pages: Pages;
  public products: Products;
  public stores: Stores;
  public webhooks: Webhooks;

  constructor(options: ClientOptions) {
    const core = new CoreClient(options);

    this.categories = new Categories(core);
    this.pages = new Pages(core);
    this.products = new Products(core);
    this.stores = new Stores(core);
    this.webhooks = new Webhooks(core);
  }
}
