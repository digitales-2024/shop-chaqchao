import { useTranslations } from "next-intl";

const PaymentForm = ({ popin = false }) => {
  const t = useTranslations("checkout");

  return (
    <div className="kr-embedded" kr-popin={popin ? "kr-popin" : ""}>
      <div className="kr-pan"> </div>
      <div className="kr-expiry"></div>
      <div className="kr-security-code"></div>
      <div className="kr-installment-number"></div>
      <div className="kr-first-installment-delay"></div>

      <div className="kr-payment-button">{t("pay")} %amount-and-currency%</div>
    </div>
  );
};
export default PaymentForm;
