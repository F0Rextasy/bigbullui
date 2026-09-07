import * as React from "react";

export interface WelcomeEmailProps {
  name?: string;
  showDate?: string;
}

/** Plain React welcome email template, no email SDK required. */
export function WelcomeEmail({ name = "Guest", showDate = "Saturday 20:00" }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "monospace", backgroundColor: "#F6F0E0", color: "#17130C", padding: 24 }}>
      <p style={{ fontSize: 11, letterSpacing: 2 }}>BIGBULL BOX OFFICE</p>
      <h1 style={{ fontSize: 24 }}>Welcome, {name}</h1>
      <p>Your account is ready. First show: {showDate}.</p>
      <p style={{ borderTop: "2px dashed #17130C", paddingTop: 12 }}>Present this message at Gate 3.</p>
    </div>
  );
}
