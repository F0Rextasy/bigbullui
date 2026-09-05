export const wavePropsDocs3: Record<string, { name: string; type: string; description: string }[]> = {
  "activity-v2": [
    { name: "items", type: "Activity2Item[]", description: "" },
    { name: "filters", type: "string[]", description: "" },
  ],
  "address-form": [
    { name: "value", type: "Partial<AddressFormValue>", description: "" },
    { name: "onValueChange", type: "(value: Partial<AddressFormValue>) => void", description: "" },
  ],
  "admin-shell": [
    { name: "brand", type: "string", description: "" },
    { name: "navItems", type: "{ id: string; label: string; badge?: string | number }[]", description: "" },
    { name: "activeId", type: "string", description: "" },
    { name: "onNavigate", type: "(id: string) => void", description: "" },
    { name: "headerRight", type: "React.ReactNode", description: "" },
    { name: "children", type: "React.ReactNode", description: "" },
  ],
  "anchor-nav": [
    { name: "items", type: "AnchorNavItem[]", description: "" },
    { name: "activeId", type: "string", description: "IntersectionObserver ile aktif bölüm izleme" },
  ],
  "api-key-card": [
    { name: "label", type: "string", description: "" },
    { name: "apiKey", type: "string", description: "maskeli gösterilecek anahtar" },
    { name: "onRegenerate", type: "() => void", description: "" },
  ],
  "arcade-cabinet": [
    { name: "title", type: "string", description: "" },
    { name: "onCoinInsert", type: "() => void", description: "" },
    { name: "score", type: "number", description: "" },
  ],
  "audio-recorder": [
    { name: "onSend", type: "(seconds: number) => void", description: "" },
  ],
  "audit-log": [
    { name: "entries", type: "AuditEntry[]", description: "" },
    { name: "filter", type: "AuditAction | \"all\"", description: "boş bırakılırsa tüm eylemler" },
  ],
  "avatar-upload": [
    { name: "initials", type: "string", description: "" },
    { name: "src", type: "string", description: "" },
    { name: "onChange", type: "(file: File) => void", description: "" },
  ],
  "badge-list": [
    { name: "badges", type: "BadgeAward[]", description: "" },
  ],
  "bento-grid": [
    { name: "cells", type: "BentoCell[]", description: "" },
    { name: "columns", type: "2 | 3 | 4", description: "" },
  ],
  "betting-slip": [
    { name: "picks", type: "BettingPick[]", description: "" },
    { name: "stake", type: "string", description: "" },
    { name: "onSubmit", type: "(selections: Record<string, string>) => void", description: "" },
  ],
  "billing-panel": [
    { name: "plan", type: "string", description: "" },
    { name: "price", type: "string", description: "" },
    { name: "cycle", type: "string", description: "" },
    { name: "invoices", type: "{ id: string; date: string; amount: string }[]", description: "" },
    { name: "onUpgrade", type: "() => void", description: "" },
  ],
  "bio-card": [
    { name: "name", type: "string", description: "" },
    { name: "initials", type: "string", description: "" },
    { name: "bio", type: "string", description: "" },
    { name: "links", type: "{ platform: string; href: string }[]", description: "" },
    { name: "onFollow", type: "() => void", description: "" },
  ],
  "board-checklist": [
    { name: "title", type: "string", description: "" },
    { name: "items", type: "TaskItem[]", description: "" },
    { name: "onToggle", type: "(id: string) => void", description: "" },
  ],
  "bubble-chart": [
    { name: "points", type: "BubblePoint[]", description: "" },
    { name: "height", type: "number", description: "" },
  ],
  "budget-progress": [
    { name: "categories", type: "BudgetCategory[]", description: "" },
    { name: "currency", type: "string", description: "" },
  ],
  "carousel-ride": [
    { name: "spinning", type: "boolean", description: "" },
    { name: "horses", type: "number", description: "" },
  ],
  "cart-badge": [
    { name: "count", type: "number", description: "" },
    { name: "pulseOnChange", type: "boolean", description: "count değiştiğinde otomatik pulse" },
  ],
  "centered-card": [
    { name: "children", type: "React.ReactNode", description: "" },
    { name: "header", type: "React.ReactNode", description: "üst logo/başlık slotu" },
    { name: "footer", type: "React.ReactNode", description: "kart altı yardımcı metin" },
    { name: "maxWidth", type: "\"sm\" | \"md\"", description: "" },
  ],
  "changelog-list": [
    { name: "entries", type: "ChangelogEntry[]", description: "" },
  ],
  "char-counter": [
    { name: "value", type: "string", description: "" },
    { name: "max", type: "number", description: "" },
    { name: "label", type: "string", description: "" },
  ],
  "checkbox-card": [
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "checked", type: "boolean", description: "" },
    { name: "defaultChecked", type: "boolean", description: "" },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "" },
    { name: "disabled", type: "boolean", description: "" },
  ],
  "code-editor": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(value: string) => void", description: "" },
    { name: "language", type: "string", description: "" },
    { name: "readonly", type: "boolean", description: "" },
  ],
  "color-token-table": [
    { name: "tokens", type: "ColorToken[]", description: "" },
  ],
  "column-toggle": [
    { name: "columns", type: "{ id: string; label: string; visible?: boolean }[]", description: "" },
    { name: "onToggle", type: "(id: string, visible: boolean) => void", description: "" },
  ],
  "connection-status": [
    { name: "latencyMs", type: "number", description: "" },
    { name: "online", type: "boolean", description: "bağlantı durumu; verilmezse navigator.onLine simüle edilir" },
  ],
  "consent-checkbox": [
    { name: "text", type: "string", description: "" },
    { name: "linkLabel", type: "string", description: "" },
    { name: "linkHref", type: "string", description: "" },
    { name: "checked", type: "boolean", description: "" },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "" },
    { name: "required", type: "boolean", description: "" },
  ],
  "console-panel": [
    { name: "lines", type: "ConsoleLine[]", description: "" },
    { name: "prompt", type: "string", description: "" },
    { name: "onSubmit", type: "(command: string) => void", description: "" },
  ],
  "country-select": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(code: string) => void", description: "" },
  ],
  "coupon-field": [
    { name: "onApply", type: "(code: string) => void", description: "" },
    { name: "placeholder", type: "string", description: "" },
  ],
  "credit-card-form": [
    { name: "onSubmit", type: "(data: { number: string; name: string; expiry: string; cvv: string }) => void", description: "" },
  ],
  "cron-builder": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(expression: string) => void", description: "" },
  ],
  "crypto-ticker": [
    { name: "entries", type: "CryptoEntry[]", description: "" },
  ],
  "currency-select": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(code: string) => void", description: "" },
  ],
  "danger-zone": [
    { name: "title", type: "string", description: "" },
    { name: "actions", type: "{ id: string; label: string; description?: string; onConfirm?: () => void }[]", description: "" },
  ],
  "data-grid": [
    { name: "columns", type: "DataGridColumn<T>[]", description: "" },
    { name: "rows", type: "T[]", description: "" },
    { name: "rowKey", type: "(row: T) => string", description: "" },
    { name: "pageSize", type: "number", description: "" },
    { name: "emptyMessage", type: "string", description: "" },
  ],
  "diff-editor": [
    { name: "before", type: "string", description: "" },
    { name: "after", type: "string", description: "" },
    { name: "readOnly", type: "boolean", description: "" },
    { name: "onBeforeChange", type: "(v: string) => void", description: "" },
    { name: "onAfterChange", type: "(v: string) => void", description: "" },
  ],
  "dm-thread": [
    { name: "name", type: "string", description: "" },
    { name: "initials", type: "string", description: "" },
    { name: "online", type: "boolean", description: "" },
    { name: "messages", type: "DmThreadMessage[]", description: "" },
    { name: "onSend", type: "(body: string) => void", description: "" },
  ],
  "drag-sort": [
    { name: "items", type: "DragSortItem[]", description: "" },
    { name: "onReorder", type: "(items: DragSortItem[]) => void", description: "" },
  ],
  "drawer-nav": [
    { name: "items", type: "DrawerNavItem[]", description: "" },
    { name: "open", type: "boolean", description: "" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "" },
    { name: "title", type: "string", description: "" },
  ],
  "duration-input": [
    { name: "value", type: "DurationValue", description: "" },
    { name: "defaultValue", type: "DurationValue", description: "" },
    { name: "onValueChange", type: "(value: DurationValue) => void", description: "" },
    { name: "showSeconds", type: "boolean", description: "" },
    { name: "label", type: "string", description: "" },
  ],
  "empty-col-span": [
    { name: "colSpan", type: "number", description: "" },
    { name: "message", type: "string", description: "" },
    { name: "icon", type: "React.ReactNode", description: "" },
  ],
  "env-editor": [
    { name: "vars", type: "EnvVar[]", description: "" },
    { name: "onChange", type: "(vars: EnvVar[]) => void", description: "" },
  ],
  "error-page": [
    { name: "code", type: "\"404\" | \"500\" | \"403\"", description: "" },
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "action", type: "React.ReactNode", description: "" },
  ],
  "exchange-rate": [
    { name: "rates", type: "Record<string, number>", description: "" },
    { name: "defaultFrom", type: "string", description: "" },
    { name: "defaultTo", type: "string", description: "" },
  ],
  "feature-flag-panel": [
    { name: "flags", type: "FeatureFlag[]", description: "" },
    { name: "onToggle", type: "(id: string, enabled: boolean) => void", description: "" },
  ],
  "feed-masonry": [
    { name: "items", type: "{ id: string; content: React.ReactNode }[]", description: "" },
    { name: "columns", type: "2 | 3", description: "" },
  ],
  "ferris-wheel": [
    { name: "spinning", type: "boolean", description: "" },
    { name: "cabins", type: "number", description: "" },
  ],
  "field-array": [
    { name: "label", type: "string", description: "" },
    { name: "rows", type: "FieldArrayRow[]", description: "" },
    { name: "onRowsChange", type: "(rows: FieldArrayRow[]) => void", description: "" },
    { name: "placeholder", type: "string", description: "" },
    { name: "maxRows", type: "number", description: "" },
  ],
  "flip-card": [
    { name: "front", type: "React.ReactNode", description: "" },
    { name: "back", type: "React.ReactNode", description: "" },
    { name: "trigger", type: "\"hover\" | \"click\"", description: "hover ile mi click ile mi dönsün" },
  ],
  "flyout-v2": [
    { name: "items", type: "Flyout2Item[]", description: "" },
  ],
  "footer-minimal": [
    { name: "brand", type: "string", description: "" },
    { name: "links", type: "{ label: string; href: string }[]", description: "" },
    { name: "copyright", type: "string", description: "" },
  ],
  "footer-nav": [
    { name: "brand", type: "string", description: "" },
    { name: "columns", type: "{ title: string; links: FooterNavLink[] }[]", description: "" },
    { name: "copyright", type: "string", description: "" },
  ],
  "forgot-password": [
    { name: "onSend", type: "(email: string) => void", description: "" },
  ],
  "form-progress": [
    { name: "total", type: "number", description: "" },
    { name: "completed", type: "number", description: "" },
    { name: "label", type: "string", description: "" },
  ],
  "gallery-grid": [
    { name: "images", type: "GalleryImage[]", description: "" },
    { name: "columns", type: "2 | 3 | 4", description: "" },
  ],
  "gift-message": [
    { name: "from", type: "string", description: "" },
    { name: "message", type: "string", description: "" },
    { name: "onOpen", type: "() => void", description: "" },
  ],
  "glossary-list": [
    { name: "terms", type: "GlossaryTerm[]", description: "" },
  ],
  "hero-split": [
    { name: "eyebrow", type: "string", description: "" },
    { name: "title", type: "React.ReactNode", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "actions", type: "React.ReactNode", description: "" },
    { name: "visual", type: "React.ReactNode", description: "sağ görsel/vurgu slotu" },
  ],
  "history-nav": [
    { name: "entries", type: "HistoryEntry[]", description: "" },
    { name: "onBack", type: "() => void", description: "" },
    { name: "onForward", type: "() => void", description: "" },
  ],
  "html-preview": [
    { name: "html", type: "string", description: "" },
    { name: "title", type: "string", description: "" },
    { name: "height", type: "string", description: "" },
  ],
  "image-carousel": [
    { name: "images", type: "{ id: string; src: string; alt?: string }[]", description: "" },
    { name: "autoPlay", type: "boolean", description: "" },
    { name: "interval", type: "number", description: "" },
  ],
  "inbox-list": [
    { name: "items", type: "InboxItem[]", description: "" },
    { name: "onSelect", type: "(id: string) => void", description: "" },
  ],
  "installment-picker": [
    { name: "plans", type: "InstallmentPlan[]", description: "" },
    { name: "value", type: "number", description: "" },
    { name: "defaultValue", type: "number", description: "" },
    { name: "onValueChange", type: "(months: number) => void", description: "" },
  ],
  "invite-modal": [
    { name: "open", type: "boolean", description: "" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "" },
    { name: "roles", type: "string[]", description: "" },
    { name: "onSend", type: "(email: string, role: string) => void", description: "" },
  ],
  "json-editor": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(value: string, valid: boolean) => void", description: "" },
    { name: "height", type: "string", description: "" },
  ],
  "kanban-v2": [
    { name: "columns", type: "Kanban2Column[]", description: "" },
    { name: "onMove", type: "(cardId: string, from: string, to: string) => void", description: "" },
  ],
  "keyboard-nav-helper": [
    { name: "shortcuts", type: "KeyboardShortcut[]", description: "" },
  ],
  "login-form": [
    { name: "onSubmit", type: "(data: { email: string; password: string; remember: boolean }) => void", description: "" },
    { name: "social", type: "boolean", description: "sosyal sağlayıcı butonları göster" },
    { name: "forgotHref", type: "string", description: "" },
    { name: "registerHref", type: "string", description: "" },
  ],
  "lottery-machine": [
    { name: "onDraw", type: "(numbers: number[]) => void", description: "" },
    { name: "ballCount", type: "number", description: "" },
    { name: "pickCount", type: "number", description: "" },
  ],
  "mailbox": [
    { name: "recipient", type: "string", description: "" },
    { name: "onSend", type: "() => void", description: "" },
  ],
  "maintenance-banner": [
    { name: "message", type: "string", description: "" },
    { name: "startsInMinutes", type: "number", description: "bakım başlangıcına kalan dakika" },
    { name: "onDismiss", type: "() => void", description: "" },
  ],
  "markdown-editor": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(value: string) => void", description: "" },
  ],
  "markdown-preview": [
    { name: "source", type: "string", description: "" },
  ],
  "masonry-columns": [
    { name: "items", type: "MasonryItem[]", description: "" },
    { name: "columns", type: "2 | 3 | 4", description: "" },
  ],
  "match-ticker": [
    { name: "matches", type: "MatchTickerEntry[]", description: "" },
  ],
  "medal-display": [
    { name: "medals", type: "MedalDisplayEntry[]", description: "" },
  ],
  "media-embed": [
    { name: "src", type: "string", description: "" },
    { name: "title", type: "string", description: "" },
    { name: "poster", type: "string", description: "16:9 sabit" },
  ],
  "mega-menu": [
    { name: "trigger", type: "React.ReactNode", description: "" },
    { name: "columns", type: "MegaMenuColumn[]", description: "" },
    { name: "featured", type: "React.ReactNode", description: "sol alt köşede öne çıkan kutu" },
  ],
  "megaphone": [
    { name: "message", type: "string", description: "" },
    { name: "onAnnounce", type: "() => void", description: "" },
  ],
  "mention-highlight": [
    { name: "text", type: "string", description: "" },
  ],
  "mention-list": [
    { name: "users", type: "MentionUser[]", description: "" },
    { name: "onSelect", type: "(user: MentionUser) => void", description: "" },
  ],
  "migration-banner": [
    { name: "title", type: "string", description: "" },
    { name: "progress", type: "number", description: "0-100" },
    { name: "detail", type: "string", description: "" },
  ],
  "mobile-menu": [
    { name: "items", type: "MobileMenuItem[]", description: "" },
    { name: "open", type: "boolean", description: "" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "" },
  ],
  "network-graph": [
    { name: "nodes", type: "NetworkNode[]", description: "" },
    { name: "edges", type: "NetworkEdge[]", description: "" },
    { name: "height", type: "number", description: "" },
  ],
  "notification-feed": [
    { name: "notifications", type: "Notification[]", description: "" },
    { name: "onMarkRead", type: "(id: string) => void", description: "" },
  ],
  "order-tracking": [
    { name: "orderId", type: "string", description: "" },
    { name: "steps", type: "OrderTrackStep[]", description: "" },
    { name: "courier", type: "string", description: "" },
  ],
  "otp-verify": [
    { name: "length", type: "number", description: "" },
    { name: "onVerify", type: "(code: string) => void", description: "" },
    { name: "resendSeconds", type: "number", description: "yeniden gönder için saniye" },
  ],
  "page-tabs": [
    { name: "tabs", type: "{ id: string; label: string; param?: string }[]", description: "" },
    { name: "activeId", type: "string", description: "" },
    { name: "onNavigate", type: "(id: string) => void", description: "" },
  ],
  "pagination-v2": [
    { name: "totalPages", type: "number", description: "" },
    { name: "page", type: "number", description: "" },
    { name: "defaultPage", type: "number", description: "" },
    { name: "onPageChange", type: "(page: number) => void", description: "" },
    { name: "infiniteHint", type: "boolean", description: "sonsuz kaydırma tetikleyicisi göster" },
  ],
  "password-input": [
    { name: "onVisibilityChange", type: "(visible: boolean) => void", description: "" },
  ],
  "payment-methods": [
    { name: "methods", type: "PaymentMethod[]", description: "" },
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(id: string) => void", description: "" },
  ],
  "permission-denied": [
    { name: "resource", type: "string", description: "" },
    { name: "onRequestAccess", type: "() => void", description: "" },
    { name: "requested", type: "boolean", description: "" },
  ],
  "permissions-matrix": [
    { name: "roles", type: "Role[]", description: "" },
    { name: "permissions", type: "Permission[]", description: "" },
    { name: "value", type: "Record<string, string[]>", description: "başlangıç yetki haritası: roleId -> permissionId[]" },
    { name: "onValueChange", type: "(value: Record<string, string[]>) => void", description: "" },
  ],
  "poll": [
    { name: "question", type: "string", description: "" },
    { name: "options", type: "PollOption[]", description: "" },
    { name: "votedId", type: "string", description: "kullanıcı oy verdiyse bu seçeneğin id'si" },
    { name: "onVote", type: "(optionId: string) => void", description: "" },
  ],
  "pool-table": [
    { name: "balls", type: "PoolBall[]", description: "" },
  ],
  "poster-card": [
    { name: "title", type: "string", description: "" },
    { name: "subtitle", type: "string", description: "" },
    { name: "date", type: "{ day: string; month: string }", description: "tarih köşesi: { day, month }" },
    { name: "gradient", type: "React.ReactNode", description: "" },
  ],
  "price-compare": [
    { name: "title", type: "string", description: "" },
    { name: "offers", type: "PriceOffer[]", description: "" },
    { name: "currency", type: "string", description: "" },
  ],
  "profile-settings": [
    { name: "name", type: "string", description: "" },
    { name: "email", type: "string", description: "" },
    { name: "initials", type: "string", description: "" },
    { name: "onSave", type: "(data: { name: string; email: string }) => void", description: "" },
    { name: "onDelete", type: "() => void", description: "" },
  ],
  "punch-clock": [
    { name: "employeeId", type: "string", description: "" },
    { name: "onPunch", type: "(time: string, type: \"in\" | \"out\") => void", description: "" },
  ],
  "queued-jobs": [
    { name: "jobs", type: "QueueJob[]", description: "" },
    { name: "onCancel", type: "(id: string) => void", description: "" },
  ],
  "quick-actions": [
    { name: "actions", type: "QuickAction[]", description: "" },
  ],
  "quiz-card": [
    { name: "question", type: "string", description: "" },
    { name: "options", type: "QuizOption[]", description: "" },
    { name: "onAnswer", type: "(optionId: string, correct: boolean) => void", description: "" },
  ],
  "quote-wall": [
    { name: "quotes", type: "QuoteWallEntry[]", description: "" },
    { name: "columns", type: "2 | 3", description: "" },
  ],
  "radio-tile": [
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "icon", type: "React.ReactNode", description: "" },
    { name: "value", type: "string", description: "" },
    { name: "checked", type: "boolean", description: "" },
    { name: "onCheckedChange", type: "(value: string) => void", description: "" },
    { name: "name", type: "string", description: "" },
  ],
  "rank-list": [
    { name: "items", type: "{ id: string; label: string; score?: number }[]", description: "" },
    { name: "onReorder", type: "(items: DragSortItem[]) => void", description: "" },
  ],
  "rate-limit-note": [
    { name: "resetSeconds", type: "number", description: "sıfırlamaya kalan saniye" },
    { name: "limitLabel", type: "string", description: "" },
  ],
  "recipe-card": [
    { name: "title", type: "string", description: "" },
    { name: "minutes", type: "number", description: "dakika" },
    { name: "servings", type: "number", description: "" },
    { name: "ingredients", type: "RecipeIngredient[]", description: "" },
    { name: "steps", type: "string[]", description: "" },
  ],
  "refund-card": [
    { name: "orderId", type: "string", description: "" },
    { name: "amount", type: "string", description: "" },
    { name: "reason", type: "string", description: "" },
    { name: "status", type: "\"pending\" | \"approved\" | \"rejected\" | \"completed\"", description: "" },
  ],
  "regex-tester": [
    { name: "pattern", type: "string", description: "" },
    { name: "testString", type: "string", description: "" },
    { name: "onMatch", type: "(matches: string[]) => void", description: "" },
  ],
  "register-form": [
    { name: "onSubmit", type: "(data: { name: string; email: string; password: string }) => void", description: "" },
    { name: "termsHref", type: "string", description: "" },
  ],
  "responsive-nav": [
    { name: "brand", type: "string", description: "" },
    { name: "items", type: "ResponsiveNavItem[]", description: "" },
    { name: "activeId", type: "string", description: "" },
    { name: "breakpoint", type: "\"sm\" | \"md\" | \"lg\"", description: "" },
  ],
  "revolving-door": [
    { name: "spinning", type: "boolean", description: "" },
    { name: "label", type: "string", description: "" },
  ],
  "role-badge": [
    { name: "role", type: "RoleTone", description: "" },
    { name: "label", type: "string", description: "" },
  ],
  "row-expand": [
    { name: "items", type: "RowExpandItem[]", description: "" },
  ],
  "safe-vault": [
    { name: "code", type: "string", description: "" },
    { name: "onOpen", type: "() => void", description: "" },
  ],
  "save-indicator": [
    { name: "status", type: "\"idle\" | \"saving\" | \"saved\" | \"error\"", description: "idle | saving | saved | error" },
    { name: "label", type: "string", description: "" },
  ],
  "score-keeper": [
    { name: "teams", type: "[ScoreboardTeam, ScoreboardTeam]", description: "" },
    { name: "onScoreChange", type: "(teamId: string, delta: number) => void", description: "" },
  ],
  "screenshot-frame": [
    { name: "url", type: "string", description: "" },
    { name: "children", type: "React.ReactNode", description: "" },
  ],
  "scroll-spy-v2": [
    { name: "sections", type: "{ id: string; label: string }[]", description: "" },
  ],
  "search-filter-bar": [
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(value: string) => void", description: "" },
    { name: "placeholder", type: "string", description: "" },
    { name: "sorts", type: "{ id: string; label: string }[]", description: "" },
    { name: "activeSort", type: "string", description: "" },
    { name: "onSortChange", type: "(id: string) => void", description: "" },
    { name: "filters", type: "{ id: string; label: string; active?: boolean }[]", description: "" },
    { name: "onFilterToggle", type: "(id: string) => void", description: "" },
  ],
  "security-score": [
    { name: "checks", type: "SecurityCheck[]", description: "" },
  ],
  "serial-input": [
    { name: "groups", type: "number", description: "" },
    { name: "groupLength", type: "number", description: "" },
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(value: string) => void", description: "" },
    { name: "onComplete", type: "(value: string) => void", description: "" },
    { name: "separator", type: "string", description: "" },
  ],
  "session-list": [
    { name: "sessions", type: "Session[]", description: "" },
    { name: "onRevoke", type: "(id: string) => void", description: "" },
  ],
  "settings-section": [
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "rows", type: "{ label: string; control: React.ReactNode }[]", description: "" },
    { name: "onSave", type: "() => void", description: "" },
  ],
  "shipping-options": [
    { name: "options", type: "ShippingOption[]", description: "" },
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(id: string) => void", description: "" },
  ],
  "sidebar-v2": [
    { name: "items", type: "SidebarV2Item[]", description: "" },
    { name: "activeId", type: "string", description: "" },
    { name: "onNavigate", type: "(id: string) => void", description: "" },
    { name: "title", type: "string", description: "" },
  ],
  "snippet-card": [
    { name: "code", type: "string", description: "" },
    { name: "language", type: "string", description: "" },
    { name: "filename", type: "string", description: "" },
  ],
  "split-screen": [
    { name: "left", type: "React.ReactNode", description: "sol taraf (genelde metin/form)" },
    { name: "right", type: "React.ReactNode", description: "sağ taraf (genelde görsel/vurgu)" },
    { name: "rightRatio", type: "number", description: "sağ tarafın genişlik oranı (0-1)" },
    { name: "hideRightOnMobile", type: "boolean", description: "mobilde sağ tarafı gizle" },
  ],
  "spotlight-card": [
    { name: "radius", type: "number", description: "ışık yarıçapı (px)" },
  ],
  "stats-overview": [
    { name: "tiles", type: "{ label: string; value: string | number; delta?: { value: string; up: boolean }; spark?: number[] }[]", description: "" },
    { name: "tableTitle", type: "string", description: "" },
    { name: "tableRows", type: "{ label: string; value: string }[]", description: "" },
  ],
  "stepper-v2": [
    { name: "steps", type: "WizardStep[]", description: "" },
    { name: "current", type: "number", description: "" },
    { name: "vertical", type: "boolean", description: "dikey düzen" },
  ],
  "sticky-footer": [
    { name: "left", type: "React.ReactNode", description: "" },
    { name: "right", type: "React.ReactNode", description: "" },
  ],
  "stock-status": [
    { name: "stock", type: "number", description: "mevcut stok" },
    { name: "lowAt", type: "number", description: "az stok eşiği" },
    { name: "labelInStock", type: "string", description: "" },
  ],
  "subscription-card": [
    { name: "plan", type: "string", description: "" },
    { name: "price", type: "string", description: "" },
    { name: "cycle", type: "string", description: "" },
    { name: "renewDate", type: "string", description: "" },
    { name: "features", type: "string[]", description: "" },
    { name: "onCancel", type: "() => void", description: "" },
  ],
  "sunburst-chart": [
    { name: "slices", type: "SunburstRing[]", description: "" },
    { name: "height", type: "number", description: "" },
  ],
  "switch-card": [
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "checked", type: "boolean", description: "" },
    { name: "defaultChecked", type: "boolean", description: "" },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "" },
    { name: "disabled", type: "boolean", description: "" },
  ],
  "sync-status": [
    { name: "status", type: "\"idle\" | \"syncing\" | \"synced\" | \"error\"", description: "idle | syncing | synced | error" },
    { name: "lastSync", type: "string", description: "" },
  ],
  "table-summary": [
    { name: "rows", type: "SummaryRow[]", description: "" },
    { name: "caption", type: "string", description: "" },
  ],
  "task-list": [
    { name: "tasks", type: "{ id: string; label: string; assignee?: string; priority?: \"low\" | \"med\" | \"high\"; done?: boolean }[]", description: "" },
    { name: "onToggle", type: "(id: string) => void", description: "" },
  ],
  "team-members": [
    { name: "members", type: "TeamMember[]", description: "" },
    { name: "onInvite", type: "(email: string) => void", description: "" },
    { name: "onRemove", type: "(id: string) => void", description: "" },
  ],
  "textarea-autosize": [
    { name: "minHeight", type: "number", description: "" },
    { name: "maxHeight", type: "number", description: "" },
  ],
  "thumbnail-strip": [
    { name: "images", type: "ThumbnailItem[]", description: "" },
    { name: "value", type: "string", description: "" },
    { name: "defaultValue", type: "string", description: "" },
    { name: "onValueChange", type: "(id: string) => void", description: "" },
  ],
  "ticket-validator": [
    { name: "onValidate", type: "(code: string) => void", description: "" },
    { name: "result", type: "boolean | null", description: "null: bekliyor, true: geçerli, false: geçersiz" },
  ],
  "tilt-card": [
    { name: "maxTilt", type: "number", description: "max eğim derecesi" },
    { name: "glare", type: "boolean", description: "parıltı katmanı göster" },
  ],
  "timeline-vertical-v2": [
    { name: "items", type: "Timeline2Item[]", description: "" },
  ],
  "tree-table": [
    { name: "nodes", type: "TreeNode[]", description: "" },
  ],
  "trophy-shelf": [
    { name: "trophies", type: "{ id: string; label: string; year: string; earned?: boolean }[]", description: "" },
  ],
  "two-column-list": [
    { name: "items", type: "{ id: string; label: string; value?: string }[]", description: "" },
  ],
  "two-factor": [
    { name: "recoveryCodes", type: "string[]", description: "kurtarma kodları; boşsa üretilmiş örnek gösterilir" },
    { name: "onConfirm", type: "() => void", description: "" },
  ],
  "upgrade-prompt": [
    { name: "title", type: "string", description: "" },
    { name: "description", type: "string", description: "" },
    { name: "features", type: "string[]", description: "" },
    { name: "price", type: "string", description: "" },
    { name: "onUpgrade", type: "() => void", description: "" },
    { name: "onDismiss", type: "() => void", description: "" },
  ],
  "upload-progress": [
    { name: "filename", type: "string", description: "" },
    { name: "progress", type: "number", description: "0-100" },
    { name: "onCancel", type: "() => void", description: "" },
  ],
  "usage-meter": [
    { name: "label", type: "string", description: "" },
    { name: "used", type: "number", description: "" },
    { name: "limit", type: "number", description: "" },
    { name: "unit", type: "string", description: "" },
  ],
  "user-table": [
    { name: "users", type: "UserRow[]", description: "" },
    { name: "onRemove", type: "(id: string) => void", description: "" },
  ],
  "vending-machine": [
    { name: "products", type: "{ id: string; label: string; slot: string; price: string; inStock?: boolean }[]", description: "" },
    { name: "onPurchase", type: "(id: string) => void", description: "" },
  ],
  "version-badge": [
    { name: "stage", type: "FeatureStage", description: "" },
    { name: "version", type: "string", description: "" },
  ],
  "video-list": [
    { name: "videos", type: "VideoResult[]", description: "" },
    { name: "onSelect", type: "(id: string) => void", description: "" },
  ],
  "voice-note-list": [
    { name: "notes", type: "VoiceNote[]", description: "" },
    { name: "onPlay", type: "(id: string) => void", description: "" },
  ],
  "wallet-card": [
    { name: "balance", type: "string", description: "" },
    { name: "onTopUp", type: "() => void", description: "" },
    { name: "transactions", type: "WalletTransaction[]", description: "" },
  ],
  "webhook-list": [
    { name: "webhooks", type: "Webhook[]", description: "" },
    { name: "onTest", type: "(id: string) => void", description: "" },
    { name: "onRemove", type: "(id: string) => void", description: "" },
  ],
  "wizard": [
    { name: "steps", type: "WizardStep[]", description: "" },
    { name: "onFinish", type: "() => void", description: "" },
    { name: "children", type: "React.ReactNode[]", description: "" },
  ],
  "word-cloud": [
    { name: "words", type: "WordEntry[]", description: "" },
    { name: "maxFontSize", type: "number", description: "" },
    { name: "minFontSize", type: "number", description: "" },
    { name: "onWordClick", type: "(word: string) => void", description: "" },
  ],
  "world-map": [
    { name: "data", type: "CountryValue[]", description: "" },
    { name: "height", type: "number", description: "max değere göre renk yoğunluğu" },
    { name: "onCountryHover", type: "(code: string | null) => void", description: "" },
  ],
  "offline-banner": [],
  "badge-ribbon": [
    { name: "title", type: "string", description: "Title shown inside the rosette (default \"GRAND FESTIVAL\")" },
    { name: "rank", type: "string", description: "Rank text (default \"1ST PRIZE\")" },
    { name: "award", type: "string", description: "Award subtitle text" },
    { name: "color", type: "\"gold\" | \"red\" | \"ink\" | \"cream\"", description: "Color variant" },
  ],
  "bullet-chart": [
    { name: "label", type: "string", description: "Label of the metric" },
    { name: "value", type: "number", description: "Current actual value" },
    { name: "target", type: "number", description: "Target goal value" },
    { name: "max", type: "number", description: "Maximum scale value" },
    { name: "unit", type: "string", description: "Unit suffix (e.g. \" stubs\")" },
  ],
  "callout": [
    { name: "title", type: "string", description: "Optional callout title" },
    { name: "variant", type: "\"info\" | \"success\" | \"warning\" | \"danger\" | \"neutral\"", description: "Callout tone" },
    { name: "dismissible", type: "boolean", description: "Whether user can close the callout" },
    { name: "onDismiss", type: "() => void", description: "Callback on dismiss" },
  ],
  "histogram": [
    { name: "bins", type: "HistogramBin[]", description: "Array of bins with id, label and count" },
    { name: "height", type: "number", description: "Chart height in pixels (default 180)" },
  ],
  "meter": [
    { name: "value", type: "number", description: "Current numeric value (0 to 100)" },
    { name: "min", type: "number", description: "Minimum value (default 0)" },
    { name: "max", type: "number", description: "Maximum value (default 100)" },
    { name: "label", type: "string", description: "Label shown on top" },
    { name: "unit", type: "string", description: "Unit symbol (default \"%\")" },
  ],
  "milestone-chart": [
    { name: "milestones", type: "Milestone[]", description: "List of milestones with id, label, date and reached flag" },
  ],
  "radio-cards": [
    { name: "value", type: "string", description: "Controlled selected value" },
    { name: "defaultValue", type: "string", description: "Initial selected value" },
    { name: "onValueChange", type: "(val: string) => void", description: "Callback on card selection" },
    { name: "columns", type: "1 | 2 | 3 | 4", description: "Number of grid columns (default 3)" },
  ],
  "route-loader": [
    { name: "active", type: "boolean", description: "Whether the route loading bar is running" },
  ],
  "split-button": [
    { name: "label", type: "string", description: "Primary button label" },
    { name: "options", type: "SplitButtonOption[]", description: "List of dropdown options" },
    { name: "onPrimaryClick", type: "() => void", description: "Callback when primary button clicked" },
    { name: "onSelectOption", type: "(option: SplitButtonOption) => void", description: "Callback when menu option selected" },
    { name: "variant", type: "\"default\" | \"accent\" | \"outline\"", description: "Visual variant" },
  ],
  "stat-tile": [
    { name: "label", type: "string", description: "Stat tile label" },
    { name: "value", type: "string | number", description: "Stat value number or string" },
    { name: "delta", type: "{ value: string; up: boolean }", description: "Delta change indicator" },
    { name: "spark", type: "number[]", description: "Optional mini sparkline data array" },
  ],
  "trend-badge": [
    { name: "value", type: "number | string", description: "Value or percentage to display" },
    { name: "trend", type: "\"up\" | \"down\" | \"neutral\"", description: "Direction of the trend" },
    { name: "label", type: "string", description: "Optional label below value" },
    { name: "live", type: "boolean", description: "Whether to show live pulsing dot" },
  ],
};
