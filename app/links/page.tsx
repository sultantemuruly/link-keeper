"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { AddLinkDialog } from "@/components/custom/links/AddLinkDialog";
import { LinkItem } from "@/components/custom/links/LinkItem";
import { SearchBar } from "@/components/custom/links/SearchBar";
import { Link } from "@/components/custom/links/types";

export default function LinksPage() {
  const { userId } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/links");
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
    if (userId) fetchLinks();
  }, [userId]);

  const handleDelete = async (linkId: string) => {
    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId }),
      });

      if (!response.ok) throw new Error("Failed to delete link");
      await fetchLinks();
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link.");
    }
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-10 px-10 md:px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold md:font-bold">
          Your Links
        </h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <AddLinkDialog
          onLinkAdded={(newLink) => setLinks((prev) => [newLink, ...prev])}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

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
            filteredLinks.map((link) => (
              <LinkItem key={link.id} link={link} onDelete={handleDelete} />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
