import { useMemo, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Calendar,
  Plus,
  Loader2,
  MessageSquare,
  Trash2Icon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomSidebarHeader } from "./sidebar-header";
import { useChatSessions, useDeleteSession } from "@/hooks/use-chat";
import { useAuthStore } from "@/context/auth/userStore";
import { Paths } from "@/router/path.routes";
import type { SessionSummary } from "@/types/chat.types";
import { NavUser } from "./sidebar-avatar";
import { UpcomingAssignmentsDialog } from "./upcoming-assignments-dialog";

function groupSessionsByDate(sessions: SessionSummary[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  const groups: { label: string; items: SessionSummary[] }[] = [
    { label: "TODAY", items: [] },
    { label: "YESTERDAY", items: [] },
    { label: "OLDER", items: [] },
  ];

  sessions.forEach((session) => {
    const sessionDate = new Date(session.created_at);

    if (sessionDate >= today) {
      groups[0].items.push(session);
    } else if (sessionDate >= yesterday) {
      groups[1].items.push(session);
    } else {
      groups[2].items.push(session);
    }
  });

  return groups.filter((group) => group.items.length > 0);
}

const navMain = [
  {
    title: "New Chat",
    url: Paths.app.CHAT,
    icon: Plus,
  },
  {
    title: "Upcoming Due Dates",
    url: "/dates",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [assignmentsDialogOpen, setAssignmentsDialogOpen] = useState(false);
  const { user } = useAuthStore();

  const { data: sessions, isLoading: isLoadingSessions } = useChatSessions();
  const deleteSessionMutation = useDeleteSession();

  const groupedSessions = useMemo(() => {
    return groupSessionsByDate(sessions ?? []);
  }, [sessions]);

  const handleNewChat = () => {
    navigate(Paths.app.CHAT);
  };

  const handleUpcomingDueDates = () => {
    setAssignmentsDialogOpen(true);
  };

  const handleDeleteSession = async (
    e: React.MouseEvent,
    sessionId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await deleteSessionMutation.mutateAsync(sessionId);

    if (location.pathname.includes(sessionId)) {
      navigate(Paths.app.CHAT);
    }
  };

  const isSessionActive = (sessionId: string) => {
    return location.pathname.includes(sessionId);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <CustomSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="cursor-pointer">
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="py-5 border border-border/50 shadow-sm mb-1 cursor-pointer"
                    onClick={
                      item.title === "New Chat"
                        ? handleNewChat
                        : item.title === "Upcoming Due Dates"
                          ? handleUpcomingDueDates
                          : undefined
                    }
                  >
                    {item.title === "New Chat" ||
                    item.title === "Upcoming Due Dates" ? (
                      <button type="button">
                        <item.icon />
                        <span className="font-medium">{item.title}</span>
                      </button>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="w-auto opacity-50" />

        {isLoadingSessions ? (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading conversations...
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : groupedSessions.length === 0 ? (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No conversations yet
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Start a new chat to begin
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          groupedSessions.map((group) => (
            <SidebarGroup
              key={group.label}
              className="group-data-[collapsible=icon]:hidden"
            >
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((session) => (
                    <SidebarMenuItem
                      key={session.session_id}
                      className="group/item relative"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isSessionActive(session.session_id)}
                        className="data-[active=true]:bg-blue-100 data-[active=true]:text-blue-900 pr-8"
                      >
                        <Link to={`/chat/${session.session_id}`}>
                          <span className="truncate">{session.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <AlertDialog>
                        <AlertDialogTrigger asChild className="cursor-pointer">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2Icon className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this chat
                              conversation.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              variant="outline"
                              className="cursor-pointer"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) =>
                                handleDeleteSession(e, session.session_id)
                              }
                              variant="destructive"
                              className="cursor-pointer"
                            >
                              {deleteSessionMutation.isPending &&
                              deleteSessionMutation.variables ===
                                session.session_id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>


      <UpcomingAssignmentsDialog
        open={assignmentsDialogOpen}
        onOpenChange={setAssignmentsDialogOpen}
      />
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.full_name ?? "User",
            email: user?.email ?? "example@example.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
