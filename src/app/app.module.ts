import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistrarDatosPersonalesComponent } from './Componentes/principal/registrar-datos-personales/registrar-datos-personales.component';
import { ListarClientesComponent } from './Componentes/principal/listar-clientes/listar-clientes.component';
import { MostrarTotalClientesComponent } from './Componentes/principal/mostrar-total-clientes/mostrar-total-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    RegistrarDatosPersonalesComponent,
    ListarClientesComponent,
    MostrarTotalClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
