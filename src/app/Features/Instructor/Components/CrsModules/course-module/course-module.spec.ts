import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModule } from './course-module';

describe('CourseModule', () => {
  let component: CourseModule;
  let fixture: ComponentFixture<CourseModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
