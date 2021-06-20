import { webappClient } from "./web-client";

export async function createdSetSearch(accountId: number) {
	let response = await webappClient.get(`/created/${accountId}`);
	return await response.data;
    }