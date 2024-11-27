import { create } from 'zustand'
import { login as loginAction } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  role: {
    id: number
    name: string
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: Error | null
  login: (credentials: { identifier: string; password: string }) => Promise<void>
  signup: (data: { username: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null })
      const user = await loginAction(credentials.identifier, credentials.password)
      set({ user })
    } catch (error) {
      set({ error: error as Error })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async (data) => {
    try {
      set({ isLoading: true, error: null })
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, data)
      set({ user: response.data.user })
      localStorage.setItem('jwt', response.data.jwt)
    } catch (error) {
      set({ error: error as Error })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    localStorage.removeItem('jwt')
    set({ user: null })
    redirect('/')
  }
}))