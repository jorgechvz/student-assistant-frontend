import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
  User,
  Shield,
  Save,
  Loader2,
  Cable,
  Check,
  X,
  AlertTriangle,
  Unplug,
} from "lucide-react";
import {
  useUserProfile,
  useUpdateProfile,
  useChangePassword,
  useDeleteAccount,
  useIntegrations,
  useDisconnectIntegration,
} from "@/hooks/use-user-settings";
import { Skeleton } from "@/components/ui/skeleton";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const { data: profile, isLoading: isLoadingProfile } = useUserProfile();
  const { data: integrations, isLoading: isLoadingIntegrations } =
    useIntegrations();

  const updateProfile = useUpdateProfile();
  const changePasswordMut = useChangePassword();
  const deleteAccountMut = useDeleteAccount();
  const disconnectIntegration = useDisconnectIntegration();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setEmail(profile.email);
    }
  }, [profile]);

  useEffect(() => {
    setProfileMessage(null);
    setPasswordMessage(null);
  }, [activeTab]);

  const hasProfileChanges =
    profile && (fullName !== profile.full_name || email !== profile.email);

  const handleSaveProfile = async () => {
    if (!hasProfileChanges) return;
    setProfileMessage(null);

    const updates: { full_name?: string; email?: string } = {};
    if (fullName !== profile?.full_name) updates.full_name = fullName;
    if (email !== profile?.email) updates.email = email;

    try {
      await updateProfile.mutateAsync(updates);
      setProfileMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    } catch (err: any) {
      setProfileMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to update profile.",
      });
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
      return;
    }

    try {
      await changePasswordMut.mutateAsync({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPasswordMessage({
        type: "success",
        text: "Password changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to change password.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMut.mutateAsync({ password: deletePassword });
    } catch {}
  };

  const handleDisconnect = async (integration: string) => {
    await disconnectIntegration.mutateAsync(integration);
  };

  const integrationsList = [
    {
      key: "canvas",
      label: "Canvas LMS",
      description: "Access your courses, assignments and grades",
      connected: integrations?.canvas ?? false,
      detail: integrations?.canvas_user_name,
    },
    {
      key: "google",
      label: "Google Calendar",
      description: "Sync your calendar events and deadlines",
      connected: integrations?.google ?? false,
      detail: integrations?.google_email,
    },
    {
      key: "notion",
      label: "Notion",
      description: "Access your notes and documents",
      connected: integrations?.notion ?? false,
      detail: integrations?.notion_workspace_name,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-3xl max-w-3xl h-[85vh] p-0 flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <div className="px-6 mb-4 shrink-0">
            <TabsList className="mx-6 grid w-auto grid-cols-3 mb-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2">
                <Cable className="h-4 w-4" />
                <span className="hidden sm:inline">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-6 modern-scrollbar">
            <TabsContent value="profile" className="mt-0 space-y-6">
              {isLoadingProfile ? (
                <ProfileSkeleton />
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Profile Information
                    </h3>
                    <div className="flex items-center gap-6 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-primary text-white text-2xl">
                          {(profile?.full_name ?? "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-lg">
                          {profile?.full_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {profile?.email}
                        </p>
                        {profile?.created_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Member since{" "}
                            {new Date(profile.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {profileMessage && (
                    <div
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        profileMessage.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-destructive/10 text-destructive border border-destructive/20"
                      }`}
                    >
                      {profileMessage.type === "success" ? (
                        <Check className="h-4 w-4 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 shrink-0" />
                      )}
                      {profileMessage.text}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={!hasProfileChanges || updateProfile.isPending}
                    >
                      {updateProfile.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="integrations" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Connected Services
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Manage integrations connected to your account.
                </p>

                {isLoadingIntegrations ? (
                  <IntegrationsSkeleton />
                ) : (
                  <div className="space-y-3">
                    {integrationsList.map((integration) => (
                      <div
                        key={integration.key}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              integration.connected
                                ? "bg-green-100 text-green-700"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Cable className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {integration.label}
                              </p>
                              <Badge
                                variant={
                                  integration.connected
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-[10px] px-1.5 py-0"
                              >
                                {integration.connected
                                  ? "Connected"
                                  : "Not connected"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {integration.detail || integration.description}
                            </p>
                          </div>
                        </div>

                        {integration.connected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDisconnect(integration.key)}
                            disabled={disconnectIntegration.isPending}
                          >
                            {disconnectIntegration.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Unplug className="h-4 w-4 mr-1.5" />
                                Disconnect
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="security"
              className="mt-0 space-y-6 overflow-y-auto no-scrollbar"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Security & Privacy
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Manage your password and account security.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>

                      {passwordMessage && (
                        <div
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                            passwordMessage.type === "success"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-destructive/10 text-destructive border border-destructive/20"
                          }`}
                        >
                          {passwordMessage.type === "success" ? (
                            <Check className="h-4 w-4 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 shrink-0" />
                          )}
                          {passwordMessage.text}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={
                          !currentPassword ||
                          !newPassword ||
                          !confirmPassword ||
                          changePasswordMut.isPending
                        }
                        onClick={handleChangePassword}
                      >
                        {changePasswordMut.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2 text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Danger Zone
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This action is irreversible. All your data, sessions, and
                      integrations will be permanently deleted.
                    </p>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete your account and all
                            associated data. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid gap-2 py-2">
                          <Label htmlFor="delete-password">
                            Confirm your password
                          </Label>
                          <Input
                            id="delete-password"
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            placeholder="Enter your password to confirm"
                          />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setDeletePassword("")}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={
                              !deletePassword || deleteAccountMut.isPending
                            }
                            onClick={handleDeleteAccount}
                          >
                            {deleteAccountMut.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete Account"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-40" />
      <div className="flex items-center gap-6 mb-6">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

function IntegrationsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}
