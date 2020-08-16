import {NgModule, Component, OnInit} from '@angular/core';
import {BrowserModule}               from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  map,
  // filter,
  take
}                               from 'rxjs/operators';
import {
  interval
  // pipe
}                               from 'rxjs';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <p>Observables & RxJS Example</p>
      <p>(Please check the console)</p>
    </div>
  `
})
class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    interval(1000).pipe(
      take(3),
      // @ts-ignore
      // tslint:disable-next-line:typedef
      map(v => {
        return Date.now();
      })
    ).subscribe((value: any): void => {
      console.log('Subscriber: ' + value);
    });

    /*
     const middleware = pipe(
     take(3),
     map(v => Date.now())
     );

     interval(1000)
     .pipe(middleware)
     .subscribe(value => console.log("Subscriber: " + value));
     */
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
