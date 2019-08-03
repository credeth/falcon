import auth from "../utils/authenticator";
export const getRequest = (baseUrl, endpoint, authenticated = false) => {
  var headers = {
    "Content-Type": "application/json"
  };
  if (authenticated) {
    headers = {
      "Content-Type": "application/json",
      "x-access-token": auth.getToken()
    };
  }

  return new Request(baseUrl + endpoint, {
    method: "GET",
    headers: new Headers(headers)
  });
};

export const postRequest = (
  baseUrl,
  endpoint,
  body,
  headers,
  formdata = false
) => {
  headers = headers || {
    "Content-Type": "application/json",
    "x-access-token": auth.getToken()
  };
  if (!formdata) {
    body = JSON.stringify(body);
  }
  return new Request(baseUrl + endpoint, {
    method: "POST",
    headers: new Headers(headers),
    body: body
  });
};
