import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";

@Injectable()
export class PersonService {

    constructor(
        public http: HttpClient){
    }

    findByCpf(cpf: string) {
        return this.http.get(`${API_CONFIG.baseURL}/persons/cpf?value=${cpf}`);
    }
}