import { create } from "zustand";
import { clientService } from "@/services/client";
import { useDealStore } from './store';

export interface Client {
  documentId: string;
  id: string;
  Company: string;
  Logo?: {
    url: string;
  };
  updatedAt: string;
}

export interface NewClient {
  Company: string;
  logo?: File;
}

interface ClientStore {
  clients: Client[];
  isLoading: boolean;
  error: Error | null;
  fetchClients: (token: string) => Promise<void>;
  addClient: (token: string, newClient: NewClient) => Promise<void>;
  removeClients: (token: string, documentIds: string[]) => Promise<void>;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  isLoading: false,
  error: null,

  fetchClients: async (token: string) => {
    try {
      set({ isLoading: true, error: null });
      const clients = await clientService.getClients(token);
      set({ clients });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  addClient: async (token: string, newClient) => {
    try {
      set({ isLoading: true, error: null });
      const response = await clientService.createClient({ client: newClient, token });
      set((state) => ({ clients: [...state.clients, response.data] }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeClients: async (token: string, documentIds: string[]) => {
    try {
      set({ isLoading: true, error: null });
      
      // Supprimer les clients et leurs deals associés
      await Promise.all(documentIds.map(id => clientService.deleteClient(id, token)));
      
      // Rafraîchir la liste des clients
      const updatedClients = await clientService.getClients(token);
      set({ clients: updatedClients });
      
      // Rafraîchir la liste des deals
      const dealStore = useDealStore.getState();
      await dealStore.fetchDeals(token);
      
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));