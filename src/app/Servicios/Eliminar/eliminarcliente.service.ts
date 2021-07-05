import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class EliminarclienteService {

  private UrlServidor = Servidorapirest.ObtenerInstancia();
  
  constructor(private http: HttpClient) { }

  public EliminarCliente(numerodedocumento: string) : Observable<Object> { 
    return this.http.delete(`${this.UrlServidor.GetUrlDelServicioAPIRest()}?numerodedocumento=${numerodedocumento}`); 
  }
  
}
