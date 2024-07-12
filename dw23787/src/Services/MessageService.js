const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

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


