import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ec2Item } from './../common/models/data.model';

import { ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
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

  displayedColumns = ['awsName', 'awsOwner', 'awsPlatform', 'awsIntanceID', 'awsPrivateIP', 'awsManaged'];
  ec2Data: ec2Item[]
  dataSource: ExampleDataSource | null;
  exampleDatabase: ExampleDatabase

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.ec2Data = this.route.snapshot.data['awsData'];
    this.exampleDatabase = new ExampleDatabase(this.ec2Data);
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
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
    var color: string = "green";
    if (cDSecureValue === "false") {
      color = "red";
    }
    return color;
  }

  onBlur() {
    this.dataSource.onBlur()
  }

  onFocus() {
    this.dataSource.onFocus()
  }
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<ec2Item[]> = new BehaviorSubject<ec2Item[]>([]);
  get data(): ec2Item[] { return this.dataChange.value; }

  constructor(ec2DataItems: ec2Item[]) {
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
  _filterAction: boolean
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort) {
    super();
    this._filterAction = false;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ec2Item[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

      if (this._filterAction) {
        return this._exampleDatabase.data.slice().filter((item: ec2Item) => {
          
          let searchStr: string;
          switch (this._sort.active) {
            //case 'awsName': searchStr = (item.name).toLocaleLowerCase(); break;
            case "awsOwner": searchStr = (item.owner).toLocaleLowerCase(); break;
            case "awsPlatform": searchStr = (item.platform ? item.platform : "").toLocaleLowerCase(); break;
            case "awsIntanceID": searchStr = (item.instanceId).toLocaleLowerCase(); break;
            case "awsPrivateIP": searchStr = (item.privateIP).toLocaleLowerCase(); break;
            //case "awsManaged": searchStr = (item.managedByChef).toLocaleLowerCase(); break;
            default: searchStr = (item.name).toLocaleLowerCase(); break;
          }

          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        });
      } else {
        return this.getSortedData();
      }
    });
  }

  disconnect() { }

  getSortedData(): ec2Item[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'awsName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'awsOwner': [propertyA, propertyB] = [a.owner, b.owner]; break;
        case 'awsPlatform': [propertyA, propertyB] = [a.platform, b.platform]; break;
        case 'awsIntanceID': [propertyA, propertyB] = [a.instanceId, b.instanceId]; break;
        case 'awsPrivateIP': [propertyA, propertyB] = [a.privateIP, b.privateIP]; break;
        case 'awsManaged': [propertyA, propertyB] = [a.managedByChef, b.managedByChef]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

  onBlur() {
    this._filterAction = false
  }

  onFocus() {
    this._filterAction = true
  }
}