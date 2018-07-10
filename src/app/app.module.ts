import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';

import { MaterialModule } from './material.module';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { CompanyService } from './services/company.service'



@NgModule ({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    NgxTypeaheadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PersistenceModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    ProcessHttpmsgService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
