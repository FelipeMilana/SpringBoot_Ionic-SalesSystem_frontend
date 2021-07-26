import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { VehicleDTO } from "../../models/vehicleDTO";

@Injectable()
export class VehicleService {

    constructor(
        public http: HttpClient){
    }

    myStock(page: number, size: number, sort: string, direction: string) {
        return this.http.get(`${API_CONFIG.baseURL}/vehicles/stock?page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    findByModelOrLicensePlate(page: number, size: number, sort: string, direction: string, str: string) {
        return this.http.get(`${API_CONFIG.baseURL}/vehicles/modelOrLicensePlate?value=${str}&&page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`)
    }

    insert(obj: VehicleDTO) {
        return this.http.post(`${API_CONFIG.baseURL}/vehicles`,
        obj,
        {
            observe:'response',
            responseType:'text'
        });
    }
}