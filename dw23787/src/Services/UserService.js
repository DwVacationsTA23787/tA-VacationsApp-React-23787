const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

export function handleLogin(Email, password, remainder) {
  return fetch(`${URL}/LogIn?${new URLSearchParams({
    email: Email,
    password: password,
    remainder: remainder
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




  export function handleRegister(formData) {
    fetch(`${URL}/Register`, {  
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

  export function GetUser(id) {
    return fetch(`${URL}/GetUser?${new URLSearchParams({
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
      throw error;
    });
  }


  export function UpdateUser(id, userData) {
    return fetch(`${URL}/UpdateUser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  


  