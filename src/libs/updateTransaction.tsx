export default async function updateTransaction(
  tid: string,
  token: string,
  status: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${tid}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot update transaction");
  }
  return await response.json();
}
