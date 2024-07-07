
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