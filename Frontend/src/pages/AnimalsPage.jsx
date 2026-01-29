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
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="birds-page-wrapper">
        <div className="birds-search-bar">
          <span>Kereső:</span>
          <input type="text" placeholder="Keress..."/>
        </div>


        <div className="birds-grid">
          {data.map((row) => (
            <Animals
              key={row.ID}
              SpeciesName={row.SpeciesName}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AnimalsPage;