import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registerinstructor } from './registerinstructor';

describe('Registerinstructor', () => {
  let component: Registerinstructor;
  let fixture: ComponentFixture<Registerinstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registerinstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registerinstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
