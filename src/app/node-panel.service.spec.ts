import { TestBed } from '@angular/core/testing';

import { NodePanelService } from './node-panel.service';

describe('NodePanelService', () => {
  let service: NodePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
