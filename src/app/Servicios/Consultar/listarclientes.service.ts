import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class ListarclientesService {

  private UrlServidor = Servidorapirest.ObtenerInstancia();

  constructor(private http: HttpClient) { }

  public ConsultarLosClientes() : Observable<Object>{
    return this.http.get(`${this.UrlServidor.GetUrlDelServicioAPIRest()}`);   
  }
}
