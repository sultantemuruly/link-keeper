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
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Link } from "./types";

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => Promise<void>;
}

export function LinkItem({ link, onDelete }: LinkItemProps) {
  return (
    <li className="p-3 border-b flex justify-between items-center hover:bg-gray-50 transition-colors">
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
      <div className="flex items-center gap-4">
        <div>
          <Select defaultValue={link.category || "None"}>
            <SelectTrigger>
              <SelectValue placeholder="Select categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Youtube">Youtube</SelectItem>
              <SelectItem value="Inspiration">Inspiration</SelectItem>
              <SelectItem value="Sport">Sport</SelectItem>
              <SelectItem value="Fun">Fun</SelectItem>
              <SelectItem value="Hobby">Hobby</SelectItem>
              <SelectItem value="Style">Style</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
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
                <AlertDialogAction onClick={() => onDelete(link.id)}>
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
