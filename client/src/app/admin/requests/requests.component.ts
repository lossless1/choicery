import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'requests',
  templateUrl: 'requests.component.html'
})

export class RequestsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    import('../../../assets/js/purpose.js');
  }
}
