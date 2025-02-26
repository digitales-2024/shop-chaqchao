import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Izipay: any;
  }
}

const useIzipay = (token: string | null) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_IZIPAY_SDK_URL ?? "";
    script.async = true;
    script.onload = () => {
      // Izipay SDK script loaded successfully.
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadIzipayForm = (config: any, callback: (response: any) => void) => {
    if (token && window.Izipay) {
      try {
        const checkout = new window.Izipay({ config });

        checkout?.LoadForm({
          authorization: token,
          keyRSA: "RSA",
          callbackResponse: callback,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error.message, error.Errors, error.date);
      }
    }
  };

  return { loadIzipayForm };
};

export default useIzipay;
