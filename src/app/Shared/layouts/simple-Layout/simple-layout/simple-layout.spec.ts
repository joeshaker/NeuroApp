import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLayout } from './simple-layout';

describe('SimpleLayout', () => {
  let component: SimpleLayout;
  let fixture: ComponentFixture<SimpleLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
