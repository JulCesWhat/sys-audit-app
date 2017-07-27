import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme: boolean
  @ViewChild('sidenav') sidenav:MdSidenav;

  constructor() {
    this.isDarkTheme = false
    //overlayContainer.themeClass = 'unicorn-dark-theme';
  }

  onSidebarToggle(toggle: boolean): void {
      this.sidenav.open()
  }

  onThemeToggle(theme: boolean): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
