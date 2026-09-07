import * as React from "react";

export interface ReceiptEmailProps {
  orderId?: string;
  total?: string;
  seats?: string;
}

/** Plain React receipt email template, no email SDK required. */
export function ReceiptEmail({ orderId = "BB-90210", total = "$90.00", seats = "Row C Seats 12-13" }: ReceiptEmailProps) {
  return (
    <div style={{ fontFamily: "monospace", backgroundColor: "#F6F0E0", color: "#17130C", padding: 24 }}>
      <p style={{ fontSize: 11, letterSpacing: 2 }}>ORDER {orderId} CONFIRMED</p>
      <h1 style={{ fontSize: 24 }}>Receipt {total}</h1>
      <p>Seats held: {seats}.</p>
      <p style={{ borderTop: "2px dashed #17130C", paddingTop: 12 }}>Barcodes print at will call.</p>
    </div>
  );
}
