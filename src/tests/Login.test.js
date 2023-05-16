import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const email = 'email@email.com.br';

describe('Testa a tela de Login', () => {
  it('Testa se na tela de Login há dois inputs de texto', () => {
    renderWithRouterAndRedux(<App />);
    screen.getAllByRole('textbox');
    screen.getByPlaceholderText(/email/i);
    screen.getByPlaceholderText(/password/i);
  });

  it('Testa se na tela de Login há um botão com o Texto Entrar', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole('button', { name: /entrar/i });
  });

  it('Testa se o botão está desabilitado após o carregamento da página', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(btn).toBeDisabled();
  });

  it('Testa se o botão continua desabilitado ao preencher o input de email com email incorreto e tamanho de senha correto', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    userEvent.type(inputEmail, 'email.@email.com.br');
    userEvent.type(inputPassword, '123456');

    expect(btn).toBeDisabled();
  });

  it('Testa se o botão continua desabilitado ao preencher o input de senha, com senha menor que 6 caracteres, e o input de e-mail corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    userEvent.type(inputEmail, `${email}`);
    userEvent.type(inputPassword, '12345');

    expect(btn).toBeDisabled();
  });

  it('Testa se o botão é habilitado ao preencher os inputs de e-mail e senha corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    userEvent.type(inputEmail, `${email}`);
    userEvent.type(inputPassword, '123456');

    expect(btn).not.toBeDisabled();
  });

  it('Testa se ao preencher as informações de login e clicar no botão é redirecionado para a rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    userEvent.type(inputEmail, `${email}`);
    userEvent.type(inputPassword, '123456');

    act(() => userEvent.click(btn));

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
