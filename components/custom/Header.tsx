import { FileHeart } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="py-8 px-20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FileHeart width={32} height={32} />
        <h1 className="text-xl">Link Keeper</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} className="text-xl">
          About
        </Button>
        <Button variant={"ghost"} className="text-xl">
          My Links
        </Button>
      </div>
    </div>
  );
};
export default Header;
