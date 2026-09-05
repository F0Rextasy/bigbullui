"use client";

import * as React from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { FlipCard } from "@/components/ui/flip-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { DragSort } from "@/components/ui/drag-sort";
import { LoginForm } from "@/components/ui/login-form";
import { RegisterForm } from "@/components/ui/register-form";
import { ForgotPassword } from "@/components/ui/forgot-password";
import { OtpVerify } from "@/components/ui/otp-verify";
import { TwoFactor } from "@/components/ui/two-factor";
import { SessionList } from "@/components/ui/session-list";
import { ApiKeyCard } from "@/components/ui/api-key-card";
import { PermissionsMatrix } from "@/components/ui/permissions-matrix";
import { AuditLog } from "@/components/ui/audit-log";
import { SecurityScore } from "@/components/ui/security-score";
import { AdminShell } from "@/components/ui/admin-shell";
import { UserTable } from "@/components/ui/user-table";
import { RoleBadge } from "@/components/ui/role-badge";
import { SettingsSection } from "@/components/ui/settings-section";
import { ProfileSettings } from "@/components/ui/profile-settings";
import { DangerZone } from "@/components/ui/danger-zone";
import { UsageMeter } from "@/components/ui/usage-meter";
import { TeamMembers } from "@/components/ui/team-members";
import { InviteModal } from "@/components/ui/invite-modal";

export const wave13Previews: Record<string, React.ComponentType> = {
  "tilt-card": () => <TiltCard className="w-64"><p className="text-sm font-medium">Tilt to inspect</p></TiltCard>,
  "flip-card": () => <FlipCard className="max-w-xs" front={<p className="text-sm">Front side</p>} back={<p className="text-sm text-accent-foreground">Back side</p>} />,
  "spotlight-card": () => <SpotlightCard className="w-64"><p className="text-sm font-medium">Spotlight card</p></SpotlightCard>,
  "drag-sort": () => <DragSort className="w-64" items={[{ id: "a", content: "Item A" }, { id: "b", content: "Item B" }]} />,
  "login-form": () => <LoginForm />,
  "register-form": () => <RegisterForm />,
  "forgot-password": () => <ForgotPassword />,
  "otp-verify": () => <OtpVerify />,
  "two-factor": () => <TwoFactor />,
  "session-list": () => <SessionList sessions={[{ id: "1", device: "Chrome · macOS", location: "San Francisco", lastActive: "just now", current: true, icon: "desktop" }]} />,
  "api-key-card": () => <ApiKeyCard />,
  "permissions-matrix": () => <PermissionsMatrix roles={[{ id: "admin", label: "Admin" }]} permissions={[{ id: "read", label: "Read" }]} />,
  "audit-log": () => <AuditLog entries={[{ id: "1", actor: "Ada", initials: "AL", action: "create", target: "ticket", time: "2m ago" }]} />,
  "security-score": () => <SecurityScore checks={[{ id: "1", label: "2FA", passed: true }, { id: "2", label: "Strong password", passed: false }]} />,
  "admin-shell": () => <AdminShell navItems={[{ id: "dash", label: "Dashboard" }]} />,
  "user-table": () => <UserTable users={[{ id: "1", name: "Ada", initials: "AL", email: "a@m.com", role: "admin", status: "active" }]} />,
  "role-badge": () => <div className="flex gap-2"><RoleBadge role="admin" /><RoleBadge role="editor" /><RoleBadge role="member" /></div>,
  "settings-section": () => <SettingsSection title="General" rows={[{ label: "Theme", control: <span className="text-xs">Dark</span> }]} />,
  "profile-settings": () => <ProfileSettings />,
  "danger-zone": () => <DangerZone actions={[{ id: "1", label: "Delete account" }]} />,
  "billing-panel": () => <UsageMeter label="Quota" used={70} limit={100} />,
  "usage-meter": () => <UsageMeter label="Quota" used={70} limit={100} />,
  "team-members": () => <TeamMembers members={[{ id: "1", name: "Ada", initials: "AL", role: "admin" }]} />,
  "invite-modal": () => <InviteModal open={false} onOpenChange={() => {}} />,
};
