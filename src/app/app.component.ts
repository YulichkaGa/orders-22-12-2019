import { Component, NgModule, enableProdMode } from '@angular/core';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { Event, Order, Service } from './app.service';

import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: '../app/app.component.html',
  styleUrls: ['../app/app.component.css'],
  providers: [Service]
})
export class AppComponent {
  public events: Event[];
  public orders: Order[];
  public tasksDataSourceStorage: any;

  constructor(private service: Service) {
    this.orders = service.getOrders();
    this.events = service
      .getEvents()
      .map(event => new Event(event, this.orders));

    this.tasksDataSourceStorage = [];
  }

  onDataSourceChanged($event) {

    const index = this.events.indexOf($event.data);
    this.events.splice(index, 1);
    [new Event($event.data, this.orders)].concat(this.events);
    this.events.push();
    this.service.updateEvents(this.events);

  }

  getOrders(key: any) {
    let item = this.tasksDataSourceStorage.find(
      (i: { key: any }) => i.key === key
    );
    if (!item) {
      item = {
        key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.orders,
            key: 'ID'
          }),
          filter: ['EventId', '=', key]
        })
      };
      this.tasksDataSourceStorage.push(item);
    }

    return item.dataSourceInstance;
  }
  addEvent(key: any) {
    const events = this.service.getEvents();

    let item = this.tasksDataSourceStorage.find(
      (i: { key: any }) => i.key === key
    );
    if (!item) {
      item = {
        key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.orders,
            key: 'ID'
          }),
          filter: ['EventId', '=', key]
        })
      };
      this.tasksDataSourceStorage.push(item);
    }

    return item.dataSourceInstance;
  }
  addOrder(key: any) {
    const orders = this.service.getOrders();

    let item = this.tasksDataSourceStorage.find(
      (i: { key: any }) => i.key === key
    );
    if (!item) {
      item = {
        key,
        dataSourceInstance: new DataSource({
          store: new ArrayStore({
            data: this.orders,
            key: 'ID'
          }),
          filter: ['EventId', '=', key]
        })
      };
      this.tasksDataSourceStorage.push(item);
    }

    return item.dataSourceInstance;
  }
}
