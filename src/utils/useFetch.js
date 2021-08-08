import { useState, useEffect } from "react";

export const useFetchForSelect = (refresh) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  useEffect(() => {
    Promise.all([fetch(`${url}/genres`), fetch(`${url}/authors`)])
      .then((res) => Promise.all(res.map((res) => res.json())))
      .then((data) => {
        setData({ genres: data[0], authors: data[1] });
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
  }, [refresh]);
  return { data, isPending, error };
};

export const useFetch = (path, refresh) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`${url + path}`, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
        abortCont.abort();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [path, refresh]);
  return { data, isPending, error };
};

export const usePost = async (path, body) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  useEffect(() => {
    const abortCont = new AbortController();
    if (typeof body === "string" && body.length <= 0) {
      return () => abortCont.abort();
    }
    fetch(`${url + path}`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body,
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
        abortCont.abort();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [path, body]);

  return { data, isPending, error };
};
