import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule,
  Input,
  // Output,
  // EventEmitter,
  // ViewEncapsulation,
  // SimpleChanges,
  // OnChanges,
  OnInit,
  // DoCheck,
  AfterContentInit,
  // AfterContentChecked,
  AfterViewInit,
  // AfterViewChecked,
  // OnDestroy,
  ViewChild,
  ViewChildren,
  ContentChild,
  // ContentChildren,
  ElementRef,
  QueryList
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
class JokeComponent {
  // @ts-ignore
  @Input('joke') data: Joke;
}

@Component({
  selector: 'app-joke-list',
  template: `
    <h4 #header>View Jokes</h4>
    <app-joke *ngFor='let j of jokes' [joke]='j'>
      <span class='setup'>{{ j.setup }}?</span>
      <h1 class='punchline'>{{ j.punchline }}</h1>
    </app-joke>
    <h4>Content Jokes</h4>
    <ng-content></ng-content>
  `
})
class JokeListComponent implements OnInit, AfterContentInit, AfterViewInit {
  jokes: Joke[] = [
    new Joke(
      'What did the cheese say when it looked in the mirror',
      'Hello-me (Halloumi)'
    ),
    new Joke(
      'What kind of cheese do you use to disguise a small horse',
      'Mask-a-pony (Mascarpone)'
    )
  ];

  @ViewChild(JokeComponent) jokeViewChild?: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren?: QueryList<JokeComponent>;
  @ViewChild('header') headerEl?: ElementRef;
  @ContentChild(JokeComponent) jokeContentChild?: JokeComponent;

  constructor() {
    // @ts-ignore
    console.log(`new - jokeViewChild is ${this.jokeViewChild}`);
    // @ts-ignore
    console.log(`new - jokeContentChild is ${this.jokeContentChild}`);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(
      `ngAfterContentInit - jokeContentChild is ${this.jokeContentChild}`
    );
  }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);

    if (this.jokeViewChildren) {
      const jokes: JokeComponent[] = this.jokeViewChildren.toArray();
      console.log(jokes);

    }

    console.log(`ngAfterViewInit - headerEl is ${this.headerEl}`);
    if (this.headerEl) {
      this.headerEl.nativeElement.textContent = 'Best Joke Machine';
    }

    console.log(
      `ngAfterViewInit - jokeContentChild is ${this.jokeContentChild}`
    );
  }
}

@Component({
  selector: 'app-main',
  template: `
    <app-joke-list>
      <app-joke [joke]='joke'>
        <span class='setup'>{{ joke.setup }}?</span>
        <h1 class='punchline'>{{ joke.punchline }}</h1>
      </app-joke>
    </app-joke-list>
  `
})
class AppComponent {
  joke: Joke = new Joke(
    'A kid threw a lump of cheddar at me',
    'I thought ‘That’s not very mature’'
  );
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
