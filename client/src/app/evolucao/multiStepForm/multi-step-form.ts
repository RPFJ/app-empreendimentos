
const COUNTRY_LIST = [
  { name: 'empreendimento' },
  { name: 'United Kingdoms', code: 'gb' },
  { name: 'India', code: 'in' }
];

const DATA_STEP_1 = {
  empreendimento: {
    type: 'select',
    options: COUNTRY_LIST,
    validations: {},
    errors: {},
    placeholder: 'Country'
  },
  redeEconômica: {
    type: 'select',
    options: COUNTRY_LIST,
    validations: {},
    errors: {},
    placeholder: 'Country'
  },
  geraçãoDeRenda: {
    type: 'select',
    options: COUNTRY_LIST,
    validations: {},
    errors: {},
    placeholder: 'Country'
  },
  computador: {
    type: 'radio',
    options: [
      { id:'pc1', name: 'computador', value: '0', descricao: "Sem computador no local"},
      { id:'pc2', name: 'computador', value: '1', descricao: "Possui computadores no local" }
    ],
    validations: {},
    errors: {},
    placeholder: 'Country'
  },
  númeroHomens: {
    type: 'number',
    validations: {
      required: true,
      minLength: 1
    },
    min: "0",
    value: "0", 
    errors: {
      required: 'This field can not be left blank',
      minlength: 'Minimum length should be 4 characters'
    },
    placeholder: 'One Time Password'
  },
  númeroMulheres: {
    type: 'number',
    validations: {
      required: true,
      minLength: 1
    },
    min: "0",
    value: "0", 
    errors: {
      required: 'This field can not be left blank',
      minlength: 'Minimum length should be 4 characters'
    },
    placeholder: 'One Time Password'
  }
};

const DATA_STEP_2 = {
  address: { type: 'textarea', validations: {}, errors: {}, placeholder: 'Full Address' },
  country: {
    type: 'select',
    options: COUNTRY_LIST,
    validations: {},
    errors: {},
    placeholder: 'Country'
  }
};

const DATA_STEP_3 = {
  phone: {
    type: 'phone',
    validations: {
      pattern: /\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}/
    },
    errors: {
      pattern: 'Please enter a valid phone number'
    },
    placeholder: 'Contact Number'
  },
  otp: {
    type: 'number',
    validations: {
      required: true,
      minLength: 4
    },
    errors: {
      required: 'This field can not be left blank',
      minlength: 'Minimum length should be 4 characters'
    },
    placeholder: 'One Time Password'
  }
};

const STEP_ITEMS = [
  { label: 'Relatório de Evolução', data: DATA_STEP_1 },
  { label: 'Step 2', data: DATA_STEP_2 },
  { label: 'Step 3', data: DATA_STEP_3 },
  { label: 'Review & Submit', data: {} }
];

export { STEP_ITEMS }