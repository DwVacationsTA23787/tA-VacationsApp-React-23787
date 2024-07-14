//  ------------------ BASE URL FOR ENDPOINTS -----------------
const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

// Functions explanations
// GetTravels - Get all travels except the travels the user logged in created.
// GetTravelDetail - Gets travels information as the user that created the travel.
// GetTravelsForUser - Gets Number of travels that belong to a specific user.
// GetAllTravelsForUser - Gets all travels created by a specific user.
// GetAllTripsForUser - Gets all travels for Dashboard travels.
// CreateTrip - Responsible for create a trip.
// DeleteTrip - Responsible for delete a trip.
// UpdateTrip - Responsible for update a trip.
export function GetTravels(id, Page, Pagesize, category, search) {
    return fetch(`${URL}/TravelCards?${new URLSearchParams({
      id: id,
      page: Page,
      pageSize: Pagesize,
      category: category,
      search: search
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
      console.error('Error during login:', error);
      throw error;
    });
  }


  export function GetTravelDetail(id) {
    return fetch(`${URL}/TripDetail?${new URLSearchParams({
      id: id,
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
      console.error('Error during travel info:', error);
      throw error;
    });
  }


  export function GetTravelsForUser(id) {
    return fetch(`${URL}/NumberUserTrips?${new URLSearchParams({
      id: id,
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
      console.error('Error during login:', error);
      throw error;
    });
  }


  export function GetAllTravelsForUser(id) {
    return fetch(`${URL}/UserTrips?${new URLSearchParams({
      id: id,
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
      console.error('Error during login:', error);
      throw error;
    });
  }

export async function GetAllTripsForUser(id) {
  try {
    const response = await fetch(`${URL}/GetAllTripsForReactUser?id=${id}`, {
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


export async function CreateTrip(id, formData) {
  try {
    const response = await fetch(`${URL}/CreateTrip?id=${id}`, {
      method: 'POST',
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


export function DeleteTrip(tripId) {
  const url = `${URL}/DeleteTrip?${new URLSearchParams({ tripId: tripId })}`;

  return fetch(url, {
    headers: {
      'Accept': '*/*'
    },
    method: 'DELETE',
    credentials: 'include'
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  })
  .then((data) => {
    console.log('Response data:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
    throw error;
  });
}


export async function UpdateTrip(id, formData) {
  try {
    const response = await fetch(`${URL}/UpdateTrip?id=${id}`, {
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