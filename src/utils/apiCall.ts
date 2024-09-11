export default function apiCall(url: string, options: any) {

  return fetch(url, {
    ...options,
    method: (options && options.method) || "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((response) => handleErrors(response));
}

function handleErrors(response: any) {
  if (!response.ok) {
    console.log(response);
    throw Error(response.statusText);
  }
  return response.json();
}
