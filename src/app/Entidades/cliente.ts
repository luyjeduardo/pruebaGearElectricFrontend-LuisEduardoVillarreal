export class Cliente {
    private Nombresyapellidos: string = "";
    private Tipodedocumento: string = "";
    private Numerodedocumento: string = "";
    private Telefono: string = "";
    private Email: string = "";
    
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
}
