import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

/**
 * Configurações para criação da instância Axios.
 */
export type AxiosConfig = {
  /**
   * URL base da API.
   * @default "https://api.cabrapi.com.br"
   */
  baseURL?: string;

  /**
   * Chave da API (modo privado).
   */
  apiKey?: string;
};

/**
 * Cria uma instância HTTP configurada para a caBRAPI.
 */
export function createAxios(config: AxiosConfig = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL ?? "https://api.cabrapi.com.br",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔐 Request interceptor
  instance.interceptors.request.use((req?: AxiosRequestConfig) => {
    const r: AxiosRequestConfig = req ?? {};
    if (config.apiKey) {
      if (!r.headers) r.headers = {};
      const headers = r.headers as Record<string, string | number | boolean>;
      headers.Authorization = `Bearer ${config.apiKey}`;
    }
    return r;
  });

  // ⚠️ Response interceptor
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: unknown) => {
      let message = "Unknown error";

      type MaybeAxiosLike = {
        message?: unknown;
        response?: { data?: unknown };
      };
      if (err && typeof err === "object") {
        const ae = err as MaybeAxiosLike;
        if (typeof ae.message === "string") {
          message = ae.message;
        }

        if (ae.response && typeof ae.response === "object") {
          const data = ae.response.data;
          if (data && typeof data === "object") {
            const d = data as Record<string, unknown>;
            const maybeMsg = d.message ?? d.code;
            if (typeof maybeMsg === "string") message = maybeMsg;
          }
        }
      } else if (typeof err === "string") {
        message = err;
      }

      return Promise.reject(new Error(message));
    },
  );

  return instance;
}
