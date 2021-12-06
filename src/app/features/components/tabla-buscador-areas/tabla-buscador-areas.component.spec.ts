import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorAreasComponent } from './tabla-buscador-areas.component';

describe('TablaBuscadorAreasComponent', () => {
  let component: TablaBuscadorAreasComponent;
  let fixture: ComponentFixture<TablaBuscadorAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
