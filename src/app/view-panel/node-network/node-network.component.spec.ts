import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeNetworkComponent } from './node-network.component';

describe('NodeNetworkComponent', () => {
  let component: NodeNetworkComponent;
  let fixture: ComponentFixture<NodeNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
