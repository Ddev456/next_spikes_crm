import axios from 'axios'

const strapiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authService = {
  login: async (identifier: string, password: string) => {
    const response = await strapiClient.post('/api/auth/local', {
      identifier,
      password,
    })
    return response.data
  },

  register: async (username: string, email: string, password: string) => {
    const response = await strapiClient.post('/api/auth/local/register', {
      username,
      email,
      password,
    })
    return response.data
  },

  getMe: async (token: string) => {
    const response = await strapiClient.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
}

export default strapiClient