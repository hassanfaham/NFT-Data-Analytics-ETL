import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Blockchain } from '../models/blockchain.model';
import { Collection } from '../models/collection.model';
import { Nft } from '../models/nft.model';
import { Currency } from '../models/currency.model';

const baseUrl = 'http://localhost:8000';
@Injectable({
  providedIn: 'root'
})
export class CollectionserviceService {
  constructor(private http: HttpClient) { }
  // getAllCollection(): Observable<Collection[]> {
  //   return this.http.get<Collection[]>(baseUrl+'/collections');
  // }

  getAllBlockchains(): Observable<Blockchain[]> {
    return this.http.get<Blockchain[]>(baseUrl+'/search_blockchain');
  }
  
  findByBlockchain(blockchain: any): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${baseUrl+'/search_collection/'}?search=${blockchain}`);
  }

  findByCollection(collection: any): Observable<Nft[]> {
    return this.http.get<Nft[]>(`${baseUrl+'/search_nft/'}?search=${collection}`);
  }
}


