export async function getRequest(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error. Got back status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw new Error(
      `An error occurred while making a GET request: ${error.message}`
    );
  }
}

export async function postRequest<T, R>(url: string, data: T): Promise<R> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error. Got back status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      `An error occurred while making a POST request: ${error.message}`
    );
  }
}
