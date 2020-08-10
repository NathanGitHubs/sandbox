import {platformBrowserDynamic}                from '@angular/platform-browser-dynamic';
import {EventEmitter, Input, NgModule, Output} from '@angular/core';
import {BrowserModule}                         from '@angular/platform-browser';
import {Component}                             from '@angular/core';

import *  as  restaurant from './uber-eats/restaurant.json';
import *  as  menus      from './uber-eats/menus.json';

export type Location = {
  address: string;
  address_2: string;
  city: string;
  country: string;
  postal_code: string;
  state: string;
  latitude: number;
  longitude: number;
}

export type Restaurant = {
  name: string;
  store_id: string;
  location: Location;
  contact_emails: string[];
  raw_hero_url: string;
  price_bucket: string;
  avg_prep_time: number;
  status: string;
}

export type Translations = {
  en_us: string;
}

export type Description = {
  translations: Translations;
}

export type Translations2 = {
  en_us: string;
}

export type Title = {
  translations: Translations2;
}

export type NutritionalInfo = {
  kilojoules?: any;
  calories?: any;
}

export type Quantity = {
  max_permitted: number;
  min_permitted?: any;
  default_quantity?: any;
  charge_above?: any;
  refund_under?: any;
}

export type Override = {
  context_type: string;
  context_value: string;
  quantity: Quantity;
}

export type Quantity2 = {}

export type QuantityInfo = {
  overrides: Override[];
  quantity: Quantity2;
}

export type ModifierGroupIds = {
  overrides: any[];
  ids: string[];
}

export type Override2 = {
  context_type: string;
  context_value: string;
  price: number;
}

export type PriceInfo = {
  price: number;
  overrides: Override2[];
}

export type TaxInfo = {
  tax_rate?: any;
  vat_rate_percentage?: any;
}

export type Item = {
  description: Description;
  title: Title;
  nutritional_info: NutritionalInfo;
  quantity_info: QuantityInfo;
  external_data?: any;
  suspension_info?: any;
  modifier_group_ids: ModifierGroupIds;
  image_url?: any;
  price_info: PriceInfo;
  tax_info: TaxInfo;
  id: string;
}

export type DisplayOptions = {
  disable_item_instructions: boolean;
};

export type TimePeriod = {
  start_time: string;
  end_time: string;
};

export type ServiceAvailability = {
  time_periods: TimePeriod[];
  day_of_week: string;
};

export type Translations3 = {
  en_us: string;
};

export type Title2 = {
  translations: Translations3;
};

export type Menu = {
  service_availability: ServiceAvailability[];
  category_ids: string[];
  id: string;
  title: Title2;
};

export type Entity = {
  type: string;
  id: string;
};

export type Translations4 = {
  en_us: string;
};

export type Title3 = {
  translations: Translations4;
};

export type Category = {
  entities: Entity[];
  id: string;
  title: Title3;
};

export type Quantity3 = {
  max_permitted: number;
  min_permitted: number;
  default_quantity?: any;
  charge_above?: any;
  refund_under?: any;
};

export type QuantityInfo2 = {
  overrides: any[];
  quantity: Quantity3;
};

export type Translations5 = {
  en_us: string;
};

export type Title4 = {
  translations: Translations5;
};

export type ModifierOption = {
  type: string;
  id: string;
};

export type ModifierGroup = {
  quantity_info: QuantityInfo2;
  title: Title4;
  external_data: string;
  modifier_options: ModifierOption[];
  display_type?: any;
  id: string;
};

export type RestaurantMenu = {
  items: Item[];
  display_options: DisplayOptions;
  menus: Menu[];
  categories: Category[];
  modifier_groups: ModifierGroup[];
};

export type OrderedItem = Item & {
  quantity: number;
};

@Component({
  selector: 'order',
  template: `
    <div class="card card-block">{{data.quantity}}
      x {{data.title.translations.en_us}} {{dollarSign}}{{data.price_info.price / 100}} {{"\u00A0"}}
      <button (click)="increaseQuantity(data)" class="btn btn-primary">+</button>
      {{"\u00A0"}}
      <button (click)="decreaseQuantity(data)" class="btn btn-secondary">-</button>
      {{"\u00A0"}}
      <button (click)="deleteOrderedItem(data)" class="btn btn-warning">Delete</button>
    </div>
  `
})
class OrderComponent {
  // @ts-ignore
  @Input('orderedItem') data: OrderedItem;
  dollarSign: string;
  @Output('incrementQuantity') incrementQuantity: EventEmitter<OrderedItem>;
  @Output('decrementQuantity') decrementQuantity: EventEmitter<OrderedItem>;
  @Output('removeOrderedItem') removeOrderedItem: EventEmitter<OrderedItem>;

  constructor() {
    this.dollarSign = '$';
    this.incrementQuantity = new EventEmitter<OrderedItem>();
    this.decrementQuantity = new EventEmitter<OrderedItem>();
    this.removeOrderedItem = new EventEmitter<OrderedItem>();

  }

  increaseQuantity(item: OrderedItem): void {
    this.incrementQuantity.emit(item);
  }

  decreaseQuantity(item: OrderedItem): void {
    this.decrementQuantity.emit(item);
  }

  deleteOrderedItem(item: OrderedItem) {
    this.removeOrderedItem.emit(item);
  }
}

@Component({
  selector: 'order-list',
  template: `
    <h1>My Order</h1>
    <order *ngFor="let item of mapToArray(myItems)" [orderedItem]="item"
           (incrementQuantity)="increaseQuantity($event)"
           (decrementQuantity)="decreaseQuantity($event)"
           (removeOrderedItem)="deleteOrderedItem($event)"
    ></order>
  `
})
class OrderListComponent {
  // @ts-ignore
  @Input('myItems') myItems: Map<string, OrderedItem>;
  @Output('incrementQuantity') incrementQuantity: EventEmitter<OrderedItem>;
  @Output('decrementQuantity') decrementQuantity: EventEmitter<OrderedItem>;
  @Output('removeOrderedItem') removeOrderedItem: EventEmitter<OrderedItem>;

