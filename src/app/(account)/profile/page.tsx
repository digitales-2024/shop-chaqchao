"use client";

import { Sidebar } from "@/components/SideBarClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import DatePickerWithYearNavigation from "@/components/ui/year-selector";
import { useClients } from "@/hooks/use-client";
import {
  UpdateClientsSchema,
  updateClientsSchema,
} from "@/schemas/client/updateClientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AccountPage() {
  const { clientData, isLoading, onUpdateClient } = useClients();
  const form = useForm<UpdateClientsSchema>({
    resolver: zodResolver(updateClientsSchema),
    defaultValues: {
      name: "",
      phone: "",
      birthDate: null, // Establece null como valor predeterminado
    },
  });

  // Establecer valores predeterminados cuando clientData cambie
  useEffect(() => {
    if (clientData) {
      form.reset({
        name: clientData.name,
        phone: clientData.phone,
        birthDate: clientData.birthDate ? new Date(clientData.birthDate) : null, // Si es null, establecer null
      });
    }
  }, [clientData, form]);

  function onSubmit(input: UpdateClientsSchema) {
    const { ...rest } = input;
    rest.birthDate = rest.birthDate || null;

    startTransition(async () => {
      await onUpdateClient(rest); // Solo envía los campos permitidos
    });
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!clientData) {
    return <p>No se encontraron datos del cliente.</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white p-8">
        <h1 className="pb-4 text-xl font-bold text-secondary">
          Detalles de la cuenta
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Número de Celular</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Ingrese su número de celular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Fecha de Nacimiento
                  </FormLabel>
                  <FormControl>
                    <DatePickerWithYearNavigation
                      selectedDate={
                        field.value ? new Date(field.value) : undefined
                      }
                      onChange={(date) => {
                        field.onChange(date || null); // Actualiza el valor del campo, pasando null si date es undefined
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-8 bg-secondary text-white hover:bg-[#4a2409]"
            >
              Guardar Cambios
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
