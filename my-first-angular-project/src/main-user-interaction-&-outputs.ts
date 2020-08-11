import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter
  // @ts-ignore
}                               from '@angular/core';
// @ts-ignore
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
  selector: 'app-joke-form',
  template: `
    <div class="card card-block">
      <h4 class="card-title">Create Joke</h4>
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Enter the setup"
               #setup>
      </div>
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Enter the punchline"
               #punchline>
      </div>
      <button type="button"
              class="btn btn-primary"
              (click)="createJoke(setup.value, punchline.value)">Create
      </button>
    </div>
  `
})
class JokeFormComponent {
  @Output('jokeCreated') emitter: EventEmitter<Joke> = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string): void {
    const joke: Joke = new Joke(setup, punchline);
    this.emitter.emit(joke);
  }
}

@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{data.setup}}</h4>
      <p class="card-text"
         [hidden]="data.hide">{{data.punchline}}</p>
      <a (click)="data.toggle()" [draggable]="false"
         class="" [ngClass]="hideIfPunchlineEmpty()">{{tell()}} Me
      </a> <!-- class="" for intellisense for testing -->
    </div>
  `
})
class JokeComponent {
  // @ts-ignore
  @Input('joke') data: Joke;

  hideIfPunchlineEmpty(): string {
    if (!this.data.punchline) {
      return 'invisible';
    } else {
      return 'btn btn-warning';
    }
  }

  tell(): string {
    if (!this.data.hide) {
      return 'Hide';
    } else {
      return 'Tell';
    }
  }
}

@Component({
  selector: 'app-joke-list',
  template: `
    <app-joke-form (jokeCreated)="addJoke($event)"></app-joke-form>
    <app-joke *ngFor="let j of jokes" [joke]="j"></app-joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke(
        'What did the cheese say when it looked in the mirror?',
        'Hello-me (Halloumi)'
      ),
      new Joke(
        'What kind of cheese do you use to disguise a small horse?',
        'Mask-a-pony (Mascarpone)'
      ),
      new Joke(
        'A kid threw a lump of cheddar at me',
        'I thought ‘That’s not very mature’'
      )
    ];
  }

  addJoke(joke: Joke): void {
    // this.jokes.unshift(joke);
    this.jokes.push(joke);

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
