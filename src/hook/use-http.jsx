import React from "react";
import { useState } from "react";

function useHttp(config, transforDataCall) {
  const [first, setfirst] = useState("second");

  const httpRequest = async () => {
    const { url, method, body, headers } = config;
    const response = await fetch(url, {
      method: method ? method : "GET",
      body: body ? JSON.stringify(body) : null,
      headers: headers ? headers : {},
    });

    const data = await response.json();
    transforDataCall(data);
  };
  return {
    httpRequest,
  };
}

export default useHttp;
