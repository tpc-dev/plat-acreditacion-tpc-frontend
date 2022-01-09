import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorNombradaComponent } from './tabla-buscador-nombrada.component';

describe('TablaBuscadorNombradaComponent', () => {
  let component: TablaBuscadorNombradaComponent;
  let fixture: ComponentFixture<TablaBuscadorNombradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorNombradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorNombradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
