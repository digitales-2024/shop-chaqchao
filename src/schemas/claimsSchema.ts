import { z } from "zod";

export enum AssetType {
  PRODUCT = "PRODUCT",
  SERVICE = "SERVICE",
}

export const reclamationSchema = z
  .object({
    claimantName: z
      .string()
      .min(2, "El nombre del reclamante debe tener al menos 2 caracteres")
      .transform((val) => val.trim().toLowerCase()),
    claimantAddress: z
      .string()
      .optional()
      .transform((val) => val?.trim() ?? ""),
    documentNumber: z
      .string()
      .min(8, "El número de documento debe tener al menos 8 caracteres.")
      .max(20, "El número de documento no debe exceder los 20 caracteres."),
    claimantEmail: z
      .string()
      .min(1, { message: "El correo electrónico es obligatorio" })
      .email({ message: "Ingrese un correo electrónico válido" })
      .transform((val) => val.trim()),
    claimantPhone: z
      .string()
      .min(1, "El número de teléfono es obligatorio")
      .refine(
        (val) => /^\+[1-9]\d{1,14}$/.test(val),
        "Número de teléfono no válido.",
      )
      .transform((val) => val.trim()),
    claimantRepresentative: z
      .string()
      .optional()
      .transform((val) => val?.trim().toLowerCase() ?? ""),
    assetType: z.enum(["PRODUCT", "SERVICE"], {
      invalid_type_error:
        "Debe seleccionar un tipo válido: Producto o Servicio.",
    }),
    amountClaimed: z.string().optional(),
    assetDescription: z
      .string()
      .min(5, "La descripción del bien es obligatoria."),
    claimDescription: z
      .string()
      .min(5, "La descripción del reclamo es obligatoria.")
      .transform((val) => val.trim()),
    fechaDia: z
      .string()
      .min(1, "El día es obligatorio.")
      .refine(
        (val) =>
          /^\d{1,2}$/.test(val) &&
          parseInt(val, 10) >= 1 &&
          parseInt(val, 10) <= 31,
        {
          message: "Debe ser un día válido (1-31).",
        },
      ),
    fechaMes: z
      .string()
      .min(1, "El mes es obligatorio.")
      .refine(
        (val) =>
          /^\d{1,2}$/.test(val) &&
          parseInt(val, 10) >= 1 &&
          parseInt(val, 10) <= 12,
        {
          message: "Debe ser un mes válido (1-12).",
        },
      ),
    fechaAnio: z
      .string()
      .min(4, "El año es obligatorio.")
      .refine((val) => /^\d{4}$/.test(val) && parseInt(val, 10) >= 1900, {
        message: "Debe ser un año válido (ejemplo: 2024).",
      }),
    dateClaim: z.string().optional(),
  })
  .refine(
    (data) => {
      const { fechaDia, fechaMes, fechaAnio } = data;
      const dateStr = `${fechaAnio}-${fechaMes.padStart(2, "0")}-${fechaDia.padStart(2, "0")}`;
      const date = new Date(dateStr);

      if (isNaN(date.getTime())) {
        return false;
      }

      data.dateClaim = date.toISOString();
      return true;
    },
    {
      message: "La fecha no es válida.",
      path: ["fechaDia", "fechaMes", "fechaAnio"],
    },
  );

export type RegisterClaimPayload = Omit<
  ReclamationFormData,
  "fechaDia" | "fechaMes" | "fechaAnio"
> & {
  dateClaim: string;
};

export type ReclamationFormData = z.infer<typeof reclamationSchema>;
