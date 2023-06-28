import { useQuery } from "react-query";
import api from "../../service/api";

type ItemAnalytic = {
  name: string;
  quantity: number;
};

export type DeliveryAnalytic = {
  totalToday: number;
  total: number;
  timeFirstDeliveryToday: string;

  drivers: ItemAnalytic[];
  materials: ItemAnalytic[];
};

export async function getDeliveryAnalytic(): Promise<DeliveryAnalytic> {
  const { data } = await api.get<DeliveryAnalytic>("/delivers/analytic", {});

  return data;
}

export function useDeliveryAnalytic() {
  return useQuery(["delivers-analytic"], () => getDeliveryAnalytic());
}
