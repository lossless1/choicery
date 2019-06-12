import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  constructor(private readonly titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign Up');
  }
}
