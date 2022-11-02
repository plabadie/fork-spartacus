import { AccountData } from '../support/require-logged-in.commands';

export const ORDER_CODE = '00000001';
export const ORDER_STATUS = 'Approved';
export const ORDER_DATE = 'Aug 30, 2022';

export const b2bUnitOrderViewerAdmin = {
  name: 'Hanna Shmidt',
  uid: 'hanna.schmidt@rustic-hw.com',
};

export const b2bUnitOrderViewer = {
  name: 'Gi Sun',
  uid: 'gi.sun@rustic-hw.com',
};

export const b2bUser = {
  name: 'William Hunter',
  uid: 'william.hunter@rustic-hw.com',
};

export const b2bUserAccount: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'pw4all',
    titleCode: 'mr',
    email: b2bUser.uid,
  },
};

export const b2bUnitOrderViewerAccount: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'pw4all',
    titleCode: 'mr',
    email: b2bUnitOrderViewer.uid,
  },
};

export const b2bUnitOrderViewerAccountAdmin: AccountData = {
  user: '',
  registrationData: {
    firstName: '',
    lastName: '',
    password: 'pw4all',
    titleCode: 'mr',
    email: b2bUnitOrderViewerAdmin.uid,
  },
};

const unitLevelOrder_raw = JSON.parse(`
{
   "type" : "orderWsDTO",
   "appliedOrderPromotions" : [ ],
   "appliedProductPromotions" : [ ],
   "appliedVouchers" : [ ],
   "calculated" : true,
   "code" : "${ORDER_CODE}",
   "deliveryAddress" : {
      "country" : {
         "isocode" : "US",
         "name" : "United States"
      },
      "defaultAddress" : false,
      "email" : "matheu.silva@rustic-hw.com",
      "firstName" : "Matheu",
      "formattedAddress" : "3000 Canyon Lake Drive, Los Angeles, 90068",
      "id" : "8796125888535",
      "lastName" : "Silva",
      "line1" : "3000 Canyon Lake Drive",
      "postalCode" : "90068",
      "shippingAddress" : true,
      "title" : "Mr",
      "titleCode" : "mr",
      "town" : "Los Angeles",
      "visibleInAddressBook" : true
   },
   "deliveryCost" : {
      "currencyIso" : "USD",
      "formattedValue" : "$9.99",
      "priceType" : "BUY",
      "value" : 9.99
   },
   "deliveryItemsQuantity" : 1,
   "deliveryMode" : {
      "code" : "standard-net",
      "deliveryCost" : {
         "currencyIso" : "USD",
         "formattedValue" : "$9.99",
         "priceType" : "BUY",
         "value" : 9.99
      },
      "description" : "3-5 business days",
      "name" : "Standard Delivery"
   },
   "deliveryOrderGroups" : [ {
      "entries" : [ {
         "basePrice" : {
            "currencyIso" : "USD",
            "formattedValue" : "$148.00",
            "priceType" : "BUY",
            "value" : 148.0
         },
         "cancellableQuantity" : 1,
         "configurationInfos" : [ ],
         "entryNumber" : 0,
         "product" : {
            "availableForPickup" : false,
            "baseOptions" : [ ],
            "categories" : [ {
               "code" : "brand_2929",
               "name" : "Makita",
               "url" : "/Brands/Makita/c/brand_2929"
            }, {
               "code" : "1360",
               "name" : "Power Drills",
               "url" : "/Open-Catalogue/Tools/Power-Drills/c/1360"
            } ],
            "code" : "3857732",
            "configurable" : false,
            "images" : [ {
               "altText" : "6270DWAE",
               "format" : "zoom",
               "imageType" : "PRIMARY",
               "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzOTMwNHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnMlppOW9ZVEF2T0RjNU5qSXdPRGc0T1RnNE5pNXFjR2N8NGUyMmFiNGFhNmVmNzhkZjA3N2NmNmMwMzk5NGE1NDhmNjljNTA3MmFkZTIwYTJiMzc1MmY4ZWRmODZhODYyZQ"
            }, {
               "altText" : "6270DWAE",
               "format" : "product",
               "imageType" : "PRIMARY",
               "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxNDc1MHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaE5pOW9abUV2T0RjNU5qSXpOakU0TlRZek1DNXFjR2N8NmEwZjBhNDIwYTYzZWY3MjFkOTE3MmRhYzRiODZmMGRiN2Q2ZTJkYTUwNjc2ODFjYWQ2ODZlZDhjMGNhNmRjNA"
            }, {
               "altText" : "6270DWAE",
               "format" : "thumbnail",
               "imageType" : "PRIMARY",
               "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzMDI2fGltYWdlL2pwZWd8YVcxaFoyVnpMMmd3WlM5b09UQXZPRGM1TmpJMk16TTRNekEzTUM1cWNHY3w3MzYwMzE1YzJjM2NmMjhjMDIzZDJjZWI4ZDBhN2E4NTk5ZTk5YzMwMDZlZDRkMjVkMTc4Mjc5MWUwYjBjNjRl"
            }, {
               "altText" : "6270DWAE",
               "format" : "cartIcon",
               "imageType" : "PRIMARY",
               "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxODQ0fGltYWdlL2pwZWd8YVcxaFoyVnpMMmcwTlM5b05tRXZPRGM1TmpJNU1UQXdOalE1TkM1cWNHY3w1MGZjOTYzMjdhZTE2ZGFmMWQ0NmMwOWQ3MWY2MWE2NzMyODlkNTAyZWE0NDVmMmYxODE3ZTEzMDZmNWVjZGU5"
            } ],
            "manufacturer" : "Makita",
            "name" : "6270DWAE",
            "purchasable" : true,
            "stock" : {
               "isValueRounded" : false,
               "stockLevel" : 73,
               "stockLevelStatus" : "inStock"
            },
            "url" : "/Brands/Makita/6270DWAE/p/3857732"
         },
         "quantity" : 1,
         "returnableQuantity" : 0,
         "statusSummaryList" : [ ],
         "totalPrice" : {
            "currencyIso" : "USD",
            "formattedValue" : "$148.00",
            "priceType" : "BUY",
            "value" : 148.0
         },
         "updateable" : true
      } ],
      "totalPriceWithTax" : {
         "currencyIso" : "USD",
         "formattedValue" : "$148.00",
         "priceType" : "BUY",
         "value" : 148.0
      }
   } ],
   "entries" : [ {
      "basePrice" : {
         "currencyIso" : "USD",
         "formattedValue" : "$148.00",
         "priceType" : "BUY",
         "value" : 148.0
      },
      "cancellableQuantity" : 1,
      "configurationInfos" : [ ],
      "entryNumber" : 0,
      "product" : {
         "availableForPickup" : false,
         "baseOptions" : [ ],
         "categories" : [ {
            "code" : "brand_2929",
            "name" : "Makita",
            "url" : "/Brands/Makita/c/brand_2929"
         }, {
            "code" : "1360",
            "name" : "Power Drills",
            "url" : "/Open-Catalogue/Tools/Power-Drills/c/1360"
         } ],
         "code" : "3857732",
         "configurable" : false,
         "images" : [ {
            "altText" : "6270DWAE",
            "format" : "zoom",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzOTMwNHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnMlppOW9ZVEF2T0RjNU5qSXdPRGc0T1RnNE5pNXFjR2N8NGUyMmFiNGFhNmVmNzhkZjA3N2NmNmMwMzk5NGE1NDhmNjljNTA3MmFkZTIwYTJiMzc1MmY4ZWRmODZhODYyZQ"
         }, {
            "altText" : "6270DWAE",
            "format" : "product",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxNDc1MHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaE5pOW9abUV2T0RjNU5qSXpOakU0TlRZek1DNXFjR2N8NmEwZjBhNDIwYTYzZWY3MjFkOTE3MmRhYzRiODZmMGRiN2Q2ZTJkYTUwNjc2ODFjYWQ2ODZlZDhjMGNhNmRjNA"
         }, {
            "altText" : "6270DWAE",
            "format" : "thumbnail",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzMDI2fGltYWdlL2pwZWd8YVcxaFoyVnpMMmd3WlM5b09UQXZPRGM1TmpJMk16TTRNekEzTUM1cWNHY3w3MzYwMzE1YzJjM2NmMjhjMDIzZDJjZWI4ZDBhN2E4NTk5ZTk5YzMwMDZlZDRkMjVkMTc4Mjc5MWUwYjBjNjRl"
         }, {
            "altText" : "6270DWAE",
            "format" : "cartIcon",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxODQ0fGltYWdlL2pwZWd8YVcxaFoyVnpMMmcwTlM5b05tRXZPRGM1TmpJNU1UQXdOalE1TkM1cWNHY3w1MGZjOTYzMjdhZTE2ZGFmMWQ0NmMwOWQ3MWY2MWE2NzMyODlkNTAyZWE0NDVmMmYxODE3ZTEzMDZmNWVjZGU5"
         } ],
         "manufacturer" : "Makita",
         "name" : "6270DWAE",
         "purchasable" : true,
         "stock" : {
            "isValueRounded" : false,
            "stockLevel" : 73,
            "stockLevelStatus" : "inStock"
         },
         "url" : "/Brands/Makita/6270DWAE/p/3857732"
      },
      "quantity" : 1,
      "returnableQuantity" : 0,
      "statusSummaryList" : [ ],
      "totalPrice" : {
         "currencyIso" : "USD",
         "formattedValue" : "$148.00",
         "priceType" : "BUY",
         "value" : 148.0
      },
      "updateable" : true
   } ],
   "guid" : "d20bb8c5-65e4-4196-9a61-1d729fbee98e",
   "net" : true,
   "orderDiscounts" : {
      "currencyIso" : "USD",
      "formattedValue" : "$0.00",
      "priceType" : "BUY",
      "value" : 0.0
   },
   "pickupItemsQuantity" : 0,
   "pickupOrderGroups" : [ ],
   "productDiscounts" : {
      "currencyIso" : "USD",
      "formattedValue" : "$0.00",
      "priceType" : "BUY",
      "value" : 0.0
   },
   "site" : "powertools-spa",
   "store" : "powertools",
   "subTotal" : {
      "currencyIso" : "USD",
      "formattedValue" : "$148.00",
      "priceType" : "BUY",
      "value" : 148.0
   },
   "totalDiscounts" : {
      "currencyIso" : "USD",
      "formattedValue" : "$0.00",
      "priceType" : "BUY",
      "value" : 0.0
   },
   "totalItems" : 1,
   "totalPrice" : {
      "currencyIso" : "USD",
      "formattedValue" : "$157.99",
      "priceType" : "BUY",
      "value" : 157.99
   },
   "totalPriceWithTax" : {
      "currencyIso" : "USD",
      "formattedValue" : "$157.99",
      "priceType" : "BUY",
      "value" : 157.99
   },
   "totalTax" : {
      "currencyIso" : "USD",
      "formattedValue" : "$0.00",
      "priceType" : "BUY",
      "value" : 0.0
   },
   "user" : {
      "name" : "Gi Sun",
      "uid" : "gi.sun@rustic-hw.com"
   },
   "cancellable" : true,
   "consignments" : [ ],
      "costCenter" : {
      "active" : "true",
      "code" : "Custom_Retail",
      "currency" : {
         "isocode" : "USD"
      },
      "name" : "Custom Retail",
      "assignedBudgets" : [ {
         "active" : true,
         "budget" : 4000.00000000,
         "code" : "Monthly_4K_USD",
         "currency" : {
            "active" : false,
            "isocode" : "USD",
            "name" : "USD",
            "symbol" : "$"
         },
         "endDate" : "2034-07-11T22:59:59+0000",
         "name" : "Monthly 4K USD",
         "selected" : false,
         "startDate" : "2009-12-31T23:00:00+0000"
      } ],
      "unit" : {
         "active" : true,
         "addresses" : [ {
            "country" : {
               "isocode" : "US"
            },
            "defaultAddress" : false,
            "email" : "carla.torres@rustic-hw.com",
            "firstName" : "Carla",
            "formattedAddress" : "1000 Bagby Street, Houston, Texas",
            "id" : "8796093546519",
            "lastName" : "Torres",
            "line1" : "1000 Bagby Street",
            "postalCode" : "Texas",
            "titleCode" : "ms",
            "town" : "Houston"
         } ],
         "name" : "Custom Retail",
         "uid" : "Custom Retail"
      }
   },
   "created" : "2022-08-30T13:01:03+0000",
   "guestCustomer" : false,
   "orgCustomer" : {
      "name" : "Gi Sun",
      "uid" : "gi.sun@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
         "active" : false,
         "isocode" : "USD",
         "name" : "USD",
         "symbol" : "$"
      },
      "customerId" : "ab3f7a08-690a-4616-b1fe-4f0847fcb79f",
      "displayUid" : "gi.sun@rustic-hw.com",
      "firstName" : "Gi",
      "lastName" : "Sun",
      "orgUnit" : {
         "active" : true,
         "name" : "Services West",
         "uid" : "Services West"
      },
      "roles" : [ "b2bcustomergroup", "unitorderviewergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
   },
   "orgUnit" : {
      "active" : true,
      "name" : "Services West",
      "parentOrgUnit" : {
         "active" : true,
         "name" : "Rustic Services",
         "uid" : "Rustic Services"
      },
      "uid" : "Services West"
   },
   "permissionResults" : [ ],
   "purchaseOrderNumber" : "",
   "returnable" : false,
   "status" : "APPROVED",
   "statusDisplay" : "approved",
   "totalUnitCount" : 1,
   "unconsignedEntries" : [ {
      "basePrice" : {
         "currencyIso" : "USD",
         "formattedValue" : "$148.00",
         "priceType" : "BUY",
         "value" : 148.0
      },
      "cancellableQuantity" : 0,
      "configurationInfos" : [ ],
      "entryNumber" : 0,
      "product" : {
         "availableForPickup" : false,
         "baseOptions" : [ ],
         "categories" : [ {
            "code" : "brand_2929",
            "name" : "Makita",
            "url" : "/Brands/Makita/c/brand_2929"
         }, {
            "code" : "1360",
            "name" : "Power Drills",
            "url" : "/Open-Catalogue/Tools/Power-Drills/c/1360"
         } ],
         "code" : "3857732",
         "configurable" : false,
         "images" : [ {
            "altText" : "6270DWAE",
            "format" : "zoom",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzOTMwNHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJnMlppOW9ZVEF2T0RjNU5qSXdPRGc0T1RnNE5pNXFjR2N8NGUyMmFiNGFhNmVmNzhkZjA3N2NmNmMwMzk5NGE1NDhmNjljNTA3MmFkZTIwYTJiMzc1MmY4ZWRmODZhODYyZQ"
         }, {
            "altText" : "6270DWAE",
            "format" : "product",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxNDc1MHxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaE5pOW9abUV2T0RjNU5qSXpOakU0TlRZek1DNXFjR2N8NmEwZjBhNDIwYTYzZWY3MjFkOTE3MmRhYzRiODZmMGRiN2Q2ZTJkYTUwNjc2ODFjYWQ2ODZlZDhjMGNhNmRjNA"
         }, {
            "altText" : "6270DWAE",
            "format" : "thumbnail",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wzMDI2fGltYWdlL2pwZWd8YVcxaFoyVnpMMmd3WlM5b09UQXZPRGM1TmpJMk16TTRNekEzTUM1cWNHY3w3MzYwMzE1YzJjM2NmMjhjMDIzZDJjZWI4ZDBhN2E4NTk5ZTk5YzMwMDZlZDRkMjVkMTc4Mjc5MWUwYjBjNjRl"
         }, {
            "altText" : "6270DWAE",
            "format" : "cartIcon",
            "imageType" : "PRIMARY",
            "url" : "/medias/?context=bWFzdGVyfGltYWdlc3wxODQ0fGltYWdlL2pwZWd8YVcxaFoyVnpMMmcwTlM5b05tRXZPRGM1TmpJNU1UQXdOalE1TkM1cWNHY3w1MGZjOTYzMjdhZTE2ZGFmMWQ0NmMwOWQ3MWY2MWE2NzMyODlkNTAyZWE0NDVmMmYxODE3ZTEzMDZmNWVjZGU5"
         } ],
         "manufacturer" : "Makita",
         "name" : "6270DWAE",
         "purchasable" : true,
         "stock" : {
            "isValueRounded" : false,
            "stockLevel" : 73,
            "stockLevelStatus" : "inStock"
         },
         "url" : "/Brands/Makita/6270DWAE/p/3857732"
      },
      "quantity" : 1,
      "returnableQuantity" : 0,
      "statusSummaryList" : [ ],
      "totalPrice" : {
         "currencyIso" : "USD",
         "formattedValue" : "$148.00",
         "priceType" : "BUY",
         "value" : 148.0
      },
      "updateable" : true
   } ]
}`);

