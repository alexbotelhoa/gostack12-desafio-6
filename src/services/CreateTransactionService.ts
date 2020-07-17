import { getRepository, getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
// import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      title: category
    });

    if(!checkCategoryExists) {
      const category = categoriesRepository.create({
        title, 
      });
    
      const { id } = await categoriesRepository.save(category);
    }

    const transactionsRepository = getCustomRepository(Transaction);

    const transaction = transactionsRepository.create({
      title, 
      value, 
      type,
      category_id: id
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
