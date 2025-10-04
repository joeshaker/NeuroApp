import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideo } from './add-video';

describe('AddVideo', () => {
  let component: AddVideo;
  let fixture: ComponentFixture<AddVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
