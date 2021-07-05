import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistrarDatosPersonalesComponent } from './Componentes/principal/registrar-datos-personales/registrar-datos-personales.component';
import { ListarClientesComponent } from './Componentes/principal/listar-clientes/listar-clientes.component';
import { MostrarTotalClientesComponent } from './Componentes/principal/mostrar-total-clientes/mostrar-total-clientes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
