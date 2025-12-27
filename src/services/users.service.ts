import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environments/environment";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string; // Optional karena tidak semua user punya
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairModel;
  ip: string;
  address: AddressModel;
  macAddress: string;
  university: string;
  bank: BankModel;
  company: CompanyModel;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: "admin" | "user" | "moderator"; // Contoh penggunaan union type
}

export interface HairModel {
  color: string;
  type: string;
}

export interface AddressModel {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: CoordinatesModel;
  country: string;
}

export interface CoordinatesModel {
  lat: number;
  lng: number;
}

export interface BankModel {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface CompanyModel {
  department: string;
  name: string;
  title: string;
  address: AddressModel; // Reusable interface dari Address di atas
}

export interface CryptoModel {
  coin: string;
  wallet: string;
  network: string;
}

@Injectable()
export class UsersService {
  private apiUrl =
    environment.production && false
      ? `${environment.dummyjson.baseurl}/users?limit=25`
      : `${environment.dummyjson.baseurl}/users.json`;

  constructor(private http: HttpClient) {}
  get(): Observable<{ users: UserModel[]; total: number }> {
    return this.http.get<{ users: UserModel[]; total: number }>(this.apiUrl);
  }
}
