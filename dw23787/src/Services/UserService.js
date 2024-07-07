export function handleLogin(Email, password, remainder) {
  return fetch(`https://localhost:7044/api/V1/LogIn?${new URLSearchParams({
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




  export function handleRegister(user) {
    fetch('https://localhost:7044/api/V1/Register', {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((res) => {
        //const user = res.rows[0];
        //localStorage.setItem('user', JSON.stringify(user))
        //navigate('/', { replace: true });
        //window.location.reload();
        return res;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  export function GetUser(id) {
    return fetch(`https://localhost:7044/api/V1/GetUser?${new URLSearchParams({
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
    return fetch(`https://localhost:7044/api/V1/UpdateUser/${id}`, {
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
  


  