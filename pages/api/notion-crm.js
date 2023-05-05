import { Client } from "@notionhq/client";

const notionDatabase = "f261707589924b9597e9d28fc838eaa3";
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
        Name: {
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
