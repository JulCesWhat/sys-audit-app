import { TestBed, inject } from '@angular/core/testing';

import { PageAwsResolverService } from './page-aws-resolver.service';

describe('PageAwsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageAwsResolverService]
    });
  });

  it('should be created', inject([PageAwsResolverService], (service: PageAwsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