  constructor() {
    this.incrementQuantity = new EventEmitter<OrderedItem>();
    this.decrementQuantity = new EventEmitter<OrderedItem>();
    this.removeOrderedItem = new EventEmitter<OrderedItem>();

  }

  mapToArray(myItems: Map<string, OrderedItem>): OrderedItem[] {
    const values: OrderedItem[] = Array.from(myItems.values());
    return values;
  }

  increaseQuantity(item: OrderedItem): void {
    console.log(item);
    this.incrementQuantity.emit(item);
  }

  decreaseQuantity(item: OrderedItem): void {
    console.log(item);
    this.decrementQuantity.emit(item);
  }

  deleteOrderedItem(item: OrderedItem): void {
    console.log(item);
    this.removeOrderedItem.emit(item);
  }
}

/* ***********
 *
 * Menu Item Component
 *
 ************** */
@Component({
  selector: 'menu-item',
  template: `
    <img [src]="item.image_url" [alt]="item.title.translations.en_us" [ngClass]="checkIfFalsey(item)">
    <p>{{item.title.translations.en_us}} {{dollarSign}}{{item.price_info.price / 100}}</p>
    <button (click)="addItem(item)" class="btn-primary">Add to Order</button>
    <hr/>
  `
})
class MenuItemComponent {
  // @ts-ignore
  @Input('menuItem') item: Item;
  @Output('itemAdded') emitter: EventEmitter<Item> = new EventEmitter<Item>();
  dollarSign: string;

  constructor() {
    // @ts-ignore
    this.item = menus.default;
    this.dollarSign = '$';
  }

  checkIfFalsey(item: Item): string {
    if (!item.image_url) {
      return 'invisible';
    } else {
      return '';
    }

  }

  addItem(item: Item) {
    this.emitter.emit(item);
  }
}

/* ***********
 *
 * Menu Component
 *
 ************** */
@Component({
  selector: 'menus',
  template: `
    <h1>Menu Items</h1>
    <menu-item *ngFor="let item of restaurantMenu.items" [menuItem]="item" (itemAdded)="addItem($event)"></menu-item>
  `
})
class MenusComponent {
  // @ts-ignore
  @Input('restaurantMenu') restaurantMenu: RestaurantMenu;
  @Output(`itemReceivedFromMenu`) emitter: EventEmitter<Item> = new EventEmitter<Item>();

  addItem(item: Item) {
    this.emitter.emit(item);
  }

}

/* ***********
 *
 * Restaurant Component
 *
 ************** */
@Component({
  selector: 'restaurant',
  template: `
    <h1>{{restaurant.name}}</h1>
    <ul>
      <li>{{restaurant.location.address}}</li>
      <li>{{restaurant.location.address_2}}</li>
      <li>{{restaurant.location.city}}, {{restaurant.location.state}} {{restaurant.location.postal_code}}</li>
      <li>{{restaurant.location.country}}</li>
      <li>Website: <a [href]="restaurant.raw_hero_url">Click to go to Website</a></li>
    </ul>
  `
})
class RestaurantComponent {
  restaurant: Restaurant;

  constructor() {
    // @ts-ignore
    this.restaurant = restaurant.default;
  }
}

@Component({
  selector: 'orchestrator',
  template: `
    <restaurant></restaurant>
    <order-list [myItems]="myItems"
                (incrementQuantity)="increaseQuantityFromOrder($event)"
                (decrementQuantity)="decreaseQuantityFromOrder($event)"
                (removeOrderedItem)="removeFromOrder($event)"
    ></order-list>
    <menus [restaurantMenu]="restaurantMenu" (itemReceivedFromMenu)="addToOrder($event)"></menus>
  `
})
class OrchestratorComponent {
  restaurantMenu: RestaurantMenu;
  myItems: Map<string, OrderedItem>;

  constructor() {
    // @ts-ignore
    this.restaurantMenu = menus.default;
    this.myItems = new Map<string, OrderedItem>();
  }

  addToOrder(item: Item): void {
    const orderedItem: OrderedItem = this.myItems.get(item.id)!;
    if (orderedItem) {
      orderedItem.quantity++;
    } else {
      const newOrderedItem: OrderedItem = {
        ...item,
        quantity: 1
      };
      this.myItems.set(item.id, newOrderedItem);
    }
  }

  removeFromOrder(item: OrderedItem): void {
    const orderedItem: OrderedItem = this.myItems.get(item.id)!;
    if (orderedItem) {
      this.myItems.delete(orderedItem.id);
    }
  }

  decreaseQuantityFromOrder(item: OrderedItem): void {
    const orderedItem: OrderedItem = this.myItems.get(item.id)!;
    if (orderedItem) {
      orderedItem.quantity--;
      if (orderedItem.quantity <= 0) {
        this.myItems.delete(orderedItem.id);
      }
    }
  }

  increaseQuantityFromOrder(item: OrderedItem): void {
    const orderedItem: OrderedItem = this.myItems.get(item.id)!;
    if (orderedItem) {
      orderedItem.quantity++;
      if (orderedItem.quantity <= 0) {
        this.myItems.delete(orderedItem.id);
      }
    } else {
      this.addToOrder(orderedItem);
    }
  }
}

@Component({
  selector: 'app',
  template: `
    <orchestrator></orchestrator>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    OrchestratorComponent,
    RestaurantComponent,
    MenusComponent,
    MenuItemComponent,
    OrderListComponent,
    OrderComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
