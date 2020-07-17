import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const checkTransactionExists = await transactionsRepository.findOne({
      where: { id }
    });

    if(!checkTransactionExists) {
      throw new AppError('Transaction not found.', 404);
    }

    transactionsRepository.delete({
      id: checkTransactionExists.id
    });
  }
}

export default DeleteTransactionService;
