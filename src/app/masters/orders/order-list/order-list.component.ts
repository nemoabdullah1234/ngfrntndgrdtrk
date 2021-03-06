import { ViewChild } from '@angular/core';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { LazyLoadEvent, MenuItem, SelectItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';

import { GlobalService } from '../../../core/global.service';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { SearchService } from './../../../core/search.service';
import { StringUtil } from './../../../core/string.util';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService, GlobalService]
})
export class OrderListComponent implements OnInit, OnDestroy {
  @ViewChild('dt') public dataTable: DataTable;
  private subscription: Subscription;
  dataList: Order[];
  dataRow: Order;
  display = false;
  id = '';
  title = '';
  totalRecords = 0;
  activeStatus: SelectItem[];
  previousQuery: string;
  items: MenuItem[];
  loader = false;
  pagingmessage = '';
  startPageIndex = 1;
  endPageIndex = 10;
  rows:any = '';
  emptyMessage = '';
  innerHeight: any;
  searchQuery = '';
  currentQuery: string;
  eventObj: any;
  displayExport = false;
  exportMessage = '';

  /**
   * Creates an instance of OrderListComponent.
   * @param {OrderService} orderService
   * @param {Router} router
   * @param {GlobalService} globalService
   * @param {ActivatedRoute} route
   * @memberof OrderListComponent
   */
  constructor(
    private orderService: OrderService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
  }


  /**
   * Init Method
   * @memberof OrderListComponent
   */
  public ngOnInit() {
    //// Search Service /////
    this.searchService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'order_search') {
        // reset offset here
        this.eventObj.first = 0;
        this.currentQuery = this.globalService.prepareQuery(this.eventObj);        
        this.getOrderList(this.currentQuery + res.value);
        this.searchQuery = res.value;
        this.startPageIndex = 1;
        this.dataTable.onFilterKeyup('', '', 'Contains');
      }
    });

    this.loader = true;
    this.rows = this.globalService.getLocalStorageNumRows();

    this.heightCalc();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public heightCalc() {
    this.innerHeight = (window.screen.height);
    this.innerHeight = (this.innerHeight - 400) + 'px';
  }

  @HostListener('window:resize', ['$event'])
 onResize(event:any) {
    this.innerHeight = ((event.target.innerHeight) - 290) + 'px';
  }

  /**
   * Function for opening the Order Add Form
   * @memberof OrderListComponent
   */
  public addData() {
    this.router.navigate(['orders/add']);
  }

  /**
   * Order Edit Function
   * @param {Order} dataRow
   * @memberof OrderListComponent
   */
  public onEdit(dataRow: Order) {
    this.router.navigate([dataRow.id, 'edit'], { relativeTo: this.route });
  }

  /**
   * Load the Order Data
   * @param {LazyLoadEvent} event
   * @memberof OrderOrderListComponent
   */
  loadData(event: LazyLoadEvent) {
    this.eventObj = event;
    this.currentQuery = this.globalService.prepareQuery(event) + this.searchQuery;
    this.startPageIndex = event.first + 1;
    this.endPageIndex = event.first + event.rows;
    if (this.currentQuery !== this.previousQuery) {
      this.getOrderList(this.currentQuery);
      this.previousQuery = this.currentQuery;
    }
  }

  /**
   * Order Listing
   * @param {string} query
   * @memberof OrderListComponent
   */
  public getOrderList(query: string) {
    this.loader = true;
    console.log('Query : ' + query);
    this.orderService.getAll(query).subscribe((data:any) => {
      const result = data.data;
      this.totalRecords = data.totalRecords;
      this.setPageinationgMessage(data.data.length);
      this.emptyMessage = StringUtil.emptyMessage;

      for (let i = 0; i < result.length; i++) {
        result[i].fromAddress = '';
        result[i].toAddress = '';
        result[i].salesRepName = '';
        const addArr = result[i].addresses;
        for (let j = 0; j < addArr.length; j++) {
          if (addArr[j].addressType === 'fromAddress') {
            result[i].fromAddress = addArr[j].location.name;
          } else if (addArr[j].addressType === 'toAddress') {
            result[i].toAddress = addArr[j].location.name;
          }
        }

        if (result[i].consumer) {
          if (result[i].consumer.hasOwnProperty('firstName')) {
            result[i].salesRepName += result[i].consumer.firstName;
          }
          if (result[i].consumer.hasOwnProperty('lastName')) {
            result[i].salesRepName += ' ' + result[i].consumer.lastName;
          }
        }
      }

      this.dataList = result;
      this.totalRecords = data.totalRecords;
      this.loader = false;
    },
      (error:any) => {
        this.emptyMessage = StringUtil.emptyMessage;
        if (error.code === 210 || error.code === 404) {
          this.dataList = [];
          this.previousQuery = '';
          this.setPageinationgMessage(0);

        }
        this.loader = false;
      });
  }
  setPageinationgMessage(listSize: number) {
    if (listSize !== 0) {
      this.endPageIndex = listSize + this.startPageIndex - 1;
    } else {
      this.startPageIndex = 0;
      this.endPageIndex = 0;
      this.totalRecords = 0;
    }
    this.pagingmessage = 'Showing ' + this.startPageIndex + ' to ' + this.endPageIndex + ' of ' + this.totalRecords + ' entries';
  }

  loadComments(event:any) {
    event;
    //
  }

    /**
   * Function for exporting the records
   * @memberof ProductListComponent
   */
  public export() {
    let statusMessage;
    const self = this;
    this.loader = true;
    if ( this.totalRecords > 0) {
      let format = 'csv', entity = 'orders';
      let queryObject = this.globalService.queryStringToObject(this.currentQuery);
      
      this.globalService.export(format, entity, queryObject).subscribe(
       (data:any) => {
          console.log(data);
          self.exportStatus(data.description);
        },
        (error:any) => {
          console.log(error);
          self.exportStatus(error.description);
        }
      );
    } else {
      statusMessage = 'No records to export';
      self.exportStatus(statusMessage)
    }
  }

  exportStatus(statusMessage:any) {
    this.loader = false;
    this.exportMessage = statusMessage;
    this.displayExport = true;
  }

}
