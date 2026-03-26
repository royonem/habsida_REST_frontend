import { useEffect, useState } from "react";
import { getGenders, getCountries, getRoles } from "../api/meta.jsx";

export default function useMeta() {
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [g, c, r] = await Promise.all([
          getGenders(),
          getCountries(),
          getRoles()
        ]);

        setGenders(g);
        setCountries(c);
        setRoles(r);
      } catch (err) {
        console.error("Failed to load meta:", err);
      } finally {
        setLoading(false); // ALWAYS runs
      }
    }

    load();
  }, []);

  return { genders, countries, roles, loading };
}