import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "@app/shared/api.constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserResponse>(baseUrl + "/users/me");
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserResponse {
  successful: boolean;
  result: User;
}
