/**
 * Adapter HTTP simples usando fetch (nativo).
 * Exporta `createAxios` para compatibilidade com restante do código.
 */
export type AxiosConfig = {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
};

export type AxiosRequestConfig = {
  url?: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
};

export type AxiosResponse<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config?: AxiosRequestConfig;
};

type Interceptor<V> = {
  fulfilled: (v: V) => V | Promise<V>;
  rejected?: (err: unknown) => unknown;
};

function buildURL(base: string, path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function buildQuery(params?: Record<string, unknown>) {
  if (!params) return "";
  const esc = encodeURIComponent;
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${esc(k)}=${esc(String(v))}`)
    .join("&");
  return query ? `?${query}` : "";
}

export function createAxios(cfg: AxiosConfig = {}) {
  const baseURL = cfg.baseURL ?? "https://api.cabrapi.com.br";
  const timeout = cfg.timeout ?? 30000;

  const requestInterceptors: Interceptor<AxiosRequestConfig>[] = [];
  const responseInterceptors: Interceptor<AxiosResponse>[] = [];

  async function runRequest<T = unknown>(
    config: AxiosRequestConfig & { method: string },
  ): Promise<AxiosResponse<T>> {
    let conf: AxiosRequestConfig = { ...config };

    for (const i of requestInterceptors) {
      try {
        // allow interceptor to modify config
        conf = await i.fulfilled(conf);
      } catch (e) {
        if (i.rejected) i.rejected(e);
        throw e;
      }
    }

    const url =
      buildURL(baseURL, conf.url ?? "") +
      buildQuery(conf.params as Record<string, unknown> | undefined);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(conf.headers || {}),
    };

    if (cfg.apiKey) headers.Authorization = `${cfg.apiKey}`;

    const controller = new AbortController();
    const to = conf.timeout ?? timeout;
    const timer = setTimeout(() => controller.abort(), to);

    const opts: RequestInit = {
      method: config.method.toUpperCase(),
      headers,
      signal: controller.signal,
    };

    if (conf.data !== undefined && config.method.toLowerCase() !== "get") {
      opts.body =
        typeof conf.data === "string" ? conf.data : JSON.stringify(conf.data);
    }

    let raw: Response;
    try {
      raw = await fetch(url, opts);
      clearTimeout(timer);
    } catch (err: unknown) {
      clearTimeout(timer);
      if (err && typeof err === "object") {
        // pass to caller
      }
      throw err;
    }

    const text = await raw.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    const res: AxiosResponse<T> = {
      data: data as T,
      status: raw.status,
      statusText: raw.statusText,
      headers: Object.fromEntries(raw.headers.entries()),
      config: conf,
    };

    for (const i of responseInterceptors) {
      try {
        // allow interceptor to transform response
        // eslint-disable-next-line no-await-in-loop
        await i.fulfilled(res);
      } catch (e) {
        if (i.rejected) i.rejected(e);
        throw e;
      }
    }

    if (!raw.ok) {
      const maybeError =
        typeof res.data === "object" &&
        res.data !== null &&
        "error" in (res.data as Record<string, unknown>)
          ? (res.data as Record<string, unknown>).error
          : undefined;
      const err = maybeError ?? res.data ?? { status: raw.status };
      throw err as unknown;
    }

    return res;
  }

  const instance = {
    interceptors: {
      request: {
        use(
          fulfilled: (
            c: AxiosRequestConfig,
          ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
          rejected?: (e: unknown) => unknown,
        ) {
          requestInterceptors.push({ fulfilled, rejected });
        },
      },
      response: {
        use(
          fulfilled: (
            r: AxiosResponse,
          ) => AxiosResponse | Promise<AxiosResponse>,
          rejected?: (e: unknown) => unknown,
        ) {
          responseInterceptors.push({ fulfilled, rejected });
        },
      },
    },

    async get<T = unknown>(
      url: string,
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<T>> {
      return runRequest<T>({ ...options, url, method: "get" });
    },

    async post<T = unknown>(
      url: string,
      data?: unknown,
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<T>> {
      return runRequest<T>({ ...options, url, data, method: "post" });
    },

    async put<T = unknown>(
      url: string,
      data?: unknown,
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<T>> {
      return runRequest<T>({ ...options, url, data, method: "put" });
    },

    async delete<T = unknown>(
      url: string,
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<T>> {
      return runRequest<T>({ ...options, url, method: "delete" });
    },

    // compatibility: allow calling instance(config)
    async request<T = unknown>(
      options: AxiosRequestConfig & { method: string },
    ): Promise<AxiosResponse<T>> {
      return runRequest<T>(options);
    },
  };

  return instance;
}
