const EVOLUCAO = {
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
  internet: {
    type: 'radio',
    options: [
      { id:'net1', name: 'internet', value: '1', descricao: "Conexão com internet no local"},
      { id:'net2', name: 'internet', value: '0', descricao: "Sem internet local" }
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

const STEP_ITEMS = [
  { label: 'Relatório de Evolução', data: EVOLUCAO }
];

export { STEP_ITEMS }