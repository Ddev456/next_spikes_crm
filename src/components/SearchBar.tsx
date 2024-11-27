import { Command, CommandInput } from "@/components/ui/command";

export const SearchBar = () => {
  return (
    <Command>
      <CommandInput placeholder="Search" />

      {/* <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList> */}
    </Command>
  );
};
