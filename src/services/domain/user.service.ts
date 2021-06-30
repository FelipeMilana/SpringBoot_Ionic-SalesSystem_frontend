import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { UserDTO } from "../../models/userDTO";

@Injectable()
export class UserService {

    constructor(
        public http: HttpClient){
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseURL}/users/email?value=${email}`);
    }

    insert(obj: UserDTO) {
        return this.http.post(
            `${API_CONFIG.baseURL}/users`,
            obj,
            {
                observe:'response',
                responseType:'text'
            }
        );
    }
}