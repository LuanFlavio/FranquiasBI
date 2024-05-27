import { AxiosResponse } from "axios";

/**
 * - When it is necessary to handle all data coming from the API in the same way.
 * - Quando for necessário tratar todos os dados vindos da API da mesma forma.
 * @param response API request return
 * @returns Treated API request
 */

export const responseInterceptor = (response: AxiosResponse) => {
  //if login
  //token

  return response
}
