"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader, Plus, Trash2, Search } from "lucide-react";

import { useAuth } from "@clerk/nextjs";

// Define form schema
const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  url: z.string().url("Invalid URL address"),
  description: z.string().optional(),
});

type Link = {
  id: string;
  title: string;
  url: string;
  description?: string;
  savedAt: string;
};

type LinkFormData = {
  title: string;
  url: string;
  description?: string;
};

export default function LinksPage() {
  const { userId } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<Link[]>([]); // Store fetched links
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  // Fetch user's links on page load
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/links", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch links");

      const data = await response.json();
      setLinks(data);
    } catch (err) {
      console.log(err);
      setError("Could not load links.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchLinks(); // Fetch only if user is authenticated
  }, [userId]);

  // Handle form submission
  const onSubmit = async (values: LinkFormData) => {
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save link");
      }

      const newLink = await response.json();
      setLinks((prevLinks) => [newLink, ...prevLinks]); // Add new link to UI
      setOpen(false);
      form.reset(); // Reset form after submission

      toast.success("Link saved successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to save link.");

      toast.error("Failed to save link.");
    }
  };

  // handle deletion of links
  const handleDelete = async (linkId: string) => {
    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete link");
      }

      if (userId) fetchLinks();

      toast.success("Link deleted successfully!");
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link.");
      toast.error("Failed to delete link.");
    }
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-10 md:px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold md:font-bold">
          Your Links
        </h1>

        <div className="mt-4 mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Add Link Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="flex items-center text-xl"
              onClick={() => setOpen(true)}
            >
              <div className="text-lg md:text-2xl font-medium md:font-semibold">
                Add
              </div>
              <Plus strokeWidth={4} />
            </Button>
          </DialogTrigger>

          {/* Add Link Form */}
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add a New Link</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Indicator and Links Display */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
          <p>Loading links...</p>
        </div>
      ) : (
        <ul className="mt-4">
          {filteredLinks.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              No links found matching {searchQuery}
            </p>
          ) : (
            filteredLinks.map((link: Link) => (
              <li
                key={link.id}
                className="p-3 border-b flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
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
                <div className="flex flex-col items-end gap-2 ml-4">
                  <AlertDialog>
                    <AlertDialogTrigger className="flex items-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 py-2 px-4 rounded-sm transition-colors">
                      <Trash2 size={16} />
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will not be able to retrieve the link later
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(link.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <p className="text-xs text-gray-500">
                    Saved at: {new Date(link.savedAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
