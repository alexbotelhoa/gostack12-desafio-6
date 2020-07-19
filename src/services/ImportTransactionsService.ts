import { getRepository } from 'typeorm';
import csvParser from 'csv-parse';
import assert from 'assert';
import path from 'path';
import fs from 'fs';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

import CreateTransactionService from '../services/CreateTransactionService';

interface Request {
  importFilename: string;
}

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ importFilename }: Request): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const response = Array();

    const filePathCSV = `${uploadConfig.directory}/${importFilename}`;  
    const optionsCSV = {
      delimiter: ',', 
      trim: true, 
      columns: true,
      skip_empty_lines: true,
    };




    const parser = csvParser(
      optionsCSV,
      (err, row) => {
        for (var l = 0; l < row.length; l++) {
          response.push(row[l])
        }

        return response;
      }); 

    const teste = await fs.createReadStream(
      filePathCSV, {
    }).pipe(parser);

    // console.log(parser)

    








  //  fs.createReadStream(filePath)
  //     .pipe(
  //      csvParser(
  //        optionsCSV
  //      )
  //     )
  //     .on('data', async (transaction) => {        
  //       const result = await createTransaction.execute(transaction);
  //       response.push(result);
  //     })
  //     .on('end', () => {
  //       console.log('CSV file successfully processed')
  //     })














    // fs.createReadStream(filePath)
    //   .pipe(
    //     csvParser({ 
    //       delimiter: ',', 
    //       trim: true, 
    //       columns: true,
    //       skip_empty_lines: true,
    //     })
    //   )
    //   .on('data', async (transaction) => {        
    //     const result = await createTransaction.execute(transaction);
    //     // console.log(result);
    //     results.push(result);
    //   })
    //   .on('end', () => {
    //     console.log('CSV file successfully processed')
    //   })
















      // response.push({
      //   title: 'Loan',
      //   value: 1500,
      //   type: 'income',
      //   category_id: 'a4bd5613-3bc9-4e58-bf1f-28c008823663',
      //   id: '14eb7b97-45c8-48c4-8351-6fd285efaf9b',
      //   created_at: '2020-07-18T04:43:19.000Z',
      //   updated_at: '2020-07-18T04:43:19.000Z'
      // });

      // response.push({
      //   title: 'Website Hosting',
      //   value: 50,
      //   type: 'outcome',
      //   category_id: 'a4bd5613-3bc9-4e58-bf1f-28c008823663',
      //   id: '30431304-5730-4667-b913-e9fb4fb7eaf3',
      //   created_at: '2020-07-18T04:43:19.000Z',
      //   updated_at: '2020-07-18T04:43:19.000Z'
      // });

      // response.push({
      //     title: 'Ice cream',
      //     value: 3,
      //     type: 'outcome',
      //     category_id: '14f60954-93e7-4cd3-b65b-774e72690703',
      //     id: 'e78793bc-215e-4e00-a4b2-323a5c67ac91',
      //     created_at: '2020-07-18T04:43:19.000Z',
      //     updated_at: '2020-07-18T04:43:19.000Z'
      // });

      // console.log(response);

    return response;
  }
}

export default ImportTransactionsService;
