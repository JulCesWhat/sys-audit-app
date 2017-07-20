import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ec2Item } from './../common/models/data.model';

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
    selector: 'app-page-aws',
    templateUrl: './page-aws.component.html',
    styleUrls: ['./page-aws.component.css']
})
export class PageAwsComponent {

  displayedColumns = ['userId', 'userName'];
  ec2Data: ec2Item[]
  dataSource: ExampleDataSource | null;
  exampleDatabase: ExampleDatabase

  constructor(private route: ActivatedRoute) {
      this.ec2Data = this.route.snapshot.data['awsData'];
      this.exampleDatabase = new ExampleDatabase(this.ec2Data);
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
  }

}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<ec2Item[]> = new BehaviorSubject<ec2Item[]>([]);
    get data(): ec2Item[] { return this.dataChange.value; }

    constructor(ec2DataItems: ec2Item[]) {
        // Fill up the database with 100 users.
        for (let i = 0; i < ec2DataItems.length; i++) {
          this.addEC2Data(ec2DataItems[i]);
        }
    }

    addEC2Data(ec2Single: ec2Item) {
        const copiedData = this.data.slice();
        copiedData.push(ec2Single);
        this.dataChange.next(copiedData);
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
  connect(): Observable<ec2Item[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: ec2Item) => {
        let searchStr = (item.name + item.id).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}
}