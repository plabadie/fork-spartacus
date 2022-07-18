import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  OccEndpointsService,
  StoreFinderStockSearchPage,
} from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Injectable()
export class OccStockAdapter implements StockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  loadStockLevels(
    productCode: string,
    location: LocationSearchParams
  ): Observable<StoreFinderStockSearchPage> {
    return this.http.get<StoreFinderStockSearchPage>(
      this.occEndpointsService.buildUrl('stock', {
        urlParams: { productCode },
        queryParams: { ...location, fields: 'FULL' },
      })
    );
  }
}