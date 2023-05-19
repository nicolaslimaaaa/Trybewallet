import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const mockExpenses = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '100',
        description: 'teste01',
        currency: 'GBP',
        method: 'Cartão de crédito',
        tag: 'Trabalho',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '11',
        description: 'teste02',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    isLoading: false,
  },
};

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(jest.restoreAllMocks);

describe('Testa o componente Header', () => {
  it('Testa se ao adicionar uma despesa, aparece o valor total convertido de acordo com a moeda escolhida', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockExpenses });

    screen.getByText('654.02');
  });
});
