import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  Directive,
  Renderer2,
  ElementRef,
  NgModule,
  Input,
  // TemplateRef,
  ViewContainerRef, NgZone
  // Output,
  // EventEmitter
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

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ccCardHover]'
})
class CardHoverDirective {
  constructor(protected renderer: Renderer2,
              protected el: ElementRef,
              protected viewContainer: ViewContainerRef) {
    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    // renderer.setStyle(el.nativeElement, 'backgroundColor', 'gray');
    const value: string = 'gray';
    const style: string = 'backgroundColor';
    const nothing: any = value === null ? renderer.removeStyle(el.nativeElement, style) : renderer.setStyle(el.nativeElement, style, value);
    console.log(nothing, el, viewContainer);
  }
}

@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block" ccCardHover>
      <h4 class="card-title">{{data.setup}}</h4>
      <p class="card-text"
         [hidden]="data.hide">{{data.punchline}}</p>
      <button (click)="data.toggle()"
              class="btn btn-primary">Tell Me
      </button>
    </div>
  `
})
class JokeComponent {
  // @ts-ignore
  @Input('joke') data: Joke;

  constructor(protected zone: NgZone) {
    console.log('zone:', zone);
  }
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
    JokeListComponent,
    CardHoverDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
