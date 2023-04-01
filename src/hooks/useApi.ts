import { useState } from 'react';
import useAuth from './useAuth';

export interface UseApiConfig {
  url: string;
  requestType: 'GET' | 'POST' | 'PUT' | 'DELETE';
  queryParams?: { [key: string]: unknown };
  headers?: { [key: string]: unknown };
  isBlob?: boolean;
}

export interface UseApiResponse<T> {
  data: T | undefined;
  blobData: Blob;
  loading: boolean;
  error: string;
  request: (body?: { [key: string]: unknown }) => Promise<void>;
}

export default function useApi<T>({
  url,
  requestType,
  headers,
  queryParams,
  isBlob,
}: UseApiConfig): UseApiResponse<T> {
  const [data, setData] = useState<T>(null);
  const [blobData, setBlobData] = useState<Blob>(null);
  const [error, setError] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { authToken, removeAuthToken } = useAuth();

  const requestHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  /**
   *
   * @param body Stringified json object passed as request body.
   * @returns RequestInit
   * @description Takes passed arguments to reusable api hook, and converts them into a useable fetch request body.
   */
  const setRequestConfig = (body: BodyInit): Object => {
    let requestConfig: RequestInit = {};

    if (body) requestConfig.body = body;

    if (authToken) requestHeaders.set('Authorization', `Bearer ${authToken}`);

    if (headers) {
      Object.entries(headers).forEach(([k, v]) => {
        requestHeaders.append(k, v.toString());
      });
    }

    requestConfig.method = requestType;
    requestConfig.headers = requestHeaders;

    return requestConfig;
  };

  /**
   *
   * @param body Object representing parameters for api request.
   * @returns Provided type.
   * @description Reusable api request function that generates request based off of parameters, handles errors, and returns data in the specified type.
   */
  const request = async (body?: { [key: string]: unknown }): Promise<void> => {
    const requestUrl = new URL(`${process.env.REACT_APP_API_BASE_URL}${url}`);

    if (queryParams) {
      Object.entries(queryParams).forEach(([k, v]) => {
        requestUrl.searchParams.append(k, v.toString());
      });
    }

    try {
      setLoading(true);
      setError(null);

      const requestConfig = setRequestConfig(JSON.stringify(body));

      const response = await fetch(requestUrl, requestConfig);

      if (response.status === 401) {
        removeAuthToken();
        return;
      }

      if (isBlob) {
        const blob = await response.blob();
        setBlobData(blob);
      } else {
        const json: T = await response.json();
        setData(json);
      }
    } catch (error) {
      console.log('error', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, blobData, loading, error, request };
}
