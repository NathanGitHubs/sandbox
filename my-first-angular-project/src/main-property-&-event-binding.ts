import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {Component}              from '@angular/core';

@Component({
  selector: 'joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke of jokes">
      <h4 class="card-title">{{joke.setup}}</h4>
      <p class="card-text" [hidden]="joke.hide">{{joke.punchline}}</p>
      <a class="btn btn-warning" (click)="toggle(joke)">{{this.message}}</a>
    </div>
  `
})
class JokeListComponent {
  jokes: Object[];
  message: string;

  constructor() {
    this.jokes = [
      {
        setup: 'What did the cheese say when it looked in the mirror?',
        punchline: 'Hello-Me (Halloumi)',
        hide: true
      },
      {
        setup: 'What kind of cheese do you use to disguise a small horse?',
        punchline: 'Mask-a-pony (Mascarpone)',
        hide: true
      },
      {
        setup: 'A kid threw a lump of cheddar at me',
        punchline: 'I thought ‘That’s not very mature’',
        hide: true
      }
    ];
    this.message = 'Tell Me';
  }

  toggle(joke: any) {
    joke.hide = !joke.hide;
    if(joke.hide === false){
      this.message = 'Hide Me'
    } else {
      this.message = 'Tell Me';
    }
  }

  // toggleMessage(joke:any){
  //   if(joke.hide === false){
  //     this.message = 'Hide Me'
  //   } else {
  //     this.message = 'Tell Me';
  //   }
  // }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeListComponent],
  bootstrap: [JokeListComponent]
})
export class AppModule {
}

platformBrowserDynamic()
  .bootstrapModule(AppModule);
