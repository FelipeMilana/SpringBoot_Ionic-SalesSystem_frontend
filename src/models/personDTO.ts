import { AddressDTO } from "./addressDTO";

export interface PersonDTO {
    id: string;
    name: string;
    email: string;
    cpfCnpj: string;
    telephone: string;
    telephone2: string;
    address: AddressDTO;
}