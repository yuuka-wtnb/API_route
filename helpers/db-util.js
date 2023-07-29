import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:dbUserpass@cluster0.d4gvdkd.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  //inserting one document
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter={}) {
  const db = client.db();

  //.find()で全部のデータをfetchできる
  //.toArray() to get all documents as array
  //.sort() 降順でidを並べ替えたいので、アンダースコアidを追加して、値をマイナス1に設定する
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
}
