"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { AddLinkDialog } from "@/components/custom/links/AddLinkDialog";
import { LinkItem } from "@/components/custom/links/LinkItem";
import { SearchBar } from "@/components/custom/links/SearchBar";
import { Link } from "@/components/custom/links/types";
import { FilterBy } from "@/components/custom/links/FilterBy";

export default function LinksPage() {
  const { userId } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("None");

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

  const handleCategoryChange = async (linkId: string, category: string) => {
    try {
      const response = await fetch("/api/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId, category }),
      });

      if (!response.ok) throw new Error("Failed to delete link");
      await fetchLinks();
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link.");
    }
  };

  const handleFilterCategory = async (category: string) => {
    setFilterCategory(category);
  };

  const filteredLinks = links.filter((link) => {
    const titleMatch = link.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      filterCategory &&
      filterCategory.trim() !== "" &&
      filterCategory.toLowerCase() !== "none"
        ? link.category
            ?.toLowerCase()
            ?.includes(filterCategory.toLowerCase()) ?? false
        : true;
    return titleMatch && categoryMatch;
  });

  return (
    <div className="pt-10 px-10 md:px-20">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold">Your Links</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10">
          <FilterBy handleFilterCategory={handleFilterCategory} />
          <AddLinkDialog
            onLinkAdded={(newLink) => setLinks((prev) => [newLink, ...prev])}
          />
        </div>
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
              <LinkItem
                key={link.id}
                link={link}
                handleDelete={handleDelete}
                handleCategoryChange={handleCategoryChange}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
