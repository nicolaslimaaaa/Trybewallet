import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

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

    const btn = screen.getByRole('button', { name: /adicionar despesa/i });
    act(() => userEvent.click(btn));

    const inputExpense = await screen.findByPlaceholderText(/valor da despesa/i);
    const inputDescription = await screen.findByPlaceholderText(/descrição/i);

    expect(inputExpense).toHaveValue('');
    expect(inputDescription).toHaveValue('');
  });
});
