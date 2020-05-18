import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxModalComponent } from './box-modal.component';

describe('BoxModalComponent', () => {
  let component: BoxModalComponent;
  let fixture: ComponentFixture<BoxModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
