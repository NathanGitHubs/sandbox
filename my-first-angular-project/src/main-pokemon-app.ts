import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {Component}              from '@angular/core';

import  *  as  data  from  './pokemon/ditto.json';

@Component({
  selector: 'pokemon',
  template: `
    <h1>Pokemon Details</h1>
    <p>Name: {{pokemon.name}}</p>
    <img [src]="pokemon.sprites.front_default">
    <img [src]="pokemon.sprites.back_default">
    <div *ngFor="let type of pokemon.types">
      <p>Type: {{type.type.name}}</p>
      <a [href]="type.type.url">For more details</a>
    </div>
    <div *ngFor="let gameIndex of pokemon.game_indices">
      <p>Game Version: {{gameIndex.version.name}}</p>
      <a [href]="gameIndex.version.url">For more game indices</a>
    </div>

  `
})
class PokemonComponent {
  pokemon: any;
  constructor() {
    // @ts-ignore
    this.pokemon = data.default
    console.log('data:', this.pokemon);
  }

  JSONStringify(item: any): string{
    return JSON.stringify(item);
  }
}

@Component({
  selector: 'app',
  template: `
    <pokemon></pokemon>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    PokemonComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic()
  .bootstrapModule(AppModule);

