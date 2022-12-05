import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import * as ConfigurationTestData from '../../testing/configurator-test-data';

import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { Type } from '@angular/core';
import { ConfiguratorGroupsService } from '@spartacus/product-configurator/rulebased';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const CONFIG_ID = '1234-56-7890';
const GROUP_PREFIX = 'prefix';
const GROUP_ID_LOCAL = 'id';
const OV_GROUP_ID = GROUP_PREFIX + GROUP_ID_LOCAL;
const CONFIGURATION: Configurator.ConfigurationWithOverview = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration
    .overview as Configurator.Overview,
};

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

let component: ConfiguratorOverviewMenuComponent;
let fixture: ComponentFixture<ConfiguratorOverviewMenuComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
let configuratorGroupsService: ConfiguratorGroupsService;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewMenuComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.config = CONFIGURATION;
  fixture.detectChanges();

  configuratorGroupsService = TestBed.inject(
    ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
  );
  spyOn(configuratorGroupsService, 'setGroupStatusVisited').and.callThrough();

  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );
  spyOn(configuratorStorefrontUtilsService, 'createOvGroupId').and.returnValue(
    OV_GROUP_ID
  );
  spyOn(
    configuratorStorefrontUtilsService,
    'scrollToConfigurationElement'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
}

describe('ConfigurationOverviewMenuComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [ConfiguratorOverviewMenuComponent],
        providers: [
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
          },
        ],
      }).compileComponents();
    })
  );

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should provide the overview groups', () => {
    initialize();
    expect(component.config.overview?.groups?.length).toBe(2);
  });

  it('should render group descriptions', () => {
    initialize();
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.OV_GROUP_DESCRIPTION
    );
  });

  //TODO: move test with ghost menu to sidebar CXSPA-1967
  xit('should render ghost menu as long as the data is not ready', () => {
    initialize();
    expect(htmlElem.innerHTML).toContain('cx-ghost-menu');
  });

  describe('getGroupLevelStyleClasses', () => {
    it('should return style class according to level', () => {
      initialize();
      const styleClass = component.getGroupLevelStyleClasses(4);
      expect(styleClass).toBe('cx-menu-group groupLevel4');
    });
  });

  describe('navigateToGroup', () => {
    it('should invoke utils service for determining group id', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalledWith(GROUP_PREFIX, GROUP_ID_LOCAL);
    });

    it('should invoke utils service for scrolling', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID);
    });
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      initialize();
    });
    it('should not set menu height because form is not defined', () => {
      component.ngOnChanges();
      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).not.toHaveBeenCalled();
    });

    it('should not set menu height because form height is not defined', () => {
      const ovForm = document.createElement('cx-configurator-overview-form');

      document.querySelector = jasmine
        .createSpy('ovForm')
        .and.returnValue(ovForm);

      component.ngOnChanges();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).not.toHaveBeenCalled();
    });

    it('should set menu height', () => {
      const ovForm = document.createElement('cx-configurator-overview-form');
      spyOn(ovForm, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 1200, 500, 1200)
      );

      document.querySelector = jasmine
        .createSpy('ovForm')
        .and.returnValue(ovForm);

      component.ngOnChanges();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalled();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalledWith(
        'cx-configurator-overview-menu',
        'height',
        ovForm.getBoundingClientRect().height + 'px'
      );
    });
  });
});
