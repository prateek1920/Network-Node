import { TestBed } from '@angular/core/testing';

import { LinksinfoService } from './linksinfo.service';

describe('LinksinfoService', () => {
  let service: LinksinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
