import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  Directive,
  Renderer2,
  HostListener,
  HostBinding,
  ElementRef,
  NgModule,
  Input, ViewChild, AfterViewInit
  // Output,
  // EventEmitter
} from '@angular/core';
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
  @HostBinding('class.card-outline-primary') protected isHovering?: boolean;

  @HostBinding('attr.data-placement') protected placement?: string;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver(): void {
    const part: any = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setStyle(part, 'display', 'block');
    this.isHovering = true;
    this.placement = 'top-left';
  }

  @HostListener('mouseout') onMouseOut(): void {
    const part: any = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setStyle(part, 'display', 'none');
    this.isHovering = false;
    this.placement = 'bottom-right';

  }
}

@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block" ccCardHover data-placement="undecided" #cardRef>
      <h4 class="card-title">{{data?.setup}}</h4>
      <p class="card-text"
         [style.display]="'none'">{{data?.punchline}}</p>
    </div>
  `
})
class JokeComponent implements AfterViewInit{
  @Input('joke') data?: Joke;
  @ViewChild('cardRef') cardRef?: ElementRef;

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.cardRef}`);
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
