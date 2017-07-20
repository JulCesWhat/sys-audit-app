import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PageService } from './../common/services/page.service';
import { Subject, Observable } from 'rxjs/RX';


@Injectable()
export class PageChefResolverService implements Resolve<any> {
  
  private errorMessage: string;

  constructor(private pageService: PageService) { }

  resolve() {
    return this.pageService.getChefData()
      .map(chefData => chefData,
      error => {
        console.log('Error in the resolver. :)')
        this.errorMessage = <any>error;
      })
      .catch(e => Observable.of({error: e}));
  }

}
