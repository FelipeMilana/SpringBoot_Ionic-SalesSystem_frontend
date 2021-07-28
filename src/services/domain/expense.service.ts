import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../configs/api.config";
import { ExpenseDTO } from "../../models/expenseDTO";

@Injectable()
export class ExpenseService {

    constructor(
        public http: HttpClient){
    }
    
    insert(obj: ExpenseDTO, id: string) {
        return this.http.post(`${API_CONFIG.baseURL}/expenses/${id}`,
        obj,
        {
            observe:'response',
            responseType:'text'
        });
    }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseURL}/expenses/${id}`,
        {
            observe:'response',
            responseType:'text'
        });
    }
}