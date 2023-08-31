import axios from 'axios';
import queryString from 'query-string';
import { HealthEquipmentInterface, HealthEquipmentGetQueryInterface } from 'interfaces/health-equipment';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHealthEquipments = async (
  query?: HealthEquipmentGetQueryInterface,
): Promise<PaginatedInterface<HealthEquipmentInterface>> => {
  const response = await axios.get('/api/health-equipments', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHealthEquipment = async (healthEquipment: HealthEquipmentInterface) => {
  const response = await axios.post('/api/health-equipments', healthEquipment);
  return response.data;
};

export const updateHealthEquipmentById = async (id: string, healthEquipment: HealthEquipmentInterface) => {
  const response = await axios.put(`/api/health-equipments/${id}`, healthEquipment);
  return response.data;
};

export const getHealthEquipmentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/health-equipments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHealthEquipmentById = async (id: string) => {
  const response = await axios.delete(`/api/health-equipments/${id}`);
  return response.data;
};
