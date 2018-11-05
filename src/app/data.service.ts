import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  nacitajConfigTabulky() {
    return this.http.get('https://localhost:5001/api/values/config1');
  }

  nacitajConfigFormulara() {
    return this.http.get('https://localhost:5001/api/values/config2');
  }

  nacitajData() {
    return this.http.get('https://localhost:5001/api/values/data');
  }
}
