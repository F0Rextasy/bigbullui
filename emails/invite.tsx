import * as React from "react";

export interface InviteEmailProps {
  inviter?: string;
  role?: string;
}

/** Plain React invite email template, no email SDK required. */
export function InviteEmail({ inviter = "Ada", role = "Usher" }: InviteEmailProps) {
  return (
    <div style={{ fontFamily: "monospace", backgroundColor: "#F6F0E0", color: "#17130C", padding: 24 }}>
      <p style={{ fontSize: 11, letterSpacing: 2 }}>CREW INVITE</p>
      <h1 style={{ fontSize: 24 }}>{inviter} invited you</h1>
      <p>Role stamped: {role}. Claim your backstage pass before Friday.</p>
      <p style={{ borderTop: "2px dashed #17130C", paddingTop: 12 }}>Reply to this message to accept.</p>
    </div>
  );
}
