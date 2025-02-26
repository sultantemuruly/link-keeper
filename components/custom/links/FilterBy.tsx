import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Categories } from "./constants";

interface CategoryFilterProps {
  handleFilterCategory: (value: string) => Promise<void>;
}

export function FilterBy({ handleFilterCategory }: CategoryFilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const handleCategoryChange = async (value: string) => {
    setCurrentCategory(value);
    await handleFilterCategory(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center text-xl"
          onClick={() => setOpen(true)}
        >
          <div className="text-sm md:text-md font-medium">Category Filter</div>
          <SlidersHorizontal strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="py-4">Filter By Category</DialogTitle>
          <Select
            defaultValue={currentCategory || "None"}
            onValueChange={(value) => handleCategoryChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {Categories.map((category, id) => (
                  <SelectItem key={id} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
