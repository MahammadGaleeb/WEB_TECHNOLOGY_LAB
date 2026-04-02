import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.slice(0, 5)); // show only 5 items
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>API Data</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <b>{item.title}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;