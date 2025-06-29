import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XYZComponent } from './xyz.component';

describe('XYZComponent', () => {
  let component: XYZComponent;
  let fixture: ComponentFixture<XYZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XYZComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XYZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
