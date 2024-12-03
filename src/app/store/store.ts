import { create } from "zustand";
import { dealService } from "@/services/deals";

export enum Statue {
  pending = "Pending",
  cancelled = "Cancelled",
  ongoing = "Ongoing",
  waiting = "Waiting for confirmation",
  completed = "Completed",
}

export interface company {
  id: number;
  name: string;
  logo: string;
}

export interface Deal {
  documentId: string;
  updatedAt: string;
  id: string;
  Amount: number;
  Object: string;
  Statue: Statue;
  Company: {
    Company: string;
    Logo: {
      url: string;
    }
  };
}

export interface NewDeal {
  Object: string;
  Amount: number;
  Company: string;
  Statue: Statue;
}

export interface DealStore {
  deals: Deal[];
  isLoading: boolean;
  error: Error | null;
  fetchDeals: (token: string) => Promise<void>;
  addDeal: (token: string, newDeal: NewDeal) => Promise<void>;
  removeDeals: (token: string, documentIds: string[]) => Promise<void>;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  isLoading: false,
  error: null,

  fetchDeals: async (token: string) => {
    try {
      set({ isLoading: true, error: null });
      const deals = await dealService.getDeals(token);
      console.log("Deals from API:", deals); // Debug
      set({ deals: Array.isArray(deals) ? deals : [] });
    } catch (error) {
      console.error("Store fetchDeals error:", error);
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  addDeal: async (token: string, newDeal) => {
    try {
      set({ isLoading: true, error: null });
      const response = await dealService.createDeal({deal: newDeal, token});
      set((state) => ({ 
        deals: Array.isArray(state.deals) ? [...state.deals, response.data] : [response.data]
      }));
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeDeals: async (token: string, documentIds: string[]) => {
    try {
      set({ isLoading: true, error: null });
      await Promise.all(documentIds.map(id => dealService.deleteDeal(id, token)));
      
      // Rafraîchir les deals après la suppression
      const updatedDeals = await dealService.getDeals(token);
      set({ deals: updatedDeals });
      
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));
