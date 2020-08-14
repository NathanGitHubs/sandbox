import {NgModule, Component}    from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-ngnonbindable-example',
  template: `<h4>NgNonBindable</h4>
  <div>
    To render the name variable we use this syntax
    <pre ngNonBindable>{{ name }}</pre>
  </div>
  `
})
class NgNonBindableExampleComponent {
}

@Component({
  selector: 'app-main',
  template: `
    <app-ngnonbindable-example></app-ngnonbindable-example>`
})
class DirectivesAppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [NgNonBindableExampleComponent, DirectivesAppComponent],
  bootstrap: [DirectivesAppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule).then();
