import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="w-full h-full flex flex-col px-20 py-12
        items-center text-white"
      >
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
