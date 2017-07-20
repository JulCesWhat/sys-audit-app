import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import { appRoutes } from './routes';

import { PageService } from './common/services/page.service';
import { PageAwsResolverService } from './page-aws/page-aws-resolver.service';
import { PageChefResolverService } from './page-chef/page-chef-resolver.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './nav/header/header.component';
import { FooterComponent } from './nav/footer/footer.component';
import { SideBarComponent } from './nav/side-bar/side-bar.component';
import { PageAwsComponent } from './page-aws/page-aws.component';
import { PageChefComponent } from './page-chef/page-chef.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    PageAwsComponent,
    PageChefComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PageService,
    PageAwsResolverService,
    PageChefResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
