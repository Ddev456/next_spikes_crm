import strapiClient from '@/lib/strapi'
import type { NewDeal } from '@/app/store/store'

export const dealService = {
  getDeals: async (token: string) => {
    try {      
      const response = await strapiClient.get('/api/users/me?populate[deals][populate][Company][populate]=Logo&status=published', {
        headers: {
          Authorization: `Bearer ${token.replace('Bearer ', '')}`
        }
      })
      
      return response.data.Deals
    } catch (error) {
      throw new Error(`An error occurred while fetching deals: ${error}`)
    }
  },

  createDeal: async ({deal, token}: {deal: NewDeal, token: string}) => {
    const userResponse = await strapiClient.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const userId = userResponse.data.id;

    const response = await strapiClient.post('/api/deals?populate[Company][populate]=Logo', { 
      data: {
        ...deal,
        Company: deal.Company,
        User_id: userId
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  deleteDeal: async (documentId: string, token: string) => {
    const response = await strapiClient.delete(`/api/deals/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}          