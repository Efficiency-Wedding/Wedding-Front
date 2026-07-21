import { getAxios } from "@/config/axios";
import type { CreateServicePayload, UpdateServicePayload } from "@/type/type";

export const serviceProvider = {
  async findOne(id: string) {
    return getAxios()
      .get(`/api/services/${id}`)
      .then((response) => response.data);
  },

  async findAll() {
    return getAxios()
      .get("/api/services")
      .then((response) => response.data);
  },

  async create(data: CreateServicePayload) {
    return getAxios()
      .post("/api/services/", data)
      .then((response) => response.data);
  },

  async update(id: number, data: UpdateServicePayload) {
    return getAxios()
      .put(`/api/services/${id}`, data)
      .then((response) => response.data);
  },

  async delete(id: number) {
    return getAxios()
      .delete(`/api/services/${id}`)
      .then((response) => response.data);
  },

};
