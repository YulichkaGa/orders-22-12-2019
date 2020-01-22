import * as _ from 'lodash';

import { Injectable } from '@angular/core';

export class Order {
  ID: number;
  ClientName: string;
  EventName: string;
  NumberOrderPlaces: number;
  EventId: number;
}

export interface IEvent {
  ID: number;
  EventDate: string;
  EventName: string;
  Location: string;
  AmountPlaces: number;
  AvailablePlaces: number;
}

export class Event implements IEvent {
  ID: number;
  EventDate: string;
  EventName: string;
  Location: string;
  AmountPlaces: number;
  AvailablePlaces: number;

  // tslint:disable-next-line: no-shadowed-variable
  public constructor(event: IEvent, orders: Array<Order>) {
    this.ID = event.ID;
    this.EventDate = event.EventDate;
    this.EventName = event.EventName;
    this.Location = event.Location;
    this.AmountPlaces = event.AmountPlaces;
    this.AvailablePlaces = this.AmountPlaces - this.calculateOrdered(orders);
  }

  // tslint:disable-next-line: no-shadowed-variable
  public calculateOrdered(orders: Array<Order>): number {
    return _.reduce(
      orders.filter(item => item.EventName === this.EventName),
      (sum, i) => (sum += sum + i.NumberOrderPlaces),
      0
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  public recalculateAvailablePlaces(orders: Array<Order>): void {
    this.AvailablePlaces = this.AmountPlaces - this.calculateOrdered(orders);
  }
}

const events: IEvent[] = [
  {
    ID: 1,
    EventDate: '24-02-2018',
    EventName: 'Madona',
    Location: 'Tel-aviv',
    AmountPlaces: 10000,
    AvailablePlaces: 56
  },
  {
    ID: 2,
    EventDate: '24-11-2019',
    EventName: 'Zemfira',
    Location: 'Tel-aviv',
    AmountPlaces: 20000,
    AvailablePlaces: 79
  },
  {
    ID: 3,
    EventDate: '20-11-2019',
    EventName: 'The Killers',
    Location: 'Tel-aviv',
    AmountPlaces: 10600,
    AvailablePlaces: 178
  },
  {
    ID: 4,
    EventDate: '12-11-2019',
    EventName: 'Bruno Mars',
    Location: 'New-York',
    AmountPlaces: 10600,
    AvailablePlaces: 178
  },
  {
    ID: 5,
    EventDate: '10-11-2019',
    EventName: 'Arctic Monkeys',
    Location: 'New-York',
    AmountPlaces: 10600,
    AvailablePlaces: 178
  },
  {
    ID: 6,
    EventDate: '10-11-2019',
    EventName: 'Marun-5',
    Location: 'New-York',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 7,
    EventDate: '8-11-2019',
    EventName: 'Lady Gaga',
    Location: 'New-York',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 8,
    EventDate: '8-11-2019',
    EventName: 'The Verve',
    Location: 'New-York',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 9,
    EventDate: '19-11-2019',
    EventName: 'Two feet',
    Location: 'New-York',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 10,
    EventDate: '19-11-2019',
    EventName: 'Alla Pugachova',
    Location: 'Tel-Aviv',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 11,
    EventDate: '9-11-2019',
    EventName: 'Ocian Alzy',
    Location: 'Tel-Aviv',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  },
  {
    ID: 11,
    EventDate: '9-11-2019',
    EventName: 'Shlomo Arzi',
    Location: 'Tel-Aviv',
    AmountPlaces: 20000,
    AvailablePlaces: 178
  }
];

const orders: Order[] = [
  {
    ID: 1,
    ClientName: 'Oleg Cohan',
    EventName: 'Madona',
    NumberOrderPlaces: 2,
    EventId: 1
  },
  {
    ID: 2,
    ClientName: 'Shon Oren',
    EventName: 'Madona',
    NumberOrderPlaces: 2,
    EventId: 1
  },
  {
    ID: 3,
    ClientName: 'Orna Oren',
    EventName: 'Zemfira',
    NumberOrderPlaces: 1,
    EventId: 2
  },
  {
    ID: 4,
    ClientName: 'Gal Oren',
    EventName: 'Zemfira',
    NumberOrderPlaces: 1,
    EventId: 2
  },
  {
    ID: 5,
    ClientName: 'Zvika Orenil',
    EventName: 'Zemfira',
    NumberOrderPlaces: 1,
    EventId: 2
  },
  {
    ID: 6,
    ClientName: 'Zvika Orenil',
    EventName: 'Madona',
    NumberOrderPlaces: 1,
    EventId: 1
  },
  {
    ID: 7,
    ClientName: 'The killers',
    EventName: 'Madona',
    NumberOrderPlaces: 1,
    EventId: 3
  }
];

@Injectable()
export class Service {
  maxID = orders[orders.length - 1].ID;
  getMaxID() {
    return this.maxID;
  }

  getEvents(): IEvent[] {
    const tmp: string = localStorage.getItem('events');
    let tmpEvents: Array<IEvent>;
    if (tmp) {
      tmpEvents = JSON.parse(tmp);
    } else {
      tmpEvents = [];
    }
    return tmpEvents;
  }

  addEvent(event: IEvent) {
    const tmp: string = localStorage.getItem('events');
    let tmpEvents: Array<IEvent>;
    if (tmp) {
      tmpEvents = JSON.parse(tmp);
    } else {
      tmpEvents = [];
    }
    tmpEvents.push(event);
    localStorage.setItem('events', JSON.stringify(tmpEvents));
    return tmpEvents;
  }

  updateEvents(event: Array<IEvent>) {

    localStorage.setItem('events', JSON.stringify(event));


  }

  getOrders() {
    const tmp: string = localStorage.getItem('orders');
    let tmpOrders: Array<Order>;
    if (tmp) {
      tmpOrders = JSON.parse(tmp);
    } else {
      tmpOrders = [];
    }
    return tmpOrders;
  }
}

