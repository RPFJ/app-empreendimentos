
const COUNTRY_LIST = [
  { name: 'Empreendimento', code: 'us' },
  { name: 'United Kingdoms', code: 'gb' },
  { name: 'India', code: 'in' }
];

const DATA_STEP_1 = {
  empreendimento: {
    type: 'select',
    options: 0,
    validations: {},
    errors: {},
    placeholder: 'selecione um empreendimento'
  },
  redeEconômica: {
    type: 'select',
    options: 1,
    validations: {},
    errors: {},
    placeholder: 'selecione uma rede'
  },
  geraçãoDeRenda: {
    type: 'select',
    options: 2,
    validations: {},
    errors: {},
    placeholder: 'selecione um valor'
  },
  computador: {
    type: 'radio',
    options: [
      { id:'pc1', name: 'computador', value: '0', descricao: "Sem computador no local"},
      { id:'pc2', name: 'computador', value: '1', descricao: "Possui computadores no local" }
    ],
    validations: {},
    errors: {}
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
      required: 'Esse campo não pode ser nulo',
      minlength: 'Mínimo de 1 caracter'
    },
    placeholder: 'Número de Homens'
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
      required: 'Esse campo não pode ser nulo',
      minlength: 'Mínimo de 1 caracter'
    },
    placeholder: 'Número de Mulheres'
  }
};

const DATA_STEP_2 = {
  questão1: { type: 'textarea', validations: {}, errors: {}, placeholder: 'Questão 1 vai aqui' },
  a: { type: 'textarea', validations: {}, errors: {}, placeholder: 'a'}
};

const DATA_STEP_3 = {
  phone: {
    type: 'phone',
    validations: {
      pattern: /\([0-9]{2}\)[\s][0-9]{4}-[0-9]{4,5}/
    },
    errors: {
      pattern: 'Por favor, insira um número válido'
    },
    placeholder: 'Número de Contato'
  },
  otp: {
    type: 'number',
    validations: {
      required: true,
      minLength: 4
    },
    errors: {
      required: 'Esse campo não pode ser nulo',
      minlength: 'Minimum length should be 4 characters'
    },
    placeholder: 'One Time Password'
  }
};

const STEP_ITEMS = [
  { label: 'Relatório de Evolução', data: DATA_STEP_1 },
  { label: 'Questão 1', data: DATA_STEP_2 }
  // { label: 'Step 3', data: DATA_STEP_3 },
  // { label: 'Review & Submit', data: {} }
];

export { STEP_ITEMS }