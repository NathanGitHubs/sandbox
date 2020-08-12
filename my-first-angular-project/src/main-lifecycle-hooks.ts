import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule,
  Input,
  // Output,
  // EventEmitter,
  // ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
}                               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle(): void {
    this.hide = !this.hide;
  }
}

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-joke',
  template: `
    <div class='card card-block'>
      <h4 class='card-title'>
        <ng-content select='.setup'></ng-content>
      </h4>
      <p class='card-text'
         [hidden]='data.hide'>
        <ng-content select='.punchline'></ng-content>
      </p>
      <a class='btn btn-primary'
         (click)='data.toggle()'>Tell Me
      </a>
    </div>
  `
})
class JokeComponent
  implements OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  // @ts-ignore
  @Input('joke') data: Joke;

  constructor() {
    // @ts-ignore
    console.log(`new - data is ${this.data}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges - data is ${this.data}`);

    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        console.log(`${key} changed.
            Current: ${changes[key].currentValue}.
            Previous: ${changes[key].previousValue}
            `);
      }
    }
  }

  ngOnInit(): void {
    console.log(`ngOnInit  - data is ${this.data}`);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}

@Component({
  selector: 'app-joke-list',
  template: `
    <app-joke *ngFor='let j of jokes' [joke]='j'>
      <span class='setup'>{{ j.setup }}?</span>
      <h1 class='punchline'>{{ j.punchline }}</h1>
    </app-joke>

    <button type='button'
            class='btn btn-success'
            (click)='addJoke()'>Add Joke
    </button>
    <button type='button'
            class='btn btn-danger'
            (click)='deleteJoke()'>Clear Jokes
    </button>
  `
})
class JokeListComponent {
  jokes: Joke[] = [];

  addJoke(): void {
    this.jokes.unshift(
      new Joke(
        'What did the cheese say when it looked in the mirror',
        'Hello-me (Halloumi)'
      )
    );
  }

  deleteJoke(): void {
    this.jokes = [];
  }
}

@Component({
  selector: 'app-main',
  template: `
    <app-joke-list></app-joke-list>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
