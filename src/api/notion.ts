const notionSecret = "secret_wQsgneSxAJ4w8hXQSAlab7olX6vXMb2sQibBcPhsw0I";
const notionDatabaseId = "ef427d6ada93438582ce586c54388eed";

export async function fetchData() {
  const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://api.notion.com/v1/databases/${notionDatabaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionSecret}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Notion API request failed");
  }

  const data = await response.json();
  return data;
}
