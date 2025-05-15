import { useQuery } from "@tanstack/react-query";
import { getProperties, SingleProperty } from "../api/apiHandler";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: ["property-list"],
    queryFn: getProperties, // Just pass the function directly
    retry: 1, // Will retry once if the request fails
  });
};

export const useSinglePropertyQuery = (id) => {
  return useQuery({
    queryKey: ["single-property", id], // Fixed query key (removed trailing slash)
    queryFn: () => SingleProperty(id), // Properly pass the id
    enabled: !!id,
    retry: 1,
  });
};
