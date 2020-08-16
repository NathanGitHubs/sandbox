import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  Directive,
  Renderer2,
  HostListener,
  HostBinding,
  ElementRef,
  NgModule,
  Input
  // Output,
  // EventEmitter
}                               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import * as ts                  from 'typescript';

interface MyInterface {
  [name: string]: any;
}

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
  @HostBinding('class.card-outline-primary') protected isHovering?: boolean;

  @Input('ccCardHover') config: any = {
    querySelector: '.card-text'
  };

  @Input('appendedClass') appendedClass: MyInterface = {
    class4: true
  };

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver(): void {
    const part: any = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, 'display', 'block');
    this.isHovering = true;
    // console.log(JSON.stringify(this.appendedClass));
    Object.keys(this.appendedClass).forEach((key: string): void => {
      const value: any = this.appendedClass[key];
      console.log(key, value);

      // const adfsdf: any = '{Run: (data: string)}';

      const result: any = ts.transpile(value);
      // tslint:disable-next-line:no-eval
      const runnable: any = eval(result);
      if (runnable) {
        // TODO add key to class name
        this.renderer.addClass(this.el.nativeElement, key);
      }
    });
  }

  @HostListener('mouseout') onMouseOut(): void {
    const part: any = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, 'display', 'none');
    this.isHovering = false;
  }
}

@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block"
         [class.class2]="true"
         [class]="{'class3': true}"
         [appendedClass]="{'whoAmI': true}"
         [ccCardHover]="{querySelector:'p'}">
      <h4 class="card-title">{{data?.setup}}</h4>
      <p class="card-text"
         [style.display]="'none'">{{data?.punchline}}</p>
    </div>
  `
})
class JokeComponent {
  @Input('joke') data?: Joke;
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
