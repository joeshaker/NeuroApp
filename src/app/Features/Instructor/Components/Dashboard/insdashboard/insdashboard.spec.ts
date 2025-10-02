import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insdashboard } from './insdashboard';

describe('Insdashboard', () => {
  let component: Insdashboard;
  let fixture: ComponentFixture<Insdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Insdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
