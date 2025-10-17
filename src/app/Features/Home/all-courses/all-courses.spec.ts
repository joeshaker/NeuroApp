import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourses } from './all-courses';

describe('AllCourses', () => {
  let component: AllCourses;
  let fixture: ComponentFixture<AllCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
