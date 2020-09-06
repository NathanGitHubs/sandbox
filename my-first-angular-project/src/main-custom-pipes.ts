import {NgModule, Component, Pipe, PipeTransform} from '@angular/core';
import { BrowserModule }                          from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Pipe({
  name: 'defaultImage'
})
class DefaultPipe implements PipeTransform{
  transform(
    value: string,
    fallback: string,
    forceHttps: boolean = false
  ): string {
    let image: string = '';
    if (value) {
      image = value;
    } else {
      image = fallback;
    }

    if (forceHttps) {
      if (image.indexOf('https') === -1) {
        image = image.replace('http', 'https');
      }
    }

    return image;
  }
}

@Component({
  selector: 'app-main',
  template: `
  <img [src]="imageUrl | defaultImage:'http://s3.amazonaws.com/uifaces/faces/twitter/sillyleo/128.jpg':true" alt=""/>
 `
})
class AppComponent {
  imageUrl: string = '';
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, DefaultPipe],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule).then();
