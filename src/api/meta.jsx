import { apiFetch } from "./client";

export async function getGenders() {
    return apiFetch("/api/meta/genders");
}

export async function getCountries() {
    return apiFetch("/api/meta/countries");
}

export async function getRoles() {
    return apiFetch("/api/meta/roles");
}