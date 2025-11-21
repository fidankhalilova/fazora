import { getApi } from "./api";
import type { StrapiResponse, House } from "../Types/types";

export const houseService = {
  getAllHouses: async (): Promise<StrapiResponse<House[]>> => {
    const response = await getApi("/api/houses?populate=*");
    return response.data;
  },

  getHouseById: async (id: number): Promise<StrapiResponse<House>> => {
    try {
      const response = await getApi(`/api/houses/${id}`);
      return response.data;
    } catch (error) {
      console.log("Direct endpoint failed, filtering from all houses...");
      const allHouses = await getApi("/api/houses");
      const house = allHouses.data.data.find((h: House) => h.id === id);

      if (!house) {
        throw new Error("House not found");
      }

      return {
        data: house,
        meta: allHouses.data.meta,
      };
    }
  },
};
