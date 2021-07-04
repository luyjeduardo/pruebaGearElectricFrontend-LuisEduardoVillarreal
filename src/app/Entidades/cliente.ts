export class Cliente {
    private Nombresyapellidos: any;
    private Tipodedocumento: any;
    private Numerodedocumento: any;
    private Telefono: any;
    private Email: any;
    private Estado: any;

    private static _instancia: Cliente;
    public static ObtenerInstancia() : Cliente {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Cliente;
        }
        return this._instancia;
    }
    
    public SetNombresYApellidos(nombresyapellidos: string): void{ this.Nombresyapellidos = nombresyapellidos; }
    public GetNombresYApellidos(): string{ return this.Nombresyapellidos; }
    public SetTipoDeDocumento(tipodedocumento: string): void{ this.Tipodedocumento = tipodedocumento; }
    public GetTipoDeDocumento(): string{ return this.Tipodedocumento; }
    public SetNumeroDeDocumento(numerodedocumento: string): void{ this.Numerodedocumento = numerodedocumento; }
    public GetNumeroDeDocumento(): string{ return this.Numerodedocumento; }
    public SetTelefono(telefono: string): void{ this.Telefono = telefono; }
    public GetTelefono(): string{ return this.Telefono; }
    public SetEmail(email: string): void{ this.Email = email; }
    public GetEmail(): string{ return this.Email; }
    public SetEstado(estado: string): void{ this.Estado = estado; }
    public GetEstado(): string{ return this.Estado; }
}
