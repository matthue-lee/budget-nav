import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Resolve the path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');

    // Read the file contents
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Parse and return the JSON data
    const transactions = JSON.parse(fileContents);
    
    // Send the JSON data in the response
    res.status(200).json(transactions);
  } catch (error) {
    // Handle errors (e.g., file not found, invalid JSON, etc.)
    res.status(500).json({ error: 'Failed to load transactions' });
  }
}
