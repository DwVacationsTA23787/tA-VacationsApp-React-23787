export function handleLogin(Email, password, remainder) {
  return fetch(`https://localhost:7044/api/V1/LogIn?${new URLSearchParams({
    email: Email,
    password: password,
    remainder: remainder
  })}`, {
    headers: {
      Accept: "*/*"
    },
    method: "GET"
  })
  .then((res) => res.json())
  .then((data) => {
    return data; // Return the parsed JSON data
  })
  .catch((error) => {
    console.error('Error during login:', error);
    throw error; // Propagate the error further if needed
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
  