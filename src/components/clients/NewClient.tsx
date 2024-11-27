"use client";

import * as React from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientStore } from "@/app/store/clientStore";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/app/actions/deals";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { FolderIcon } from "@/app/assets/icons/FolderIcon";
import Image from "next/image";

const formSchema = z.object({
  Company: z.string().min(1, "Company name is required"),
  Logo: z.instanceof(Blob).optional(),
});

export function NewClient() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { addClient } = useClientStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Company: "",
      Logo: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');
      
      await addClient(token, {
        Company: data.Company,
        logo: data.Logo,
      });
      
      toast({
        title: "Success",
        description: "Client created successfully",
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: "Error",
        description: "Failed to create client",
        variant: "destructive",
      });
    }
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-[12px] flex h-[32px] lg:w-[121px] w-[60px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px] shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
            <FolderIcon />
            <span className="hidden lg:block">New Client</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>Create a new client profile.</DialogDescription>
          </DialogHeader>
          <ClientForm handleSubmit={onSubmit} form={form} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="text-[12px] flex h-[32px] w-[60px] lg:w-[121px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px] shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
          <FolderIcon />
          <span className="hidden lg:block">New Client</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Client</DrawerTitle>
          <DrawerDescription>Create a new client profile</DrawerDescription>
        </DrawerHeader>
        <ClientForm className="px-4" handleSubmit={onSubmit} form={form} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ClientFormProps {
  className?: string;
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function ClientForm({ className, handleSubmit, form }: ClientFormProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  // Nettoyer l'URL de prévisualisation lors du démontage du composant
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={form.control}
          name="Company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Client name" {...field} />
              </FormControl>
              <FormDescription>The client&apos;s company name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Logo"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const blob = new Blob([file], { type: file.type });
                          onChange(blob);
                          if (previewUrl) {
                            URL.revokeObjectURL(previewUrl);
                          }
                          const url = URL.createObjectURL(blob);
                          setPreviewUrl(url);
                        }
                      }}
                      {...{ ...field, value: undefined }}
                    />
                    {previewUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          form.setValue('Logo', undefined);
                          URL.revokeObjectURL(previewUrl);
                          setPreviewUrl(null);
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <Image
                        src={previewUrl}
                        alt="Logo preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>The client&apos;s company logo (PNG, JPG up to 2MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Client</Button>
      </form>
    </Form>
  );
}