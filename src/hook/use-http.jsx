import React, { useCallback } from "react";
import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(true);
  const httpRequest = useCallback(
    async (config, transforDataCall) => {
      try {
        const { url, method, body, headers } = config;
        const response = await fetch(url, {
          method: method ? method : "GET",
          body: body ? JSON.stringify(body) : null,
          headers: headers ? headers : {},
        });

        const data = await response.json();
        transforDataCall(data);
        setIsLoading(false);
      } catch (error) {}
    },
    [isLoading]
  );
  return {
    isLoading,
    httpRequest,
  };
}

export default useHttp;
