function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    //add server-side validation
    const { email, name, text } = req.body;

    if (
      email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = {
      id: new Date().toISOstring(),
      email,
      name,
      text,
    };
    console.log(newComment);

    res.status(201).json({ message: "Added comment", comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Yuka", text: "first test comment" },
      { id: "c2", name: "Yuuka", text: "Second test comment" },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
