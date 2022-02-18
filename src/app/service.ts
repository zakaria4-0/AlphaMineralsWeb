import { Injectable} from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Output } from "./output";
import { Production } from "./production";

@Injectable({
    providedIn:'root'
})
export class AlphaMineralsService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient){

    }

    public getEffeciency():Observable<Output>{
        return this.http.get<Output>(`${this.apiServerUrl}/AlphaMinerals/efficiencyppm1`);
    }
    public getProducts():Observable<Production[]>{
        return this.http.get<Production[]>(`${this.apiServerUrl}/AlphaMinerals/products1`);
    }
    public getProductsNC():Observable<Production[]>{
        return this.http.get<Production[]>(`${this.apiServerUrl}/AlphaMinerals/productsNC1`);
    }
}