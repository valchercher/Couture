import { TestBed } from '@angular/core/testing';

import { ApiCategorieService } from './categorie/api-categorie.service';

describe('ApiCategorieService', () => {
  let service: ApiCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
