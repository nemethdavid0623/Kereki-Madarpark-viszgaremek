import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Animals from "../components/Animals";

function AnimalsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/AllData")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {data.map((row) =>
        <Animals
            key={row.ID}
            SpeciesName={row.SpeciesName}
          />
      )}
    </Layout>
  );
}

export default AnimalsPage;