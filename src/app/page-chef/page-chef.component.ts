import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-chef',
  templateUrl: './page-chef.component.html',
  styleUrls: ['./page-chef.component.css']
})
export class PageChefComponent implements OnInit {

  content: any
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.content = this.route.snapshot.data['chefData']
  }

}
