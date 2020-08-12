import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, NgModule, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
  selector: 'app-joke-form',
  templateUrl: './joke-form-component.html',
  styleUrls: [
    './joke-form-component.css'
  ],
  encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.None
})
class JokeFormComponent {
  @Output() jokeCreated: EventEmitter<Joke> = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string): void {
    this.jokeCreated.emit(new Joke(setup, punchline));
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
    <app-joke-form (jokeCreated)='addJoke($event)'></app-joke-form>
    <app-joke *ngFor='let j of jokes' [joke]='j'>
      <span class='setup'>{{ j.setup }}?</span>
      <h1 class='punchline'>{{ j.punchline }}</h1>
    </app-joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke('What did the cheese say when it looked in the mirror', 'Hello-me (Halloumi)'),
      new Joke('What kind of cheese do you use to disguise a small horse', 'Mask-a-pony (Mascarpone)'),
      new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’'),
    ];
  }

  addJoke(joke: Joke): void {
    this.jokes.unshift(joke);
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
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