export const unitLevelOrder = {
  ...unitLevelOrder_raw,
  code: ORDER_CODE,
};

export const unitLevelOrderHistory = {
  "facets" : [ ],
  "orders" : [ {
    "code" : "00002007",
    "guid" : "3338fa54-fe07-4a41-b7fa-0c08b82fdc86",
    "orgCustomer" : {
      "name" : "William Hunter",
      "uid" : "william.hunter@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
        "active" : false,
        "isocode" : "USD",
        "name" : "USD",
        "symbol" : "$"
      },
      "customerId" : "2b1d2812-e5e5-47f4-accf-96e67b76d4e7",
      "defaultAddress" : {
        "id" : "8796191490071"
      },
      "displayUid" : "william.hunter@rustic-hw.com",
      "email" : "william.hunter@rustic-hw.com",
      "firstName" : "William",
      "lastName" : "Hunter",
      "orgUnit" : {
        "active" : true,
        "name" : "Custom Retail",
        "uid" : "Custom Retail"
      },
      "roles" : [ "b2bcustomergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
    },
    "orgUnit" : {
      "active" : true,
      "name" : "Custom Retail",
      "parentOrgUnit" : {
        "active" : true,
        "name" : "Rustic Retail",
        "uid" : "Rustic Retail"
      },
      "uid" : "Custom Retail"
    },
    "placed" : "2022-11-01T21:35:21+0000",
    "purchaseOrderNumber" : "",
    "status" : "CREATED",
    "statusDisplay" : "created",
    "total" : {
      "currencyIso" : "USD",
      "formattedValue" : "$12.99",
      "priceType" : "BUY",
      "value" : 12.99
    }
  }, {
    "code" : "00002005",
    "guid" : "ebd5e65f-5b04-47c5-ac5c-c41bd9f00236",
    "orgCustomer" : {
      "name" : "William Hunter",
      "uid" : "william.hunter@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
        "active" : false,
        "isocode" : "USD",
        "name" : "USD",
        "symbol" : "$"
      },
      "customerId" : "2b1d2812-e5e5-47f4-accf-96e67b76d4e7",
      "defaultAddress" : {
        "id" : "8796191490071"
      },
      "displayUid" : "william.hunter@rustic-hw.com",
      "email" : "william.hunter@rustic-hw.com",
      "firstName" : "William",
      "lastName" : "Hunter",
      "orgUnit" : {
        "active" : true,
        "name" : "Custom Retail",
        "uid" : "Custom Retail"
      },
      "roles" : [ "b2bcustomergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
    },
    "orgUnit" : {
      "active" : true,
      "name" : "Custom Retail",
      "parentOrgUnit" : {
        "active" : true,
        "name" : "Rustic Retail",
        "uid" : "Rustic Retail"
      },
      "uid" : "Custom Retail"
    },
    "placed" : "2022-11-01T21:35:06+0000",
    "purchaseOrderNumber" : "",
    "status" : "CREATED",
    "statusDisplay" : "created",
    "total" : {
      "currencyIso" : "USD",
      "formattedValue" : "$59.99",
      "priceType" : "BUY",
      "value" : 59.99
    }
  }, {
    "code" : "00002003",
    "guid" : "484ea1ec-7f8d-4c63-ad64-00a8bbd38469",
    "orgCustomer" : {
      "name" : "William Hunter",
      "uid" : "william.hunter@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
        "active" : false,
        "isocode" : "USD",
        "name" : "USD",
        "symbol" : "$"
      },
      "customerId" : "2b1d2812-e5e5-47f4-accf-96e67b76d4e7",
      "defaultAddress" : {
        "id" : "8796191490071"
      },
      "displayUid" : "william.hunter@rustic-hw.com",
      "email" : "william.hunter@rustic-hw.com",
      "firstName" : "William",
      "lastName" : "Hunter",
      "orgUnit" : {
        "active" : true,
        "name" : "Custom Retail",
        "uid" : "Custom Retail"
      },
      "roles" : [ "b2bcustomergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
    },
    "orgUnit" : {
      "active" : true,
      "name" : "Custom Retail",
      "parentOrgUnit" : {
        "active" : true,
        "name" : "Rustic Retail",
        "uid" : "Rustic Retail"
      },
      "uid" : "Custom Retail"
    },
    "placed" : "2022-11-01T21:34:43+0000",
    "purchaseOrderNumber" : "",
    "status" : "CREATED",
    "statusDisplay" : "created",
    "total" : {
      "currencyIso" : "USD",
      "formattedValue" : "$51.99",
      "priceType" : "BUY",
      "value" : 51.99
    }
  }, {
    "code" : "00002000",
    "guid" : "87ddf2db-88b3-4608-b149-0e35f332441e",
    "orgCustomer" : {
      "name" : "Mark Rivers",
      "uid" : "mark.rivers@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
        "active" : false,
        "isocode" : "USD",
        "name" : "USD",
        "symbol" : "$"
      },
      "customerId" : "0d18b584-c604-477a-8f75-6c211aeeaeb5",
      "defaultAddress" : {
        "id" : "8796126019607"
      },
      "displayUid" : "mark.rivers@rustic-hw.com",
      "email" : "mark.rivers@rustic-hw.com",
      "firstName" : "Mark",
      "lastName" : "Rivers",
      "orgUnit" : {
        "active" : true,
        "name" : "Custom Retail",
        "uid" : "Custom Retail"
      },
      "roles" : [ "b2bcustomergroup", "unitorderviewergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
    },
    "orgUnit" : {
      "active" : true,
      "name" : "Custom Retail",
      "parentOrgUnit" : {
        "active" : true,
        "name" : "Rustic Retail",
        "uid" : "Rustic Retail"
      },
      "uid" : "Custom Retail"
    },
    "placed" : "2022-11-01T20:59:57+0000",
    "purchaseOrderNumber" : "",
    "status" : "CREATED",
    "statusDisplay" : "created",
    "total" : {
      "currencyIso" : "USD",
      "formattedValue" : "$70.99",
      "priceType" : "BUY",
      "value" : 70.99
    }
  }, {
    "code" : "00001002",
    "guid" : "2471dad9-bfd6-4828-a740-7c8ad02239f0",
    "orgCustomer" : {
      "name" : "Mark Rivers",
      "uid" : "mark.rivers@rustic-hw.com",
      "active" : true,
      "approvers" : [ ],
      "currency" : {
        "active" : false,
        "isocode" : "USD",
        "name" : "USD",
        "symbol" : "$"
      },
      "customerId" : "0d18b584-c604-477a-8f75-6c211aeeaeb5",
      "defaultAddress" : {
        "id" : "8796126019607"
      },
      "displayUid" : "mark.rivers@rustic-hw.com",
      "email" : "mark.rivers@rustic-hw.com",
      "firstName" : "Mark",
      "lastName" : "Rivers",
      "orgUnit" : {
        "active" : true,
        "name" : "Custom Retail",
        "uid" : "Custom Retail"
      },
      "roles" : [ "b2bcustomergroup", "unitorderviewergroup" ],
      "selected" : false,
      "title" : "Mr",
      "titleCode" : "mr"
    },
    "orgUnit" : {
      "active" : true,
      "name" : "Custom Retail",
      "parentOrgUnit" : {
        "active" : true,
        "name" : "Rustic Retail",
        "uid" : "Rustic Retail"
      },
      "uid" : "Custom Retail"
    },
    "placed" : "2022-10-27T08:30:32+0000",
    "purchaseOrderNumber" : "",
    "status" : "CREATED",
    "statusDisplay" : "created",
    "total" : {
      "currencyIso" : "USD",
      "formattedValue" : "$26.99",
      "priceType" : "BUY",
      "value" : 26.99
    }
  } ],
  "pagination" : {
    "currentPage" : 0,
    "pageSize" : 5,
    "sort" : "byDate",
    "totalPages" : 3,
    "totalResults" : 11
  },
  "sorts" : [ {
    "code" : "byDate",
    "selected" : true
  }, {
    "code" : "byOrderNumber",
    "selected" : false
  }, {
    "code" : "byBuyer",
    "selected" : false
  }, {
    "code" : "byBuyerDesc",
    "selected" : false
  }, {
    "code" : "byOrgUnit",
    "selected" : false
  }, {
    "code" : "byOrgUnitDesc",
    "selected" : false
  } ]
};

export const unitLevelOrderHistory1 = JSON.parse(JSON.stringify(unitLevelOrderHistory));
