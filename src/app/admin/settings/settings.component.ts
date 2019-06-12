import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
  constructor(private readonly titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Settings');

  }
}
