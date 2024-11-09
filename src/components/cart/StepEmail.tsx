import useCartDetail from "@/hooks/use-cart-detail";
import { useClients } from "@/hooks/use-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, RefreshCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export const StepEmail = () => {
  const { login } = useCartDetail();
  const emailSchema = z.object({
    email: z.string().email("Ingrese un correo electrónico válido"),
  });

  type EmailSchema = z.infer<typeof emailSchema>;

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: login,
  });

  const { findClient, isLoadingClientByEmail } = useClients();

  const onSubmit = async (data: { email: string }) => {
    const existClient = await findClient({ email: data.email });
    if (!existClient) {
      toast.success("Cliente encontrado");
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-bold">¿Por qué necesitamos tu email?</h2>
        <p className="text-sm">
          Necesitamos tu email para enviarte la confirmación de tu pedido y
          mantenernos en contacto contigo.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="email"
                    className="inline-flex items-center gap-2 text-sm font-bold"
                  >
                    <Mail className="size-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="">
              {isLoadingClientByEmail ? (
                <>
                  <RefreshCcw className="spin size-4" /> Buscando{" "}
                </>
              ) : (
                "Continuar"
              )}
            </Button>
          </form>
        </Form>
        <Separator orientation="vertical" />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">¿Ya tienes cuenta?</h3>
            <p className="text-sm">
              ¡Inicia sesión y sigue disfrutando de tus compras!
            </p>
          </div>
          <Button>Iniciar sesión</Button>
        </div>
      </div>
    </div>
  );
};
