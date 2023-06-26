import { useQuery } from "react-query";
import api from "../../service/api";
import { difDates } from "../useCountDate";

export type Delivery = {
  codigo: number;
  localColeta?: string;
  material?: string;
  peso?: number;
  localDescarga?: string;
  horarioEntrega?: Date;
  horarioColeta: Date;
  horarioEntregaToString?: string;
  horarioColetaToString?: string;
  diffTimesToString?: string;

  usuario: {
    nome: string;
    sobrenome: string;
  };
};

type GetDeliversResponse = {
  delivers: Delivery[];
  page: number;
  pagesize: number;
  total: number;
};

interface useDeliveriesProps {
  page: number;
  pagesize: number;
  search?: string;
}

interface useDeliveryOneProps {
  cod?: number;
}

export async function getDelivers({
  page = 0,
  pagesize = 10,
  search,
}: useDeliveriesProps): Promise<GetDeliversResponse> {
  const { data } = await api.get<GetDeliversResponse>("/delivers", {
    params: {
      page: page - 1,
      pagesize,
      search,
    },
  });

  return {
    ...data,
    delivers: data.delivers.map((delivery) => {
      const [_, hourNumber, minuteNumber, secondNumber] = difDates(
        delivery.horarioColeta,
        delivery?.horarioEntrega ? delivery.horarioEntrega : new Date()
      );

      const diffTimesToString = `${hourNumber}h ${minuteNumber}m ${secondNumber}s`;

      return {
        ...delivery,
        horarioColetaToString: delivery?.horarioColeta
          ? new Date(delivery?.horarioColeta).toLocaleString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : undefined,
        horarioEntregaToString: delivery?.horarioEntrega
          ? new Date(delivery?.horarioEntrega).toLocaleString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : undefined,
        diffTimesToString: diffTimesToString,
      };
    }),
  };
}

export function useDelivers({ page, pagesize, search }: useDeliveriesProps) {
  return useQuery(["delivers", page, pagesize, search], () =>
    getDelivers({
      page,
      pagesize,
      search,
    })
  );
}
export async function getDeliveryOne({
  cod,
}: useDeliveryOneProps): Promise<Delivery | undefined> {
  if (!cod) return undefined;

  const { data } = await api.get<Delivery>(`/delivers/${cod}`, {});

  return data;
}

export function useDeliveryOne({ cod }: useDeliveryOneProps) {
  return useQuery(["delivery", cod], () =>
    getDeliveryOne({
      cod,
    })
  );
}
