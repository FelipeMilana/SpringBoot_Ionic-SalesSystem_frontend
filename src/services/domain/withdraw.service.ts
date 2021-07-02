import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";

@Injectable()
export class WithdrawService {

    constructor(
        public http: HttpClient){
    }

    myWithdraws(page: number = 0, size: number = 10, sort: string = "date", direction: string = "DESC") {
        return this.http.get(`${API_CONFIG.baseURL}/withdraws`);
    }
}