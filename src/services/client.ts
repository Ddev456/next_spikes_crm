import strapiClient from '@/lib/strapi'
import type { NewClient } from '@/app/store/clientStore'

interface ClientToDelete {
  Company: {
    documentId: string;
    logoId: string;
  }
}

export const clientService = {
  getClients: async (token: string) => {
    try {
      const response = await strapiClient.get('/api/clients?populate=Logo', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.data || []
    } catch (error) {
      throw new Error(`An error occurred while fetching clients: ${error}`)
    }
  },

  createClient: async ({ client, token }: { client: NewClient; token: string }) => {
    try {
      let logoId = null;
      if (client.logo) {
        const formData = new FormData();
        formData.append('files', client.logo);
        
        const uploadResponse = await strapiClient.post('/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        
        logoId = uploadResponse.data[0].id;
      }

      const response = await strapiClient.post('/api/clients', 
        {
          data: {
            Company: client.Company,
            Logo: logoId ? logoId : null,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error details:', error);
      throw new Error(`Failed to create client: ${error}`);
    }
  },

  deleteClient: async (documentId: string, token: string) => {
    try {
      // 2. Récupérer tous les deals de l'utilisateur
      const dealsResponse = await strapiClient.get(
        "/api/users/me?populate[Deals][populate][Company][populate]=Logo&status=published", 
        {
          headers: {
            Authorization: `Bearer ${token.replace('Bearer ', '')}`
          }
        }
      );
      console.log("documentId", documentId)
      console.log("dealsResponse.data doc ID", dealsResponse.data)
      // 3. Filtrer les deals associés au client à supprimer
      const dealsToDelete = dealsResponse.data.Deals.filter(
        (deal: ClientToDelete) => deal.Company.documentId === documentId
      );

      // 4. Supprimer tous les deals associés
      for (const deal of dealsToDelete) {
        await strapiClient.delete(`/api/deals/${deal.documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // 5. Supprimer le logo si présent
      const clientResponse = await strapiClient.get(`/api/clients/${documentId}?populate=Logo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (clientResponse.data.Logo?.documentId) {
        await strapiClient.delete(`/api/upload/files/${clientResponse.data.Logo.documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // 6. Finalement supprimer le client
      await strapiClient.delete(`/api/clients/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return true;
    } catch (error) {
      console.error('Delete client error:', error);
      throw new Error(`Failed to delete client and associated data: ${error}`);
    }
  }

}