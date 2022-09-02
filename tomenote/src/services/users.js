import Api from './api'

const UsersService = {
    register: (params) => Api.post('/users/register', params),
    login: async (params) => {
        const response = await Api.post("/users/login", params)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },
    logout: () => {
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    },
    update: async (params) => {
        const response = await Api.put("/users", params,
            { headers: { 'access-token': localStorage.getItem('token') } })
        localStorage.setItem('user', JSON.stringify(response.data));
    },
    updatePassword: async (params) => {
        await Api.put("/users/password", params, {
            headers: { 'access-token': localStorage.getItem('token') }
        })
    },
}

export default UsersService