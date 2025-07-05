import { AxiosProgressEvent } from "axios";

export interface HttpRequestConfig {
    headers?: Record<string, string | string[]>; // HTTP headers
    params?: Record<string, string | string[]>; // Query parameters
    observe?: 'body'; 
    reportProgress?: boolean; 
    responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'; 
    withCredentials?: boolean; credentials?: 'include' | 'same-origin' | 'omit';
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
  