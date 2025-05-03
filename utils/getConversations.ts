// don't authenticate and only get the conversations for the user id passed in
// this assures seperation of concerns by keeping authentication ceperate form  other tasks like fetching data

// add start and end index and set a default start and end indexs

/**
 * Retrieves the chat history for a given user.
 *
 * ⚠️ **Authorization and authentication are NOT handled** in this function.
 * Make sure the user is verified before calling it.
 *
 * @param  userId - The ID of the user whose chat history is being retrieved.
 * @param  [start=0] - The starting index for the history (defaults to 0).
 * @param  [end=10] - The end index (non-inclusive, defaults to 10).
 * @returns  A promise that resolves to the list of chat messages.
 */
interface getConversationsParams {
  useId: string;
  start: number;
  end: number;
}
export async function getConversations({
  useId,
  start = 0,
  end = 10,
}: getConversationsParams) {
  // get the chat history for the user with the passed id starting from index and ending at index
}
//TODO: another protected getConversations function could be added here that authenticates and authorizes the user before fetching the conversation history
//TODO: limit how many messages are fetched for each conversartion
