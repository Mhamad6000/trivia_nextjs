// export { kurdsatApi, kurdsatNewsApi, kurdbinApi };

async function fetcher({
  url,
  body,
  method,
  headers,
  revalidate,
}: {
  url: string;
  body?: any;
  method?: string;
  headers?: any;
  revalidate?: number;
}) {
  const response = await fetch(url, {
    method: method || "GET",
    headers: headers || {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    next: {
      revalidate: revalidate || 3600,
    },
  });
  if (!response.ok) {
    // Capture both the error message and status code
    const errorResponse = await response.json(); // Assuming the API returns an error in JSON
    const errorMessage = errorResponse?.message || response.statusText;

    // Create a custom error object that includes both status and message
    const error = new Error(errorMessage) as any; // Use "as any" to allow for custom properties
    error.statusCode = response.status; // Attach the status code to the error object

    throw error;
  }
  return response.json();
}
export { fetcher };
