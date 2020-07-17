import { getCustomRepository, getRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionsBalance = getCustomRepository(TransactionsRepository);
    const balance = await transactionsBalance.getBalance();

    if (type === 'outcome' && (balance.total - value) < 0) {
      throw new AppError('Negative value!', 400)
    };

    const categoriesRepository = getRepository(Category);

    let checkCategoryExists = await categoriesRepository.findOne({
      title: category
    });

    if(!checkCategoryExists) {
      const newCategory = categoriesRepository.create({
        title: category,
      });
    
      checkCategoryExists = await categoriesRepository.save(newCategory);
    }

    const transactionsRepository = getRepository(Transaction);

    const transaction = transactionsRepository.create({
      title, 
      value, 
      type,
      category_id: checkCategoryExists.id
    });

    const response = await transactionsRepository.save(transaction);

    return response;
  }
}

export default CreateTransactionService;
