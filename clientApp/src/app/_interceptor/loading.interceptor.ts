import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusySnipService } from '../_service/busy-snip.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private bustSpin: BusySnipService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.bustSpin.busy()
    console.log("Run loading Service")
    return next.handle(request).pipe(
      delay(2000),
      finalize(() => {
        this.bustSpin.idle()
      })
    );
  }
}
