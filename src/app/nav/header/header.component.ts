import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean

  @Output() toggleSideBar = new EventEmitter<boolean>();
  @Output() toggleTheme = new EventEmitter<boolean>();

  constructor() {
    this.isDarkTheme = false
  }

  ngOnInit() {
  }

  sidebarToggle() {
    this.toggleSideBar.emit(true);
  }

  themeToggle() {
    this.isDarkTheme = !this.isDarkTheme;
    this.toggleTheme.emit(this.isDarkTheme);
  }

}
