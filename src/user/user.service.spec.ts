import { somar } from '../utils/somar'

test('Este é o meu primeiro teste', () => {
  const resultado = somar(5, 5)

  expect(resultado).toEqual(10)
})
