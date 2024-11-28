import { TestBed } from '@angular/core/testing';

import { KalorisizKodFormService } from './kalorisiz-kod-form.service';

describe('KalorisizKodFormService', () => {
  let service: KalorisizKodFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KalorisizKodFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
