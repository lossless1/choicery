import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../core/services';
import { Requests } from '../../../core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'details-requests',
  templateUrl: 'details.requests.component.html'
})

export class DetailsRequestsComponent implements OnInit {
  request: Requests;

  constructor(private readonly requestsService: RequestsService,
              private readonly  route: ActivatedRoute,
              private readonly  router: Router) {
  }

  async ngOnInit() {
    this.route.url.subscribe(async (url) => {

      const currentRequest = await this.requestsService.get(url[1].path).toPromise();

      if (currentRequest) {
        this.request = currentRequest;
      } else {
        this.router.navigate(['/admin/requests']);
      }
    });
  }

  async delete() {
    this.requestsService.destroy(this.request.id);
  }
}
