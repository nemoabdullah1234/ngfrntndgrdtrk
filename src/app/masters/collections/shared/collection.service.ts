import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpRestService } from '../../../core/http-rest.service';
import { environment } from '../../../../environments/environment';
import { Collection, CollectionModel } from './collection.model';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CollectionService {

  serviceUrl = 'collections' + environment.serverEnv;

  constructor(private akRestService: HttpRestService) { }

  /**
   * Get All Record Lists
   */
  getAll(query: string): Observable<CollectionModel> {
    return this.akRestService.get(this.serviceUrl + query)
      .map((res:any) => res.json());
  }

  /**
   * Read the collection api
   * @param id
   */
  get(id:any) {
    return this.akRestService.get(this.serviceUrl + '/' + id)
      .map((res:any) => res.json());
  }

  /**
   * Save Collection Services
   * @param request
   */
  add(request:any) {
    return this.akRestService.post(this.serviceUrl, request, 'multipart/form-data;')
      .map((res:any) => res.json());
  }

  /**
   * Update the collection
   * @param request
   * @param id
   */
  update(request:any , id:any) {
    return this.akRestService.put(this.serviceUrl + '/' + id, request)
      .map((res:any) => <Collection>res.json());
  }

  /**
   * Remove Collection
   * @param request
   */
  remove(request:any) {
    return this.akRestService.post(this.serviceUrl, request)
      .map((res:any) => res.json());
  }
}
