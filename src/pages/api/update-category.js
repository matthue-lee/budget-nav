import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { transactionId, newCategory } = req.body;

    // Load the current transactions
    const transactionsFilePath = path.join(process.cwd(), 'data', 'transactions.json');
    const transactions = JSON.parse(fs.readFileSync(transactionsFilePath, 'utf-8'));

    // Find the transaction by key and update the category
    const updatedTransactions = transactions.map((transaction) =>
      `${transaction.date}-${transaction.description}-${transaction.id}` === transactionId
        ? { ...transaction, category: newCategory }
        : transaction
    );

    // Write the updated transactions back to the file
    fs.writeFileSync(transactionsFilePath, JSON.stringify(updatedTransactions, null, 2));

    res.status(200).json({ message: 'Category updated successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
