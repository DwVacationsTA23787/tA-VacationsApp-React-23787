export function GetTravels(id, Page, Pagesize, category, search) {
    return fetch(`https://localhost:7044/api/V1/TravelCards?${new URLSearchParams({
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
    return fetch(`https://localhost:7044/api/V1/TripDetail?${new URLSearchParams({
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


  export function GetTravelsForUser(id) {
    return fetch(`https://localhost:7044/api/V1/NumberUserTrips?${new URLSearchParams({
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
    return fetch(`https://localhost:7044/api/V1/UserTrips?${new URLSearchParams({
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
    const response = await fetch(`https://localhost:7044/api/V1/GetAllTripsForUser?id=${id}`, {
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
