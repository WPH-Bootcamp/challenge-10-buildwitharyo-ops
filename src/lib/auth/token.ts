import Cookies from "js-cookie";

import { TOKEN_COOKIE } from "./cookie-name";

export { TOKEN_COOKIE };

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE);
}

export function setToken(token: string, remember = true) {
  Cookies.set(TOKEN_COOKIE, token, {
    expires: remember ? 7 : undefined,
    sameSite: "lax",
    path: "/",
  });
}

export function clearToken() {
  Cookies.remove(TOKEN_COOKIE, { path: "/" });
}
