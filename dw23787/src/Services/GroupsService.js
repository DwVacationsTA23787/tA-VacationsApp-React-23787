
export async function GetAllGroupsForUser(id) {
    try {
      const response = await fetch(`https://localhost:7044/api/V1/GetAllGroupsForUser?id=${id}`, {
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
      console.error('Error fetching trips:', error);
      throw error;
    }
  }

  export function AddUserToGroup(groupId, userId) {
    return fetch(`https://localhost:7044/api/V1/AddUserToGroup?${new URLSearchParams({
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