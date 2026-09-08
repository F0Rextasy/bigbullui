import * as React from "react";
export const SET_D_ICONS: Record<string, React.ReactNode> = {
"cart": ( <>
      <path d="M3 4h2.5l2 11h10.5l2-8H7" />
      <circle cx={9} cy={19.5} r={1.5} />
      <circle cx={16.5} cy={19.5} r={1.5} />
    </> ),
"cart-round": ( <>
      <path d="M3 4.5h2.5l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2H18l1.8-7H7.2" />
      <circle cx={9.5} cy={19.5} r={1.5} />
      <circle cx={16.5} cy={19.5} r={1.5} />
    </> ),
"cart-flat": ( <>
      <path d="M3 5h2l2 10h11l2-7H7" />
      <circle cx={9} cy={19} r={1.4} />
      <circle cx={16.5} cy={19} r={1.4} />
    </> ),
"cart-plus": ( <>
      <path d="M3 4h2.5l2 11h9.5l2-8H7" />
      <path d="M16.5 14v6M13.5 17h6" />
      <circle cx={9} cy={19.5} r={1.4} />
    </> ),
"cart-minus": ( <>
      <path d="M3 4h2.5l2 11h9.5l2-8H7" />
      <path d="M13.5 17h6" />
      <circle cx={9} cy={19.5} r={1.4} />
    </> ),
"cart-check": ( <>
      <path d="M3 4h2.5l2 11h9.5l2-8H7" />
      <path d="M14 16.5l2 2 3.5-4" />
      <circle cx={9} cy={19.5} r={1.4} />
    </> ),
"cart-x": ( <>
      <path d="M3 4h2.5l2 11h9.5l2-8H7" />
      <path d="M14.5 15.5l5 5M19.5 15.5l-5 5" />
      <circle cx={9} cy={19.5} r={1.4} />
    </> ),
"cart-full": ( <>
      <path d="M3 4h2.5l2 11h10.5l2-8H7" />
      <path d="M8.5 8.5h9M9.3 11.5h7.4" />
      <circle cx={9} cy={19.5} r={1.5} />
      <circle cx={16.5} cy={19.5} r={1.5} />
    </> ),
"cart-tilt": ( <>
      <path d="M4 5h2l3.5 9.5H18l2.5-6.5H8" />
      <circle cx={10} cy={19} r={1.4} />
      <circle cx={17} cy={19} r={1.4} />
    </> ),
"cart-double": ( <>
      <path d="M2.5 5h2l1.8 8.5h11L19 7H6.5" />
      <path d="M9 17.5h8" />
      <circle cx={9.5} cy={19.8} r={1.3} />
      <circle cx={16.5} cy={19.8} r={1.3} />
    </> ),
"basket": <path d="M5 10h14l-1.8 8.5H6.8L5 10ZM8 10l4-6 4 6M9.5 14v3M12 14v3M14.5 14v3" />,
"basket-round": <path d="M4.5 11h15l-1.5 7a2 2 0 0 1-2 1.5H8a2 2 0 0 1-2-1.5l-1.5-7ZM8.5 11 12 4.5 15.5 11" />,
"basket-handle": ( <>
      <path d="M5 11h14l-1.6 7.5H6.6L5 11Z" />
      <path d="M7.5 11a4.5 4.5 0 0 1 9 0" />
    </> ),
"basket-full": <path d="M5 11h14l-1.8 8H6.8L5 11ZM8 11l1.5-4M12 11V6.5M16 11l-1.5-4" />,
"basket-weave": <path d="M5 10h14l-1.8 8.5H6.8L5 10ZM7 13.5h10M7.5 16.5h9" />,
"market-basket": <path d="M4 9.5h16l-2 9.5H6l-2-9.5ZM9 9.5V7a3 3 0 0 1 6 0v2.5" />,
"shopping-bag": <path d="M6 8h12l-1 12.5H7L6 8ZM9 8V6.5a3 3 0 0 1 6 0V8" />,
"tote-bag": <path d="M5.5 8.5h13l-1 11.5h-11l-1-11.5ZM9 8.5V7a3 3 0 0 1 6 0v1.5M9 12.5h6" />,
"paper-bag": <path d="M7 7.5h10l1 13H6l1-13ZM7 7.5 9 4h6l2 3.5M9.5 12h5" />,
"bag-tag": ( <>
      <path d="M6 8h12l-1 12.5H7L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <circle cx={12} cy={13} r={1.2} />
    </> ),
"bag-mini": <path d="M8 9.5h8l-.8 9H8.8l-.8-9ZM10 9.5V8a2 2 0 0 1 4 0v1.5" />,
"bag-stripe": <path d="M6 8h12l-1 12.5H7L6 8ZM9 8V6.5a3 3 0 0 1 6 0V8M10 12v5M14 12v5" />,
"bag-double": <path d="M5 9h9l-.8 10H4.8L5 9ZM14 9h5.5l-.7 8.5h-4.6" />,
"gift-bag": <path d="M6 9h12l-1 11.5H7L6 9ZM9 9V7a3 3 0 0 1 6 0v2M12 12v5M10 14.5h4" />,
  "store-awning": <path d="M3.5 8 5 3.5h14L20.5 8M3.5 8h17v1.5a2.1 2.1 0 0 1-4.2 0 2.1 2.1 0 0 1-4.3 0 2.1 2.1 0 0 1-4.2 0A2.1 2.1 0 0 1 3.5 9.5V8ZM6 13.5V20h12v-6.5" />,
"shop-door": ( <>
      <path d="M5 21V9.5L6.5 4h11L19 9.5V21M5 21h14" />
      <path d="M10 21v-6h4v6" />
    </> ),
"market-stall": <path d="M4 8.5h16l-1 3H5l-1-3ZM6 11.5 5 20h14l-1-8.5M5 8.5 12 3.5 19 8.5" />,
"kiosk": <path d="M6 3.5h12v6H6zM7.5 9.5 6 20.5h12l-1.5-11M9.5 13h5" />,
"boutique": <path d="M4 8.5 6 4h12l2 4.5M4 8.5h16M6 8.5V20h12V8.5M12 8.5V20" />,
"mall": <path d="M3.5 20.5v-17h17v17M3.5 20.5h17M9 20.5v-6h6v6M9 8h6M9 11h6" />,
"store-sign": <path d="M4 10V4.5h16V10M12 4.5V3M6 14h12v6.5H6zM9 17.5h6" />,
"price-tag": ( <>
      <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5Z" />
      <circle cx={8} cy={8} r={1.4} />
    </> ),
"tag-double": ( <>
      <path d="M3.5 5.5H10l8 8-6 6-8.5-8.5V5.5Z" />
      <path d="M8 13.5l3-3 5 5" />
      <circle cx={7.5} cy={9.5} r={1.2} />
    </> ),
"tag-string": ( <>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <path d="M4 4c2.5 0 3.5 2.5 2 4.5" />
      <circle cx={8.5} cy={8.5} r={1.2} />
    </> ),
"tag-star": ( <>
      <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5Z" />
      <path d="M10 9.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.2-2.4 1.2.5-2.6-1.9-1.8 2.6-.4 1.2-2.4Z" />
    </> ),
"tag-percent": <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5ZM13.5 11.5l-3 3M12.3 9.8h.01M14.7 14.6h.01" />,
"tag-notch": ( <>
      <path d="M4 4h7l9 9-2 2-2-1-2 1-2-1-2 1-2-1-2 1-2-1V4Z" />
      <circle cx={8} cy={8.5} r={1.3} />
    </> ),
"tag-round": ( <>
      <path d="M10.5 3.5H17l6.5 6.5-8 8-7-7" />
      <circle cx={8} cy={8} r={4.5} />
    </> ),
"tag-stack": <path d="M3.5 6.5H10l7 7-5.5 5.5L4 11.5V6.5ZM9 13.5l2.5-2.5 4.5 4.5" />,
"tag-slash": <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5ZM7 14.5l7-7" />,
"tag-heart": <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5ZM12.5 9.5s-2.6-1.4-3.4.2c-.6 1.2.6 2.6 3.4 4.3 2.8-1.7 4-3.1 3.4-4.3-.8-1.6-3.4-.2-3.4-.2Z" />,
"barcode": <path d="M4 5v14M7 5v14M9.5 5v14M12 5v10M14.5 5v14M17 5v10M20 5v14" />,
"barcode-wide": <path d="M2.5 6v12M5.5 6v12M8 6v12M9.5 6v12M13 6v12M16 6v12M18.5 6v12M21.5 6v12" />,
"barcode-thin": <path d="M6 7v10M9 7v10M12 7v10M15 7v10M18 7v10" />,
"barcode-scan": <path d="M4 7v10M7 7v10M10 7v10M13 7v10M16 7v10M19.5 7v10M3 12h18" />,
"barcode-box": <path d="M4 5.5h16v13H4zM7 9v7M10 9v7M13 9v4M16 9v7" />,
"barcode-tag": <path d="M3.5 3.5H11l9.5 9.5-3 3M9 10v5M11.5 10v5M14 10v3" />,
"barcode-tall": <path d="M5 3v18M8.5 3v18M12 3v12M15.5 3v18M19 3v18" />,
"barcode-mini": <path d="M6 6.5h12v11H6zM8 9v7M10.5 9v7M13 9v7M15.5 9v4" />,
"qr-square": <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM19 14v.01M17 17h3v3h-3" />,
"qr-dots": <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h.01M17 14h.01M14 17h.01M17.5 17.5h.01M20 17h.01M14 20h.01M17 20h.01M20 20h.01" />,
"qr-frame": <path d="M3.5 8V3.5H8M16 3.5h4.5V8M20.5 16v4.5H16M8 20.5H3.5V16M7 7h4v4H7zM13 13h4v4h-4z" />,
"qr-scan": <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM3 17.5h18" />,
"qr-mini": <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h.01M16 16h.01" />,
"qr-corners": <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M9 9h6v6H9z" />,
"coin": ( <>
      <circle cx={12} cy={12} r={8} />
      <circle cx={12} cy={12} r={4.5} />
    </> ),
"coin-stack": <path d="M5 6.5h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11ZM7 8.5h10M7 12h10M7 15.5h10" />,
"coins": ( <>
      <circle cx={9} cy={10} r={5.5} />
      <path d="M13.5 6.5a5.5 5.5 0 0 1 0 10M15 17.5a5.5 5.5 0 0 0 4-5" />
    </> ),
"coin-pile": ( <>
      <path d="M5 16.5h14M7 13.5h10M9 10.5h6" />
      <circle cx={12} cy={7} r={2.5} />
    </> ),
"coin-roll": <path d="M8 5.5h12v13H8zM8 5.5a2 2 0 0 0 0 13M20 5.5a2 2 0 0 1 0 13" />,
"coin-slot": ( <>
      <circle cx={12} cy={13} r={7.5} />
      <path d="M9 13h6" />
    </> ),
"coin-double": ( <>
      <circle cx={9.5} cy={10} r={5.5} />
      <circle cx={14.5} cy={14} r={5.5} />
    </> ),
"coin-ring": ( <>
      <circle cx={12} cy={12} r={8} />
      <circle cx={12} cy={12} r={5} />
      <circle cx={12} cy={12} r={2} />
    </> ),
"coin-spark": ( <>
      <circle cx={11} cy={13} r={6.5} />
      <path d="M17 3.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </> ),
"bill": ( <>
      <path d="M3 7.5h18v9H3z" />
      <circle cx={12} cy={12} r={2.5} />
      <path d="M6 10v.01M18 14v.01" />
    </> ),
"bills": ( <>
      <path d="M4 9h16v8H4zM6.5 6.5h15v8" />
      <circle cx={12} cy={13} r={2} />
    </> ),
"bill-stack": <path d="M4 8h16v8H4zM6 11.5h.01M18 12.5h.01M6 5.5h14M8 18.5h12" />,
"bill-fold": ( <>
      <path d="M3 8h18v8H3z" />
      <path d="M12 8v8" />
      <circle cx={7.5} cy={12} r={1.5} />
    </> ),
"bill-roll": <path d="M6 5.5h12v13H6zM6 5.5a1.8 1.8 0 0 0 0 13M18 5.5a1.8 1.8 0 0 1 0 13M9.5 12h5" />,
"bill-band": <path d="M3 7.5h18v9H3zM10 7.5V16.5M14 7.5v9" />,
"bill-wave": ( <>
      <path d="M3 8c3-2 6 2 9 0s6 2 9 0v8c-3 2-6-2-9 0s-6-2-9 0V8Z" />
      <circle cx={12} cy={12} r={2} />
    </> ),
"bill-coin": ( <>
      <path d="M3 8h13v8H3z" />
      <circle cx={17} cy={15} r={3.5} />
    </> ),
"wallet": <path d="M3.5 7.5h17v10a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-10ZM15 12h5.5M18 15.5h.01" />,
"wallet-open": <path d="M3.5 8h13l5 4v5.5a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17.5V8ZM16.5 8V6.5h-9" />,
"wallet-card": <path d="M3.5 7.5h17V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-9.5ZM6 7.5V5.5h11v2M15 12.5h5.5" />,
"wallet-coin": ( <>
      <path d="M3.5 9h17v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V9Z" />
      <circle cx={16.5} cy={13.5} r={2.5} />
    </> ),
"wallet-fold": <path d="M3.5 7h13v12h-11A1.5 1.5 0 0 1 3.5 17.5V7ZM16.5 9.5H20V17M16.5 12H19" />,
"wallet-zip": <path d="M3.5 7.5h17V18H5a1.5 1.5 0 0 1-1.5-1.5v-9ZM7 12h10M12 12v2.5" />,
"wallet-mini": <path d="M6 9h12v8H7a1 1 0 0 1-1-1V9ZM13 12.5h5" />,
"wallet-clasp": ( <>
      <path d="M3.5 7.5h17V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-9.5Z" />
      <circle cx={15} cy={13} r={1.5} />
    </> ),
"credit-card": <path d="M3 6.5h18v11H3zM3 10h18M6 14.5h4" />,
"card-chip": <path d="M3 6.5h18v11H3zM7 10.5h4v3H7zM9 10.5V9M9 14v-1M7 12H5.5M12.5 12H11" />,
"card-stripe": <path d="M3 6.5h18v11H3zM3 9.5h18M6 14h7" />,
"card-tap": ( <>
      <path d="M2.5 8h13v9h-13z" />
      <path d="M18 9.5a3 3 0 0 1 0 4M20 8a5.5 5.5 0 0 1 0 7" />
    </> ),
"card-double": <path d="M5 9h15v9.5H5zM3 5.5h15V9M8 13.5h6" />,
"card-lock": <path d="M3 8h18v9.5H3zM9.5 12V10.5a2.5 2.5 0 0 1 5 0V12M9 12h7v3.5H9z" />,
"card-scan": <path d="M3 7h18v10H3zM3 12h18M10 9v6M14 9v6" />,
"card-flat": <path d="M2.5 9.5h19v7h-19zM6 13h5" />,
"card-insert": <path d="M6 4h12v16H6zM6 9h12M9.5 13.5h5" />,
"card-mini": <path d="M7 9h10v7H7zM7 11.5h10" />,
"cash-register": <path d="M5 10h14l1.5 8.5h-17L5 10ZM7 10V7h10v3M9 14h6M10 18.5h4" />,
"register-drawer": <path d="M4 11h16v7.5H4zM7 8h10V5.5H7V8M4 14.5h16" />,
"register-receipt": <path d="M5 11h14l1 7.5H4l1-7.5ZM9 5.5h6v4H9zM11 14.5h2" />,
"register-keys": <path d="M4 10.5h16V18H4zM7 7.5h10V10M8 13.5h.01M12 13.5h.01M16 13.5h.01" />,
"register-mini": <path d="M7 11h10l1 7H6l1-7ZM8.5 11V8.5h7V11" />,
"register-bell": <path d="M5 11h14l1 7.5H4l1-7.5ZM12 5.5a2.5 2.5 0 0 1 2.5 2.5H9.5A2.5 2.5 0 0 1 12 5.5ZM12 5.5V4" />,
"receipt": <path d="M6 3.5h12V20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3.5ZM9 8h6M9 11.5h6" />,
"receipt-long": <path d="M7 2.5h10V21l-2-1.5-1.5 1-1.5-1-1.5 1L9 19.5 7 21V2.5ZM9.5 6.5h5M9.5 10h5M9.5 13.5h5" />,
"receipt-short": <path d="M7 5h10v11l-2-1.5-1.5 1-1.5-1L10.5 15 9 14l-2 1.5V5ZM9.5 8.5h5" />,
"receipt-check": <path d="M6 3.5h12V20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3.5ZM9.5 10.5l2 2 3.5-4" />,
"receipt-notch": <path d="M6 3.5h12v16.5l-6-2.5-6 2.5V3.5ZM9 8h6M9 11.5h4" />,
"receipt-zigzag": <path d="M6 3.5h12V19l-1.7-1.2-1.7 1.2-1.6-1.2-1.7 1.2L9.6 17.8 8 19l-2-1.2V3.5ZM9 7.5h6M9 11h6" />,
"receipt-total": <path d="M6 3.5h12V20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3.5ZM9 8h6M9 11.5h6M9 15h3" />,
"receipt-return": <path d="M6 3.5h12V20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3.5ZM9.5 12.5h4a1.5 1.5 0 0 0 0-3H10l1-1.5" />,
"gift-box": ( <>
      <path d="M4 9h16v11.5H4zM4 12.5h16M12 9v11.5" />
      <path d="M12 9c-4 0-5.5-1.5-5-3.5.4-1.5 2.5-1.5 3.5 0L12 9Zm0 0c4 0 5.5-1.5 5-3.5-.4-1.5-2.5-1.5-3.5 0L12 9Z" />
    </> ),
"gift-bow": ( <>
      <path d="M12 12v8.5M8 20.5h8" />
      <path d="M12 12C8 12 6 10.5 6.5 8.5c.4-1.5 2.3-1.5 3.3 0L12 12Zm0 0c4 0 6-1.5 5.5-3.5-.4-1.5-2.3-1.5-3.3 0L12 12Z" />
    </> ),
"gift-open": ( <>
      <path d="M4 12h16v8.5H4zM12 12v8.5" />
      <path d="M7 8.5c-1-2 .5-4 2.5-3L12 8M17 8.5c1-2-.5-4-2.5-3L12 8" />
    </> ),
"gift-tag": ( <>
      <path d="M4 10h16v10.5H4zM12 10v10.5" />
      <path d="M15 6.5 12 3.5 9 6.5l3 3 3-3ZM15 6.5 19 5" />
    </> ),
"gift-wrap": <path d="M4 8.5h16V20H4zM4 12h16M9 8.5V20M15 8.5V20" />,
"gift-mini": ( <>
      <path d="M8 10.5h8v9H8zM8 13h8M12 10.5v9" />
      <path d="M12 10.5C10 10.5 9 9.5 9.3 8.3c.2-.9 1.4-.9 2 0l.7 2.2Zm0 0c2 0 3-1 2.7-2.2-.2-.9-1.4-.9-2 0l-.7 2.2Z" />
    </> ),
"gift-tall": ( <>
      <path d="M6 9h12v11.5H6zM6 12.5h12M12 9v11.5" />
      <path d="M12 9c-3 0-4.5-1.2-4-3 .3-1.3 2-1.3 2.8 0L12 9Zm0 0c3 0 4.5-1.2 4-3-.3-1.3-2-1.3-2.8 0L12 9Z" />
    </> ),
"gift-heart": ( <>
      <path d="M4 9h16v11.5H4zM4 12.5h16M12 9v11.5" />
      <path d="M12 6.8S9.8 5.5 9 6.4c-.6.7 0 1.9 3 3.4 3-1.5 3.6-2.7 3-3.4-.8-.9-3 .4-3 1.4Z" />
    </> ),
"coupon": ( <>
      <path d="M3.5 8.5h17v7h-17zM7.5 8.5v7M16.5 8.5v7" />
      <path d="M3.5 8.5a2 2 0 0 0 0 7M20.5 8.5a2 2 0 0 1 0 7" />
    </> ),
"coupon-notch": <path d="M4 8h16v8H4zM4 12H2.8M21.2 12H20M8 8v8" />,
"coupon-dashed": <path d="M3.5 8.5h17v7h-17zM12 8.5v7" />,
"coupon-percent": <path d="M3.5 8.5h17v7h-17zM7.5 8.5v7M15.5 10.5l-3 4M14 10.5h.01M16 14.5h.01" />,
"coupon-cut": <path d="M4 8.5h16v7H4zM12 8.5v2M12 13.5v2M8 12h8" />,
"coupon-double": <path d="M3 7.5h12v4H3zM9 7.5v4M9 13.5h12v4H9zM15 13.5v4" />,
"coupon-star": <path d="M3.5 8.5h17v7h-17zM7.5 8.5v7M15 10l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2.8-1.6Z" />,
"coupon-ticket": <path d="M3.5 8h17v8h-17zM3.5 10.5h2M3.5 13.5h2M20.5 10.5h-2M20.5 13.5h-2M14.5 8v8" />,
"discount-percent": ( <>
      <circle cx={12} cy={12} r={8} />
      <path d="M16 8l-8 8M14.5 9.5h.01M9.5 14.5h.01" />
    </> ),
"discount-tag": <path d="M3.5 3.5H11l9.5 9.5-7.5 7.5-9.5-9.5V3.5ZM13.8 10.2l-3.6 3.6M12.8 10h.01M14.8 14h.01" />,
"discount-burst": ( <>
      <path d="M12 3.5 14 7l3.5-.5.5 3.5 3.5 1-2 3 1 3.5-3.5.5L15.5 21l-3.5-1.5L8.5 21 7 17.5l-3.5-.5 1-3.5-2-3 3.5-1 .5-3.5 3.5.5 2-3.5Z" />
      <path d="M14.5 9.5l-4 4M13.5 10.5h.01M11 13.5h.01" />
    </> ),
"discount-circle": ( <>
      <circle cx={12} cy={12} r={8} />
      <circle cx={12} cy={12} r={5} />
      <path d="M14.5 9.5 9.5 14.5" />
    </> ),
"discount-slash": ( <>
      <path d="M5 19 19 5" />
      <circle cx={8} cy={8} r={3} />
      <circle cx={16} cy={16} r={3} />
    </> ),
"discount-badge": ( <>
      <circle cx={12} cy={10} r={6} />
      <path d="M9.5 15 8 20.5 12 18.5l4 2-1.5-5.5" />
    </> ),
"discount-stamp": ( <>
      <circle cx={12} cy={11} r={7} />
      <circle cx={12} cy={11} r={4.5} />
      <path d="M8 18.5l-1 2M16 18.5l1 2" />
    </> ),
"discount-mini": ( <>
      <circle cx={12} cy={12} r={6.5} />
      <path d="M14.5 9.5 9.5 14.5M13.5 10h.01M10.5 14h.01" />
    </> ),
"sale-burst": <path d="M12 2.5 14 6.5l4-.5.8 4 3.7 1.5-2.5 3 1 4-4 .5-2 3.5L12 20l-3 2-2-3.5-4-.5 1-4-2.5-3L5.2 10l.8-4 4 .5L12 2.5Z" />,
"sale-star": <path d="M12 2.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 2.5Z" />,
"sale-seal": ( <>
      <circle cx={12} cy={10} r={6.5} />
      <path d="M12 3.5v-1M5.5 10H4.5M18.5 10h1M12 16.5c-1 2-2 3-3.5 4l1 1.5M12 16.5c1 2 2 3 3.5 4l-1 1.5" />
    </> ),
"sale-flash": <path d="M13 2 5.5 13.5H11L10 22l7.5-11.5H12L13 2Z" />,
"burst-seal": <path d="M12 4 13.8 7l3.2-.4.7 3.1 3 1.3-1.9 2.6 1 3.1-3.2.5-1.3 3-2.3-2.2-2.3 2.2-1.3-3-3.2-.5 1-3.1L2.3 11l3-1.3.7-3.1 3.2.4L12 4Z" />,
"burst-mini": <path d="M12 6.5 13.5 9l2.8-.3.5 2.7 2.7 1-1.6 2.3.8 2.8-2.9.3-1.3 2.5-1.5-2.5-2.9-.3.8-2.8-1.6-2.3 2.7-1 .5-2.7 2.8.3L12 6.5Z" />,
"package": <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9ZM3.5 7.5 12 12l8.5-4.5M12 12v9" />,
"package-open": <path d="M3.5 8 7 5.5 12 8l5-2.5L20.5 8 12 12.5 3.5 8ZM5 9.5V16l7 4 7-4V9.5" />,
"package-tape": <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9ZM8 5.5 12 7.5l4-2M12 7.5V12" />,
"box": <path d="M4 8h16v12H4zM4 12h16M12 8v4" />,
"box-open": <path d="M4 10h16v10H4zM4 10l2.5-4L12 8l5.5-2L20 10" />,
"box-tape": <path d="M4 7.5h16V20H4zM10 7.5V20M4 11.5h6" />,
"box-cube": <path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z" />,
"box-stack": <path d="M4 9h12v9H4zM4 9l1.5-3h12L19 9M16 13h4v7h-4" />,
"box-mini": <path d="M8 10h8v9H8zM8 12.5h8" />,
"parcel": <path d="M4 8.5 12 4.5l8 4v9l-8 4-8-4v-9ZM4 8.5l8 4 8-4M12 12.5V21" />,
"parcel-tape": <path d="M4 8.5 12 4.5l8 4v9l-8 4-8-4v-9ZM9.5 6.5 12 8l2.5-1.5M12 8v4.5" />,
"crate": <path d="M4 6.5h16V20H4zM4 10h16M4 15h16M8 6.5V20M16 6.5V20" />,
"delivery-truck": ( <>
      <path d="M2.5 6.5h12V17h-12zM14.5 10h4l3 3.5V17h-7" />
      <circle cx={7} cy={18.8} r={1.8} />
      <circle cx={17} cy={18.8} r={1.8} />
    </> ),
"truck-box": <path d="M2.5 7h11v9h-11zM13.5 10.5h4.5l2.5 3v2.5h-7M5.5 10h5M5.5 13h5" />,
"truck-fast": <path d="M2.5 7h12v9h-12zM14.5 10.5h4l2.5 3v2.5h-6.5M1.5 10.5h4M2.5 14h4" />,
"truck-mini": ( <>
      <path d="M4 8.5h9V16H4zM13 11h3.5L19 13.5V16h-6" />
      <circle cx={8} cy={18} r={1.4} />
      <circle cx={15.5} cy={18} r={1.4} />
    </> ),
"delivery-van": ( <>
      <path d="M3 7h11v9H3zM14 9.5h3.5L21 13v3h-7" />
      <circle cx={7.5} cy={18} r={1.8} />
      <circle cx={17} cy={18} r={1.8} />
    </> ),
"van-box": <path d="M3 7.5h10.5V16H3zM13.5 10h3L19.5 13v3h-6M6 10.5h4.5" />,
"delivery-bike": ( <>
      <circle cx={6} cy={17} r={3} />
      <circle cx={18} cy={17} r={3} />
      <path d="M6 17l3.5-7H14l4 7M9.5 10 8 6.5h2.5M14 10V6.5h3" />
    </> ),
"bike-box": ( <>
      <circle cx={6} cy={17.5} r={2.5} />
      <circle cx={18} cy={17.5} r={2.5} />
      <path d="M6 17.5 10 10h4l4 7.5M11 7h6v5h-6z" />
    </> ),
"scooter": ( <>
      <path d="M5 4.5h2M7 4.5v9l8 4" />
      <circle cx={5.5} cy={18} r={2.5} />
      <circle cx={18} cy={18} r={2.5} />
    </> ),
"scooter-box": ( <>
      <path d="M6 4.5h2V12l7 3.5" />
      <path d="M12 6.5h5v5h-5z" />
      <circle cx={6} cy={18} r={2.2} />
      <circle cx={18} cy={18} r={2.2} />
    </> ),
"warehouse": <path d="M3.5 10 12 3.5 20.5 10M5.5 8.5V20h13V8.5M9.5 20v-6h5v6" />,
"warehouse-door": <path d="M3.5 10 12 3.5 20.5 10M5.5 8.5V20h13V8.5M9 20v-8h6v8M9 14h6" />,
"depot": <path d="M4 9.5 12 4l8 5.5V20H4V9.5ZM4 9.5h16M10 20v-5h4v5" />,
"silo": <path d="M8 4.5h8V20H8zM8 4.5C8 3 10 3 12 3s4 0 4 1.5M8 8h8" />,
"scale": ( <>
      <path d="M12 4v16M8 20h8M12 6 5.5 8M12 6l6.5 2" />
      <path d="M3.5 13.5 5.5 8l2 5.5a2 2 0 0 1-4 0ZM16.5 13.5 18.5 8l2 5.5a2 2 0 0 1-4 0Z" />
    </> ),
"scale-pan": <path d="M12 3.5V19M9 19.5h6M4 8h16l-2 5a6 6 0 0 1-12 0l-2-5Z" />,
"scale-dial": ( <>
      <circle cx={12} cy={13} r={7} />
      <path d="M12 13l3-3M9 3.5h6" />
    </> ),
"scale-tray": <path d="M5 6h14M12 6v12M8 20.5h8M6 6l-1.5 5h7L10 6M18 6l1.5 5h-7l1.5-5" />,
"checkout-calculator": <path d="M6 3.5h12V20.5H6zM6 8h12M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h6" />,
"calc-mini": <path d="M8 4.5h8V19.5H8zM8 8.5h8M10.5 11.5h.01M13.5 11.5h.01M10.5 14.5h.01M13.5 14.5h.01" />,
"calc-receipt": <path d="M8 3.5h8V21l-4-1.5L8 21V3.5ZM9.5 7h5M10.5 11h.01M13.5 11h.01M10.5 14h.01M13.5 14h.01" />,
"trade-abacus": ( <>
      <path d="M5 5v14M19 5v14M5 5h14M5 19h14M5 9.5h14M5 14.5h14" />
      <circle cx={10} cy={9.5} r={1.5} />
      <circle cx={14} cy={14.5} r={1.5} />
    </> ),
"chart-up": ( <>
      <path d="M3.5 20.5h17M4 16.5l4.5-4.5 3 3L17 9.5" />
      <path d="M14 9.5h3v3" />
    </> ),
"chart-down": ( <>
      <path d="M3.5 20.5h17M4 9.5l4.5 4.5 3-3 5.5 5.5" />
      <path d="M14 16.5h3v-3" />
    </> ),
"chart-bars": ( <>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5v-6M11 20.5V9M15.5 20.5v-9M20 20.5V5.5" />
    </> ),
"chart-line": ( <>
      <path d="M3.5 4v16.5h17" />
      <path d="M6 15.5l3.5-3.5 2.5 2.5 5-5.5" />
    </> ),
"chart-pie": ( <>
      <circle cx={12} cy={12} r={8} />
      <path d="M12 4v8h8" />
    </> ),
"chart-arrow": ( <>
      <path d="M4 20 15 9M9 6.5h9v9" />
      <path d="M4 20l2-2" />
    </> ),
"piggy-bank": ( <>
      <path d="M6 11a5.5 5.5 0 0 1 11 0v3.5h2.5L21 16.5v1H17.5c-.5 2-2.5 3.5-5.5 3.5-3.5 0-6-2.5-6-6v-4Z" />
      <path d="M9.5 8.5 11 6M10 13.5h.01M7 17.5 5.5 20M17 17.5l1.5 2.5" />
    </> ),
"piggy-mini": ( <>
      <path d="M7 12a4.5 4.5 0 0 1 9 0v3h2l1.5 1.5h-12.5V12Z" />
      <path d="M9.5 12.5h.01" />
    </> ),
"vault": ( <>
      <path d="M3.5 5h17v14h-17z" />
      <circle cx={12} cy={12} r={4} />
      <circle cx={12} cy={12} r={1.2} />
    </> ),
"safe": ( <>
      <path d="M4 4.5h16V20H4zM4 8h16" />
      <circle cx={15.5} cy={14} r={2.5} />
      <path d="M7 11.5v5" />
    </> ),
"handshake": ( <>
      <path d="M3 8.5 8 5l4 2.5L16 5l5 3.5-2.5 5L14 11l-2 2.5L7 11 4.5 13 3 8.5Z" />
      <path d="M7 11l2.5 3 2.5-1 2.5 1 2-2" />
    </> ),
"hands-coin": ( <>
      <path d="M3 13.5 7 11l5 3 5-3 4 2.5-2 4-3.5-1.5L12 18l-3.5-2L5 17.5l-2-4Z" />
      <circle cx={12} cy={7.5} r={3} />
    </> ),
"crown": <path d="M3.5 8 5 18.5h14L20.5 8 16 11.5 12 5l-4 6.5L3.5 8Z" />,
"crown-mini": <path d="M6 9.5 7 17h10l1-7.5-3 2.5L12 8l-3 4-3-2.5Z" />,
"gem": <path d="M7 4.5h10l4 5-9 10-9-10 4-5ZM3 9.5h18M7 4.5 9.5 9.5 12 19.5 14.5 9.5 17 4.5" />,
"gem-round": <path d="M12 3.5 18 7l3.5 5L12 20.5 2.5 12 6 7l6-3.5ZM6 7h12M12 3.5 10 12l2 8.5L14 12l-2-8.5Z" />,
"diamond": <path d="M6.5 4h11L21 9l-9 11L3 9l3.5-5ZM3 9h18M9 9l3 11 3-11M9 9 6.5 4M15 9l2.5-5" />,
"perfume": <path d="M9 9h6l1 11.5H8L9 9ZM10.5 9V6.5h3V9M11 6.5V4.5h2v2M9.5 12.5h5" />,
"watch": ( <>
      <circle cx={12} cy={12} r={6} />
      <path d="M12 9.5V12l1.8 1.2M9.5 3.5 10 6M14.5 3.5 14 6M9.5 20.5 10 18M14.5 20.5 14 18" />
    </> ),
"watch-round": ( <>
      <circle cx={12} cy={12} r={5.5} />
      <circle cx={12} cy={12} r={8} />
      <path d="M12 12v-2.5M10 4.5h4M10 19.5h4" />
    </> ),
"glasses": ( <>
      <circle cx={7} cy={14} r={3.5} />
      <circle cx={17} cy={14} r={3.5} />
      <path d="M10.5 14h3M3.5 14 2.5 11M20.5 14l1-3" />
    </> ),
"ring": ( <>
      <circle cx={12} cy={14.5} r={5.5} />
      <path d="M9 10 12 4.5 15 10" />
    </> ),
"shirt": <path d="M9 4 4 7.5 6 11.5l2-1V20h8v-9.5l2 1 2-4L15 4a3 3 0 0 1-6 0Z" />,
"necklace": ( <>
      <path d="M6 3.5c0 5 2.5 9 6 10.5 3.5-1.5 6-5.5 6-10.5" />
      <circle cx={12} cy={17} r={2} />
    </> ),
"chair": <path d="M7 3.5V12h10V3.5M7 12v8M17 12v8M7 15.5h10" />,
"sneaker": ( <>
      <path d="M3.5 15.5 7 8.5l3 3v-3l2.5-1L20 13.5V17h-16.5v-1.5Z" />
      <path d="M10 11.5 8 15.5" />
    </> ),
"hat": <path d="M4 15.5h16M6 15.5v-2a6 6 0 0 1 12 0v2" />,
"cap": <path d="M4 14.5c0-4 3.5-7.5 8.5-7.5S20 10 20 13v1.5H4v-1.5ZM20 13.5h2.5M4 14.5V17" />,
"takeaway-cup": ( <>
      <path d="M5 9h13v6a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5V9Z" />
      <path d="M18 10.5h1.5a2.5 2.5 0 0 1 0 5H18M7.5 5.5c0-1 .8-1 .8-2M12 5.5c0-1 .8-1 .8-2" />
    </> ),
"mug": ( <>
      <path d="M5 8.5h11V19H7a2 2 0 0 1-2-2V8.5Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
    </> ),
"lamp": ( <>
      <path d="M7 3.5h10l2 6H5l2-6Z" />
      <path d="M12 9.5V19M8.5 20.5h7" />
    </> ),
};
