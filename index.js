const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';

async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Conectado com sucesso ao MongoDB.");

  return client.db('produtos');
}

app.get('/itens', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('produtos');
    const itens = await collection.find().toArray();
    res.json(itens);
  } catch (e) {
    res.status(500).send("Erro ao buscar itens.");
  }
});

app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`);
});