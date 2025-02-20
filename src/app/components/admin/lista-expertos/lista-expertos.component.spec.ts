import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExpertosComponent } from './lista-expertos.component';

describe('ListaExpertosComponent', () => {
  let component: ListaExpertosComponent;
  let fixture: ComponentFixture<ListaExpertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaExpertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaExpertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
