import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/Entidades/cliente';
import { Servidorapirest } from 'src/app/Entidades/servidor';

@Injectable({
  providedIn: 'root'
})
export class ModificarclienteService {

  private UrlServidor = Servidorapirest.ObtenerInstancia();
  
  constructor(private http: HttpClient) { }

  public ModificarPropiedadesDeCliente(cliente: Cliente) : Observable<Object> { 
    return this.http.put(`${this.UrlServidor.GetUrlDelServicioAPIRest()}`, JSON.stringify(cliente)); 
  }

}
