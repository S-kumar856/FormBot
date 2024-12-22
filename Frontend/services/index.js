const URL = 'http://localhost:4000/api';

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
}