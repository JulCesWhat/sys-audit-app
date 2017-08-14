import { Component, OnInit } from '@angular/core';
import { PageService } from './../../common/services/page.service'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  refreshRunning: boolean

  constructor(private pageService: PageService, public snackBar: MdSnackBar) {
    this.refreshRunning = false
  }

  ngOnInit() {}

  refreshDB() {
    if (!this.refreshRunning) {
      this.refreshRunning = true;
      this.pageService.getRefreshDB().subscribe(
        response => {
          console.log("Succes")
          this.openSnackBar("Refresh database", "Success");
          this.refreshRunning = false;
        },
        err => {
          console.log('There was an error in the refresh db.')
          this.openSnackBar("Refresh dabase", "Failure");
          this.refreshRunning = false;
        });
    } else {
      console.log("Refresh is already running.")
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
