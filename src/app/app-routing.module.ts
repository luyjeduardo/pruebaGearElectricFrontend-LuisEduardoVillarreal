import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarClientesComponent } from './Componentes/principal/listar-clientes/listar-clientes.component';
import { MostrarTotalClientesComponent } from './Componentes/principal/mostrar-total-clientes/mostrar-total-clientes.component';
import { PrincipalComponent } from './Componentes/principal/principal.component';
import { RegistrarDatosPersonalesComponent } from './Componentes/principal/registrar-datos-personales/registrar-datos-personales.component';

const routes: Routes = [
  { path: 'principal', 
    component: PrincipalComponent,
    children: [
      { path: 'registrarclientes', component: RegistrarDatosPersonalesComponent },
      { path: 'listarclientes', component: ListarClientesComponent },
      { path: 'totalclientes', component: MostrarTotalClientesComponent }
    ]
  },
  { path: '',   redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
