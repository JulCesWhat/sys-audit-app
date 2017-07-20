import { TestBed, inject } from '@angular/core/testing';

import { PageChefResolverService } from './page-chef-resolver.service';

describe('PageChefResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageChefResolverService]
    });
  });

  it('should be created', inject([PageChefResolverService], (service: PageChefResolverService) => {
    expect(service).toBeTruthy();
  }));
});
