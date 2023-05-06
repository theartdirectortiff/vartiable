import { Client } from "@notionhq/client";

const notionDatabase = "ee277c7bbf6d411d8866dfbb1b1599f7";
const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

export default async function handler(req, res) {
  const { name, email, message } = req.body;

  try {
    await notion.pages.create({
      parent: {
        database_id: notionDatabase,
      },
      properties: {
        Nom: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email,
        },
      },
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: message,
                },
              },
            ],
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Err" });
    return;
  }

  res.status(200).json({ message: "Message sent successfully" });
}
