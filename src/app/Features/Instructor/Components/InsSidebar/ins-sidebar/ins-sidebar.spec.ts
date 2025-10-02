import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsSidebar } from './ins-sidebar';

describe('InsSidebar', () => {
  let component: InsSidebar;
  let fixture: ComponentFixture<InsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
