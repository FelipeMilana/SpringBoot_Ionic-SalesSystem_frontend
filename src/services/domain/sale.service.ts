import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";

@Injectable()
export class SaleService {

    constructor(
        public http: HttpClient){
    }

    mySales(page: number, size: number, sort: string, direction: string) {
        return this.http.get(`${API_CONFIG.baseURL}/sales?page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }
}