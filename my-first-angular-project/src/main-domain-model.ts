import {Component}              from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}               from '@angular/core';

export class Joke {
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
  selector: 'app-joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke of jokes">
      <h4 class="card-title">{{joke.setup}}</h4>
      <p class="card-text" [hidden]="joke.hide">{{joke.punchline}}</p>
      <a class="btn btn-warning" (click)="joke.toggle()">{{joke.message}}</a>
    </div>
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

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeListComponent],
  bootstrap: [JokeListComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
