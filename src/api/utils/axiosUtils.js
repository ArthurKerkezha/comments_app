import axios from "axios";

export const axiosCancellationInterceptor = (axiosConfig) => {
  const instance = axios.create({
    ...axiosConfig,
  });

  const pendingRequests = new Map();

  instance.interceptors.request.use(
    (config) => {
      const requestIdentifier = `${config.url}_${config.method}`;

      if (pendingRequests.has(requestIdentifier)) {
        const cancelTokenSource = pendingRequests.get(requestIdentifier);

        cancelTokenSource.cancel("Cancelled due to new request");
      }

      const newCancelTokenSource = axios.CancelToken.source();

      config.cancelToken = newCancelTokenSource.token;

      pendingRequests.set(requestIdentifier, newCancelTokenSource);
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      const requestIdentifier = `${response.config.url}_${response.config.method}`;

      pendingRequests.delete(requestIdentifier);
      return response;
    },
    (error) => {
      if (error.config) {
        const requestIdentifier = `${error.config.url}_${error.config.method}`;

        pendingRequests.delete(requestIdentifier);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};
