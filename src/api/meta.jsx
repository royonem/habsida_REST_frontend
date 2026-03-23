export async function getGenders() {
  const res = await fetch("http://localhost:8080/api/meta/genders");

  if (!res.ok) {
    throw new Error("Failed to fetch genders");
  }

  return res.json();
}

export async function getCountries() {
  const res = await fetch("http://localhost:8080/api/meta/countries");

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return res.json();
}