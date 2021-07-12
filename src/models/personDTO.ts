import { AddressDTO } from "./addressDTO";

export interface PersonDTO {
    id: string;
    name: string;
    email: string;
    cpf: string;
    telephone: string;
    telephone2: string;
    address: AddressDTO;
}