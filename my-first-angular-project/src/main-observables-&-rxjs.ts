import {NgModule, Component, OnInit} from '@angular/core';
import {BrowserModule}               from '@angular/platform-browser';
import {platformBrowserDynamic}      from '@angular/platform-browser-dynamic';
import {
  map
  // filter,
  // take
}                                    from 'rxjs/operators';
import {
  interval, Observable
  // pipe
}                                    from 'rxjs';
import *  as  data                   from './pokemon/ditto.json';

export interface Ability2 {
  name: string;
  url: string;
}

export interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface GameIndice {
  game_index: number;
  version: Version;
}

export interface Item {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}

export interface VersionDetail {
  rarity: number;
  version: Version2;
}

export interface HeldItem {
  item: Item;
  version_details: VersionDetail[];
}

export interface Move2 {
  name: string;
  url: string;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

export interface Move {
  move: Move2;
  version_group_details: VersionGroupDetail[];
}

export interface Species {
  name: string;
  url: string;
}

export interface DreamWorld {
  front_default: string;
  front_female?: any;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface Other {
  dream_world: DreamWorld;
  official_artwork: OfficialArtwork;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface Yellow {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

export interface GenerationI {
  red_blue: RedBlue;
  yellow: Yellow;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface Silver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface FireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface RubySapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIii {
  emerald: Emerald;
  firered_leafgreen: FireredLeafgreen;
  ruby_sapphire: RubySapphire;
}

export interface DiamondPearl {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface HeartgoldSoulsilver {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Platinum {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationIv {
  diamond_pearl: DiamondPearl;
  heartgold_soulsilver: HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface BlackWhite {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationV {
  black_white: BlackWhite;
}

export interface OmegarubyAlphasapphire {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface XY {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationVi {
  omegaruby_alphasapphire: OmegarubyAlphasapphire;
  x_y: XY;
}

export interface UltraSunUltraMoon {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface GenerationVii {
  ultra_sun_ultra_moon: UltraSunUltraMoon;
}

export interface Versions {
  generation_i: GenerationI;
  generation_ii: GenerationIi;
  generation_iii: GenerationIii;
  generation_iv: GenerationIv;
  generation_v: GenerationV;
  generation_vi: GenerationVi;
  generation_vii: GenerationVii;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: Other;
  versions: Versions;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Type2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export type PokemonWithDate = {
  date: Date;
} & Pokemon;

@Component({
  selector: 'app-main',
  template: `
    <div>
      <p>Observables & RxJS Example</p>
      <p>(Please check the console)</p>
      <h4>{{pokemon?.date}}</h4>
      <h1>Pokemon Details</h1>
      <p>Name: {{pokemon?.name}}</p>
      <img alt="" [src]="pokemon?.sprites.front_default">
      <img alt="" [src]="pokemon?.sprites.back_default">
      <div *ngFor="let type of pokemon?.types">
        <p>Type: {{type.type.name}}</p>
        <a [href]="type.type.url">For more details</a>
      </div>
      <div *ngFor="let gameIndex of pokemon?.game_indices">
        <p>Game Version: {{gameIndex.version.name}}</p>
        <a [href]="gameIndex.version.url">For more game indices</a>
      </div>
    </div>
  `
})
class AppComponent implements OnInit {
  private pokemonObservable: Observable<PokemonWithDate>;
  pokemon!: PokemonWithDate;

  constructor() {
    this.pokemonObservable = interval(1000).pipe(map((value: number): Pokemon => {
      console.log(value);
      // @ts-ignore
      return data.default;
    })).pipe(map((value: Pokemon): PokemonWithDate => {
      const date: any = {
        date: new Date()
      };
      const result: PokemonWithDate = {...date, ...value};
      return result;
    }));
  }

  ngOnInit(): void {
    // interval(1000).pipe(
    //   take(3),
    //   // @ts-ignore
    //   // tslint:disable-next-line:typedef
    //   map(v => {
    //     return Date.now();
    //   })
    // ).subscribe((value: any): void => {
    //    console.log('Subscriber: ' + value);
    // });

    this.pokemonObservable.subscribe((payload: PokemonWithDate): void => {
      this.pokemon = payload;
      console.log('payload:', payload);
    });

    /*
     const middleware = pipe(
     take(3),
     map(v => Date.now())
     );

     interval(1000)
     .pipe(middleware)
     .subscribe(value => console.log("Subscriber: " + value));
     */
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then();
