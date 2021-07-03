import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTotalClientesComponent } from './mostrar-total-clientes.component';

describe('MostrarTotalClientesComponent', () => {
  let component: MostrarTotalClientesComponent;
  let fixture: ComponentFixture<MostrarTotalClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarTotalClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarTotalClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
