import { TestBed } from '@angular/core/testing';

import { StockAdapter } from './stock.adapter';
import { StockConnector } from './stock.connector';
import createSpy = jasmine.createSpy;

describe('StockConnector', () => {
  let service: StockConnector;
  let adapter: StockAdapter;

  const MockStockAdapter = {
    loadStockLevels: createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: StockAdapter, useValue: MockStockAdapter }],
    });

    service = TestBed.inject(StockConnector);
    adapter = TestBed.inject(StockAdapter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('loadStockLevels calls loadStockLevels', () => {
    service.loadStockLevels('P0001', {});
    expect(adapter.loadStockLevels).toHaveBeenCalledWith('P0001', {});
  });
});