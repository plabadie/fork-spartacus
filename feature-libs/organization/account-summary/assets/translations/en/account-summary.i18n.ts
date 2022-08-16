export const accountSummary = {
  orgAccountSummary: {
    header: 'All Account Summaries ({{count}})',
    name: 'Unit',
    details: {
      header: 'Account Summary Details',
      uid: 'Unit ID',
      name: 'Unit Name',
      address: 'Address',
      creditRep: 'Credit Rep',
      creditLine: 'Credit Line',
      currentBalance: 'Current Balance',
      openBalance: 'Open Balance',
      pastDueBalance: 'Past Due Balance',
    },
    document: {
      header: 'Documents',
      id: 'Document Number',
      type: 'Document Type',
      date: 'Created On',
      dueDate: 'Due On',
      originalAmount: 'Original Amount',
      openAmount: 'Open Amount',
      status: 'Status',
      attachment: 'Attachment',
      view: 'View',
      noneFound: 'No Documents Found',
    },
    sorts: {
      byDocumentDateAsc: 'Document Date Ascending',
      byDocumentDateDesc: 'Document Date Descending',
      byDueDateAsc: 'Due Date Ascending',
      byDueDateDesc: 'Due Date Descending',
      byOriginalAmountAsc: 'Original Amount Ascending',
      byOriginalAmountDesc: 'Original Amount Descending',
      byOpenAmountAsc: 'Open Amount Ascending',
      byOpenAmountDesc: 'Open Amount Descending',
      byDocumentTypeAsc: 'Document Type Ascending',
      byDocumentTypeDesc: 'Document Type Descending',
      byDocumentStatusAsc: 'Document Status Ascending',
      byDocumentStatusDesc: 'Document Status Descending',
      byDocumentNumberAsc: 'Document Number Ascending',
      byDocumentNumberDesc: 'Document Number Descending',
    },
    statuses: {
      open: 'Open',
      closed: 'Closed',
      all: 'All',
    },
    filterByOptions: {
      documentNumber: 'Document Number',
      documentNumberRange: 'Document Number Range',
      documentType: 'Document Type',
      dateRange: 'Document Date Range',
      dueDateRange: 'Due Date Range',
      amountRange: 'Original Amount Range',
      openAmountRange: 'Open Amount Range',
    },
    sortBy: 'Sort By',
    sortDocuments: 'Sort documents',
    filter: {
      status: 'Status',
      filterBy: 'Filter By',
      documentNumber: 'Document Number',
      documentType: 'Document Type',
      startRange: 'From',
      endRange: 'To',
      clear: 'Clear All',
      search: 'Search',
      errors: {
        toDateMustComeAfterFrom: 'Choose an end date that\'s later than the start date.',
        toAmountMustBeLargeThanFrom: 'Choose an end range value that\'s smaller than the start value.'
      }
    },
    hint: 'Account summaries allow you to review general information about a unit, including balances and aging summary of invoices. Here, you can also browse through a list of transaction documents for a unit.',
  },

  breadcrumbs: {
    list: 'Account Summaries',
    details: '{{name}}',
  },
};
