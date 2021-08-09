import { useState, useEffect } from "react";

export const useFetch = (refresh) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  useEffect(() => {
    const abortCtrl = new AbortController();
    if (!refresh) {
      return () => abortCtrl.abort();
    }
    Promise.all(
      [fetch(`${url}/genres`), fetch(`${url}/authors`), fetch(`${url}/books`)],
      { signal: abortCtrl.signal }
    )
      .then((res) => {
        if (res.some((el) => !el.ok)) {
          throw Error("could not fetch the data");
        }
        return Promise.all(res.map((res) => res.json()));
      })
      .then((data) => {
        setData({ genres: data[0], authors: data[1], books: data[2] });
        setIsPending(false);
        setError(null);
        abortCtrl.abort();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCtrl.abort();
  }, [refresh]);
  return { data, isPending, error };
};

export const usePost = (path, body) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = {
      signal: abortCtrl.signal,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    };
    if (!body || (typeof body === "string" && body.length <= 0)) {
      return () => abortCtrl.abort();
    }
    fetch(`${url + path}`, opts)
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
        abortCtrl.abort();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCtrl.abort();
  }, [path, body]);

  return { data, isPending, error };
};

export const useDelete = (path, id) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";
  useEffect(() => {
    const abortCont = new AbortController();
    if (!id) {
      return () => abortCont.abort();
    }
    fetch(`${url + path}/${id}`, {
      signal: abortCont.signal,
      method: "DELETE",
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
  }, [path, id]);
  return { data, isPending, error };
};
