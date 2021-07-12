import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { WithdrawDTO } from "../../models/withdrawDTO";

@Injectable()
export class WithdrawService {

    constructor(
        public http: HttpClient){
    }

    myWithdraws(page: number, size: number, sort: string, direction: string) {
        return this.http.get(`${API_CONFIG.baseURL}/withdraws?page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    findByNameOrBank(page: number, size: number, sort: string, direction: string, str: string) {
        return this.http.get(`${API_CONFIG.baseURL}/withdraws/nameOrBank?value=${str}&&page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    insert(obj: WithdrawDTO) {
        return this.http.post(`${API_CONFIG.baseURL}/withdraws`,
        obj,
        {
            observe:'response',
            responseType:'text'
        });
    }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseURL}/withdraws/${id}`,
        {
            observe:'response',
            responseType:'text'
        });
    }
}