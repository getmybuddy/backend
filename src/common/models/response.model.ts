import { WebResponse } from './web-response.model';

export function createResponse<T>(
  statusCode: number,
  message: string,
  data: T,
): WebResponse<T> {
  return { statusCode, message, data };
}
