import { LINK_API_SUNAT } from "@/constants/API";

export async function getCustomerData(
  documentType: string,
  documentNumber: string,
) {
  const response = await fetch(
    `${LINK_API_SUNAT}/${documentType}/${documentNumber}?token=${process.env.NEXT_PUBLIC_API_SUNAT_TOKEN}`,
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error("Error al obtener los datos del cliente");
}
