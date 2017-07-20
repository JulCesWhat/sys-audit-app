import { Routes } from '@angular/router';
import { PageChefComponent } from './page-chef/page-chef.component'
import { PageChefResolverService } from './page-chef/page-chef-resolver.service';
import { PageAwsComponent } from './page-aws/page-aws.component';
import { PageAwsResolverService } from './page-aws/page-aws-resolver.service';

export const appRoutes: Routes = [
    {
        path: 'awsData', component: PageAwsComponent,
        resolve: {
            awsData: PageAwsResolverService
        }
    },
    {
        path: 'chefData', component: PageChefComponent,
        resolve: {
            chefData: PageChefResolverService
        }
    },
    //   { 
    //       path: '404', component: Page404Component
    //   },
    //   //{ path: 'user', loadChildren: 'app/user/user.module#UserModule' },
    //   { 
    //       path: '**', pathMatch: 'full', component: Page404Component
    //   }
]
