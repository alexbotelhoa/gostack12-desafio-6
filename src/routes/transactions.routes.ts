import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getRepository(Transaction);
  const transactions = await transactionsRepository.find();

  const transactionsBalance = getCustomRepository(TransactionsRepository);
  const balance = await transactionsBalance.getBalance();

  return response.json({ 
    transactions, 
    balance 
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title, 
    value, 
    type, 
    category,
  });

  return response.status(201).json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute({
    id,
  });

  return response.status(204).json();
});

transactionsRouter.post(
  '/import', 
  upload.single('file'), 
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService;

      const transactions = await importTransactionsService.execute(request.file.path);

    return response.status(200).json(transactions);
  }
);

export default transactionsRouter;
