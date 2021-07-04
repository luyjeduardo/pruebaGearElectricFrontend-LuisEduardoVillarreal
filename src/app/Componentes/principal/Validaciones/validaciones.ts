import { Cliente } from '../../../Entidades/cliente';
declare var Jquery: any;

export class Validaciones {

    private static _instancia: Validaciones;
    public static ObtenerInstancia() : Validaciones {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Validaciones;
        }
        return this._instancia;
    }

    public ValidarContenidoEnLosAtributos(nombresyapellidos: string, tipodedocumento: string, numerodedocumento: string, telefono: string, email: string) : boolean {
        if(nombresyapellidos !== undefined && nombresyapellidos !== null && nombresyapellidos !== "" &&
           tipodedocumento !== undefined && tipodedocumento !== null && tipodedocumento !== "" &&
           numerodedocumento !== undefined && numerodedocumento !== null && numerodedocumento !== "" &&
           telefono !== undefined && telefono !== null && telefono !== "" &&
           email !== undefined && email !== null && email !== ""){
          return true;
        } else {
          return false;
        }
    }

    public ValidarCaracteresNumericosYMaxLength(id: string, event: KeyboardEvent, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }

    public ValidarCaracteresAlfanumericosYMaxLength(id: string, event: KeyboardEvent, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[.@0-9a-zA-Z_-]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }
    
    public ValidarCaracteresAlfabeticosYMaxLength(event: KeyboardEvent, id: string, length: number) {
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        const pattern = /[a-zA-Z ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {    
          event.preventDefault();
        } else if(cajadetexto.value.length >= length){
            event.preventDefault();
        }
    }

    public ValidarMaxLength(event: KeyboardEvent, id: string, length: number){
        var cajadetexto = document.getElementById(id) as HTMLInputElement;
        if(cajadetexto.value.length >= length)
            event.preventDefault();
    }
        
    public PrevenirPaste(){
        var nombresyapellidos = <HTMLElement>document.getElementById('nombresyapellidos');
        var numerodedocumento = <HTMLElement>document.getElementById('numerodedocumento');
        var telefono = <HTMLElement>document.getElementById('telefono');
        var email = <HTMLElement>document.getElementById('email');
        nombresyapellidos.onpaste = function(e) { e.preventDefault(); }
        numerodedocumento.onpaste = function(e) { e.preventDefault(); }
        telefono.onpaste = function(e) { e.preventDefault(); }
        email.onpaste = function(e) { e.preventDefault(); }
    }

    public ValidarEmail(email: string) : boolean {
        var bandera = false;
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        bandera = regexp.test(email);
        return bandera;
    }

}
