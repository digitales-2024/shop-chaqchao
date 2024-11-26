import { useTranslations } from "next-intl";

const PaymentForm = ({ popin = false, token = "" }) => {
  const t = useTranslations("checkout");

  return (
    <div
      className="kr-embedded"
      kr-popin={popin ? "kr-popin" : ""}
      kr-form-token={token}
    >
      <div className="kr-payment-method"> </div>
      <div className="kr-pan"> </div>
      <div className="kr-expiry"></div>
      <div className="kr-security-code"></div>
      <div className="kr-installment-number"></div>
      <div className="kr-first-installment-delay"></div>

      <div className="kr-payment-button" kr-payment-method="[CARDS]">
        {t("pay")} %amount-and-currency%
      </div>
    </div>
  );
};
export default PaymentForm;
