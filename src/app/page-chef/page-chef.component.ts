import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chefItem } from './../common/models/data.model';

import { ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-page-chef',
  templateUrl: './page-chef.component.html',
  styleUrls: ['./page-chef.component.css']
})
export class PageChefComponent implements OnInit {

  displayedColumns = ['cDName', 'cDPlatform', 'cDEnvironment', 'cDRoles', 'cdSecure'];
  chefData: chefItem[]
  dataSource: ExampleDataSource | null;
  exampleDatabase: ExampleDatabase
  
  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.chefData = this.route.snapshot.data['chefData'];
    this.exampleDatabase = new ExampleDatabase(this.chefData);
  }

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    this.changeDetector.detectChanges();
  }

    setColor(cDSecureValue: string) {
      var color:string = "green";
      if (cDSecureValue === "false") {
        color = "red";
      }
      return color;
    }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<chefItem[]> = new BehaviorSubject<chefItem[]>([]);
  get data(): chefItem[] { return this.dataChange.value; }

  constructor(ec2DataItems: chefItem[]) {
    this.dataChange.next(ec2DataItems)
  }
}


/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<chefItem[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: chefItem) => {
        let searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() { }
}