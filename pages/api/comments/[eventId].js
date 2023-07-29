import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:dbUserpass@cluster0.d4gvdkd.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    //add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment", comment: newComment });
  }
  if (req.method === "GET") {
    const db = client.db();

    //.find()で全部のデータをfetchできる
    //.toArray() to get all documents as array
    //.sort() 降順でidを並べ替えたいので、アンダースコアidを追加して、値をマイナス1に設定する
    const documents = await db
      .collection("comments")
      .find()
      .sort({ id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
