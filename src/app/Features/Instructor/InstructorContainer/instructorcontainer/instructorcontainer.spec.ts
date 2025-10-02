import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instructorcontainer } from './instructorcontainer';

describe('Instructorcontainer', () => {
  let component: Instructorcontainer;
  let fixture: ComponentFixture<Instructorcontainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instructorcontainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Instructorcontainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
