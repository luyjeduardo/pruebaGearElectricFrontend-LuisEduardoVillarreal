import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/Entidades/cliente';
import { ListarclientesService } from 'src/app/Servicios/Consultar/listarclientes.service';
import Swal from 'sweetalert2';
import * as Jquery from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InhabilitarclienteService } from 'src/app/Servicios/Modificar/inhabilitarcliente.service';
import { ToastrService } from 'ngx-toastr';
import { Validaciones } from '../Validaciones/validaciones';
import { EliminarclienteService } from 'src/app/Servicios/Eliminar/eliminarcliente.service';
import { ModificarclienteService } from 'src/app/Servicios/Modificar/modificarcliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  public Nombresyapellidos: any;
  public Tipodedocumento: any;
  public Numerodedocumento: any;
  public Telefono: any;
  public Email: any;
  public Estado: any;
  private Cliente = Cliente.ObtenerInstancia();
  public Clientes: Cliente[] = [];
  private Singletonvalidaciones = Validaciones.ObtenerInstancia();

  constructor(private serviciodelistados: ListarclientesService,
              public serviciomodal: NgbModal,
              private serviciodemodificacion: InhabilitarclienteService,
              private serviciodemodificacion_: ModificarclienteService,
              private serviciodeeliminacion: EliminarclienteService,
              private serviciodetoast: ToastrService) { }

  ngOnInit(): void {
    this.CargarClientes();
    this.PrevenirPaste();
  }

  public EliminarCliente(){
    Swal.fire({
      title: '¡ELIMINAR CLIENTE!',
      text: '¿Desea en realidad eliminar el cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Un momento, no',
      footer: '<a href>Prueba de software.</a>'
    }).then((result) => {
      if (result.value) {
        this.EliminacionConfirmada();
      }
    })
  }

  private EliminacionConfirmada(){
    var response: any;
    this.serviciodeeliminacion.EliminarCliente(this.Numerodedocumento).subscribe(
      resultado => {
        response = resultado;
        if (response['respuesta'] === "success") {
          this.serviciomodal.dismissAll();
          this.serviciodetoast.success(response['mensaje'], "ELIMINADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2000
          });
          this.CargarClientes();
        } else if (response['respuesta'] === "error") {
          this.AlertasSwalError('¡ALGO NO ESTÁ BIEN!', response['mensaje']);
        }
      }
    );
  }

  ValidarParaModificar() {
    if(this.ValidarContenidoEnLosAtributos()){
      if (this.ValidarEmail()) {
        this.EncapsularPropiedades();
        this.ModificarCliente();
      } else{
        this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar un email válido, verifíquelo.');
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información.');
    } 
  }

  private ModificarCliente() {
    var response: any;
    this.serviciodemodificacion_.ModificarPropiedadesDeCliente(this.Cliente).subscribe(
      resultado => {
        response = resultado;
        console.log(resultado);
        if (response["respuesta"] === "success") {
          this.serviciodetoast.success(response["mensaje"].toString(), "MODIFICADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2500
          });
          this.CargarClientes();
        } else if (response["respuesta"] === "error") {
          this.AlertasSwalError('ERROR', 'Ha ocurrido un error. (' + response["mensaje"] + ").");
        }
      }
    );
  }

  private ValidarContenidoEnLosAtributos() : boolean {
    return this.Singletonvalidaciones.ValidarContenidoEnLosAtributos(this.Nombresyapellidos, this.Tipodedocumento, this.Numerodedocumento, this.Telefono, this.Email);
  }

  private ValidarEmail() : boolean {
    return this.Singletonvalidaciones.ValidarEmail(this.Email);
  }

  public EncapsularPropiedades() {
    this.Cliente.SetNombresYApellidos(this.Nombresyapellidos);
    this.Cliente.SetTipoDeDocumento(this.Tipodedocumento);
    this.Cliente.SetNumeroDeDocumento(this.Numerodedocumento);
    this.Cliente.SetTelefono(this.Telefono);
    this.Cliente.SetEmail(this.Email);
    this.Cliente.SetEstado(this.Estado.toLowerCase());
  }

  public TipoDeDocumentoSeleccionado(){
    this.Tipodedocumento = Jquery("#tipodedocumento").val();
  }

  public ActualizarEstadoDeRegistro() {
    if (Jquery('#customswitch1').prop('checked')) {
      this.Estado = "Activo"
    } else {
      this.Estado = "Inactivo"
    }
  }

  public AbrirModalModificarCliente(cliente: Cliente, contenido: any, bandera: boolean){
    this.CargarInformacion(cliente, bandera);
    this.serviciomodal.open(contenido, {size: 'lg'})
  }

  private CargarInformacion(cliente: Cliente, bandera: boolean){
    this.Nombresyapellidos = cliente.GetNombresYApellidos();
    this.Tipodedocumento = cliente.GetTipoDeDocumento();
    this.Numerodedocumento = cliente.GetNumeroDeDocumento();
    this.Telefono = cliente.GetTelefono();
    this.Email = cliente.GetEmail();
    if (cliente.GetEstado() === "activo"){
      this.Estado = "Activo";
    } else {
      this.Estado = "Inactivo";
    } 
    if (!bandera) {
      this.ValidarElementosConJquery();
    }
    this.AsignarValorAlSelectYValidarCheckBoxConJquery();
  }

  private ValidarElementosConJquery(){
    Jquery(function(){
        $('#eliminar').hide();
        $('#modificar').hide();
        $('#tipodedocumento').prop('readonly', true);
        $('#nombresyapellidos').prop('readonly', true);
        $('#email').prop('readonly', true);
        $('#telefono').prop('readonly', true);
        $('#customswitch1').prop('readonly', true);
    })
  }

  private AsignarValorAlSelectYValidarCheckBoxConJquery(){
    const tipodedocumento = this.Tipodedocumento;
    const estado = this.Estado;
    Jquery(function(){
      $('#tipodedocumento').val(tipodedocumento);
      if (estado == "Activo") {
        $('#customswitch1').prop('checked', true);
      } else {
        $('#customswitch1').prop('checked', false);
      }
    })
  }

  public InhabilitarCliente(cliente: Cliente) {
    var response: any;
    this.serviciodemodificacion.ModificarEstadoDeCliente(cliente.GetNumeroDeDocumento()).subscribe(
      resultado => {
        response = resultado;
        if (response['respuesta'] === "success") {
          this.serviciodetoast.success(response['mensaje'], "INHABILITADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2000
          });
          this.CargarClientes();
        } else if (response['respuesta'] === "error") {
          this.AlertasSwalError('¡ALGO NO ESTÁ BIEN!', response['mensaje']);
        }
      }
    );
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

  private PrevenirPaste(){
    this.Singletonvalidaciones.PrevenirPaste();
  }

  public ValidarCaracteresNumericosYMaxLength(id: string, event: KeyboardEvent, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresNumericosYMaxLength(id, event, length);
  }

  public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
    this.Singletonvalidaciones.ValidarCaracteresAlfabeticosYMaxLength(event, id, length);
  }

  public ValidarMaxLength(event: KeyboardEvent, id: string, length: number){
    this.Singletonvalidaciones.ValidarMaxLength(event, id, length);
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
