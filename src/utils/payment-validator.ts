/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkshopRegistrationData } from "@/types";
import {
  VALID_ORDER_STATUS,
  validateAmount,
  validateEmail,
  validateOrderId,
} from "@/types/payment";

export class PaymentValidator {
  private static instance: PaymentValidator;
  // Private constructor para el patrón Singleton
  private constructor() {
    // Inicialización del singleton
  }

  public static getInstance(): PaymentValidator {
    if (!PaymentValidator.instance) {
      PaymentValidator.instance = new PaymentValidator();
    }
    return PaymentValidator.instance;
  }

  /**
   * Valida que las variables de entorno necesarias estén presentes
   */
  public validateEnvironment(): void {
    if (!process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_PUBLIC_KEY) {
      console.error("[Payment Error] Izipay public key is missing");
    }
    if (!process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_ENDPOINT) {
      console.error("[Payment Error] Izipay endpoint is missing");
    }
  }

  /**
   * Valida los datos de la transacción antes de procesar el pago
   */
  public validateTransactionData(data: WorkshopRegistrationData): boolean {
    try {
      if (!data) return false;

      const requiredFields = [
        "userName",
        "userEmail",
        "userPhone",
        "scheduleClass",
        "languageClass",
        "dateClass",
        "totalPrice",
        "typeCurrency",
      ];

      const hasAllRequired = requiredFields.every(
        (field) =>
          data[field as keyof WorkshopRegistrationData] !== undefined &&
          data[field as keyof WorkshopRegistrationData] !== null &&
          data[field as keyof WorkshopRegistrationData] !== "",
      );

      if (!hasAllRequired) {
        console.error(
          "[Payment Error] Missing required fields in transaction data",
        );
        return false;
      }

      // Validar el formato del email
      if (!validateEmail(data.userEmail)) {
        console.error("[Payment Error] Invalid email format");
        return false;
      }

      // Validar que el precio total sea un número positivo
      if (!validateAmount(Math.round(data.totalPrice))) {
        console.error("[Payment Error] Invalid total price");
        return false;
      }

      // Validar el ID de orden si existe
      if (data.id && !validateOrderId(data.id)) {
        console.error("[Payment Error] Invalid order ID format");
        return false;
      }

      return true;
    } catch (error) {
      console.error(
        "[Payment Error] Error validating transaction data:",
        error,
      );
      return false;
    }
  }

  /**
   * Valida la respuesta del pago de Izipay
   */
  public validatePaymentResponse(paymentData: any): boolean {
    try {
      if (!paymentData?.clientAnswer.orderStatus) {
        this.logPaymentError(
          new Error("Missing order status"),
          "status-validation",
        );
        return false;
      }

      if (!VALID_ORDER_STATUS.includes(paymentData.clientAnswer.orderStatus)) {
        this.logPaymentError(
          new Error(
            `Invalid order status: ${paymentData.clientAnswer.orderStatus}`,
          ),
          "status-validation",
        );
        return false;
      }

      return true;
    } catch (error) {
      this.logPaymentError(error, "unexpected-error");
      return false;
    }
  }

  /**
   * Valida que el monto pagado coincida con el monto esperado
   */
  public validateAmount(paidAmount: number, expectedAmount: number): boolean {
    // Convertir a centavos para evitar problemas con decimales
    const paidCents = Math.round(paidAmount);
    const expectedCents = Math.round(expectedAmount);

    if (paidCents !== expectedCents) {
      console.error(
        `[Payment Error] Amount mismatch: paid=${paidCents}, expected=${expectedCents}`,
      );
      return false;
    }

    return true;
  }

  /**
   * Valida los datos del pago antes de enviarlos a Izipay según la documentación oficial
   * @see https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/playground/Charge/CreatePayment
   */
  public validateIzipayPaymentData(
    amount: number,
    currency: string,
    orderId: string,
    email?: string,
  ): boolean {
    try {
      // Validar monto (requerido) - debe estar en centavos
      if (!validateAmount(amount)) {
        this.logPaymentError(
          new Error(`Invalid amount: ${amount}`),
          "izipay-amount",
        );
        return false;
      }

      // Validar moneda (requerido)
      if (!["PEN", "USD"].includes(currency)) {
        this.logPaymentError(
          new Error(`Invalid currency: ${currency}`),
          "izipay-currency",
        );
        return false;
      }

      // Validar orderId (recomendado)
      if (orderId && !validateOrderId(orderId)) {
        this.logPaymentError(
          new Error(`Invalid order ID format: ${orderId}`),
          "izipay-orderid",
        );
        return false;
      }

      // Validar email (recomendado para crear token)
      if (email && !validateEmail(email)) {
        this.logPaymentError(
          new Error(`Invalid email format: ${email}`),
          "izipay-email",
        );
        return false;
      }

      return true;
    } catch (error) {
      this.logPaymentError(error, "izipay-payment-validation");
      return false;
    }
  }

  /**
   * Registra errores de pago para debugging
   */
  public logPaymentError(error: any, context: string): void {
    console.error(`[Payment Error] ${context}:`, {
      message: error?.message || "Unknown error",
      timestamp: new Date().toISOString(),
      details: error,
    });
  }
}

export const paymentValidator = PaymentValidator.getInstance();
