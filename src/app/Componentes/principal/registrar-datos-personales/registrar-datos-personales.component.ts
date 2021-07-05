import { Component, OnInit } from '@angular/core';
import * as Jquery from 'jquery';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/Entidades/cliente';
import { RegistrardatospersonalesService } from 'src/app/Servicios/Registrar/registrardatospersonales.service';
import { Validaciones } from '../Validaciones/validaciones';
import { ToastrService } from 'ngx-toastr';
import { ListarclientesService } from 'src/app/Servicios/Consultar/listarclientes.service';

@Component({
  selector: 'app-registrar-datos-personales',
  templateUrl: './registrar-datos-personales.component.html',
  styleUrls: ['./registrar-datos-personales.component.css']
})
export class RegistrarDatosPersonalesComponent implements OnInit {

  public Nombresyapellidos: any;
  public Tipodedocumento: any;
  public Numerodedocumento: any;
  public Telefono: any;
  public Email: any;
  public Estado: any = "Activo";
  public Clientes: Cliente[] = [];
  private Singletonvalidaciones: Validaciones = Validaciones.ObtenerInstancia();
  private Cliente = Cliente.ObtenerInstancia();

  constructor(private servicioderegistro: RegistrardatospersonalesService,
              private serviciodelistados: ListarclientesService,
              private serviciodetoast: ToastrService) { }

  ngOnInit(): void {
    this.PrevenirPaste();
    this.CargarClientes();
  }

  ValidarParaRegistrar() {
    if(this.ValidarContenidoEnLosAtributos()){
      if (this.ValidarEmail()) {
        this.EncapsularPropiedades();
        this.RegistrarCliente();
      } else{
        this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar un email válido, verifíquelo.');
      }
    } else {
      this.AlertasSwalError('INCONSISTENCIA', 'Debe digitar toda la información.');
    } 
  }

  private RegistrarCliente() {
    var response: any;
    this.servicioderegistro.RegistrarCliente(this.Cliente).subscribe(
      resultado => {
        response = resultado;
        console.log(resultado);
        if (response["respuesta"] === "success") {
          this.serviciodetoast.success(response["mensaje"].toString(), "REGISTRADO", {
            "progressBar": true,
            "progressAnimation": 'increasing',
            "timeOut": 2500
          });
          this.LimpiarInformacion();
          this.CargarClientes();
        } else if (response["respuesta"] === "error") {
          this.AlertasSwalError('ERROR', 'Ha ocurrido un error. (' + response["mensaje"] + ").");
        }
      }
    );
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

  private LimpiarInformacion(){
    this.Nombresyapellidos = "";
    this.Numerodedocumento = "";
    this.Telefono = "";
    this.Email = "";
    this.Estado = "Activo";
    Jquery('#customswitch1').prop('checked', true);
    Jquery("#tipodedocumento").val("");
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


