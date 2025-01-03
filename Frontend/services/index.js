const apiUrl = import.meta.env.VITE_API_URI;

const URL = `${apiUrl}/api`;

// backend services userRegister
export const userRegister = async (data) => {
    return await fetch(`${URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// backend services userlogin
export const userLogin = async (data) => {
    return await fetch(`${URL}/user/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};


// get folders
export const getFolder = async () => {
    const response = await fetch(`${URL}/api/folders/folders/:id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  };