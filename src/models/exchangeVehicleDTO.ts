import { ExpenseDTO } from "./expenseDTO";
import { PersonDTO } from "./personDTO";

export interface ExchangeVehicleDTO {
    id: string;
    type: string;
    brand: string;
    model: string;
    version: string;
    fabYear: string;
    modYear: string;
    color: string;
    motor: number;
    date: string;
    licensePlate: string;
    chassi: string;
    renavam: string;
    description: string;
    paidValue: number;
    possibleSellValue: number;
    seller: PersonDTO;
    expenses: ExpenseDTO[];
}