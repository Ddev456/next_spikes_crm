import strapiClient from '@/lib/strapi'
import { useMutation, useQuery } from '@tanstack/react-query'

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await strapiClient.get('/api/contacts')
      return response.data
    }
  })
}

export const useCreateContact = () => {
  return useMutation({
    mutationFn: async (data: Omit<Contact, 'id'>) => {
      const response = await strapiClient.post('/api/contacts', { data })
      return response.data
    }
  })
}