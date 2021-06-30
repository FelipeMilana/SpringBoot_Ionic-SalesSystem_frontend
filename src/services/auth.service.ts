import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../configs/api.config";
import { LocalUser } from "../models/local_user";
import { LoginDTO } from "../models/loginDTO";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor (
        public http: HttpClient,
        public storage: StorageService) {
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

    refreshToken() {
        return this.http.get(
            `${API_CONFIG.baseURL}/auth/refreshToken`, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(bearerToken: String) {
        let tok = bearerToken.substring(7);

        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}