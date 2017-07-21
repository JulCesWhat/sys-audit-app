import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject, Observable } from 'rxjs/RX';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class PageService {

  private _backEndUrl = environment.API_HOST + ":" + environment.API_PORT + "/api/v1";

  constructor(public _http: Http) { };

  private get xsrfToken() {
    // todo: some logic to retrieve the cookie here. we're in a service, so you can inject anything you'd like for this
    return '';
  }

  private getRequestOptions() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  private handleError(error: Response){
    return Observable.throw(error.json().error || 'Server error');
  }

  getAWSData(): Observable<any[]> {
    return this._http.get(this._backEndUrl + "/awsData", this.getRequestOptions())
            .map((response: Response) => <any[]>response.json())
            //.do(data => (this.NewsHomeData = <INewsCategory[]>(JSON.stringify(data))))//console.log("All: " + JSON.stringify(data)))
            .catch(this.handleError);
  };

  getChefData(): Observable<any[]> {
    return this._http.get(this._backEndUrl + '/cheffData', this.getRequestOptions())
            .map((response: Response) => <any>response.json())
            //.do(data => (this.NewsCategoryData = JSON.stringify(data)))
            .catch(this.handleError);
  }
}
