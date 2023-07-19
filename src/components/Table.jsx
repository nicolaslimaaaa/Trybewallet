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
      <div
        className="w-full text-white h-[450px] overflow-scroll overflow-x-hidden"
      >
        <table
          className="text-center max-w-full"
        >
          <thead className="border border-collapse border-blue-lol ">
            <tr
              className="text-yellow-lol"
            >
              <th
                className=""
              >
                Descrição

              </th>
              <th
                className="px-3"
              >
                Tag

              </th>
              <th
                className="px-3"
              >
                Método de pagamento

              </th>
              <th
                className="px-3"
              >
                Valor

              </th>
              <th
                className="px-3"
              >
                Moeda

              </th>
              <th
                className="px-3"
              >
                Câmbio utilizado

              </th>
              <th
                className="px-3"
              >
                Valor convertido

              </th>
              <th
                className="px-3"
              >
                Moeda de conversão

              </th>
              <th
                className="px-3"
              >
                Editar/Excluir

              </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses && (
                expenses.map((expense) => (
                  <tr
                    key={ expense.id }
                    className="border border-collapse border-blue-lol"
                  >
                    <td
                      className="break-all w-40 h-12"
                    >
                      {expense.description}

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {expense.tag}

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {expense.method}

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {(Number(expense.value)).toFixed(2)}

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {expense.exchangeRates[expense.currency].name}

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {Number(expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)}
                    </td>

                    <td
                      className="break-all w-40"
                    >
                      {(Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                    </td>

                    <td
                      className="break-all w-40"
                    >
                      Real

                    </td>

                    <td
                      className="break-all w-40"
                    >
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ this.handleClickButtonDelete }
                        id={ expense.id }
                        className="bg-red-900 mx-1 px-2 py-1 rounded-3xl
                        hover:bg-green-lol"
                      >
                        Excluir

                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        id={ expense.id }
                        onClick={ this.handleClickButtonEdit }
                        className="bg-blue-800 mx-1 px-2 py-1 rounded-3xl
                        hover:bg-green-lol"
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
