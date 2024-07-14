//  ------------------ BASE URL FOR ENDPOINTS -----------------
const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

// Functions explanations
// handleMessagePost - Responsible to send a message for a specific group, then the endpoint sends a notification for all users in the group.
// GetAllGroupsMessages - Gets all groups with their last message if exists, case not the same comes with the null value.
// GetGroupMessages - Gets messages for a specific group.
export function handleMessagePost(formData) {
    fetch(`${URL}/AddMessageToGroup`, {  
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
        return res;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  export function GetAllGroupsMessages(id) {
    return fetch(`${URL}/GetAllGroupsForUserMessage?${new URLSearchParams({
    userID: id,
    })}`, {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  }

  export function GetGroupMessages(id) {
    return fetch(`${URL}/GetGroupMessages?${new URLSearchParams({
    groupId: id,
    })}`, {
      headers: {
        Accept: "*/*"
      },
      method: "GET",
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  }


