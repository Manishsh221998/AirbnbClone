import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api/apiHandler";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};
