import {
  useConfirmPaymentMutation,
  useRegisterClassMutation,
} from "@/redux/services/classApi";

export const useRegisterClass = () => {
  const [
    registerClass,
    { isLoading: isLoadingRegisterClass, isSuccess: isSuccessRegisterClass },
  ] = useRegisterClassMutation();

  return {
    registerClass,
    isLoadingRegisterClass,
    isSuccessRegisterClass,
  };
};

export const useConfirmClassPayment = () => {
  const [confirmPayment, { isLoading, isError, isSuccess }] =
    useConfirmPaymentMutation();

  return { confirmPayment, isLoading, isError, isSuccess };
};
