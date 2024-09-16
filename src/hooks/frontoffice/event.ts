import useSWR from "swr";
import axios from "axios";

// Configuration de l'URL de l'API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fonction fetcher pour SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Hook personnalisé pour récupérer les événements
export const useEvents = () => {
  const { data, error, mutate } = useSWR(`${API_URL}events`, fetcher);

  return {
    events: data?.data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

// Hook personnalisé pour récupérer un événements via son id
export const useEventsById = (id: any) => {
  const { data, error, mutate } = useSWR(`${API_URL}events/${id}`, fetcher);

  return {
    typeplace: data?.data[0]?.type_places,
    events: data?.data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
