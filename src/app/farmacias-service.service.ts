import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FarmaciasServiceService {


  constructor(private _http: HttpClient) { }

  getComunasByIdRegion(idRegion: any) {

        return this._http.post('http://localhost:8595/farmacias/getComuna', JSON.stringify(
          {idRegion:idRegion}), {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          }), observe: 'response'
        });
  }
  getFarmaciasByComuna(idRegion: any, idComuna: any, nombreFarmacia: any, farmaciaTurno: any) {

        return this._http.post('http://localhost:8595/farmacias/getFarmacias', JSON.stringify(
          {idRegion:idRegion, idComuna:idComuna, nombreFarmacia:nombreFarmacia, farmaciaTurno:farmaciaTurno}), {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          }), observe: 'response'
        });
        
  }
}
