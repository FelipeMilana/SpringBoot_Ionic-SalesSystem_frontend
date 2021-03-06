import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { SaleDTO } from "../../models/saleDTO";

@Injectable()
export class SaleService {

    constructor(
        public http: HttpClient){
    }

    mySales(page: number, size: number, sort: string, direction: string) {
        return this.http.get(`${API_CONFIG.baseURL}/sales?page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    findByVehicleModelOrLicensePlate(page: number, size: number, sort: string, direction: string, str: string) {
        return this.http.get(`${API_CONFIG.baseURL}/sales/vehicleModelOrLicensePlate?value=${str}&&page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseURL}/sales/${id}`);
    }

    monthlyReport(page: number, size: number, sort: string, direction: string, startDate: string, endDate: string) {
        return this.http.get(`${API_CONFIG.baseURL}/sales/monthlyReport?startDate=${startDate}&&endDate=${endDate}&&page=${page}&&size=${size}&&sort=${sort}&&direction=${direction}`);
    }

    insert(obj: SaleDTO, id: string) {
        return this.http.post(`${API_CONFIG.baseURL}/sales/${id}`,
        obj,
        {
            observe:'response',
            responseType:'text'
        });
    }
}