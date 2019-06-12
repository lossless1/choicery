import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'recover',
  templateUrl: 'recover.component.html'
})

export class RecoverComponent implements OnInit {
  constructor(private readonly titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Register');
  }
}
