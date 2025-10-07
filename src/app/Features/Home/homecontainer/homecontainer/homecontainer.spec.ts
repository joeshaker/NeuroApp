import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homecontainer } from './homecontainer';

describe('Homecontainer', () => {
  let component: Homecontainer;
  let fixture: ComponentFixture<Homecontainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homecontainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homecontainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
