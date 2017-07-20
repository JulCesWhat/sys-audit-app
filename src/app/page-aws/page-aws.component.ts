import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-aws',
  templateUrl: './page-aws.component.html',
  styleUrls: ['./page-aws.component.css']
})
export class PageAwsComponent implements OnInit {
  
  content: any
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    console.log("Was I able to get here!!!!!");
    this.content = this.route.snapshot.data['awsData'];
  }

}
