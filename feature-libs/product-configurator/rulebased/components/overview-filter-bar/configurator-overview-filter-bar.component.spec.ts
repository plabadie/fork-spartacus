import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterBarComponent } from './configurator-overview-filter-bar.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

const PRICE_RELEVANT = Configurator.OverviewFilter.PRICE_RELEVANT;
const MY_SELECTIONS = Configurator.OverviewFilter.USER_INPUT;

let component: ConfiguratorOverviewFilterBarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterBarComponent>;
let htmlElem: HTMLElement;

let mockConfigCommonsService: ConfiguratorCommonsService;

let config: Configurator.Configuration;
let ovConfig: Configurator.ConfigurationWithOverview;
let expectedInputConfig: Configurator.ConfigurationWithOverview;

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
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.config = ovConfig;
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

    it('should render Price Relevant filter removal button', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.byPrice'
      );
    });

    it('should render my Selections filter removal button', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.mySelections'
      );
    });

    it('should render group filter removal button', () => {
      ovConfig.overview.groupFilters = ['1', '2'];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'Group 1',
        0
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'Group 2',
        1
      );
    });

    it('should render remove all button component if there are 2 or more filters active', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      ovConfig.overview.groupFilters = ['1'];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.removeAll',
        2
      );
    });

    describe('A11Y', () => {
      it('remove price filter should have descriptive title', () => {
        ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeByPrice',
          0
        );
      });

      it('remove my selection filter should have descriptive title', () => {
        ovConfig.overview.attributeFilters = [MY_SELECTIONS];
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeMySelections',
          0
        );
      });

      it('remove all filter should have descriptive title', () => {
        ovConfig.overview.attributeFilters = [MY_SELECTIONS];
        ovConfig.overview.groupFilters = ['1'];
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeAllFilters',
          2
        );
      });

      it('remove group filter should have descriptive title', () => {
        ovConfig.overview.groupFilters = ['1'];
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeGroup group:Group 1',
          0
        );
      });
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

    it('on group filter remove should remove call service with adapted group filter', () => {
      ovConfig.overview.groupFilters = ['1', '3'];
      expectedInputConfig.overview.groupFilters = ['3'];
      component.onGroupFilterRemove(ovConfig, '1');
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('on remove all should remove call service with adapted filters', () => {
      ovConfig.overview.groupFilters = ['1', '3'];
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT, MY_SELECTIONS];
      expectedInputConfig.overview.groupFilters = [];
      expectedInputConfig.overview.attributeFilters = [];
      component.onRemoveAll(ovConfig);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('should not show remove all if only one filter applied', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
      expect(component.isShowRemoveAll(ovConfig.overview)).toBeFalsy();
    });

    it('should show remove all if two filters are applied', () => {
      ovConfig.overview.groupFilters = ['1'];
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
      expect(component.isShowRemoveAll(ovConfig.overview)).toBeTruthy();
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
