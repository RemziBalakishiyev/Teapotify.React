import React, { useEffect } from "react";

function useHttp(config, useData) {
  const httpRequest = async () => {
    const { url, method, body, headers } = config;
    const response = await fetch(url, {
      method: method ? method : "GET",
      body: body ? JSON.stringify(body) : null,
      headers: headers ? headers : {},
    });

    const data = await response.json();

    useData(data);
  };

  return {
    httpRequest,
  };
}

export default useHttp;
