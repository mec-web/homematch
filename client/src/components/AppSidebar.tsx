import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

interface AppSidebarProps {
  userType: "landlord" | "tenant" | "admin" | "agent";
}
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
  BarChart3,
  Users,
  UserCheck,
  ClipboardList,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const getNavLinks = () => {
    switch (userType) {
      case "landlord":
        return [
          { icon: Building, label: "Properties", href: "/landlords/properties" },
          { icon: FileText, label: "Applications", href: "/landlords/applications" },
          { icon: Settings, label: "Settings", href: "/landlords/settings" },
        ];
      case "tenant":
        return [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          { icon: FileText, label: "Applications", href: "/tenants/applications" },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];
      case "admin":
        return [
          { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
          { icon: Users, label: "Users", href: "/admin/users" },
          { icon: Building, label: "Properties", href: "/admin/properties" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ];
      case "agent":
        return [
          { icon: UserCheck, label: "Leads", href: "/agent/leads" },
          { icon: Users, label: "Clients", href: "/agent/clients" },
          { icon: ClipboardList, label: "Tasks", href: "/agent/tasks" },
          { icon: Settings, label: "Settings", href: "/agent/settings" },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const getDashboardTitle = () => {
    switch (userType) {
      case "landlord": return "Landlord View";
      case "tenant": return "Renter View";
      case "admin": return "Admin Dashboard";
      case "agent": return "Agent Dashboard";
      default: return "Dashboard";
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {getDashboardTitle()}
                  </h1>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </>
              ) : (
                <button
                  className="hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => toggleSidebar()}
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-7 py-7",
                    isActive
                      ? "bg-gray-100"
                      : "text-gray-600 hover:bg-gray-100",
                    open ? "text-blue-600" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
