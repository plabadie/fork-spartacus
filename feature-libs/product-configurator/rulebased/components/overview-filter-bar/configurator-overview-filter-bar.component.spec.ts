import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from 'feature-libs/product-configurator/common/core/model/common-configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfigurationNonNullOv } from '../overview-filter/configurator-overview-filter.component';
import { ConfiguratorOverviewFilterBarComponent } from './configurator-overview-filter-bar.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

const PRICE_RELEVANT = Configurator.OverviewFilter.PRICE_RELEVANT;
const MY_SELECTIONS = Configurator.OverviewFilter.USER_INPUT;

let component: ConfiguratorOverviewFilterBarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterBarComponent>;
//let htmlElem: HTMLElement;

let mockConfigCommonsService: ConfiguratorCommonsService;

let config: Configurator.Configuration;
let ovConfig: ConfigurationNonNullOv;
let expectedInputConfig: ConfigurationNonNullOv;

function initTestData() {
  config = ConfiguratorTestUtils.createConfiguration(configId, owner);
  ovConfig = structuredClone({
    ...config,
    overview: ConfigurationTestData.productConfiguration.overview,
  });
  ovConfig.overview.possibleGroups = structuredClone(ovConfig.overview.groups);
  expectedInputConfig = {
    ...config,
    overview: {
      configId: config.configId,
      productCode: config.productCode,
      attributeFilters: [],
      groupFilters: [],
      possibleGroups: structuredClone(ovConfig.overview.groups),
    },
  };
}
function initMocks() {
  mockConfigCommonsService = jasmine.createSpyObj([
    'updateConfigurationOverview',
  ]);
}

function initTestComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterBarComponent);
  // htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfiguratorOverviewFilterBarComponent', () => {
  describe('Component Test', () => {
    beforeEach(
      waitForAsync(() => {
        initTestData();
        initMocks();
        TestBed.configureTestingModule({
          imports: [I18nTestingModule],
          declarations: [ConfiguratorOverviewFilterBarComponent],
          providers: [
            {
              provide: ConfiguratorCommonsService,
              useValue: mockConfigCommonsService,
            },
          ],
        }).compileComponents();
      })
    );

    it('should create component', () => {
      initTestComponent();
      expect(component).toBeDefined();
    });
  });

  describe('Unit Test', () => {
    beforeEach(() => {
      initTestData();
      initMocks();
      component = new ConfiguratorOverviewFilterBarComponent(
        mockConfigCommonsService
      );
    });

    it('get group filter description should return description for existing group', () => {
      expect(
        component.getGroupFilterDescription(ovConfig.overview, '2')
      ).toEqual('Group 2');
    });

    it('get group filter description should return empty string for non existing group', () => {
      expect(
        component.getGroupFilterDescription(ovConfig.overview, 'x')
      ).toEqual('');
    });

    it('on attribute filter remove should remove call service with adapted attribute filter', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT, MY_SELECTIONS];
      expectedInputConfig.overview.attributeFilters = [PRICE_RELEVANT];
      component.onAttrFilterRemove(ovConfig, MY_SELECTIONS);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('on attribute filter remove should emit filter update event', () => {
      spyOn(component.filterChange, 'emit');
      component.onAttrFilterRemove(ovConfig, PRICE_RELEVANT);
      expect(component.filterChange.emit).toHaveBeenCalled();
    });

    it('on group filter remove should remove call service with adapted group filter', () => {
      ovConfig.overview.groupFilters = ['1', '3'];
      expectedInputConfig.overview.groupFilters = ['3'];
      component.onGroupFilterRemove(ovConfig, '1');
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('on group filter remove should emit filter update event', () => {
      spyOn(component.filterChange, 'emit');
      component.onGroupFilterRemove(ovConfig, '1');
      expect(component.filterChange.emit).toHaveBeenCalled();
    });

    it('should create input config', () => {
      let inputConfig = component['createInputConfig'](
        ovConfig,
        [PRICE_RELEVANT],
        ['3', '5']
      );
      expectedInputConfig.overview.attributeFilters = [PRICE_RELEVANT];
      expectedInputConfig.overview.groupFilters = ['3', '5'];

      expect(inputConfig).toEqual(expectedInputConfig);
    });
  });
});
