import { Plus } from "lucide-react";
import { NewButton } from "./new-button";
import { OrgList } from "./org-list";

export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] bg-blue-950 h-full w-[60px] flex flex-col p-3 gap-y-4 text-white">
      <NewButton />
      <OrgList />
    </aside>
  );
};
