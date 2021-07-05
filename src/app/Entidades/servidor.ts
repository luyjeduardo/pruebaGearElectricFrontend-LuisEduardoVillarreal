export class Servidorapirest {
    private Url: any;

    private static _instancia: Servidorapirest;
    public static ObtenerInstancia() : Servidorapirest {
        if(this._instancia === null || this._instancia === undefined) {
            this._instancia = new Servidorapirest;
        }
        return this._instancia;
    }
    
    public GetUrlDelServicioAPIRest(): string{ return "http://localhost/pruebaGearElectricBackend-LuisEduardoVillarreal/api-rest/endpoint/servicio-api-rest.php"; }
}

