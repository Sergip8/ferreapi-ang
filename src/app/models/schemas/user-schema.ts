import { TableColumn } from "../../shared/table/table.component";
import { UserType } from "../user";
import { FormField } from "../../../models/form-field";

export const userFormSchema: { [key in UserType]: FormField[] } = {
  [UserType.customer]: [
    {
      key: 'customer_id',
      label: 'Customer ID',
      type: 'text',
      required: false,
      disabled: true
    },
    {
      key: 'user_id',
      label: 'User ID',
      type: 'text',
      required: true,
      disabled: true
    },
    {
      key: 'shipping_address',
      label: 'Shipping Address',
      type: 'textarea',
      required: false
    },
    {
      key: 'billing_address',
      label: 'Billing Address',
      type: 'textarea',
      required: false
    },
    {
      key: 'membership_level',
      label: 'Membership Level',
      type: 'select',
      required: false,
      options: [
        { value: 'basic', label: 'Basic' },
        { value: 'premium', label: 'Premium' },
        { value: 'vip', label: 'VIP' }
      ]
    },
    {
      key: 'birth_date',
      label: 'Birth Date',
      type: 'date',
      required: false
    },
    {
      key: 'purchase_count',
      label: 'Purchase Count',
      type: 'number',
      required: false,
      disabled: true
    }
  ],

  [UserType.distributor]: [
    {
      key: 'distributor_id',
      label: 'Distributor ID',
      type: 'text',
      required: false,
      disabled: true
    },
    {
      key: 'user_id',
      label: 'User ID',
      type: 'text',
      required: true,
      disabled: true
    },
    {
      key: 'company_name',
      label: 'Company Name',
      type: 'text',
      required: true,
      validations: [
        {
          type: 'required',
          message: 'Company name is required'
        },
        {
          type: 'minLength',
          value: 3,
          message: 'Company name must be at least 3 characters long'
        }
      ]
    },
    {
      key: 'tax_id',
      label: 'Tax ID',
      type: 'text',
      required: false,
      pattern: '^[0-9]{9}$',
      patternError: 'Tax ID must be 9 digits'
    },
    {
      key: 'business_address',
      label: 'Business Address',
      type: 'textarea',
      required: true,
      validations: [
        {
          type: 'required',
          message: 'Business address is required'
        }
      ]
    },
    {
      key: 'distribution_zone',
      label: 'Distribution Zone',
      type: 'select',
      required: false,
      options: [
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'east', label: 'East' },
        { value: 'west', label: 'West' }
      ]
    },
    {
      key: 'credit_limit',
      label: 'Credit Limit',
      type: 'number',
      required: false,
      validations: [
        {
          type: 'min',
          value: 0,
          message: 'Credit limit cannot be negative'
        }
      ]
    },
    {
      key: 'contract_date',
      label: 'Contract Date',
      type: 'date',
      required: false
    }
  ],

  [UserType.administrator]: [
    {
      key: 'administrator_id',
      label: 'Administrator ID',
      type: 'text',
      required: false,
      disabled: true
    },
    {
      key: 'user_id',
      label: 'User ID',
      type: 'text',
      required: true,
      disabled: true
    },
    {
      key: 'access_level',
      label: 'Access Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      validations: [
        {
          type: 'required',
          message: 'Access level is required'
        }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      type: 'text',
      required: false
    },
    {
      key: 'can_create_users',
      label: 'Can Create Users',
      type: 'checkbox',
      required: false
    },
    {
      key: 'can_modify_products',
      label: 'Can Modify Products',
      type: 'checkbox',
      required: false
    },
    {
      key: 'can_view_reports',
      label: 'Can View Reports',
      type: 'checkbox',
      required: false
    },
    {
      key: 'assignment_date',
      label: 'Assignment Date',
      type: 'date',
      required: false
    }
  ],

  [UserType.employee]: [
    {
      key: 'employee_id',
      label: 'Employee ID',
      type: 'text',
      required: false,
      disabled: true
    },
    {
      key: 'user_id',
      label: 'User ID',
      type: 'text',
      required: true,
      disabled: true
    },
    {
      key: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      validations: [
        {
          type: 'required',
          message: 'Position is required'
        }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      type: 'text',
      required: true,
      validations: [
        {
          type: 'required',
          message: 'Department is required'
        }
      ]
    },
    {
      key: 'hire_date',
      label: 'Hire Date',
      type: 'date',
      required: true,
      validations: [
        {
          type: 'required',
          message: 'Hire date is required'
        }
      ]
    },
    {
      key: 'salary',
      label: 'Salary',
      type: 'number',
      required: false,
      validations: [
        {
          type: 'min',
          value: 0,
          message: 'Salary cannot be negative'
        }
      ]
    },
    {
      key: 'supervisor_id',
      label: 'Supervisor ID',
      type: 'number',
      required: false
    },
    {
      key: 'employee_number',
      label: 'Employee Number',
      type: 'text',
      required: false
    },
    {
      key: 'schedule',
      label: 'Schedule',
      type: 'textarea',
      required: false
    }
  ]
};

export const userSchema: FormField[] = [
  {
    key: 'user_id',
    label: 'User ID',
    type: 'text',
    required: true,
    disabled: true
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validations: [
      {
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'email',
        message: 'Please enter a valid email address'
      }
    ]
  },
  {
    key: 'full_name',
    label: 'Full Name',
    type: 'text',
    required: false,
    validations: [
      {
        type: 'minLength',
        value: 3,
        message: 'Full name must be at least 3 characters long'
      }
    ]
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'tel',
    required: false,
    pattern: '^[0-9]{10}$',
    patternError: 'Phone number must be 10 digits'
  },
  {
    key: 'registration_date',
    label: 'Registration Date',
    type: 'date',
    required: false,
    disabled: true
  },
  {
    key: 'last_login',
    label: 'Last Login',
    type: 'date',
    required: false,
    disabled: true
  },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    required: false,
    options: [
      { value: UserType.customer, label: 'Customer' },
      { value: UserType.distributor, label: 'Distributor' },
      { value: UserType.administrator, label: 'Administrator' },
      { value: UserType.employee, label: 'Employee' }
    ]
  },
  {
    key: 'is_active',
    label: 'Active',
    type: 'checkbox',
    required: true
  }
];

export const userColumns: TableColumn[] = [
  { header: 'User ID', field: 'user_id', sortable: true, width: 'w-1/12' },
  { header: 'Email', field: 'email', sortable: true, width: 'w-1/12' },
  { header: 'Nombre', field: 'full_name', sortable: true, width: 'w-2/12' },
  { header: 'Rol', field: 'role', sortable: true, width: 'w-2/12' },
  { header: 'Telefono', field: 'phone', sortable: true, width: 'w-2/12' },
  { header: 'Action', field: 'action', type: "action", sortable: false, width: 'w-2/12' }
]; 