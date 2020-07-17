import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // const transactions = this.find()

    // let valueIncome = 0;
    // let valueOutcome = 0;

    // await this.forEach(transaction => {
    //   if(transaction.type === "income") {
    //     valueIncome += transaction.value;
    //   } else {
    //     valueOutcome += transaction.value;
    //   }
    // });

    // const balance = {
    //   income: valueIncome,
    //   outcome: valueOutcome,
    //   total: valueIncome - valueOutcome,
    // };

    // return balance;
  }
}

export default TransactionsRepository;
