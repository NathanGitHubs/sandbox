import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  Directive,
  NgModule,
  Input,
  // Output,
  // EventEmitter,
  TemplateRef,
  ViewContainerRef
}                               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';

//
// Domain Model
//
class Joke {
  public hide: boolean;

  constructor(public setup: string, public punchline: string) {
    this.hide = true;
  }

  toggle(): void {
    this.hide = !this.hide;
  }
}

//
// Structural Directives
//
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ccIf]'
})
export class CodeCraftIfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input('predicate') set ccIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ccFor]'
})
export class CodeCraftForOfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ccForOf(collection: any) {
    const fuckYou: any = this.viewContainer.get(0);
    console.log(fuckYou);
    if (collection) {
      this.viewContainer.createEmbeddedView(this.templateRef, collection[0]);
    } else {
      this.viewContainer.clear();
    }
  }
}

//
// Components
//
//
@Component({
  selector: 'app-joke',
  template: `
    <div class="card card-block">
      <h4 class="card-title">
        {{ data.setup }}
      </h4>
      <ng-template ccIf [predicate]="!data.hide">
        <p class="card-text">
          {{ data.punchline }}
        </p>
      </ng-template>
      <button class="btn btn-primary"
              (click)="data.toggle()">Tell Me
      </button>
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
    <ng-template ngFor
                 let-j
                 [ngForOf]="jokes">
      <app-joke [joke]="j"></app-joke>
    </ng-template>
  `
})
class JokeListComponent {
  jokes: Joke[] = [];

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

//
// Bootstrap
//
@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    CodeCraftIfDirective,
    CodeCraftForOfDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
