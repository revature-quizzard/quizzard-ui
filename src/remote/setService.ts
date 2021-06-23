import { quizzardClient } from "./quizzardClient";

export async function createdSetSearch(username: String) {
	let response = await quizzardClient.get(`/created/${username}`);
	return await response.data;
    }