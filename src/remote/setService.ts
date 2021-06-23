import { quizzardClient } from "./quizzardClient";

/**
 * An axios get request to get all sets created by account
 * @param username A string of the username of the account
 * @returns A list of sets that the account has created
 * @author Vinson Chin
 * @author Austin Knauer
 */
export async function createdSetSearch(username: String) {
	let response = await quizzardClient.get(`/sets/created/${username}`);
	return await response.data;
    }