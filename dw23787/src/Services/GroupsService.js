//  ------------------ BASE URL FOR ENDPOINTS -----------------
const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";


// Functions explanations
// GetAllGroupsForUser - Gets all groups for a specific user, case its the admin returns all groups.
// AddUserToGroup - Ads user to a group, insert user in User_Groups table, with admin value as false for default.
// DeleteGroup - Responsible for deleting a group.
// UpdateGroupService - Responsible for updating a group.
export async function GetAllGroupsForUser(id) {
    try {
      const response = await fetch(`${URL}/GetAllGroupsForUser?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  }

  export function AddUserToGroup(groupId, userId) {
    return fetch(`${URL}/AddUserToGroup?${new URLSearchParams({
      groupId: groupId,
      userId: userId
    })}`, {
      headers: {
        Accept: "*/*"
      },
      method: "POST",
      credentials: 'include'
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  }


  export function DeleteGroup(groupId, userid) {
    return fetch(`${URL}/DeleteGroup?${new URLSearchParams({
      groupId: groupId,
      userId: userid
    })}`, {
      headers: {
        Accept: "application/json"
      },
      method: "DELETE",
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  }


  export async function UpdateGroupService(id, formData) {
    try {
      const response = await fetch(`${URL}/UpdateGroup?id=${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.status;  
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  }
  