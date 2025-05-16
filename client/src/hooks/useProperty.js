import { useQuery } from "@tanstack/react-query";
import {
  getProperties,
  getPropertiesByCategory,
  SingleProperty,
} from "../api/apiHandler";

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

export const useCategoryPropertiesQuery = (category) => {
  return useQuery({
    queryKey: ["category-properties", category],
    queryFn: () => getPropertiesByCategory(category),
    enabled: !!category, // Only runs when category is selected
    retry: 1,
  });
};
