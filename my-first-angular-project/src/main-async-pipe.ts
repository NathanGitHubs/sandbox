import {NgModule, Component, OnDestroy, PipeTransform, Pipe} from '@angular/core';
import {BrowserModule}                                       from '@angular/platform-browser';
import {platformBrowserDynamic}                              from '@angular/platform-browser-dynamic';
import {interval, Subscription}                              from 'rxjs';
import {take, map}                                           from 'rxjs/operators';
import {Observable}                                          from 'rxjs';
import * as _                                                from 'lodash';

type ResolveType<T> = (value?: T | PromiseLike<T>) => void;
type RejectType = (reason?: any) => void;

@Pipe({
  name: 'myJson'
})
class MyJsonPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log(value, args);
    const result: string = JSON.stringify(value);
    return result;
  }
}

@Component({
  selector: 'app-async-pipe',
  template: `
    <div>
      {{data | json}}
    </div>
    <div>
      {{data | myJson}}
    </div>
    <div class="card card-block">
      <h4 class="card-title">AsyncPipe</h4>

      <p class="card-text" ngNonBindable>{{ promise | async }} </p>
      <p class="card-text">{{ promise | async }}  </p>


      <p class="card-text" ngNonBindable>{{ observable$ | async }} </p>
      <p class="card-text">{{ observable$ | async }}</p>


      <p class="card-text" ngNonBindable>{{ observableData }} </p>
      <p class="card-text">{{ observableData }}</p>

      <p class="card-text" ngNonBindable>Chaining: {{ observable$ | async | number: '1.4-4' }} </p>
      <p class="card-text">{{ observable$ | async | number: '1.4-4' }}</p>
    </div>
  `
})
class AsyncPipeComponent implements OnDestroy {
  promise: Promise<string>;
  observable$: Observable<number>;
  subscription!: Subscription;
  observableData!: number;
  data: number[];

  constructor() {
    this.promise = this.getPromise();
    this.observable$ = this.getObservable();
    this.subscribeObservable();
    this.data = [-20];

    const hello: any = {
      id: 42,
      person: {
        name: 'nathan',
        age: 20,
        address: {
          street: '123 Main St',
          state: 'Georgia',
          geolocation: {
            longitude: 1,
            latitude: 2
          }
        }
      }
    };
    console.log(hello);

    const helloShallowClone: any = {...hello};
    console.log(helloShallowClone);
    console.log('shallow comparison:', helloShallowClone.person === hello.person);

    const helloDeepClone: any = _.cloneDeep(hello);
    console.log('deep comparison:', helloDeepClone.person === hello.person);

  }

  getObservable(): Observable<number> {
    return interval(1000)
      .pipe(
        take(10),
        map((v: number): number => {
          return v * v;
        })
      );
  }

  // AsyncPipe subscribes to the observable automatically
  subscribeObservable(): void {
    this.subscription = this.getObservable()
                            .subscribe(
                              (v: number): void => {
                                this.observableData = _.cloneDeep(v);``
                                // this.data.age = v * 2;
                                // this.data.push(v);
                              }
                            );

    setTimeout((): void => {
      const temp: number[] = this.data;
      temp.push(21);
      this.data = _.cloneDeep(temp);

      /* this way works too */
      // this.data.push(21);
      // this.data = _.cloneDeep(this.data);
    }, 5000);
  }

  getPromise(): Promise<string> {
    return new Promise((resolve: ResolveType<string>, reject: RejectType): void => {
      console.log('silence:', reject);
      setTimeout((): void => resolve('Promise complete!'), 3000);
    });
  }

  // AsyncPipe unsubscribes from the observable automatically
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

@Component({
  selector: 'app-main',
  template: `
    <app-async-pipe></app-async-pipe>
  `
})
class AppComponent {
  imageUrl: string = '';
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, AsyncPipeComponent, MyJsonPipe],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then();
