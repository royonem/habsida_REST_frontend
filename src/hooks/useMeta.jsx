import { useEffect, useState } from "react";
import { getGenders, getCountries } from "../api/meta.jsx";

export default function useMeta() {
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [g, c] = await Promise.all([
          getGenders(),
          getCountries()
        ]);

        setGenders(g);
        setCountries(c);
      } catch (err) {
        console.error("Failed to load meta:", err);
      } finally {
        setLoading(false); // ALWAYS runs
      }
    }

    load();
  }, []);

  return { genders, countries, loading };
}