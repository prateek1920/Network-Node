import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InterfaceService{

    url: string = './assets/json/interfaces.json';

    constructor(private http: HttpClient) {}

    getInterfacesData() {
        return this.http.get(this.url);
    }
}