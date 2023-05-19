import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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

describe('Testa o componente Table', () => {
  it('Testa se ao excluir uma despesa é apagado do estado global e da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockExpenses });

    const descriptionExpense = screen.getByText('teste01');

    const btnDelete = await screen.findAllByText(/excluir/i);

    act(() => userEvent.click(btnDelete[1]));

    expect(descriptionExpense).not.toBeInTheDocument();
  });

  it('Testa se ao editar uma despesa é a descrição e o estado global são alterados', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = await screen.findByTestId('value-input');
    const inputDescription = await screen.findByTestId('description-input');
    const btnAddExpense = await screen.findByRole('button', { name: /adicionar despesa/i });

    act(() => userEvent.type(inputValue, '20'));
    act(() => userEvent.type(inputDescription, 'nova descrição'));
    act(() => userEvent.click(btnAddExpense));

    const btnToEdit = await screen.findByRole('button', { name: /editar/i });
    act(() => userEvent.click(btnToEdit));

    const btnEditExpense = screen.getByText(/editar despesa/i);
    expect(btnEditExpense).toBeInTheDocument();

    act(() => userEvent.type(inputValue, '10'));
    act(() => userEvent.type(inputDescription, 'teste'));
    act(() => userEvent.click(btnEditExpense));

    const tableValue = screen.getByRole('cell', { name: /10\.00/i });
    const tableDescripition = screen.getByRole('cell', { name: /teste/i });

    expect(tableValue).toBeInTheDocument();
    expect(tableDescripition).toBeInTheDocument();
  });
});
