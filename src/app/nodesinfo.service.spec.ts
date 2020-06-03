import { TestBed } from '@angular/core/testing';

import { NodesinfoService } from './nodesinfo.service';

describe('NodesinfoService', () => {
  let service: NodesinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodesinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
