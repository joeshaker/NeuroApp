import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmodule } from './editmodule';

describe('Editmodule', () => {
  let component: Editmodule;
  let fixture: ComponentFixture<Editmodule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editmodule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmodule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
