declare module "axios" {
  export type AxiosRequestConfig = Record<string, unknown> | undefined;

  export type AxiosResponse<T = unknown> = {
    data: T;
    status?: number;
    statusText?: string;
    headers?: Record<string, unknown>;
  };

  export type AxiosError = unknown;

  export type AxiosInstance = {
    create(config?: AxiosRequestConfig): AxiosInstance;
    interceptors: {
      request: {
        use(
          fn: (
            conf: AxiosRequestConfig,
          ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
        ): void;
      };
      response: {
        use(
          onFulfilled: (
            res: AxiosResponse,
          ) => AxiosResponse | Promise<AxiosResponse>,
          onRejected: (err: unknown) => unknown,
        ): void;
      };
    };
    get<T = unknown>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    post<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    put<T = unknown>(
      url: string,
      data?: unknown,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    delete<T = unknown>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
  };

  const axios: AxiosInstance &
    ((config?: AxiosRequestConfig) => Promise<AxiosResponse>);

  export default axios;
}
