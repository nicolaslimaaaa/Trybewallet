import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, expenseInEdition } from '../redux/actions';

class Table extends Component {
  handleClickButtonDelete = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(Number(id)));
  };

  handleClickButtonEdit = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(expenseInEdition({ editor: true, idToEdit: Number(id) }));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses && (
                expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{(Number(expense.value)).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {Number(expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)}
                    </td>
                    <td>
                      {(Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ this.handleClickButtonDelete }
                        id={ expense.id }
                      >
                        Excluir

                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        id={ expense.id }
                        onClick={ this.handleClickButtonEdit }
                      >
                        Editar

                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
