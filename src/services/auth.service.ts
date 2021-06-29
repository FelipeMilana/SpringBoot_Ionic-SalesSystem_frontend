import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../configs/api.config";
import { LoginDTO } from "../models/loginDTO";

@Injectable()
export class AuthService {

    constructor (
        public http: HttpClient) {
    }

    authenticate(creds: LoginDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}