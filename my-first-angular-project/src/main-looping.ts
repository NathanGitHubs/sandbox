import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {Component}              from '@angular/core';

type Joke = {
  setup: string,
  punchline: string
};

@Component({
  selector: 'app-joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke of jokes">
      <h4 class="card-title">{{joke.setup}}</h4>
      <p class="card-text">{{joke.punchline}}</p>
    </div>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      {
        setup: 'What did the cheese say when it looked in the mirror?',
        punchline: 'Hello-Me (Halloumi)'
      },
      {
        setup: 'What kind of cheese do you use to disguise a small horse?',
        punchline: 'Mask-a-pony (Mascarpone)'
      },
      {
        setup: 'A kid threw a lump of cheddar at me',
        punchline: 'I thought ‘That’s not very mature’'
      }
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
