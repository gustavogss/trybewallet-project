import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
        <Table />
      </>
    );
  }
}

export default Wallet;
