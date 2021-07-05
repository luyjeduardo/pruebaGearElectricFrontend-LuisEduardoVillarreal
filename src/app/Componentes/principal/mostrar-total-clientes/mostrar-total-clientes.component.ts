import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Entidades/cliente';
import { ListarclientesService } from 'src/app/Servicios/Consultar/listarclientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-total-clientes',
  templateUrl: './mostrar-total-clientes.component.html',
  styleUrls: ['./mostrar-total-clientes.component.css']
})
export class MostrarTotalClientesComponent implements OnInit {

  public Total: any = 0;
  public Clientes: Cliente[] = [];

  constructor(private serviciodelistados: ListarclientesService) { }

  ngOnInit(): void {
    this.CargarClientes();
    this.SumarParticipantes();
  }

  private async SumarParticipantes(){
    await this.Delay(500);
    for (let index = 0; index < this.Clientes.length; index++) {
      await this.Delay(100);
      this.Total += 1;
    }
  }

  private Delay(tiempo: number){
    return new Promise( resolve => setTimeout(resolve, tiempo) );
  }

  private CargarClientes() {
    var response: any;
    this.Clientes = [];
    this.serviciodelistados.ConsultarLosClientes().subscribe(respuesta => {
      response = respuesta;
      if(response['respuesta'] === "success"){
        response['clientes'].forEach((obj: { [x: string]: string; }) => {
          var cliente = new Cliente();
          cliente.SetTipoDeDocumento(obj['tipodedocumento']);
          cliente.SetNumeroDeDocumento(obj['numerodedocumento']);
          cliente.SetNombresYApellidos(obj['nombresyapellidos']);
          cliente.SetTelefono(obj['telefono']);
          cliente.SetEmail(obj['email']);
          cliente.SetEstado(obj['estado']);
          this.Clientes.push(cliente);
        });
      } else if(response['respuesta'] === "error"){
         this.AlertasSwalError('¡ERROR!', response['mensaje']);
      }
    });
  }

  private AlertasSwalError(encabezado: string, cuerpo: string) {
    Swal.fire({
      title: '¡'+ encabezado +'!',
      text: cuerpo,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entiendo',
      footer: '<a style="color: dodgerblue;">Prueba de software.</a>'
    })
  }

}
