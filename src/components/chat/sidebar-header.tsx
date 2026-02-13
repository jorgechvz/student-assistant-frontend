import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CustomSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="hover:bg-transparent"
          size="lg"
          asChild
          onClick={() =>
            (window.location.href = "/")
          }
        >
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <img
                src={"/logoo.svg"}
                alt={`Loop logo`}
                className="size-6"
              />
            </div>
            <div className="grid flex-1 text-left text-2xl">
              <span className="truncate font-bold text-[#004aad]">Loop</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
