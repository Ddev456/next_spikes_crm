'use server'

import { cookies } from 'next/headers'
import { authService } from '@/lib/strapi'

export async function login(identifier: string, password: string) {
  try {
    const data = await authService.login(identifier, password)
    
    // Stocker le token dans un cookie httpOnly
    const cookieStore = await cookies()
    cookieStore.set('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 jours
    })

    return data.user
  } catch (error) {
    throw new Error(`Erreur lors de la connexion : ${error}`)
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('jwt')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('jwt')?.value
  
  if (!token) {
    return null
  }

  try {
    return await authService.getMe(token)
  } catch {
    return null
  }
}