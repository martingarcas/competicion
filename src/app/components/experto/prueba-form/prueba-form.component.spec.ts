import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFormComponent } from './prueba-form.component';

describe('PruebaFormComponent', () => {
  let component: PruebaFormComponent;
  let fixture: ComponentFixture<PruebaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
