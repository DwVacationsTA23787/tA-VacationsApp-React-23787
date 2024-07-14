//  ------------------ BASE URL FOR ENDPOINTS -----------------
const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

// Funtions Explanation
// GetUsersCount - Gets the number of users in the app.
// GetTripsCount - Gets the number of trips in the app.

export async function GetUsersCount() {
    try {
      const response = await fetch(`${URL}/numUsers`, {
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
      const response = await fetch(`${URL}/numTrips`, {
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
  