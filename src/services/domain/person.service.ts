import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { PersonDTO } from "../../models/personDTO";

@Injectable()
export class PersonService {

    constructor(
        public http: HttpClient){
    }

    findByCpfCnpj(cpfCnpj: string) {
        return this.http.get(`${API_CONFIG.baseURL}/persons/cpfCnpj?value=${cpfCnpj}`);
    }

    update(obj: PersonDTO, id: string) {
        return this.http.put(`${API_CONFIG.baseURL}/persons/${id}`,
        obj,
        {
            observe:'response',
            responseType:'text'
        });
    }
}