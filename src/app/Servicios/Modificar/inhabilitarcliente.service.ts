import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/Entidades/cliente';
import { Servidorapirest } from '../../Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class InhabilitarclienteService {

  private UrlServidor = Servidorapirest.ObtenerInstancia();
  
  constructor(private http: HttpClient) { }

  public ModificarEstadoDeCliente(numerodedocumento: string) : Observable<Object> { 
    return this.http.put(`${this.UrlServidor.GetUrlDelServicioAPIRest()}`, JSON.stringify(numerodedocumento)); 
  }
  
}
