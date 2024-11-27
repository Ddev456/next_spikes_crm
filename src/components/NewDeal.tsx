import * as React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { FolderIcon } from "@/app/assets/icons/FolderIcon";

import { Statue, useDealStore } from "@/app/store/store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/app/actions/deals";
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '@/services/companies';
import Image from "next/image";
import type { Company } from "@/types/company";

const formSchema = z.object({
  object: z.string().min(1, { message: "Required" }),
  amount: z.coerce.number().min(1, { message: "Required" }),
  company: z.string().min(1, { message: "Required" }),
  statue: z.string().min(1, { message: "Required" }),
});

export function NewDeal() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies
  });

  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { addDeal, deals } = useDealStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      object: "Pitch Deck B2B",
      amount: 15000,
      company: "",
      statue: Statue.ongoing,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (deals.length === 13) return;
  
    const { object, amount, company, statue } = values;
    const selectedCompany = companies?.find(c => c.id.toString() === company);
  
    const addNewDeal = async () => {
      const token = await getToken();
      if (token && selectedCompany) {
        addDeal(token, {
          Object: object,
          Amount: amount,
          Statue: statue as Statue,
          Company: selectedCompany.documentId
        });
        
        toast({
          variant: "default",
          title: "Congrats! You added a new deal. 🚀",
          description: "You can now see it in your deals list.",
        });
      }
    };
  
    addNewDeal();
    form.reset();
    setOpen(false);
  }

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isLoading) return <div>Loading...</div>;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-[12px] flex h-[32px] lg:w-[121px] w-[60px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px]  shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
            <FolderIcon />
            <span className="hidden lg:block">New Deal</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {deals.length >= 13 && (
            <DialogHeader>
              <DialogTitle>Maximum deals reached 🚀</DialogTitle>
              <DialogDescription>Come back later !</DialogDescription>
            </DialogHeader>
          )}
          {deals.length < 13 && (
            <>
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
                <DialogDescription>Save a new deal.</DialogDescription>
              </DialogHeader>

              <NewDealForm handleSubmit={onSubmit} form={form} />
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="text-[12px] flex h-[32px] w-[60px] lg:w-[121px] gap-[12px] rounded-[5px] border border-[#101828] bg-[#101828] text-white px-[18px] py-[10px]  shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
          <FolderIcon />
          <span className="hidden lg:block">New Deal</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {deals.length >= 13 && (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Maximum deals reached 🚀</DrawerTitle>
              <DrawerDescription>Come back later !</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
            )
          </>
        )}
        {deals.length < 13 && (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Add New Deal</DrawerTitle>
              <DrawerDescription>Save a new deal</DrawerDescription>
            </DrawerHeader>
            <NewDealForm className="px-4" handleSubmit={onSubmit} form={form} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

const statues = [
  { label: "bg-[#344054]", value: "All" },
  { label: "bg-[#ECB30A]", value: Statue.pending },
  { label: "bg-[#EC0A0A]", value: Statue.cancelled },
  { label: "bg-[#2AD730]", value: Statue.ongoing },
  { label: "bg-[#960AEC]", value: Statue.waiting },
  { label: "bg-[#0085FF]", value: Statue.completed },
];

interface NewDealFormProps {
  className?: string;
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function NewDealForm({ className, handleSubmit, form }: NewDealFormProps) {
  /*   const [companyId, setCompanyId] = useState<number>(1);
  const [object, setObject] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [statue, setStatue] = useState<Statue>("pending"); */

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies
  });

  if (isLoading) return <div>Loading...</div>;

  if (!companies) return <div>No companies found</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          {/* <Label htmlFor="object">Object</Label>
          <Input
            type="text"
            id="object"
            name="object"
            placeholder="Pitch Deck B2B"
          /> */}
          <FormField
            control={form.control}
            name="object"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Object</FormLabel>
                <FormControl>
                  <Input placeholder="Pitch Deck B2B" {...field} />
                </FormControl>
                <FormDescription>
                  This is the object of the deal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company: Company) => (
                        <SelectItem 
                          key={company.id} 
                          value={company.id.toString()}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              width={24}
                              height={24}
                              src={company.Logo.url}
                              alt="Company Logo"
                              className="w-6 h-6"
                            />
                            <span>{company.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the company</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Amount"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the amount of the deal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="statue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statue</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Statue" />
                    </SelectTrigger>
                    <SelectContent>
                      {statues.map((statue) => (
                        <SelectItem key={statue.value} value={statue.value}>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                statue.label,
                                "h-[6px] rounded-full w-[6px]"
                              )}
                            />
                            <span>{statue.value}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the statue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
