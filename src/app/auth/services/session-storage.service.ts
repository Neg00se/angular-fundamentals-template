import { Injectable } from "@angular/core";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  setToken(token: string) {
    sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    sessionStorage.removeItem(TOKEN);
  }
}
