import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Link } from "./types";
import { Categories } from "./constants";

interface LinkItemProps {
  link: Link;
  handleDelete: (id: string) => Promise<void>;
  handleCategoryChange: (id: string, value: string) => Promise<void>;
}

export function LinkItem({
  link,
  handleDelete,
  handleCategoryChange,
}: LinkItemProps) {
  return (
    <li className="p-3 border-b flex flex-col justify-center items-center md:flex-row md:justify-between hover:bg-gray-50 transition-colors gap-2">
      <div className="flex-1">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          <h2 className="font-semibold">{link.title}</h2>
        </a>
        {link.description && (
          <p className="text-sm text-gray-600">{link.description}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div>
          <Select
            defaultValue={link.category}
            onValueChange={(value) => handleCategoryChange(link.id, value)}
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
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 ml-4">
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 py-2 px-4 rounded-sm transition-colors">
              <Trash2 size={16} />
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will not be able to retrieve the link later
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(link.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className="text-xs text-gray-500">
            Saved at: {new Date(link.savedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </li>
  );
}
