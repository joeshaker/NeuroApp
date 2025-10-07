import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Videoedit } from './videoedit';

describe('Videoedit', () => {
  let component: Videoedit;
  let fixture: ComponentFixture<Videoedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Videoedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Videoedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
