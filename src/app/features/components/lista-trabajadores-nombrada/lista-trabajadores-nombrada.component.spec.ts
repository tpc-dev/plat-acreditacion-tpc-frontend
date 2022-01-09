import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTrabajadoresNombradaComponent } from './lista-trabajadores-nombrada.component';

describe('ListaTrabajadoresNombradaComponent', () => {
  let component: ListaTrabajadoresNombradaComponent;
  let fixture: ComponentFixture<ListaTrabajadoresNombradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTrabajadoresNombradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTrabajadoresNombradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
