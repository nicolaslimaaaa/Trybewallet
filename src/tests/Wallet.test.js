import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';
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

describe('Testa a tela da Carteira', () => {
  it('Testa se ao fazer login aparece o email utilizado para login no Header da page Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    userEvent.type(inputEmail, 'email@email.com.br');
    userEvent.type(inputPassword, '123456');

    act(() => userEvent.click(btnEntrar));

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    screen.getByText(/email@email.com.br/i);
  });

  it('Testa se na tela da Carteira há dois inputs de texto', () => {
    renderWithRouterAndRedux(<Wallet />);
    screen.findAllByPlaceholderText(/valor da despesa/i);
    screen.findAllByPlaceholderText(/descrição/i);
  });

  it('Testa se na tela da Carteira há um botão com o texto: Adicionar despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    screen.getByRole('button', { name: /adicionar despesa/i });
  });

  it('Testa se ao clicar no botão os inputs são limpos', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const btnAddExpense = await screen.findByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.click(btnAddExpense));

    const inputValue = await screen.findByTestId('value-input');
    const inputDescription = await screen.findByTestId('description-input');

    expect(inputValue).toHaveValue('');
    expect(inputDescription).toHaveValue('');
  });

  it('Testa se é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockExpenses });

    const inputDescription = await screen.findByTestId('description-input');
    const btnToEdit = await screen.findAllByRole('button', { name: /editar/i });

    act(() => userEvent.click(btnToEdit[0]));

    screen.getByText(/editar despesa/i);

    userEvent.type(inputDescription, 'teste02');

    expect(inputDescription).toHaveValue('teste02');
  });
});
