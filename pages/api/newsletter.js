import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // ここでデータベースにユーザーのメールアドレスを保存するなどの処理を実行します。
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://dbUser:dbUserpass@cluster0.d4gvdkd.mongodb.net/events?retryWrites=true&w=majority"
    );
    //access to the database
    const db = client.db();

    //inserting one document
    await db.collection("newsletter").insertOne({ email: userEmail });

    //Disconnect
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
