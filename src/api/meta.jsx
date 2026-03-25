export async function getGenders() {
    return apiFetch("/api/meta/genders");
}

export async function getCountries() {
    return apiFetch("/api/meta/countries");
}