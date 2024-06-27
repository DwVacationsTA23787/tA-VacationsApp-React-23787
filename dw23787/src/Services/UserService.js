export function handleLogin(Email, password, remainder){
    fetch('https://localhost:7044/api/V1/LogIn?' + new URLSearchParams({
      email: Email,
      password: password,
      remainder: remainder
    }),  
    {
      headers: {
        Accept: "*/*"
      },
      method: "GET"
    })
    .then((res) => res.json())
    .then((res) => {
        //const user = res.rows[0];
        //localStorage.setItem('user', JSON.stringify(user))
        //navigate('/', { replace: true });
        //window.location.reload();
        console.log(res)
    });
  };



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
        console.log(res);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  