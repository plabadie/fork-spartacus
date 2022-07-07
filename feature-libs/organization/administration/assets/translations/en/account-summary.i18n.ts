export const orgAccountSummary = {
  header: 'All units ({{count}})',
  unit: 'Unit',
  name: 'Name',
  uid: 'ID',
  address: 'Address',
  creditRep: 'Credit Rep',
  creditLine: 'Credit Line',
  currentBalance: 'Current Balance',
  openBalance: 'Open Balance',
  pastDueBalance: 'Past Due Balance',
  approvalProcess: 'Approval process',
  parentUnit: 'Parent Unit',
  active: 'Status',
  hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. The cost centers and delivery addresses available to a buyer when checking out, depend on their unit. Users have access to all child units of their primary unit.',
  details: {
    title: 'Account Summary Details',
    subtitle: 'Account Summary for: {{ item.unitCode }}',
    hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Disabling a unit disables all children of the unit, including child units, users, approvers, and cost centers. Disabled units cannot be edited.',
  },
  edit: {
    title: 'Edit Unit',
    subtitle: 'Unit: {{ item.name }}',
  },
  create: {
    title: 'Create Unit',
    subtitle: '',
  },

  messages: {
    deactivateTitle: 'Disable this unit?',
    deactivate: `Disabling a unit has wide-ranging affects on your commerce organization. ALL the unit's child units, users, budgets, and cost centers will also disabled.`,
    confirmEnabled: 'Unit {{item.name}} enabled successfully',
    confirmDisabled: 'Unit {{item.name}} disabled successfully',
    update: 'Unit {{ item.name }} updated successfully',
    create: 'Unit {{ item.name }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the unit to allow editing.',
    disabledEnable: 'Parent must be enabled before this unit may be enabled.',
    disabledDisable: 'Root unit can not be disabled.',
  },

  links: {
    units: 'Child Units',
    users: 'Users',
    approvers: 'Approvers',
    shippingAddresses: 'Delivery Addresses',
    costCenters: 'Cost Centers',
  },

  tree: {
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
  },

  children: {
    create: {
      title: 'Create child unit',
      subtitle: '',
    },
    messages: {
      create: 'Unit {{ item.name }} created successfully',
    },
  },

  costCenters: {
    create: {
      title: 'Create cost center',
      subtitle: '',
    },
  },

  form: {
    parentOrgUnit: 'Parent business unit',
    create: 'Create Unit',
    parentOrgUnitNotes:
      'This unit is the top-level unit for your organization. It cannot be assigned to another unit.',
  },
  users: {
    header: 'Users in {{code}}',
    changeUserRoles: 'Change user roles',
    newUser: 'New user',
  },
  assignRoles: {
    header: 'Manage roles in {{code}}',
    instructions: {
      check: "To assign a role to a user, select the role's check box.",
      uncheck: "To remove a role, clear the role's check box.",
      changes: 'Changes are saved automatically.',
    },
  },
  approvers: {
    header: 'Approvers in {{code}}',
    assign: 'Manage approvers',
    new: 'New approver',
  },
  assignApprovers: {
    header: 'Manage approvers in {{code}}',
    instructions: {
      check: "To assign an approver to this unit, select the user's check box.",
      uncheck: "To remove an approver, clear the user's check box.",
      changes: 'Changes are saved automatically.',
    },
    hint: "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
  },

  breadcrumbs: {
    list: 'Account Summary Details',
    details: '{{name}}',
    children: 'Child units',
    users: 'Users',
    approvers: 'Approvers',
    addresses: 'Delivery addresses',
    addressDetails: '{{formattedAddress}}',
    costCenters: 'Cost Centers',
  },
};
