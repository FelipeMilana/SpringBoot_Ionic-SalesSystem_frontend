import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";

@Injectable()
export class VehicleService {

    constructor(
        public http: HttpClient){
    }

    myStock(page: number, size: number, sort: string, direction: string) {
        return this.http.get(`${API_CONFIG.baseURL}/vehicles/stock?page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    
}