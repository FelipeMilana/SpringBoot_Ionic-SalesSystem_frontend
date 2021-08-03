import { PaymentDTO } from "./paymentDTO";
import { PersonDTO } from "./personDTO";
import { VehicleDTO } from "./vehicleDTO";

export interface SaleDTO {
    id: string;
    date: string;
    finalValue: number;
    profit: number;
    vehicle: VehicleDTO;
    payment: PaymentDTO;
    client: PersonDTO;
}