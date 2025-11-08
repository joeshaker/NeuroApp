import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearning } from './my-learning';

describe('MyLearning', () => {
  let component: MyLearning;
  let fixture: ComponentFixture<MyLearning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLearning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLearning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
