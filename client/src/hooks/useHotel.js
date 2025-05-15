import { useMutation } from '@tanstack/react-query';
import { createHotel } from '../api/apiHandler';

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: createHotel,
  });
};
