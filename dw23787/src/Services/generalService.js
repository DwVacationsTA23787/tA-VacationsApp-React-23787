export async function GetUsersCount() {
    try {
      const response = await fetch('https://localhost:7044/api/V1/numUsers', {
        headers: {
          Accept: "*/*"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch number of users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching number of users:', error);
      return null;
    }
  }
  
  export async function GetTripsCount() {
    try {
      const response = await fetch('https://localhost:7044/api/V1/numTrips', {
        headers: {
          Accept: "*/*"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch number of trips');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching number of trips:', error);
      return null;
    }
  }
  