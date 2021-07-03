import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDatosPersonalesComponent } from './registrar-datos-personales.component';

describe('RegistrarDatosPersonalesComponent', () => {
  let component: RegistrarDatosPersonalesComponent;
  let fixture: ComponentFixture<RegistrarDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDatosPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
