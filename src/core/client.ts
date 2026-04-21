import { createAxios } from "./http";

/**
 * Tipo derivado da instância do Axios
 * (evita problemas no build de types)
 */
type AxiosInstance = ReturnType<typeof createAxios>;

/**
 * Modos disponíveis
 */
export type ClientMode = "public" | "private";

/**
 * Opções do cliente
 */
export type ClientOptions = {
  type: ClientMode;
  config?: {
    key?: string;
  };
};

/**
 * Detecta ambiente
 */
const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Cliente base da caBRAPI
 */
export class CoreClient {
  public http: AxiosInstance;
  public mode: ClientMode;
  public isBrowser: boolean;

  constructor(options: ClientOptions) {
    this.mode = options.type;
    this.isBrowser = isBrowser;

    // 🔒 validação backend
    if (this.mode === "private" && !options.config?.key && !this.isBrowser) {
      throw new Error("API key é obrigatória no modo 'private'.");
    }

    // 🔐 só backend usa key
    const apiKey =
      !this.isBrowser && this.mode === "private"
        ? options.config?.key
        : undefined;

    this.http = createAxios({ apiKey });

    // ⚠️ aviso dev
    if (this.isBrowser && this.mode === "private") {
      console.warn(
        "[caBRAPI] Modo 'private' detectado no navegador. API key ignorada.",
      );
    }
  }

  /**
   * Está em modo privado (backend)
   */
  public isPrivate(): boolean {
    return !this.isBrowser && this.mode === "private";
  }

  /**
   * Está em modo público
   */
  public isPublic(): boolean {
    return this.isBrowser || this.mode === "public";
  }

  /**
   * Garante execução no backend
   */
  public assertPrivate(): void {
    if (!this.isPrivate()) {
      throw new Error(
        "Este método é privado e não pode ser usado no navegador.",
      );
    }
  }
}
