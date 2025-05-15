import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../api/apiHandler";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: ["property-list"],
    queryFn: getProperties, // Just pass the function directly
    retry: 1, // Will retry once if the request fails
  });
};
