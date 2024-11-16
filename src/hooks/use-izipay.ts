import { useEffect } from "react";

declare global {
  interface Window {
    Izipay: any;
  }
}

const useIzipay = (token: string | null) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.izipay.pe/payments/v1/js/index.js";
    script.async = true;
    script.onload = () => {
      console.log("Izipay SDK loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loadIzipayForm = (config: any, callback: (response: any) => void) => {
    if (token && window.Izipay) {
      try {
        const checkout = new window.Izipay({ config });

        checkout?.LoadForm({
          authorization: token,
          keyRSA: "RSA",
          callbackResponse: callback,
        });
      } catch (error: any) {
        console.error(error.message, error.Errors, error.date);
      }
    }
  };

  return { loadIzipayForm };
};

export default useIzipay;
