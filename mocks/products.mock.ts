// src/mocks/handlers.js
import { rest } from 'msw'
import type { IEspecialidade, IPlan, IProduct } from '~~/types/product'
const { getProductFriendlyName } = useUtils()

const randomFloatFromInterval = (min: number, max: number) => parseFloat((Math.random() * (max - min + 1) + min).toFixed(2))

const generateEspecialidades = (codigoPlano: number): IEspecialidade[] => {
  return [
    {
      codigo: Math.floor(Math.random() * 100),
      codigoPlano,
      nome: 'tratamento',
      diasCarencia: Math.floor(Math.random() * 1000),
    },
    {
      codigo: Math.floor(Math.random() * 100),
      codigoPlano,
      nome: 'prótese',
      diasCarencia: Math.floor(Math.random() * 1000),
    },
  ]
}

const generatePlans = (nomeFantasia: string): IPlan[] => {
  const precoMensal = randomFloatFromInterval(23, 150)
  const precoAnual = +((precoMensal * 12) - (precoMensal * 12 * 0.10)).toFixed(2)
  const codigoPlano = Math.floor(Math.random() * 10000)
  const especialidades = generateEspecialidades(codigoPlano)

  return [
    {
      nomeFantasia,
      registroAns: '',
      codigoPlano,
      tipoNegociacao: 'MENSAL',
      valorTitular: precoMensal,
      valorDependente: precoMensal,
      coParticipacao: 'S',
      especialidades,
    },
    {
      nomeFantasia,
      registroAns: '',
      codigoPlano: codigoPlano + 1,
      tipoNegociacao: 'ANUAL',
      valorTitular: precoAnual,
      valorDependente: precoAnual,
      coParticipacao: 'N',
      especialidades,
    },
  ]
}

const generateProducts = (): IProduct[] => [
  {
    nome: 'Dente de Leite',
    faxaEtaria: 'de 0 a 7 anos',
    sku: '1',
    destaque: true,
    mais_vendido: false,
    vantagens: '',
    coberturas: [
      {
        cobertura: 'Cobertura completa Rol ANS',
        link: {
          text: 'Rol ANS',
          href: 'https://www.odontoprevonline.com.br/sites/default/files/Plano-Dente-de-Leite.pdf',
        },
      },
    ],
    logo: 'bebe',
    planos: generatePlans('Dente de Leite'),
  },
  {
    nome: 'Dental Júnior',
    faxaEtaria: 'de 8 a 16 anos',
    sku: '2',
    destaque: true,
    mais_vendido: false,
    vantagens: '',
    coberturas: [{
      cobertura: 'Cobertura completa Rol ANS',
      link: {
        text: 'Rol ANS',
        href: 'https://www.odontoprevonline.com.br/sites/default/files/Plano%20Dental%20Junior.pdf',
      },
    }],
    logo: 'controle',
    planos: generatePlans('Dental Júnior'),
  },
  {
    nome: 'bem-estar mais',
    sku: '3',
    destaque: true,
    mais_vendido: true,
    vantagens: '',
    coberturas: [{
      cobertura: 'Cobertura completa Rol ANS',
      link: {
        text: 'Rol ANS',
        href: 'https://www.odontoprevonline.com.br/sites/default/files/bem-estar.pdf',
      },
    }, { cobertura: 'Documentação Ortodôntica' }],
    logo: 'coracao',
    planos: generatePlans('Dental \nbem-estar\n mais'),
  },
  {
    nome: 'Estética mais',
    sku: '4',
    destaque: true,
    mais_vendido: false,
    vantagens: '',
    coberturas: [{
      cobertura: 'Cobertura completa Rol ANS',
      link: {
        text: 'Rol ANS',
        href: 'https://www.odontoprevonline.com.br/sites/default/files/Plano-Dental-Estetica_0.pdf',
      },
    }, { cobertura: 'Placa de clareamento + Gel' }, { cobertura: 'Consulta em especialista Odonto Estética' }],
    logo: 'sorriso',
    planos: generatePlans('Dental \nEstética\n mais'),
  },
  {
    nome: 'Orto Total',
    sku: '5',
    destaque: true,
    mais_vendido: false,
    vantagens: '',
    coberturas: [{
      cobertura: 'Cobertura Rol ANS',
      link: {
        text: 'Rol ANS',
        href: 'https://www.odontoprevonline.com.br/sites/default/files/Plano-Dental-Orto.pdf',
      },
    }, { cobertura: 'Colocação + Manutenção de Aparelho' }, { cobertura: 'Documentação Ortodôntica' }],
    logo: 'dente-aparelho',
    planos: generatePlans('Dental\n Orto\n Total'),
  },
]

const PRODUTOS = generateProducts()

export default [
  rest.get('*/products', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),

      ctx.json(PRODUTOS),
    )
  }),
  rest.get('*/products/:id', (req, res, ctx) => {
    const { id } = req.params
    const produto = PRODUTOS.find(product => product.sku === id || getProductFriendlyName(product.nome) === id)
    return res(
      ctx.status(200),
      ctx.delay(500),

      ctx.json(produto),
    )
  }),
]
