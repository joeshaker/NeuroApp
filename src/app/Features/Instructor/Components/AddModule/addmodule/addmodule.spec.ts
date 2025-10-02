import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmodule } from './addmodule';

describe('Addmodule', () => {
  let component: Addmodule;
  let fixture: ComponentFixture<Addmodule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addmodule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addmodule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
