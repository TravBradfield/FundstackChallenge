import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';

import { Company } from '../shared/company';
import { CompanyService } from '../services/company.service';

import { PersistenceService, StorageType } from 'angular-persistence';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //public url = 'http://suggestqueries.google.com/complete/search';
  public url = 'http://autocomplete.clearbit.com/v1/companies/suggest?query=:';

  values = '';
  noResults = false;
  companies: Array<Company> = [];
  customCompany: Company = {
    id: 0,
    domain: "",
    logo: "",
    name: "",
  };
  myCompanies: Array<Company> = [];
  storedCompanies: Array<Company> = []; 

  constructor(private companyservice: CompanyService,
              private persistenceService: PersistenceService) { }

  ngOnInit() {
    this.storedCompanies = this.persistenceService.get('storedCompanies', StorageType.SESSION);
    if ( this.storedCompanies.length > 0 ) {
      for ( let s of this.storedCompanies ) {
        this.myCompanies.push(s);
      }
    }
  }

  onKey(event: any) { // without type info
    this.values = event.target.value;
    console.log("Values: ", this.values);
    this.getResults();
  }

  getResults() {
    console.log("getResults()");
    this.companyservice.getCompanies(this.values)
      .subscribe(companies => this.companies = companies,
        errmess => { console.log(errmess); },
        () => {
          console.log("Success! ", this.companies);
          if ( this.companies.length < 1 ) {
            this.noResults = true;
          }
          if ( this.companies.length > 0 ) {
            this.noResults = false;
          }
        });
  }

  addToList(selected: Company) {
    console.log("addToList()");
    console.log("Company: ", selected);
    let duplicate = false;
    for ( let c of this.myCompanies ) {
      if ( c.name == selected.name ) {
        duplicate = true;
      }
    }
    if ( duplicate == false ) {
      this.myCompanies.push(selected);
      this.persistenceService.set('storedCompanies', this.myCompanies, { type: StorageType.SESSION });
    }
  }

  addCustom() {
    console.log("addCustom()");
    this.customCompany.name = this.values;
    this.customCompany.domain = this.values + ".com";
    this.myCompanies.push(this.customCompany);
    this.persistenceService.set('storedCompanies', this.myCompanies, { type: StorageType.SESSION });
  }

  deleteCompany(company) {
    console.log("deleteCompany()");
    //this.my = this.data.filter(item => item !== data_item);
    let index = this.myCompanies.indexOf(company);
    console.log("Index: ", index);
    this.myCompanies.splice(index, 1);
    this.persistenceService.set('storedCompanies', this.myCompanies, { type: StorageType.SESSION });
  }


}
