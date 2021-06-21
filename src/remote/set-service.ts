import { webappClient } from "./web-client";

export async function createdSetSearch(username: String) {
	let response = await webappClient.get(`/created/${username}`);
	return await response.data;
    }