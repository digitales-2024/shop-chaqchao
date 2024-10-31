"use client";
import { useClients } from "@/hooks/use-client";
import {
  updateClientsSchema,
  UpdateClientsSchema,
} from "@/schemas/client/updateClientSchema";
import { ClientDataUpdate } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import DatePickerWithYearNavigation from "../ui/year-selector";

export function ProfileForm() {
  const { clientData, onUpdateClient } = useClients();
  const form = useForm<UpdateClientsSchema>({
    resolver: zodResolver(updateClientsSchema),
    defaultValues: {
      name: "",
      phone: "",
      birthDate: undefined,
    },
    mode: "onChange",
  });
  console.log("🚀 ~ ProfileForm ~ form:", form.watch());

  useEffect(() => {
    if (clientData) {
      form.reset({
        ...clientData,
        birthDate: new Date(clientData.birthDate),
      });
    }
  }, [clientData]);

  function onSubmit(data: Partial<ClientDataUpdate>) {
    onUpdateClient(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre" {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre que se mostrará en su perfil y en correos
                electrónicos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormDescription>
                Usaremos este número para mantenerlo actualizado sobre sus
                pedidos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <DatePickerWithYearNavigation
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Usamos esto para mostrarle contenido relevante.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>ACTUALIZAR PERFIL</Button>
      </form>
    </Form>
  );
}
