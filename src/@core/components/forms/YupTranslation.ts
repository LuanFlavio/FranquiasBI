import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: 'Campo não é válido',
    required: 'O campo é obrigatório'
  },
  string: {
    email: () => 'O campo precisa conter uma email válido',
    max: 'O campo pode ter no máximo ${max} caracteres',
    min: 'O campo precisa ter pelo menos ${min} caracteres',
    length: 'O campo precisa ter exatamente ${length} caracteres'
  },
  date: {
    max: 'A data deve ser menor que ${max}',
    min: 'A data deve ser maior que ${min}'
  },
  number: {
    integer: () => 'O campo precisa ter um valor inteiro',
    negative: () => 'O campo precisa ter um valor negativo',
    positive: () => 'O campo precisa ter um valor positivo',
    moreThan: 'O campo precisa ter um valor maior que ${more}',
    lessThan: 'O campo precisa ter um valor menor que ${less}',
    min: 'O campo precisa ter um valor com mais de ${min} caracteres',
    max: 'O campo precisa ter um valor com menos de ${max} caracteres'
  },
  boolean: {},
  array: {}
})
