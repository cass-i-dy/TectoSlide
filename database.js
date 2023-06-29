const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('tectoslide');
const userCollection = db.collection('user');
const dataCollection = db.collection('data');



(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('OK')
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(email) {
    return userCollection.findOne({ email: email });
  }

  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }

  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
  }

  async function addData(data) {
    console.log('addData')
    const result = await dataCollection.insertOne(data);
    return result;
  }

  function getData() {
    const cursor = dataCollection.find.toArray;
    return cursor;
  }

  // function addData(data) {
  //   dataCollection.insertOne(data);
  // }
  
  // function getData() {
  //   const query = { data: { $gt: 0, $lt: 900 } };
  //   const options = {
  //     sort: { data: -1 },
  //     limit: 10,
  //   };
  //   const cursor = dataCollection.find(query, options);
  //   return cursor.toArray();
  // }

  module.exports = { 
    getUser,
    getUserByToken,
    createUser,
    addData, 
    getData };