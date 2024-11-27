import type { Company } from "@/types/company";
import { getToken } from "@/app/actions/deals";

export async function getCompanies() {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/clients?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  return data.data as Company[];
}