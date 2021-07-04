import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/Entidades/cliente';

@Injectable({
  providedIn: 'root'
})
export class RegistrardatospersonalesService {

  constructor(private http: HttpClient) { }

  public RegistrarCliente(cliente: Cliente) : Observable<Object> { 
    console.log(cliente);
    return this.http.post(`registrarusuario.php`, JSON.stringify(cliente)); 
  }

}
