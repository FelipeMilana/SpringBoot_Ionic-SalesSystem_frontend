import { ExchangeVehicleDTO } from "./exchangeVehicleDTO";

export interface PaymentDTO {
    bank: string;
    cashValue: number;
    exchangeVehicle: ExchangeVehicleDTO;
    name: string;
    cnpj: string;
    telephone: string;
    quota: string;
    group: string;
    inputValue: number;
    inputBank: string;
    consortiumValue: number;
    consortiumBank: string;
    fundedValue: number;
    fundedBank: string;
    cashback: number;
    "@type":string;
}