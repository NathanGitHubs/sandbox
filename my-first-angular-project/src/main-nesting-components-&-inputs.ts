import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule, Input}        from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {Component}              from '@angular/core';

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;
  public message: string;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
    this.message = 'Tell Me';
  }

  toggle(): void {
    this.hide = !this.hide;
    if (!this.hide) {
      this.message = 'Hide Me';
    } else {
      this.message = 'Tell Me';
    }
  }
}

@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{data.setup}}</h4>
      <p class="card-text" [hidden]="data.hide">{{data.punchline}}</p>
      <a (click)="data.toggle()" class="btn btn-warning">{{data.message}} </a>
    </div>
  `
})
class JokeComponent {
  // @ts-ignore
  @Input('joke') data: Joke;
  // same as ln#41: @Input() joke: Joke;
}

@Component({
  selector: 'app-joke-list',
  template: `
    <app-joke *ngFor="let j of jokes" [joke]="j"></app-joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke('What did the cheese say when it looked in the mirror?', 'Hello-me (Halloumi)'),
      new Joke('What kind of cheese do you use to disguise a small horse?', 'Mask-a-pony (Mascarpone)'),
      new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’')
    ];
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
    JokeListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
