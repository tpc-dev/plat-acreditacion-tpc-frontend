import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorVisitasComponent } from './tabla-buscador-visitas.component';

describe('TablaBuscadorVisitasComponent', () => {
  let component: TablaBuscadorVisitasComponent;
  let fixture: ComponentFixture<TablaBuscadorVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
