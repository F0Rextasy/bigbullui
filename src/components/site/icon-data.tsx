import * as React from "react";
import { STAMP_ICONS } from "../../../packages/icons/src/icons";

export type NavIconName =
  | "home"
  | "components"
  | "blocks"
  | "showcase"
  | "install"
  | "design"
  | "agents"
  | "contribute"
  | "dashboard"
  | "app"
  | "auth"
  | "system"
  | "marketing"
  | "content"
  | "operations"
  | "storefront"
  | "service"
  | "pages"
  | "theme"
  | "ticket"
  | "stub"
  | "perforation"
  | "stamp"
  | "gate"
  | "settings"
  | "user"
  | "users"
  | "sparkles"
  | "plus"
  | "check"
  | "x"
  | "menu"
  | "lock-open"
  | "star-outline"
  | "edit"
  | "download"
  | "upload"
  | "share"
  | "link"
  | "external"
  | "check-double"
  | "info"
  | "alert-triangle"
  | "help"
  | "filter"
  | "sort"
  | "grid"
  | "list"
  | "more"
  | "undo"
  | "redo"
  | "maximize"
  | "minimize"
  | "history"
  | "refresh"
  | "map-pin"
  | "phone"
  | "message"
  | "send"
  | "archive"
  | "bookmark-check"
  | "bookmark-x"
  | "image-plus"
  | "mic"
  | "mic-off"
  | "volume"
  | "volume-x"
  | "alarm"
  | "phone-call"
  | "phone-off"
  | "voicemail"
  | "video"
  | "video-off"
  | "message-circle"
  | "message-square"
  | "wifi"
  | "signal"
  | "signal-off"
  | "battery"
  | "bluetooth"
  | "sun-medium"
  | "moon"
  | "globe"
  | "compass"
  | "qr"
  | "plug"
  | "fingerprint"
  | "satellite"
  | "sim-card"
  | "cart-mini"
  | "receipt-mini"
  | "save"
  | "thermometer"
  | "umbrella"
  | "bike"
  | "car"
  | "plane"
  | "train"
  | "rocket"
  | "brightness"
  | "arrow-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-up-left"
  | "arrow-down-right"
  | "arrow-down-left"
  | "arrow-up-double"
  | "arrow-down-double"
  | "arrow-left-double"
  | "arrow-right-double"
  | "arrow-up-long"
  | "arrow-down-long"
  | "arrow-left-long"
  | "arrow-right-long"
  | "arrow-up-short"
  | "arrow-down-short"
  | "arrow-left-short"
  | "arrow-right-short"
  | "arrow-up-thin"
  | "arrow-down-thin"
  | "arrow-left-thin"
  | "arrow-right-thin"
  | "arrow-up-curved"
  | "arrow-down-curved"
  | "arrow-left-curved"
  | "arrow-right-curved"
  | "arrow-bent-up-right"
  | "arrow-bent-down-right"
  | "arrow-bent-up-left"
  | "arrow-bent-down-left"
  | "arrow-u-turn-up"
  | "arrow-u-turn-down"
  | "arrow-u-turn-left"
  | "arrow-u-turn-right"
  | "arrow-shuffle"
  | "arrow-shuffle-horizontal"
  | "arrow-swap-horizontal"
  | "arrow-swap-vertical"
  | "arrow-expand"
  | "arrow-expand-diagonal"
  | "arrow-shrink"
  | "arrow-shrink-diagonal"
  | "arrow-maximize"
  | "arrow-minimize"
  | "arrow-fullscreen"
  | "arrow-fullscreen-exit"
  | "arrow-move"
  | "arrow-move-diagonal"
  | "arrow-drag"
  | "arrow-drag-horizontal"
  | "arrow-drag-vertical"
  | "arrow-upload"
  | "arrow-upload-long"
  | "arrow-download"
  | "arrow-download-long"
  | "arrow-share-right"
  | "arrow-share-up"
  | "arrow-reply"
  | "arrow-reply-all"
  | "arrow-forward"
  | "arrow-undo"
  | "arrow-undo-sharp"
  | "arrow-redo"
  | "arrow-redo-sharp"
  | "arrow-refresh"
  | "arrow-refresh-reverse"
  | "arrow-rotate-clockwise"
  | "arrow-rotate-counterclockwise"
  | "arrow-flip-horizontal"
  | "arrow-flip-vertical"
  | "arrow-sort-up"
  | "arrow-sort-down"
  | "arrow-sort-double"
  | "arrow-filter-up"
  | "arrow-filter-down"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up-double"
  | "chevron-down-double"
  | "chevron-left-double"
  | "chevron-right-double"
  | "chevron-up-thin"
  | "chevron-down-thin"
  | "chevron-left-thin"
  | "chevron-right-thin"
  | "chevron-up-circle"
  | "chevron-down-circle"
  | "chevron-left-circle"
  | "chevron-right-circle"
  | "caret-up"
  | "caret-down"
  | "caret-left"
  | "caret-right"
  | "caret-up-double"
  | "caret-down-double"
  | "caret-left-double"
  | "caret-right-double"
  | "play-next"
  | "play-previous"
  | "play-skip-forward"
  | "play-skip-back"
  | "play-fast-forward"
  | "play-rewind"
  | "play-triangle-right"
  | "play-triangle-left"
  | "arrow-log-in"
  | "arrow-log-out"
  | "arrow-enter-right"
  | "arrow-exit-right"
  | "arrow-external-link"
  | "arrow-external-up-right"
  | "arrow-corner-up-right"
  | "arrow-corner-down-right"
  | "arrow-corner-up-left"
  | "arrow-corner-down-left"
  | "compass-north"
  | "compass-south"
  | "compass-east"
  | "compass-west"
  | "compass-northeast"
  | "compass-northwest"
  | "compass-southeast"
  | "compass-southwest"
  | "nav-back"
  | "nav-forward"
  | "nav-back-circle"
  | "nav-forward-circle"
  | "nav-up-circle"
  | "nav-down-circle"
  | "arrow-back-step"
  | "arrow-forward-step"
  | "arrow-turn-left"
  | "arrow-turn-right"
  | "arrow-loop"
  | "arrow-loop-reverse"
  | "arrow-infinity"
  | "arrow-sync-up"
  | "arrow-sync-down"
  | "arrow-split-up"
  | "arrow-split-down"
  | "arrow-merge-up"
  | "arrow-merge-down"
  | "arrow-branch-right"
  | "arrow-branch-left"
  | "arrow-cross-up"
  | "arrow-cross-down"
  | "arrow-notch-up"
  | "arrow-notch-down"
  | "arrow-dashed-up"
  | "arrow-dashed-down"
  | "arrow-dashed-left"
  | "arrow-dashed-right"
  | "arrow-dotted-up"
  | "arrow-dotted-down"
  | "arrow-tail-notch-up"
  | "arrow-tail-notch-down"
  | "arrow-bar-up"
  | "arrow-bar-down"
  | "arrow-bar-left"
  | "arrow-bar-right"
  | "arrow-target-up"
  | "arrow-target-down"
  | "arrow-circle-up"
  | "arrow-circle-down"
  | "arrow-circle-left"
  | "arrow-circle-right"
  | "arrow-square-up"
  | "arrow-square-down"
  | "arrow-square-left"
  | "arrow-square-right"
  | "arrow-elbow-up-right"
  | "arrow-elbow-down-right"
  | "arrow-zigzag-right"
  | "arrow-zigzag-left"
  | "arrow-wave-right"
  | "arrow-wave-up"
  | "arrow-step-up-right"
  | "arrow-step-down-right"
  | "arrow-hop-up"
  | "arrow-hop-down"
  | "arrow-pin-up"
  | "arrow-pin-down"
  | "arrow-anchor-left"
  | "arrow-anchor-right"
  | "arrow-ticket-up"
  | "arrow-ticket-down"
  | "arrow-stub-left"
  | "arrow-stub-right"
  | "arrow-perforated-right"
  | "arrow-perforated-left"
  | "nav-compass-circle"
  | "nav-direction-up"
  | "nav-direction-down"
  | "nav-history-back"
  | "nav-history-forward"
  | "arrow-orbit"
  | "play"
  | "play-circle"
  | "play-square"
  | "play-notch"
  | "pause"
  | "pause-circle"
  | "pause-square"
  | "stop"
  | "stop-circle"
  | "stop-square"
  | "record-dot"
  | "record-circle"
  | "skip-forward"
  | "skip-back"
  | "rewind"
  | "fast-forward"
  | "loop-track"
  | "shuffle-tracks"
  | "repeat-track"
  | "eject-media"
  | "volume-off"
  | "volume-low"
  | "volume-mid"
  | "volume-high"
  | "mute-x"
  | "speaker"
  | "speaker-box"
  | "speaker-tower"
  | "headphones"
  | "headphones-mic"
  | "earbuds"
  | "earbud-single"
  | "microphone"
  | "microphone-off"
  | "microphone-stand"
  | "microphone-retro"
  | "podcast-mic"
  | "podcast-stand"
  | "equalizer-bars"
  | "equalizer-sliders"
  | "audio-wave"
  | "audio-wave-circle"
  | "sound-ripple"
  | "mute-ring"
  | "music-note"
  | "music-note-double"
  | "beamed-notes"
  | "beamed-notes-tilt"
  | "music-rest"
  | "treble-stub"
  | "bass-dot"
  | "tempo-mark"
  | "metronome"
  | "metronome-tick"
  | "playlist-note"
  | "note-circle"
  | "note-square"
  | "chord-bars"
  | "harmony-lines"
  | "song-ticket"
  | "camera"
  | "camera-flash"
  | "camera-reel"
  | "photo-frame"
  | "photo-stack"
  | "photo-strip"
  | "film-strip"
  | "film-frame"
  | "film-reel"
  | "clapper"
  | "clapper-open"
  | "projector"
  | "projector-beam"
  | "projector-reel"
  | "tv"
  | "tv-static"
  | "tv-retro"
  | "radio"
  | "radio-tower"
  | "antenna-dish"
  | "spotlight-cone"
  | "spotlight-double"
  | "stage-curtain"
  | "curtain-tie"
  | "drama-mask-happy"
  | "drama-mask-sad"
  | "masks-duo"
  | "ticket-tear-left"
  | "ticket-tear-right"
  | "ticket-tear-zigzag"
  | "ticket-tear-dashed"
  | "ticket-stub-play"
  | "marquee-frame"
  | "marquee-bulbs"
  | "marquee-arrow"
  | "neon-star"
  | "popcorn"
  | "popcorn-box"
  | "soda-cup"
  | "intermission-bell"
  | "stage-lights"
  | "footlight-row"
  | "backdrop-arch"
  | "velvet-rope"
  | "show-bell"
  | "applause-hands"
  | "encore-star"
  | "usher-torch"
  | "balcony-arch"
  | "stage-door"
  | "gamepad"
  | "gamepad-wireless"
  | "joystick"
  | "joystick-base"
  | "dpad-cross"
  | "dice-one"
  | "dice-two"
  | "dice-three"
  | "dice-four"
  | "dice-five"
  | "dice-six"
  | "puzzle-piece"
  | "puzzle-duo"
  | "disco-ball"
  | "disco-spark"
  | "arcade-cabinet"
  | "arcade-joystick"
  | "chess-knight-stub"
  | "cards-fan"
  | "spinner-prize"
  | "vinyl"
  | "vinyl-sleeve"
  | "turntable"
  | "tonearm"
  | "cassette"
  | "cassette-notch"
  | "reel-tape"
  | "boombox"
  | "jukebox-arch"
  | "amplifier-stack"
  | "amplifier-knobs"
  | "mixer-faders"
  | "mixer-dials"
  | "tuner-dial"
  | "speaker-grille"
  | "earphone-monitor"
  | "tape-loop"
  | "record-notch"
  | "groove-rings"
  | "needle-drop"
  | "guitar"
  | "guitar-electric"
  | "guitar-pick"
  | "drum"
  | "drum-sticks"
  | "snare-drum"
  | "piano-keys"
  | "piano-grand"
  | "keyboard-synth"
  | "saxophone"
  | "trumpet"
  | "trumpet-bell"
  | "violin"
  | "violin-bow"
  | "cello-arch"
  | "banjo-round"
  | "harmonica-rect"
  | "accordion-fold"
  | "tambourine-ring"
  | "maraca-pair"
  | "xylophone-bars"
  | "chime-bars"
  | "flute-line"
  | "clarinet-reed"
  | "harp-frame"
  | "headphones-case"
  | "stream-live-dot"
  | "on-air-sign"
  | "clap-sync"
  | "slate-mark"
  | "take-reel"
  | "scene-curtain-call"
  | "reel-can"
  | "film-perforation"
  | "ticket-perforation"
  | "stub-notch"
  | "popcorn-tub-notch"
  | "karaoke-mic"
  | "karaoke-screen"
  | "lyrics-lines"
  | "subtitle-frame"
  | "caption-box"
  | "surround-speakers"
  | "bass-boost"
  | "treble-boost"
  | "volume-fader"
  | "cue-flag"
  | "backstage-star"
  | "afterparty-confetti"
  | "finale-curtain"
  | "file"
  | "file-text"
  | "file-plus"
  | "file-minus"
  | "file-check"
  | "file-x"
  | "file-star"
  | "file-heart"
  | "file-lock"
  | "file-search"
  | "file-code"
  | "file-image"
  | "file-music"
  | "file-video"
  | "file-pdf"
  | "file-zip"
  | "file-blank"
  | "file-draft"
  | "file-copy"
  | "file-edit"
  | "folder"
  | "folder-open"
  | "folder-plus"
  | "folder-minus"
  | "folder-check"
  | "folder-x"
  | "folder-star"
  | "folder-lock"
  | "folder-search"
  | "folder-zip"
  | "archive-box"
  | "archive-tray"
  | "document"
  | "document-text"
  | "document-check"
  | "document-plus"
  | "clipboard"
  | "clipboard-check"
  | "clipboard-list"
  | "clipboard-copy"
  | "pencil"
  | "pencil-line"
  | "pencil-ruler"
  | "pen"
  | "pen-nib"
  | "fountain-pen"
  | "eraser"
  | "ruler"
  | "ruler-triangle"
  | "scissors"
  | "scissors-cut"
  | "stapler"
  | "paperclip"
  | "pin"
  | "pin-slant"
  | "bookmark"
  | "bookmark-plus"
  | "bookmark-star"
  | "tag"
  | "tag-plus"
  | "tag-sale"
  | "tags"
  | "calendar"
  | "calendar-plus"
  | "calendar-minus"
  | "calendar-check"
  | "calendar-x"
  | "calendar-day"
  | "calendar-week"
  | "calendar-month"
  | "clock"
  | "clock-plus"
  | "timer"
  | "timer-play"
  | "alarm-clock"
  | "alarm-off"
  | "hourglass"
  | "hourglass-half"
  | "inbox"
  | "inbox-full"
  | "outbox"
  | "outbox-empty"
  | "send-plane"
  | "send-plane-up"
  | "mail"
  | "mail-open"
  | "mail-plus"
  | "mail-check"
  | "mail-x"
  | "mail-star"
  | "mail-forward"
  | "mail-reply"
  | "envelope-seal"
  | "printer"
  | "printer-plus"
  | "scanner"
  | "scanner-flat"
  | "phone-handset"
  | "phone-classic"
  | "mobile-phone"
  | "mobile-plus"
  | "keyboard"
  | "keyboard-wireless"
  | "mouse"
  | "mouse-wireless"
  | "monitor"
  | "monitor-plus"
  | "laptop"
  | "laptop-bag"
  | "tablet"
  | "tablet-pen"
  | "server-rack"
  | "server-stack"
  | "database"
  | "database-plus"
  | "database-search"
  | "cloud"
  | "cloud-up"
  | "cloud-down"
  | "cloud-lock"
  | "lock"
  | "unlock"
  | "key"
  | "key-round"
  | "shield"
  | "shield-check"
  | "shield-lock"
  | "eye"
  | "eye-off"
  | "eye-plus"
  | "search"
  | "search-plus"
  | "search-folder"
  | "gear"
  | "gears"
  | "gear-plus"
  | "wrench"
  | "wrench-plus"
  | "hammer"
  | "screwdriver"
  | "trash"
  | "trash-plus"
  | "edit-line"
  | "copy"
  | "copy-plus"
  | "paste"
  | "paste-clip"
  | "save-floppy"
  | "save-disk"
  | "star"
  | "star-plus"
  | "star-half"
  | "heart"
  | "heart-plus"
  | "flag"
  | "flag-plus"
  | "flag-wave"
  | "bell"
  | "bell-off"
  | "bell-plus"
  | "bell-ring"
  | "megaphone"
  | "megaphone-plus"
  | "briefcase"
  | "briefcase-plus"
  | "briefcase-check"
  | "id-card"
  | "id-badge"
  | "business-card"
  | "coffee-cup"
  | "coffee-mug"
  | "paper-stack"
  | "paper-shred"
  | "sticky-note"
  | "sticky-notes"
  | "note-pen"
  | "desk-lamp"
  | "desk-organizer"
  | "binder"
  | "binder-clip"
  | "tape"
  | "glue"
  | "highlighter"
  | "marker"
  | "calculator"
  | "calculator-plus"
  | "abacus"
  | "whiteboard"
  | "presentation-board"
  | "overhead-projector"
  | "projector-screen"
  | "file-cabinet"
  | "drawer"
  | "shelf"
  | "box-seal"
  | "package-check"
  | "rubber-stamp"
  | "stamp-pad"
  | "ink-bottle"
  | "coffee-beans"
  | "cart"
  | "cart-round"
  | "cart-flat"
  | "cart-plus"
  | "cart-minus"
  | "cart-check"
  | "cart-x"
  | "cart-full"
  | "cart-tilt"
  | "cart-double"
  | "basket"
  | "basket-round"
  | "basket-handle"
  | "basket-full"
  | "basket-weave"
  | "market-basket"
  | "shopping-bag"
  | "tote-bag"
  | "paper-bag"
  | "bag-tag"
  | "bag-mini"
  | "bag-stripe"
  | "bag-double"
  | "gift-bag"
  | "store-awning"
  | "shop-door"
  | "market-stall"
  | "kiosk"
  | "boutique"
  | "mall"
  | "store-sign"
  | "price-tag"
  | "tag-double"
  | "tag-string"
  | "tag-star"
  | "tag-percent"
  | "tag-notch"
  | "tag-round"
  | "tag-stack"
  | "tag-slash"
  | "tag-heart"
  | "barcode"
  | "barcode-wide"
  | "barcode-thin"
  | "barcode-scan"
  | "barcode-box"
  | "barcode-tag"
  | "barcode-tall"
  | "barcode-mini"
  | "qr-square"
  | "qr-dots"
  | "qr-frame"
  | "qr-scan"
  | "qr-mini"
  | "qr-corners"
  | "coin"
  | "coin-stack"
  | "coins"
  | "coin-pile"
  | "coin-roll"
  | "coin-slot"
  | "coin-double"
  | "coin-ring"
  | "coin-spark"
  | "bill"
  | "bills"
  | "bill-stack"
  | "bill-fold"
  | "bill-roll"
  | "bill-band"
  | "bill-wave"
  | "bill-coin"
  | "wallet"
  | "wallet-open"
  | "wallet-card"
  | "wallet-coin"
  | "wallet-fold"
  | "wallet-zip"
  | "wallet-mini"
  | "wallet-clasp"
  | "credit-card"
  | "card-chip"
  | "card-stripe"
  | "card-tap"
  | "card-double"
  | "card-lock"
  | "card-scan"
  | "card-flat"
  | "card-insert"
  | "card-mini"
  | "cash-register"
  | "register-drawer"
  | "register-receipt"
  | "register-keys"
  | "register-mini"
  | "register-bell"
  | "receipt"
  | "receipt-long"
  | "receipt-short"
  | "receipt-check"
  | "receipt-notch"
  | "receipt-zigzag"
  | "receipt-total"
  | "receipt-return"
  | "gift-box"
  | "gift-bow"
  | "gift-open"
  | "gift-tag"
  | "gift-wrap"
  | "gift-mini"
  | "gift-tall"
  | "gift-heart"
  | "coupon"
  | "coupon-notch"
  | "coupon-dashed"
  | "coupon-percent"
  | "coupon-cut"
  | "coupon-double"
  | "coupon-star"
  | "coupon-ticket"
  | "discount-percent"
  | "discount-tag"
  | "discount-burst"
  | "discount-circle"
  | "discount-slash"
  | "discount-badge"
  | "discount-stamp"
  | "discount-mini"
  | "sale-burst"
  | "sale-star"
  | "sale-seal"
  | "sale-flash"
  | "burst-seal"
  | "burst-mini"
  | "package"
  | "package-open"
  | "package-tape"
  | "box"
  | "box-open"
  | "box-tape"
  | "box-cube"
  | "box-stack"
  | "box-mini"
  | "parcel"
  | "parcel-tape"
  | "crate"
  | "delivery-truck"
  | "truck-box"
  | "truck-fast"
  | "truck-mini"
  | "delivery-van"
  | "van-box"
  | "delivery-bike"
  | "bike-box"
  | "scooter"
  | "scooter-box"
  | "warehouse"
  | "warehouse-door"
  | "depot"
  | "silo"
  | "scale"
  | "scale-pan"
  | "scale-dial"
  | "scale-tray"
  | "checkout-calculator"
  | "calc-mini"
  | "calc-receipt"
  | "trade-abacus"
  | "chart-up"
  | "chart-down"
  | "chart-bars"
  | "chart-line"
  | "chart-pie"
  | "chart-arrow"
  | "piggy-bank"
  | "piggy-mini"
  | "vault"
  | "safe"
  | "handshake"
  | "hands-coin"
  | "crown"
  | "crown-mini"
  | "gem"
  | "gem-round"
  | "diamond"
  | "perfume"
  | "watch"
  | "watch-round"
  | "glasses"
  | "ring"
  | "shirt"
  | "necklace"
  | "chair"
  | "sneaker"
  | "hat"
  | "cap"
  | "takeaway-cup"
  | "mug"
  | "lamp"
  | "sun"
  | "sunrise"
  | "sunset"
  | "sun-haze"
  | "sun-cloud"
  | "moon-crescent"
  | "moon-full"
  | "moon-new"
  | "moon-half"
  | "moon-gibbous"
  | "star-single"
  | "star-double"
  | "star-shooting"
  | "star-cluster"
  | "constellation"
  | "cloud-single"
  | "cloud-double"
  | "cloud-sun"
  | "cloud-moon"
  | "cloud-rain"
  | "cloud-drizzle"
  | "cloud-storm"
  | "cloud-snow"
  | "cloud-wind"
  | "rain-drop"
  | "rain-lines"
  | "rain-heavy"
  | "drizzle"
  | "snowflake"
  | "snowfall"
  | "snow-hill"
  | "hail"
  | "lightning-bolt"
  | "lightning-cloud"
  | "thunder"
  | "wind-lines"
  | "wind-swirl"
  | "breeze"
  | "thermometer-cold"
  | "thermometer-hot"
  | "thermometer-mid"
  | "umbrella-closed"
  | "umbrella-open"
  | "umbrella-rain"
  | "rainbow-arc"
  | "rainbow-cloud"
  | "fog"
  | "mist"
  | "dew"
  | "frost"
  | "mountain-peak"
  | "mountain-range"
  | "mountain-snow"
  | "hill"
  | "valley"
  | "volcano"
  | "cliff"
  | "cave"
  | "dune"
  | "island"
  | "tree-pine"
  | "tree-oak"
  | "tree-palm"
  | "leaf-single"
  | "leaf-double"
  | "sprout"
  | "flower-single"
  | "flower-tulip"
  | "flower-sunflower"
  | "bouquet"
  | "cactus-round"
  | "cactus-tall"
  | "grass"
  | "mushroom"
  | "rock"
  | "waterfall"
  | "river"
  | "lake"
  | "wave"
  | "tide"
  | "car-side"
  | "car-front"
  | "bus-side"
  | "bus-front"
  | "train-front"
  | "train-track"
  | "tram"
  | "plane-takeoff"
  | "plane-side"
  | "plane-landing"
  | "ship-hull"
  | "sailboat"
  | "anchor"
  | "lifebuoy"
  | "bicycle"
  | "motorcycle"
  | "kick-scooter"
  | "fuel-pump"
  | "fuel-drop"
  | "road-straight"
  | "road-curve"
  | "bridge"
  | "tunnel"
  | "traffic-cone"
  | "traffic-light"
  | "parking"
  | "map-folded"
  | "map-pin-route"
  | "compass-rose"
  | "compass-needle"
  | "globe-meridian"
  | "globe-pin"
  | "location-pin"
  | "location-ring"
  | "flag-single"
  | "flag-double"
  | "flag-pennant"
  | "flag-checkered"
  | "tent-tri"
  | "tent-cabin"
  | "campfire"
  | "campfire-logs"
  | "backpack"
  | "backpack-hike"
  | "suitcase"
  | "suitcase-roller"
  | "passport-book"
  | "ticket-travel"
  | "camera-tripod"
  | "binoculars"
  | "lantern"
  | "sleeping-bag"
  | "hammock"
  | "oar"
  | "paddle"
  | "kayak"
  | "surfboard"
  | "skateboard"
  | "helmet"
  | "boot-hike"
  | "sunglasses"
  | "hat-sun"
  | "bottle-water"
  | "canteen"
  | "first-aid"
  | "rope-coil"
  | "carabiner"
  | "flashlight"
  | "knife-pocket"
  | "whistle"
  | "stopwatch"
  | "trophy-cup"
  | "medal-round"
  | "medal-ribbon"
  | "podium"
  | "dumbbell"
  | "kettlebell"
  | "ball-soccer"
  | "ball-basket"
  | "ball-tennis"
  | "racket-tennis"
  | "swim-lanes"
  | "bike-road"
  | "run-sprint"
  | "yoga-pose"
  | "check-mark"
  | "check-circle"
  | "cross-mark"
  | "cross-circle"
  | "info-mark"
  | "info-circle"
  | "warning-triangle"
  | "help-mark"
  | "help-circle"
  | "plus-mark"
  | "plus-circle"
  | "minus-mark"
  | "minus-circle"
  | "asterisk"
  | "hash-mark"
  | "at-sign"
  | "percent-mark"
  | "plug-power"
  | "bulb-glow"
  | "battery-empty"
  | "battery-half"
  | "battery-full"
  | "wifi-arcs"
  | "wifi-off"
  | "bluetooth-mark"
  | "airplane-mode"
  | "moon-night"
  | "signal-bars"
  | "satellite-dish"
  | "broadcast-tower"
  | "lighthouse"
  | "hot-air-balloon"
  | "paraglider"
  | "cable-car"
  | "observation-wheel";

export const ICON_PATHS: Record<NavIconName, React.ReactNode> = STAMP_ICONS;

export const NAV_ICON_NAMES: NavIconName[] = [
  "home",
  "components",
  "blocks",
  "showcase",
  "install",
  "design",
  "agents",
  "contribute",
  "dashboard",
  "app",
  "auth",
  "system",
  "marketing",
  "content",
  "operations",
  "storefront",
  "service",
  "pages",
  "theme",
  "ticket",
  "stub",
  "perforation",
  "stamp",
  "gate",
  "settings",
  "user",
  "users",
  "sparkles",
  "plus",
  "check",
  "x",
  "menu",
  "lock-open",
  "star-outline",
  "edit",
  "download",
  "upload",
  "share",
  "link",
  "external",
  "check-double",
  "info",
  "alert-triangle",
  "help",
  "filter",
  "sort",
  "grid",
  "list",
  "more",
  "undo",
  "redo",
  "maximize",
  "minimize",
  "history",
  "refresh",
  "map-pin",
  "phone",
  "message",
  "send",
  "archive",
  "bookmark-check",
  "bookmark-x",
  "image-plus",
  "mic",
  "mic-off",
  "volume",
  "volume-x",
  "alarm",
  "phone-call",
  "phone-off",
  "voicemail",
  "video",
  "video-off",
  "message-circle",
  "message-square",
  "wifi",
  "signal",
  "signal-off",
  "battery",
  "bluetooth",
  "sun-medium",
  "moon",
  "globe",
  "compass",
  "qr",
  "plug",
  "fingerprint",
  "satellite",
  "sim-card",
  "cart-mini",
  "receipt-mini",
  "save",
  "thermometer",
  "umbrella",
  "bike",
  "car",
  "plane",
  "train",
  "rocket",
  "brightness",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
  "arrow-up-left",
  "arrow-down-right",
  "arrow-down-left",
  "arrow-up-double",
  "arrow-down-double",
  "arrow-left-double",
  "arrow-right-double",
  "arrow-up-long",
  "arrow-down-long",
  "arrow-left-long",
  "arrow-right-long",
  "arrow-up-short",
  "arrow-down-short",
  "arrow-left-short",
  "arrow-right-short",
  "arrow-up-thin",
  "arrow-down-thin",
  "arrow-left-thin",
  "arrow-right-thin",
  "arrow-up-curved",
  "arrow-down-curved",
  "arrow-left-curved",
  "arrow-right-curved",
  "arrow-bent-up-right",
  "arrow-bent-down-right",
  "arrow-bent-up-left",
  "arrow-bent-down-left",
  "arrow-u-turn-up",
  "arrow-u-turn-down",
  "arrow-u-turn-left",
  "arrow-u-turn-right",
  "arrow-shuffle",
  "arrow-shuffle-horizontal",
  "arrow-swap-horizontal",
  "arrow-swap-vertical",
  "arrow-expand",
  "arrow-expand-diagonal",
  "arrow-shrink",
  "arrow-shrink-diagonal",
  "arrow-maximize",
  "arrow-minimize",
  "arrow-fullscreen",
  "arrow-fullscreen-exit",
  "arrow-move",
  "arrow-move-diagonal",
  "arrow-drag",
  "arrow-drag-horizontal",
  "arrow-drag-vertical",
  "arrow-upload",
  "arrow-upload-long",
  "arrow-download",
  "arrow-download-long",
  "arrow-share-right",
  "arrow-share-up",
  "arrow-reply",
  "arrow-reply-all",
  "arrow-forward",
  "arrow-undo",
  "arrow-undo-sharp",
  "arrow-redo",
  "arrow-redo-sharp",
  "arrow-refresh",
  "arrow-refresh-reverse",
  "arrow-rotate-clockwise",
  "arrow-rotate-counterclockwise",
  "arrow-flip-horizontal",
  "arrow-flip-vertical",
  "arrow-sort-up",
  "arrow-sort-down",
  "arrow-sort-double",
  "arrow-filter-up",
  "arrow-filter-down",
  "chevron-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up-double",
  "chevron-down-double",
  "chevron-left-double",
  "chevron-right-double",
  "chevron-up-thin",
  "chevron-down-thin",
  "chevron-left-thin",
  "chevron-right-thin",
  "chevron-up-circle",
  "chevron-down-circle",
  "chevron-left-circle",
  "chevron-right-circle",
  "caret-up",
  "caret-down",
  "caret-left",
  "caret-right",
  "caret-up-double",
  "caret-down-double",
  "caret-left-double",
  "caret-right-double",
  "play-next",
  "play-previous",
  "play-skip-forward",
  "play-skip-back",
  "play-fast-forward",
  "play-rewind",
  "play-triangle-right",
  "play-triangle-left",
  "arrow-log-in",
  "arrow-log-out",
  "arrow-enter-right",
  "arrow-exit-right",
  "arrow-external-link",
  "arrow-external-up-right",
  "arrow-corner-up-right",
  "arrow-corner-down-right",
  "arrow-corner-up-left",
  "arrow-corner-down-left",
  "compass-north",
  "compass-south",
  "compass-east",
  "compass-west",
  "compass-northeast",
  "compass-northwest",
  "compass-southeast",
  "compass-southwest",
  "nav-back",
  "nav-forward",
  "nav-back-circle",
  "nav-forward-circle",
  "nav-up-circle",
  "nav-down-circle",
  "arrow-back-step",
  "arrow-forward-step",
  "arrow-turn-left",
  "arrow-turn-right",
  "arrow-loop",
  "arrow-loop-reverse",
  "arrow-infinity",
  "arrow-sync-up",
  "arrow-sync-down",
  "arrow-split-up",
  "arrow-split-down",
  "arrow-merge-up",
  "arrow-merge-down",
  "arrow-branch-right",
  "arrow-branch-left",
  "arrow-cross-up",
  "arrow-cross-down",
  "arrow-notch-up",
  "arrow-notch-down",
  "arrow-dashed-up",
  "arrow-dashed-down",
  "arrow-dashed-left",
  "arrow-dashed-right",
  "arrow-dotted-up",
  "arrow-dotted-down",
  "arrow-tail-notch-up",
  "arrow-tail-notch-down",
  "arrow-bar-up",
  "arrow-bar-down",
  "arrow-bar-left",
  "arrow-bar-right",
  "arrow-target-up",
  "arrow-target-down",
  "arrow-circle-up",
  "arrow-circle-down",
  "arrow-circle-left",
  "arrow-circle-right",
  "arrow-square-up",
  "arrow-square-down",
  "arrow-square-left",
  "arrow-square-right",
  "arrow-elbow-up-right",
  "arrow-elbow-down-right",
  "arrow-zigzag-right",
  "arrow-zigzag-left",
  "arrow-wave-right",
  "arrow-wave-up",
  "arrow-step-up-right",
  "arrow-step-down-right",
  "arrow-hop-up",
  "arrow-hop-down",
  "arrow-pin-up",
  "arrow-pin-down",
  "arrow-anchor-left",
  "arrow-anchor-right",
  "arrow-ticket-up",
  "arrow-ticket-down",
  "arrow-stub-left",
  "arrow-stub-right",
  "arrow-perforated-right",
  "arrow-perforated-left",
  "nav-compass-circle",
  "nav-direction-up",
  "nav-direction-down",
  "nav-history-back",
  "nav-history-forward",
  "arrow-orbit",
  "play",
  "play-circle",
  "play-square",
  "play-notch",
  "pause",
  "pause-circle",
  "pause-square",
  "stop",
  "stop-circle",
  "stop-square",
  "record-dot",
  "record-circle",
  "skip-forward",
  "skip-back",
  "rewind",
  "fast-forward",
  "loop-track",
  "shuffle-tracks",
  "repeat-track",
  "eject-media",
  "volume-off",
  "volume-low",
  "volume-mid",
  "volume-high",
  "mute-x",
  "speaker",
  "speaker-box",
  "speaker-tower",
  "headphones",
  "headphones-mic",
  "earbuds",
  "earbud-single",
  "microphone",
  "microphone-off",
  "microphone-stand",
  "microphone-retro",
  "podcast-mic",
  "podcast-stand",
  "equalizer-bars",
  "equalizer-sliders",
  "audio-wave",
  "audio-wave-circle",
  "sound-ripple",
  "mute-ring",
  "music-note",
  "music-note-double",
  "beamed-notes",
  "beamed-notes-tilt",
  "music-rest",
  "treble-stub",
  "bass-dot",
  "tempo-mark",
  "metronome",
  "metronome-tick",
  "playlist-note",
  "note-circle",
  "note-square",
  "chord-bars",
  "harmony-lines",
  "song-ticket",
  "camera",
  "camera-flash",
  "camera-reel",
  "photo-frame",
  "photo-stack",
  "photo-strip",
  "film-strip",
  "film-frame",
  "film-reel",
  "clapper",
  "clapper-open",
  "projector",
  "projector-beam",
  "projector-reel",
  "tv",
  "tv-static",
  "tv-retro",
  "radio",
  "radio-tower",
  "antenna-dish",
  "spotlight-cone",
  "spotlight-double",
  "stage-curtain",
  "curtain-tie",
  "drama-mask-happy",
  "drama-mask-sad",
  "masks-duo",
  "ticket-tear-left",
  "ticket-tear-right",
  "ticket-tear-zigzag",
  "ticket-tear-dashed",
  "ticket-stub-play",
  "marquee-frame",
  "marquee-bulbs",
  "marquee-arrow",
  "neon-star",
  "popcorn",
  "popcorn-box",
  "soda-cup",
  "intermission-bell",
  "stage-lights",
  "footlight-row",
  "backdrop-arch",
  "velvet-rope",
  "show-bell",
  "applause-hands",
  "encore-star",
  "usher-torch",
  "balcony-arch",
  "stage-door",
  "gamepad",
  "gamepad-wireless",
  "joystick",
  "joystick-base",
  "dpad-cross",
  "dice-one",
  "dice-two",
  "dice-three",
  "dice-four",
  "dice-five",
  "dice-six",
  "puzzle-piece",
  "puzzle-duo",
  "disco-ball",
  "disco-spark",
  "arcade-cabinet",
  "arcade-joystick",
  "chess-knight-stub",
  "cards-fan",
  "spinner-prize",
  "vinyl",
  "vinyl-sleeve",
  "turntable",
  "tonearm",
  "cassette",
  "cassette-notch",
  "reel-tape",
  "boombox",
  "jukebox-arch",
  "amplifier-stack",
  "amplifier-knobs",
  "mixer-faders",
  "mixer-dials",
  "tuner-dial",
  "speaker-grille",
  "earphone-monitor",
  "tape-loop",
  "record-notch",
  "groove-rings",
  "needle-drop",
  "guitar",
  "guitar-electric",
  "guitar-pick",
  "drum",
  "drum-sticks",
  "snare-drum",
  "piano-keys",
  "piano-grand",
  "keyboard-synth",
  "saxophone",
  "trumpet",
  "trumpet-bell",
  "violin",
  "violin-bow",
  "cello-arch",
  "banjo-round",
  "harmonica-rect",
  "accordion-fold",
  "tambourine-ring",
  "maraca-pair",
  "xylophone-bars",
  "chime-bars",
  "flute-line",
  "clarinet-reed",
  "harp-frame",
  "headphones-case",
  "stream-live-dot",
  "on-air-sign",
  "clap-sync",
  "slate-mark",
  "take-reel",
  "scene-curtain-call",
  "reel-can",
  "film-perforation",
  "ticket-perforation",
  "stub-notch",
  "popcorn-tub-notch",
  "karaoke-mic",
  "karaoke-screen",
  "lyrics-lines",
  "subtitle-frame",
  "caption-box",
  "surround-speakers",
  "bass-boost",
  "treble-boost",
  "volume-fader",
  "cue-flag",
  "backstage-star",
  "afterparty-confetti",
  "finale-curtain",
  "file",
  "file-text",
  "file-plus",
  "file-minus",
  "file-check",
  "file-x",
  "file-star",
  "file-heart",
  "file-lock",
  "file-search",
  "file-code",
  "file-image",
  "file-music",
  "file-video",
  "file-pdf",
  "file-zip",
  "file-blank",
  "file-draft",
  "file-copy",
  "file-edit",
  "folder",
  "folder-open",
  "folder-plus",
  "folder-minus",
  "folder-check",
  "folder-x",
  "folder-star",
  "folder-lock",
  "folder-search",
  "folder-zip",
  "archive-box",
  "archive-tray",
  "document",
  "document-text",
  "document-check",
  "document-plus",
  "clipboard",
  "clipboard-check",
  "clipboard-list",
  "clipboard-copy",
  "pencil",
  "pencil-line",
  "pencil-ruler",
  "pen",
  "pen-nib",
  "fountain-pen",
  "eraser",
  "ruler",
  "ruler-triangle",
  "scissors",
  "scissors-cut",
  "stapler",
  "paperclip",
  "pin",
  "pin-slant",
  "bookmark",
  "bookmark-plus",
  "bookmark-star",
  "tag",
  "tag-plus",
  "tag-sale",
  "tags",
  "calendar",
  "calendar-plus",
  "calendar-minus",
  "calendar-check",
  "calendar-x",
  "calendar-day",
  "calendar-week",
  "calendar-month",
  "clock",
  "clock-plus",
  "timer",
  "timer-play",
  "alarm-clock",
  "alarm-off",
  "hourglass",
  "hourglass-half",
  "inbox",
  "inbox-full",
  "outbox",
  "outbox-empty",
  "send-plane",
  "send-plane-up",
  "mail",
  "mail-open",
  "mail-plus",
  "mail-check",
  "mail-x",
  "mail-star",
  "mail-forward",
  "mail-reply",
  "envelope-seal",
  "printer",
  "printer-plus",
  "scanner",
  "scanner-flat",
  "phone-handset",
  "phone-classic",
  "mobile-phone",
  "mobile-plus",
  "keyboard",
  "keyboard-wireless",
  "mouse",
  "mouse-wireless",
  "monitor",
  "monitor-plus",
  "laptop",
  "laptop-bag",
  "tablet",
  "tablet-pen",
  "server-rack",
  "server-stack",
  "database",
  "database-plus",
  "database-search",
  "cloud",
  "cloud-up",
  "cloud-down",
  "cloud-lock",
  "lock",
  "unlock",
  "key",
  "key-round",
  "shield",
  "shield-check",
  "shield-lock",
  "eye",
  "eye-off",
  "eye-plus",
  "search",
  "search-plus",
  "search-folder",
  "gear",
  "gears",
  "gear-plus",
  "wrench",
  "wrench-plus",
  "hammer",
  "screwdriver",
  "trash",
  "trash-plus",
  "edit-line",
  "copy",
  "copy-plus",
  "paste",
  "paste-clip",
  "save-floppy",
  "save-disk",
  "star",
  "star-plus",
  "star-half",
  "heart",
  "heart-plus",
  "flag",
  "flag-plus",
  "flag-wave",
  "bell",
  "bell-off",
  "bell-plus",
  "bell-ring",
  "megaphone",
  "megaphone-plus",
  "briefcase",
  "briefcase-plus",
  "briefcase-check",
  "id-card",
  "id-badge",
  "business-card",
  "coffee-cup",
  "coffee-mug",
  "paper-stack",
  "paper-shred",
  "sticky-note",
  "sticky-notes",
  "note-pen",
  "desk-lamp",
  "desk-organizer",
  "binder",
  "binder-clip",
  "tape",
  "glue",
  "highlighter",
  "marker",
  "calculator",
  "calculator-plus",
  "abacus",
  "whiteboard",
  "presentation-board",
  "overhead-projector",
  "projector-screen",
  "file-cabinet",
  "drawer",
  "shelf",
  "box-seal",
  "package-check",
  "rubber-stamp",
  "stamp-pad",
  "ink-bottle",
  "coffee-beans",
  "cart",
  "cart-round",
  "cart-flat",
  "cart-plus",
  "cart-minus",
  "cart-check",
  "cart-x",
  "cart-full",
  "cart-tilt",
  "cart-double",
  "basket",
  "basket-round",
  "basket-handle",
  "basket-full",
  "basket-weave",
  "market-basket",
  "shopping-bag",
  "tote-bag",
  "paper-bag",
  "bag-tag",
  "bag-mini",
  "bag-stripe",
  "bag-double",
  "gift-bag",
  "store-awning",
  "shop-door",
  "market-stall",
  "kiosk",
  "boutique",
  "mall",
  "store-sign",
  "price-tag",
  "tag-double",
  "tag-string",
  "tag-star",
  "tag-percent",
  "tag-notch",
  "tag-round",
  "tag-stack",
  "tag-slash",
  "tag-heart",
  "barcode",
  "barcode-wide",
  "barcode-thin",
  "barcode-scan",
  "barcode-box",
  "barcode-tag",
  "barcode-tall",
  "barcode-mini",
  "qr-square",
  "qr-dots",
  "qr-frame",
  "qr-scan",
  "qr-mini",
  "qr-corners",
  "coin",
  "coin-stack",
  "coins",
  "coin-pile",
  "coin-roll",
  "coin-slot",
  "coin-double",
  "coin-ring",
  "coin-spark",
  "bill",
  "bills",
  "bill-stack",
  "bill-fold",
  "bill-roll",
  "bill-band",
  "bill-wave",
  "bill-coin",
  "wallet",
  "wallet-open",
  "wallet-card",
  "wallet-coin",
  "wallet-fold",
  "wallet-zip",
  "wallet-mini",
  "wallet-clasp",
  "credit-card",
  "card-chip",
  "card-stripe",
  "card-tap",
  "card-double",
  "card-lock",
  "card-scan",
  "card-flat",
  "card-insert",
  "card-mini",
  "cash-register",
  "register-drawer",
  "register-receipt",
  "register-keys",
  "register-mini",
  "register-bell",
  "receipt",
  "receipt-long",
  "receipt-short",
  "receipt-check",
  "receipt-notch",
  "receipt-zigzag",
  "receipt-total",
  "receipt-return",
  "gift-box",
  "gift-bow",
  "gift-open",
  "gift-tag",
  "gift-wrap",
  "gift-mini",
  "gift-tall",
  "gift-heart",
  "coupon",
  "coupon-notch",
  "coupon-dashed",
  "coupon-percent",
  "coupon-cut",
  "coupon-double",
  "coupon-star",
  "coupon-ticket",
  "discount-percent",
  "discount-tag",
  "discount-burst",
  "discount-circle",
  "discount-slash",
  "discount-badge",
  "discount-stamp",
  "discount-mini",
  "sale-burst",
  "sale-star",
  "sale-seal",
  "sale-flash",
  "burst-seal",
  "burst-mini",
  "package",
  "package-open",
  "package-tape",
  "box",
  "box-open",
  "box-tape",
  "box-cube",
  "box-stack",
  "box-mini",
  "parcel",
  "parcel-tape",
  "crate",
  "delivery-truck",
  "truck-box",
  "truck-fast",
  "truck-mini",
  "delivery-van",
  "van-box",
  "delivery-bike",
  "bike-box",
  "scooter",
  "scooter-box",
  "warehouse",
  "warehouse-door",
  "depot",
  "silo",
  "scale",
  "scale-pan",
  "scale-dial",
  "scale-tray",
  "checkout-calculator",
  "calc-mini",
  "calc-receipt",
  "trade-abacus",
  "chart-up",
  "chart-down",
  "chart-bars",
  "chart-line",
  "chart-pie",
  "chart-arrow",
  "piggy-bank",
  "piggy-mini",
  "vault",
  "safe",
  "handshake",
  "hands-coin",
  "crown",
  "crown-mini",
  "gem",
  "gem-round",
  "diamond",
  "perfume",
  "watch",
  "watch-round",
  "glasses",
  "ring",
  "shirt",
  "necklace",
  "chair",
  "sneaker",
  "hat",
  "cap",
  "takeaway-cup",
  "mug",
  "lamp",
  "sun",
  "sunrise",
  "sunset",
  "sun-haze",
  "sun-cloud",
  "moon-crescent",
  "moon-full",
  "moon-new",
  "moon-half",
  "moon-gibbous",
  "star-single",
  "star-double",
  "star-shooting",
  "star-cluster",
  "constellation",
  "cloud-single",
  "cloud-double",
  "cloud-sun",
  "cloud-moon",
  "cloud-rain",
  "cloud-drizzle",
  "cloud-storm",
  "cloud-snow",
  "cloud-wind",
  "rain-drop",
  "rain-lines",
  "rain-heavy",
  "drizzle",
  "snowflake",
  "snowfall",
  "snow-hill",
  "hail",
  "lightning-bolt",
  "lightning-cloud",
  "thunder",
  "wind-lines",
  "wind-swirl",
  "breeze",
  "thermometer-cold",
  "thermometer-hot",
  "thermometer-mid",
  "umbrella-closed",
  "umbrella-open",
  "umbrella-rain",
  "rainbow-arc",
  "rainbow-cloud",
  "fog",
  "mist",
  "dew",
  "frost",
  "mountain-peak",
  "mountain-range",
  "mountain-snow",
  "hill",
  "valley",
  "volcano",
  "cliff",
  "cave",
  "dune",
  "island",
  "tree-pine",
  "tree-oak",
  "tree-palm",
  "leaf-single",
  "leaf-double",
  "sprout",
  "flower-single",
  "flower-tulip",
  "flower-sunflower",
  "bouquet",
  "cactus-round",
  "cactus-tall",
  "grass",
  "mushroom",
  "rock",
  "waterfall",
  "river",
  "lake",
  "wave",
  "tide",
  "car-side",
  "car-front",
  "bus-side",
  "bus-front",
  "train-front",
  "train-track",
  "tram",
  "plane-takeoff",
  "plane-side",
  "plane-landing",
  "ship-hull",
  "sailboat",
  "anchor",
  "lifebuoy",
  "bicycle",
  "motorcycle",
  "kick-scooter",
  "fuel-pump",
  "fuel-drop",
  "road-straight",
  "road-curve",
  "bridge",
  "tunnel",
  "traffic-cone",
  "traffic-light",
  "parking",
  "map-folded",
  "map-pin-route",
  "compass-rose",
  "compass-needle",
  "globe-meridian",
  "globe-pin",
  "location-pin",
  "location-ring",
  "flag-single",
  "flag-double",
  "flag-pennant",
  "flag-checkered",
  "tent-tri",
  "tent-cabin",
  "campfire",
  "campfire-logs",
  "backpack",
  "backpack-hike",
  "suitcase",
  "suitcase-roller",
  "passport-book",
  "ticket-travel",
  "camera-tripod",
  "binoculars",
  "lantern",
  "sleeping-bag",
  "hammock",
  "oar",
  "paddle",
  "kayak",
  "surfboard",
  "skateboard",
  "helmet",
  "boot-hike",
  "sunglasses",
  "hat-sun",
  "bottle-water",
  "canteen",
  "first-aid",
  "rope-coil",
  "carabiner",
  "flashlight",
  "knife-pocket",
  "whistle",
  "stopwatch",
  "trophy-cup",
  "medal-round",
  "medal-ribbon",
  "podium",
  "dumbbell",
  "kettlebell",
  "ball-soccer",
  "ball-basket",
  "ball-tennis",
  "racket-tennis",
  "swim-lanes",
  "bike-road",
  "run-sprint",
  "yoga-pose",
  "check-mark",
  "check-circle",
  "cross-mark",
  "cross-circle",
  "info-mark",
  "info-circle",
  "warning-triangle",
  "help-mark",
  "help-circle",
  "plus-mark",
  "plus-circle",
  "minus-mark",
  "minus-circle",
  "asterisk",
  "hash-mark",
  "at-sign",
  "percent-mark",
  "plug-power",
  "bulb-glow",
  "battery-empty",
  "battery-half",
  "battery-full",
  "wifi-arcs",
  "wifi-off",
  "bluetooth-mark",
  "airplane-mode",
  "moon-night",
  "signal-bars",
  "satellite-dish",
  "broadcast-tower",
  "lighthouse",
  "hot-air-balloon",
  "paraglider",
  "cable-car",
  "observation-wheel",
];

export const NAV_ICON_CATEGORIES: Record<string, string> = {
  "home": "Essentials",
  "components": "Essentials",
  "blocks": "Essentials",
  "showcase": "Essentials",
  "install": "Essentials",
  "design": "Essentials",
  "agents": "Essentials",
  "contribute": "Essentials",
  "dashboard": "Essentials",
  "app": "Essentials",
  "auth": "Essentials",
  "system": "Essentials",
  "marketing": "Essentials",
  "content": "Essentials",
  "operations": "Essentials",
  "storefront": "Essentials",
  "service": "Essentials",
  "pages": "Essentials",
  "theme": "Essentials",
  "ticket": "Essentials",
  "stub": "Essentials",
  "perforation": "Essentials",
  "stamp": "Essentials",
  "gate": "Essentials",
  "settings": "Essentials",
  "user": "Essentials",
  "users": "Essentials",
  "sparkles": "Essentials",
  "plus": "Essentials",
  "check": "Essentials",
  "x": "Essentials",
  "menu": "Essentials",
  "lock-open": "Essentials",
  "star-outline": "Essentials",
  "edit": "Essentials",
  "download": "Essentials",
  "upload": "Essentials",
  "share": "Essentials",
  "link": "Essentials",
  "external": "Essentials",
  "check-double": "Essentials",
  "info": "Essentials",
  "alert-triangle": "Essentials",
  "help": "Essentials",
  "filter": "Essentials",
  "sort": "Essentials",
  "grid": "Essentials",
  "list": "Essentials",
  "more": "Essentials",
  "undo": "Essentials",
  "redo": "Essentials",
  "maximize": "Essentials",
  "minimize": "Essentials",
  "history": "Essentials",
  "refresh": "Essentials",
  "map-pin": "Essentials",
  "phone": "Essentials",
  "message": "Essentials",
  "send": "Essentials",
  "archive": "Essentials",
  "bookmark-check": "Essentials",
  "bookmark-x": "Essentials",
  "image-plus": "Essentials",
  "mic": "Essentials",
  "mic-off": "Essentials",
  "volume": "Essentials",
  "volume-x": "Essentials",
  "alarm": "Essentials",
  "phone-call": "Essentials",
  "phone-off": "Essentials",
  "voicemail": "Essentials",
  "video": "Essentials",
  "video-off": "Essentials",
  "message-circle": "Essentials",
  "message-square": "Essentials",
  "wifi": "Essentials",
  "signal": "Essentials",
  "signal-off": "Essentials",
  "battery": "Essentials",
  "bluetooth": "Essentials",
  "sun-medium": "Essentials",
  "moon": "Essentials",
  "globe": "Essentials",
  "compass": "Essentials",
  "qr": "Essentials",
  "plug": "Essentials",
  "fingerprint": "Essentials",
  "satellite": "Essentials",
  "sim-card": "Essentials",
  "cart-mini": "Essentials",
  "receipt-mini": "Essentials",
  "save": "Essentials",
  "thermometer": "Essentials",
  "umbrella": "Essentials",
  "bike": "Essentials",
  "car": "Essentials",
  "plane": "Essentials",
  "train": "Essentials",
  "rocket": "Essentials",
  "brightness": "Essentials",
  "arrow-up": "Arrows & Direction",
  "arrow-down": "Arrows & Direction",
  "arrow-left": "Arrows & Direction",
  "arrow-right": "Arrows & Direction",
  "arrow-up-right": "Arrows & Direction",
  "arrow-up-left": "Arrows & Direction",
  "arrow-down-right": "Arrows & Direction",
  "arrow-down-left": "Arrows & Direction",
  "arrow-up-double": "Arrows & Direction",
  "arrow-down-double": "Arrows & Direction",
  "arrow-left-double": "Arrows & Direction",
  "arrow-right-double": "Arrows & Direction",
  "arrow-up-long": "Arrows & Direction",
  "arrow-down-long": "Arrows & Direction",
  "arrow-left-long": "Arrows & Direction",
  "arrow-right-long": "Arrows & Direction",
  "arrow-up-short": "Arrows & Direction",
  "arrow-down-short": "Arrows & Direction",
  "arrow-left-short": "Arrows & Direction",
  "arrow-right-short": "Arrows & Direction",
  "arrow-up-thin": "Arrows & Direction",
  "arrow-down-thin": "Arrows & Direction",
  "arrow-left-thin": "Arrows & Direction",
  "arrow-right-thin": "Arrows & Direction",
  "arrow-up-curved": "Arrows & Direction",
  "arrow-down-curved": "Arrows & Direction",
  "arrow-left-curved": "Arrows & Direction",
  "arrow-right-curved": "Arrows & Direction",
  "arrow-bent-up-right": "Arrows & Direction",
  "arrow-bent-down-right": "Arrows & Direction",
  "arrow-bent-up-left": "Arrows & Direction",
  "arrow-bent-down-left": "Arrows & Direction",
  "arrow-u-turn-up": "Arrows & Direction",
  "arrow-u-turn-down": "Arrows & Direction",
  "arrow-u-turn-left": "Arrows & Direction",
  "arrow-u-turn-right": "Arrows & Direction",
  "arrow-shuffle": "Arrows & Direction",
  "arrow-shuffle-horizontal": "Arrows & Direction",
  "arrow-swap-horizontal": "Arrows & Direction",
  "arrow-swap-vertical": "Arrows & Direction",
  "arrow-expand": "Arrows & Direction",
  "arrow-expand-diagonal": "Arrows & Direction",
  "arrow-shrink": "Arrows & Direction",
  "arrow-shrink-diagonal": "Arrows & Direction",
  "arrow-maximize": "Arrows & Direction",
  "arrow-minimize": "Arrows & Direction",
  "arrow-fullscreen": "Arrows & Direction",
  "arrow-fullscreen-exit": "Arrows & Direction",
  "arrow-move": "Arrows & Direction",
  "arrow-move-diagonal": "Arrows & Direction",
  "arrow-drag": "Arrows & Direction",
  "arrow-drag-horizontal": "Arrows & Direction",
  "arrow-drag-vertical": "Arrows & Direction",
  "arrow-upload": "Arrows & Direction",
  "arrow-upload-long": "Arrows & Direction",
  "arrow-download": "Arrows & Direction",
  "arrow-download-long": "Arrows & Direction",
  "arrow-share-right": "Arrows & Direction",
  "arrow-share-up": "Arrows & Direction",
  "arrow-reply": "Arrows & Direction",
  "arrow-reply-all": "Arrows & Direction",
  "arrow-forward": "Arrows & Direction",
  "arrow-undo": "Arrows & Direction",
  "arrow-undo-sharp": "Arrows & Direction",
  "arrow-redo": "Arrows & Direction",
  "arrow-redo-sharp": "Arrows & Direction",
  "arrow-refresh": "Arrows & Direction",
  "arrow-refresh-reverse": "Arrows & Direction",
  "arrow-rotate-clockwise": "Arrows & Direction",
  "arrow-rotate-counterclockwise": "Arrows & Direction",
  "arrow-flip-horizontal": "Arrows & Direction",
  "arrow-flip-vertical": "Arrows & Direction",
  "arrow-sort-up": "Arrows & Direction",
  "arrow-sort-down": "Arrows & Direction",
  "arrow-sort-double": "Arrows & Direction",
  "arrow-filter-up": "Arrows & Direction",
  "arrow-filter-down": "Arrows & Direction",
  "chevron-up": "Arrows & Direction",
  "chevron-down": "Arrows & Direction",
  "chevron-left": "Arrows & Direction",
  "chevron-right": "Arrows & Direction",
  "chevron-up-double": "Arrows & Direction",
  "chevron-down-double": "Arrows & Direction",
  "chevron-left-double": "Arrows & Direction",
  "chevron-right-double": "Arrows & Direction",
  "chevron-up-thin": "Arrows & Direction",
  "chevron-down-thin": "Arrows & Direction",
  "chevron-left-thin": "Arrows & Direction",
  "chevron-right-thin": "Arrows & Direction",
  "chevron-up-circle": "Arrows & Direction",
  "chevron-down-circle": "Arrows & Direction",
  "chevron-left-circle": "Arrows & Direction",
  "chevron-right-circle": "Arrows & Direction",
  "caret-up": "Arrows & Direction",
  "caret-down": "Arrows & Direction",
  "caret-left": "Arrows & Direction",
  "caret-right": "Arrows & Direction",
  "caret-up-double": "Arrows & Direction",
  "caret-down-double": "Arrows & Direction",
  "caret-left-double": "Arrows & Direction",
  "caret-right-double": "Arrows & Direction",
  "play-next": "Arrows & Direction",
  "play-previous": "Arrows & Direction",
  "play-skip-forward": "Arrows & Direction",
  "play-skip-back": "Arrows & Direction",
  "play-fast-forward": "Arrows & Direction",
  "play-rewind": "Arrows & Direction",
  "play-triangle-right": "Arrows & Direction",
  "play-triangle-left": "Arrows & Direction",
  "arrow-log-in": "Arrows & Direction",
  "arrow-log-out": "Arrows & Direction",
  "arrow-enter-right": "Arrows & Direction",
  "arrow-exit-right": "Arrows & Direction",
  "arrow-external-link": "Arrows & Direction",
  "arrow-external-up-right": "Arrows & Direction",
  "arrow-corner-up-right": "Arrows & Direction",
  "arrow-corner-down-right": "Arrows & Direction",
  "arrow-corner-up-left": "Arrows & Direction",
  "arrow-corner-down-left": "Arrows & Direction",
  "compass-north": "Arrows & Direction",
  "compass-south": "Arrows & Direction",
  "compass-east": "Arrows & Direction",
  "compass-west": "Arrows & Direction",
  "compass-northeast": "Arrows & Direction",
  "compass-northwest": "Arrows & Direction",
  "compass-southeast": "Arrows & Direction",
  "compass-southwest": "Arrows & Direction",
  "nav-back": "Arrows & Direction",
  "nav-forward": "Arrows & Direction",
  "nav-back-circle": "Arrows & Direction",
  "nav-forward-circle": "Arrows & Direction",
  "nav-up-circle": "Arrows & Direction",
  "nav-down-circle": "Arrows & Direction",
  "arrow-back-step": "Arrows & Direction",
  "arrow-forward-step": "Arrows & Direction",
  "arrow-turn-left": "Arrows & Direction",
  "arrow-turn-right": "Arrows & Direction",
  "arrow-loop": "Arrows & Direction",
  "arrow-loop-reverse": "Arrows & Direction",
  "arrow-infinity": "Arrows & Direction",
  "arrow-sync-up": "Arrows & Direction",
  "arrow-sync-down": "Arrows & Direction",
  "arrow-split-up": "Arrows & Direction",
  "arrow-split-down": "Arrows & Direction",
  "arrow-merge-up": "Arrows & Direction",
  "arrow-merge-down": "Arrows & Direction",
  "arrow-branch-right": "Arrows & Direction",
  "arrow-branch-left": "Arrows & Direction",
  "arrow-cross-up": "Arrows & Direction",
  "arrow-cross-down": "Arrows & Direction",
  "arrow-notch-up": "Arrows & Direction",
  "arrow-notch-down": "Arrows & Direction",
  "arrow-dashed-up": "Arrows & Direction",
  "arrow-dashed-down": "Arrows & Direction",
  "arrow-dashed-left": "Arrows & Direction",
  "arrow-dashed-right": "Arrows & Direction",
  "arrow-dotted-up": "Arrows & Direction",
  "arrow-dotted-down": "Arrows & Direction",
  "arrow-tail-notch-up": "Arrows & Direction",
  "arrow-tail-notch-down": "Arrows & Direction",
  "arrow-bar-up": "Arrows & Direction",
  "arrow-bar-down": "Arrows & Direction",
  "arrow-bar-left": "Arrows & Direction",
  "arrow-bar-right": "Arrows & Direction",
  "arrow-target-up": "Arrows & Direction",
  "arrow-target-down": "Arrows & Direction",
  "arrow-circle-up": "Arrows & Direction",
  "arrow-circle-down": "Arrows & Direction",
  "arrow-circle-left": "Arrows & Direction",
  "arrow-circle-right": "Arrows & Direction",
  "arrow-square-up": "Arrows & Direction",
  "arrow-square-down": "Arrows & Direction",
  "arrow-square-left": "Arrows & Direction",
  "arrow-square-right": "Arrows & Direction",
  "arrow-elbow-up-right": "Arrows & Direction",
  "arrow-elbow-down-right": "Arrows & Direction",
  "arrow-zigzag-right": "Arrows & Direction",
  "arrow-zigzag-left": "Arrows & Direction",
  "arrow-wave-right": "Arrows & Direction",
  "arrow-wave-up": "Arrows & Direction",
  "arrow-step-up-right": "Arrows & Direction",
  "arrow-step-down-right": "Arrows & Direction",
  "arrow-hop-up": "Arrows & Direction",
  "arrow-hop-down": "Arrows & Direction",
  "arrow-pin-up": "Arrows & Direction",
  "arrow-pin-down": "Arrows & Direction",
  "arrow-anchor-left": "Arrows & Direction",
  "arrow-anchor-right": "Arrows & Direction",
  "arrow-ticket-up": "Arrows & Direction",
  "arrow-ticket-down": "Arrows & Direction",
  "arrow-stub-left": "Arrows & Direction",
  "arrow-stub-right": "Arrows & Direction",
  "arrow-perforated-right": "Arrows & Direction",
  "arrow-perforated-left": "Arrows & Direction",
  "nav-compass-circle": "Arrows & Direction",
  "nav-direction-up": "Arrows & Direction",
  "nav-direction-down": "Arrows & Direction",
  "nav-history-back": "Arrows & Direction",
  "nav-history-forward": "Arrows & Direction",
  "arrow-orbit": "Arrows & Direction",
  "play": "Media & Playback",
  "play-circle": "Media & Playback",
  "play-square": "Media & Playback",
  "play-notch": "Media & Playback",
  "pause": "Media & Playback",
  "pause-circle": "Media & Playback",
  "pause-square": "Media & Playback",
  "stop": "Media & Playback",
  "stop-circle": "Media & Playback",
  "stop-square": "Media & Playback",
  "record-dot": "Media & Playback",
  "record-circle": "Media & Playback",
  "skip-forward": "Media & Playback",
  "skip-back": "Media & Playback",
  "rewind": "Media & Playback",
  "fast-forward": "Media & Playback",
  "loop-track": "Media & Playback",
  "shuffle-tracks": "Media & Playback",
  "repeat-track": "Media & Playback",
  "eject-media": "Media & Playback",
  "volume-off": "Media & Playback",
  "volume-low": "Media & Playback",
  "volume-mid": "Media & Playback",
  "volume-high": "Media & Playback",
  "mute-x": "Media & Playback",
  "speaker": "Media & Playback",
  "speaker-box": "Media & Playback",
  "speaker-tower": "Media & Playback",
  "headphones": "Media & Playback",
  "headphones-mic": "Media & Playback",
  "earbuds": "Media & Playback",
  "earbud-single": "Media & Playback",
  "microphone": "Media & Playback",
  "microphone-off": "Media & Playback",
  "microphone-stand": "Media & Playback",
  "microphone-retro": "Media & Playback",
  "podcast-mic": "Media & Playback",
  "podcast-stand": "Media & Playback",
  "equalizer-bars": "Media & Playback",
  "equalizer-sliders": "Media & Playback",
  "audio-wave": "Media & Playback",
  "audio-wave-circle": "Media & Playback",
  "sound-ripple": "Media & Playback",
  "mute-ring": "Media & Playback",
  "music-note": "Media & Playback",
  "music-note-double": "Media & Playback",
  "beamed-notes": "Media & Playback",
  "beamed-notes-tilt": "Media & Playback",
  "music-rest": "Media & Playback",
  "treble-stub": "Media & Playback",
  "bass-dot": "Media & Playback",
  "tempo-mark": "Media & Playback",
  "metronome": "Media & Playback",
  "metronome-tick": "Media & Playback",
  "playlist-note": "Media & Playback",
  "note-circle": "Media & Playback",
  "note-square": "Media & Playback",
  "chord-bars": "Media & Playback",
  "harmony-lines": "Media & Playback",
  "song-ticket": "Media & Playback",
  "camera": "Media & Playback",
  "camera-flash": "Media & Playback",
  "camera-reel": "Media & Playback",
  "photo-frame": "Media & Playback",
  "photo-stack": "Media & Playback",
  "photo-strip": "Media & Playback",
  "film-strip": "Media & Playback",
  "film-frame": "Media & Playback",
  "film-reel": "Media & Playback",
  "clapper": "Media & Playback",
  "clapper-open": "Media & Playback",
  "projector": "Media & Playback",
  "projector-beam": "Media & Playback",
  "projector-reel": "Media & Playback",
  "tv": "Media & Playback",
  "tv-static": "Media & Playback",
  "tv-retro": "Media & Playback",
  "radio": "Media & Playback",
  "radio-tower": "Media & Playback",
  "antenna-dish": "Media & Playback",
  "spotlight-cone": "Media & Playback",
  "spotlight-double": "Media & Playback",
  "stage-curtain": "Media & Playback",
  "curtain-tie": "Media & Playback",
  "drama-mask-happy": "Media & Playback",
  "drama-mask-sad": "Media & Playback",
  "masks-duo": "Media & Playback",
  "ticket-tear-left": "Media & Playback",
  "ticket-tear-right": "Media & Playback",
  "ticket-tear-zigzag": "Media & Playback",
  "ticket-tear-dashed": "Media & Playback",
  "ticket-stub-play": "Media & Playback",
  "marquee-frame": "Media & Playback",
  "marquee-bulbs": "Media & Playback",
  "marquee-arrow": "Media & Playback",
  "neon-star": "Media & Playback",
  "popcorn": "Media & Playback",
  "popcorn-box": "Media & Playback",
  "soda-cup": "Media & Playback",
  "intermission-bell": "Media & Playback",
  "stage-lights": "Media & Playback",
  "footlight-row": "Media & Playback",
  "backdrop-arch": "Media & Playback",
  "velvet-rope": "Media & Playback",
  "show-bell": "Media & Playback",
  "applause-hands": "Media & Playback",
  "encore-star": "Media & Playback",
  "usher-torch": "Media & Playback",
  "balcony-arch": "Media & Playback",
  "stage-door": "Media & Playback",
  "gamepad": "Media & Playback",
  "gamepad-wireless": "Media & Playback",
  "joystick": "Media & Playback",
  "joystick-base": "Media & Playback",
  "dpad-cross": "Media & Playback",
  "dice-one": "Media & Playback",
  "dice-two": "Media & Playback",
  "dice-three": "Media & Playback",
  "dice-four": "Media & Playback",
  "dice-five": "Media & Playback",
  "dice-six": "Media & Playback",
  "puzzle-piece": "Media & Playback",
  "puzzle-duo": "Media & Playback",
  "disco-ball": "Media & Playback",
  "disco-spark": "Media & Playback",
  "arcade-cabinet": "Media & Playback",
  "arcade-joystick": "Media & Playback",
  "chess-knight-stub": "Media & Playback",
  "cards-fan": "Media & Playback",
  "spinner-prize": "Media & Playback",
  "vinyl": "Media & Playback",
  "vinyl-sleeve": "Media & Playback",
  "turntable": "Media & Playback",
  "tonearm": "Media & Playback",
  "cassette": "Media & Playback",
  "cassette-notch": "Media & Playback",
  "reel-tape": "Media & Playback",
  "boombox": "Media & Playback",
  "jukebox-arch": "Media & Playback",
  "amplifier-stack": "Media & Playback",
  "amplifier-knobs": "Media & Playback",
  "mixer-faders": "Media & Playback",
  "mixer-dials": "Media & Playback",
  "tuner-dial": "Media & Playback",
  "speaker-grille": "Media & Playback",
  "earphone-monitor": "Media & Playback",
  "tape-loop": "Media & Playback",
  "record-notch": "Media & Playback",
  "groove-rings": "Media & Playback",
  "needle-drop": "Media & Playback",
  "guitar": "Media & Playback",
  "guitar-electric": "Media & Playback",
  "guitar-pick": "Media & Playback",
  "drum": "Media & Playback",
  "drum-sticks": "Media & Playback",
  "snare-drum": "Media & Playback",
  "piano-keys": "Media & Playback",
  "piano-grand": "Media & Playback",
  "keyboard-synth": "Media & Playback",
  "saxophone": "Media & Playback",
  "trumpet": "Media & Playback",
  "trumpet-bell": "Media & Playback",
  "violin": "Media & Playback",
  "violin-bow": "Media & Playback",
  "cello-arch": "Media & Playback",
  "banjo-round": "Media & Playback",
  "harmonica-rect": "Media & Playback",
  "accordion-fold": "Media & Playback",
  "tambourine-ring": "Media & Playback",
  "maraca-pair": "Media & Playback",
  "xylophone-bars": "Media & Playback",
  "chime-bars": "Media & Playback",
  "flute-line": "Media & Playback",
  "clarinet-reed": "Media & Playback",
  "harp-frame": "Media & Playback",
  "headphones-case": "Media & Playback",
  "stream-live-dot": "Media & Playback",
  "on-air-sign": "Media & Playback",
  "clap-sync": "Media & Playback",
  "slate-mark": "Media & Playback",
  "take-reel": "Media & Playback",
  "scene-curtain-call": "Media & Playback",
  "reel-can": "Media & Playback",
  "film-perforation": "Media & Playback",
  "ticket-perforation": "Media & Playback",
  "stub-notch": "Media & Playback",
  "popcorn-tub-notch": "Media & Playback",
  "karaoke-mic": "Media & Playback",
  "karaoke-screen": "Media & Playback",
  "lyrics-lines": "Media & Playback",
  "subtitle-frame": "Media & Playback",
  "caption-box": "Media & Playback",
  "surround-speakers": "Media & Playback",
  "bass-boost": "Media & Playback",
  "treble-boost": "Media & Playback",
  "volume-fader": "Media & Playback",
  "cue-flag": "Media & Playback",
  "backstage-star": "Media & Playback",
  "afterparty-confetti": "Media & Playback",
  "finale-curtain": "Media & Playback",
  "file": "Files & Office",
  "file-text": "Files & Office",
  "file-plus": "Files & Office",
  "file-minus": "Files & Office",
  "file-check": "Files & Office",
  "file-x": "Files & Office",
  "file-star": "Files & Office",
  "file-heart": "Files & Office",
  "file-lock": "Files & Office",
  "file-search": "Files & Office",
  "file-code": "Files & Office",
  "file-image": "Files & Office",
  "file-music": "Files & Office",
  "file-video": "Files & Office",
  "file-pdf": "Files & Office",
  "file-zip": "Files & Office",
  "file-blank": "Files & Office",
  "file-draft": "Files & Office",
  "file-copy": "Files & Office",
  "file-edit": "Files & Office",
  "folder": "Files & Office",
  "folder-open": "Files & Office",
  "folder-plus": "Files & Office",
  "folder-minus": "Files & Office",
  "folder-check": "Files & Office",
  "folder-x": "Files & Office",
  "folder-star": "Files & Office",
  "folder-lock": "Files & Office",
  "folder-search": "Files & Office",
  "folder-zip": "Files & Office",
  "archive-box": "Files & Office",
  "archive-tray": "Files & Office",
  "document": "Files & Office",
  "document-text": "Files & Office",
  "document-check": "Files & Office",
  "document-plus": "Files & Office",
  "clipboard": "Files & Office",
  "clipboard-check": "Files & Office",
  "clipboard-list": "Files & Office",
  "clipboard-copy": "Files & Office",
  "pencil": "Files & Office",
  "pencil-line": "Files & Office",
  "pencil-ruler": "Files & Office",
  "pen": "Files & Office",
  "pen-nib": "Files & Office",
  "fountain-pen": "Files & Office",
  "eraser": "Files & Office",
  "ruler": "Files & Office",
  "ruler-triangle": "Files & Office",
  "scissors": "Files & Office",
  "scissors-cut": "Files & Office",
  "stapler": "Files & Office",
  "paperclip": "Files & Office",
  "pin": "Files & Office",
  "pin-slant": "Files & Office",
  "bookmark": "Files & Office",
  "bookmark-plus": "Files & Office",
  "bookmark-star": "Files & Office",
  "tag": "Files & Office",
  "tag-plus": "Files & Office",
  "tag-sale": "Files & Office",
  "tags": "Files & Office",
  "calendar": "Files & Office",
  "calendar-plus": "Files & Office",
  "calendar-minus": "Files & Office",
  "calendar-check": "Files & Office",
  "calendar-x": "Files & Office",
  "calendar-day": "Files & Office",
  "calendar-week": "Files & Office",
  "calendar-month": "Files & Office",
  "clock": "Files & Office",
  "clock-plus": "Files & Office",
  "timer": "Files & Office",
  "timer-play": "Files & Office",
  "alarm-clock": "Files & Office",
  "alarm-off": "Files & Office",
  "hourglass": "Files & Office",
  "hourglass-half": "Files & Office",
  "inbox": "Files & Office",
  "inbox-full": "Files & Office",
  "outbox": "Files & Office",
  "outbox-empty": "Files & Office",
  "send-plane": "Files & Office",
  "send-plane-up": "Files & Office",
  "mail": "Files & Office",
  "mail-open": "Files & Office",
  "mail-plus": "Files & Office",
  "mail-check": "Files & Office",
  "mail-x": "Files & Office",
  "mail-star": "Files & Office",
  "mail-forward": "Files & Office",
  "mail-reply": "Files & Office",
  "envelope-seal": "Files & Office",
  "printer": "Files & Office",
  "printer-plus": "Files & Office",
  "scanner": "Files & Office",
  "scanner-flat": "Files & Office",
  "phone-handset": "Files & Office",
  "phone-classic": "Files & Office",
  "mobile-phone": "Files & Office",
  "mobile-plus": "Files & Office",
  "keyboard": "Files & Office",
  "keyboard-wireless": "Files & Office",
  "mouse": "Files & Office",
  "mouse-wireless": "Files & Office",
  "monitor": "Files & Office",
  "monitor-plus": "Files & Office",
  "laptop": "Files & Office",
  "laptop-bag": "Files & Office",
  "tablet": "Files & Office",
  "tablet-pen": "Files & Office",
  "server-rack": "Files & Office",
  "server-stack": "Files & Office",
  "database": "Files & Office",
  "database-plus": "Files & Office",
  "database-search": "Files & Office",
  "cloud": "Files & Office",
  "cloud-up": "Files & Office",
  "cloud-down": "Files & Office",
  "cloud-lock": "Files & Office",
  "lock": "Files & Office",
  "unlock": "Files & Office",
  "key": "Files & Office",
  "key-round": "Files & Office",
  "shield": "Files & Office",
  "shield-check": "Files & Office",
  "shield-lock": "Files & Office",
  "eye": "Files & Office",
  "eye-off": "Files & Office",
  "eye-plus": "Files & Office",
  "search": "Files & Office",
  "search-plus": "Files & Office",
  "search-folder": "Files & Office",
  "gear": "Files & Office",
  "gears": "Files & Office",
  "gear-plus": "Files & Office",
  "wrench": "Files & Office",
  "wrench-plus": "Files & Office",
  "hammer": "Files & Office",
  "screwdriver": "Files & Office",
  "trash": "Files & Office",
  "trash-plus": "Files & Office",
  "edit-line": "Files & Office",
  "copy": "Files & Office",
  "copy-plus": "Files & Office",
  "paste": "Files & Office",
  "paste-clip": "Files & Office",
  "save-floppy": "Files & Office",
  "save-disk": "Files & Office",
  "star": "Files & Office",
  "star-plus": "Files & Office",
  "star-half": "Files & Office",
  "heart": "Files & Office",
  "heart-plus": "Files & Office",
  "flag": "Files & Office",
  "flag-plus": "Files & Office",
  "flag-wave": "Files & Office",
  "bell": "Files & Office",
  "bell-off": "Files & Office",
  "bell-plus": "Files & Office",
  "bell-ring": "Files & Office",
  "megaphone": "Files & Office",
  "megaphone-plus": "Files & Office",
  "briefcase": "Files & Office",
  "briefcase-plus": "Files & Office",
  "briefcase-check": "Files & Office",
  "id-card": "Files & Office",
  "id-badge": "Files & Office",
  "business-card": "Files & Office",
  "coffee-cup": "Files & Office",
  "coffee-mug": "Files & Office",
  "paper-stack": "Files & Office",
  "paper-shred": "Files & Office",
  "sticky-note": "Files & Office",
  "sticky-notes": "Files & Office",
  "note-pen": "Files & Office",
  "desk-lamp": "Files & Office",
  "desk-organizer": "Files & Office",
  "binder": "Files & Office",
  "binder-clip": "Files & Office",
  "tape": "Files & Office",
  "glue": "Files & Office",
  "highlighter": "Files & Office",
  "marker": "Files & Office",
  "calculator": "Files & Office",
  "calculator-plus": "Files & Office",
  "abacus": "Files & Office",
  "whiteboard": "Files & Office",
  "presentation-board": "Files & Office",
  "overhead-projector": "Files & Office",
  "projector-screen": "Files & Office",
  "file-cabinet": "Files & Office",
  "drawer": "Files & Office",
  "shelf": "Files & Office",
  "box-seal": "Files & Office",
  "package-check": "Files & Office",
  "rubber-stamp": "Files & Office",
  "stamp-pad": "Files & Office",
  "ink-bottle": "Files & Office",
  "coffee-beans": "Files & Office",
  "cart": "Commerce & Shopping",
  "cart-round": "Commerce & Shopping",
  "cart-flat": "Commerce & Shopping",
  "cart-plus": "Commerce & Shopping",
  "cart-minus": "Commerce & Shopping",
  "cart-check": "Commerce & Shopping",
  "cart-x": "Commerce & Shopping",
  "cart-full": "Commerce & Shopping",
  "cart-tilt": "Commerce & Shopping",
  "cart-double": "Commerce & Shopping",
  "basket": "Commerce & Shopping",
  "basket-round": "Commerce & Shopping",
  "basket-handle": "Commerce & Shopping",
  "basket-full": "Commerce & Shopping",
  "basket-weave": "Commerce & Shopping",
  "market-basket": "Commerce & Shopping",
  "shopping-bag": "Commerce & Shopping",
  "tote-bag": "Commerce & Shopping",
  "paper-bag": "Commerce & Shopping",
  "bag-tag": "Commerce & Shopping",
  "bag-mini": "Commerce & Shopping",
  "bag-stripe": "Commerce & Shopping",
  "bag-double": "Commerce & Shopping",
  "gift-bag": "Commerce & Shopping",
  "store-awning": "Commerce & Shopping",
  "shop-door": "Commerce & Shopping",
  "market-stall": "Commerce & Shopping",
  "kiosk": "Commerce & Shopping",
  "boutique": "Commerce & Shopping",
  "mall": "Commerce & Shopping",
  "store-sign": "Commerce & Shopping",
  "price-tag": "Commerce & Shopping",
  "tag-double": "Commerce & Shopping",
  "tag-string": "Commerce & Shopping",
  "tag-star": "Commerce & Shopping",
  "tag-percent": "Commerce & Shopping",
  "tag-notch": "Commerce & Shopping",
  "tag-round": "Commerce & Shopping",
  "tag-stack": "Commerce & Shopping",
  "tag-slash": "Commerce & Shopping",
  "tag-heart": "Commerce & Shopping",
  "barcode": "Commerce & Shopping",
  "barcode-wide": "Commerce & Shopping",
  "barcode-thin": "Commerce & Shopping",
  "barcode-scan": "Commerce & Shopping",
  "barcode-box": "Commerce & Shopping",
  "barcode-tag": "Commerce & Shopping",
  "barcode-tall": "Commerce & Shopping",
  "barcode-mini": "Commerce & Shopping",
  "qr-square": "Commerce & Shopping",
  "qr-dots": "Commerce & Shopping",
  "qr-frame": "Commerce & Shopping",
  "qr-scan": "Commerce & Shopping",
  "qr-mini": "Commerce & Shopping",
  "qr-corners": "Commerce & Shopping",
  "coin": "Commerce & Shopping",
  "coin-stack": "Commerce & Shopping",
  "coins": "Commerce & Shopping",
  "coin-pile": "Commerce & Shopping",
  "coin-roll": "Commerce & Shopping",
  "coin-slot": "Commerce & Shopping",
  "coin-double": "Commerce & Shopping",
  "coin-ring": "Commerce & Shopping",
  "coin-spark": "Commerce & Shopping",
  "bill": "Commerce & Shopping",
  "bills": "Commerce & Shopping",
  "bill-stack": "Commerce & Shopping",
  "bill-fold": "Commerce & Shopping",
  "bill-roll": "Commerce & Shopping",
  "bill-band": "Commerce & Shopping",
  "bill-wave": "Commerce & Shopping",
  "bill-coin": "Commerce & Shopping",
  "wallet": "Commerce & Shopping",
  "wallet-open": "Commerce & Shopping",
  "wallet-card": "Commerce & Shopping",
  "wallet-coin": "Commerce & Shopping",
  "wallet-fold": "Commerce & Shopping",
  "wallet-zip": "Commerce & Shopping",
  "wallet-mini": "Commerce & Shopping",
  "wallet-clasp": "Commerce & Shopping",
  "credit-card": "Commerce & Shopping",
  "card-chip": "Commerce & Shopping",
  "card-stripe": "Commerce & Shopping",
  "card-tap": "Commerce & Shopping",
  "card-double": "Commerce & Shopping",
  "card-lock": "Commerce & Shopping",
  "card-scan": "Commerce & Shopping",
  "card-flat": "Commerce & Shopping",
  "card-insert": "Commerce & Shopping",
  "card-mini": "Commerce & Shopping",
  "cash-register": "Commerce & Shopping",
  "register-drawer": "Commerce & Shopping",
  "register-receipt": "Commerce & Shopping",
  "register-keys": "Commerce & Shopping",
  "register-mini": "Commerce & Shopping",
  "register-bell": "Commerce & Shopping",
  "receipt": "Commerce & Shopping",
  "receipt-long": "Commerce & Shopping",
  "receipt-short": "Commerce & Shopping",
  "receipt-check": "Commerce & Shopping",
  "receipt-notch": "Commerce & Shopping",
  "receipt-zigzag": "Commerce & Shopping",
  "receipt-total": "Commerce & Shopping",
  "receipt-return": "Commerce & Shopping",
  "gift-box": "Commerce & Shopping",
  "gift-bow": "Commerce & Shopping",
  "gift-open": "Commerce & Shopping",
  "gift-tag": "Commerce & Shopping",
  "gift-wrap": "Commerce & Shopping",
  "gift-mini": "Commerce & Shopping",
  "gift-tall": "Commerce & Shopping",
  "gift-heart": "Commerce & Shopping",
  "coupon": "Commerce & Shopping",
  "coupon-notch": "Commerce & Shopping",
  "coupon-dashed": "Commerce & Shopping",
  "coupon-percent": "Commerce & Shopping",
  "coupon-cut": "Commerce & Shopping",
  "coupon-double": "Commerce & Shopping",
  "coupon-star": "Commerce & Shopping",
  "coupon-ticket": "Commerce & Shopping",
  "discount-percent": "Commerce & Shopping",
  "discount-tag": "Commerce & Shopping",
  "discount-burst": "Commerce & Shopping",
  "discount-circle": "Commerce & Shopping",
  "discount-slash": "Commerce & Shopping",
  "discount-badge": "Commerce & Shopping",
  "discount-stamp": "Commerce & Shopping",
  "discount-mini": "Commerce & Shopping",
  "sale-burst": "Commerce & Shopping",
  "sale-star": "Commerce & Shopping",
  "sale-seal": "Commerce & Shopping",
  "sale-flash": "Commerce & Shopping",
  "burst-seal": "Commerce & Shopping",
  "burst-mini": "Commerce & Shopping",
  "package": "Commerce & Shopping",
  "package-open": "Commerce & Shopping",
  "package-tape": "Commerce & Shopping",
  "box": "Commerce & Shopping",
  "box-open": "Commerce & Shopping",
  "box-tape": "Commerce & Shopping",
  "box-cube": "Commerce & Shopping",
  "box-stack": "Commerce & Shopping",
  "box-mini": "Commerce & Shopping",
  "parcel": "Commerce & Shopping",
  "parcel-tape": "Commerce & Shopping",
  "crate": "Commerce & Shopping",
  "delivery-truck": "Commerce & Shopping",
  "truck-box": "Commerce & Shopping",
  "truck-fast": "Commerce & Shopping",
  "truck-mini": "Commerce & Shopping",
  "delivery-van": "Commerce & Shopping",
  "van-box": "Commerce & Shopping",
  "delivery-bike": "Commerce & Shopping",
  "bike-box": "Commerce & Shopping",
  "scooter": "Commerce & Shopping",
  "scooter-box": "Commerce & Shopping",
  "warehouse": "Commerce & Shopping",
  "warehouse-door": "Commerce & Shopping",
  "depot": "Commerce & Shopping",
  "silo": "Commerce & Shopping",
  "scale": "Commerce & Shopping",
  "scale-pan": "Commerce & Shopping",
  "scale-dial": "Commerce & Shopping",
  "scale-tray": "Commerce & Shopping",
  "checkout-calculator": "Commerce & Shopping",
  "calc-mini": "Commerce & Shopping",
  "calc-receipt": "Commerce & Shopping",
  "trade-abacus": "Commerce & Shopping",
  "chart-up": "Commerce & Shopping",
  "chart-down": "Commerce & Shopping",
  "chart-bars": "Commerce & Shopping",
  "chart-line": "Commerce & Shopping",
  "chart-pie": "Commerce & Shopping",
  "chart-arrow": "Commerce & Shopping",
  "piggy-bank": "Commerce & Shopping",
  "piggy-mini": "Commerce & Shopping",
  "vault": "Commerce & Shopping",
  "safe": "Commerce & Shopping",
  "handshake": "Commerce & Shopping",
  "hands-coin": "Commerce & Shopping",
  "crown": "Commerce & Shopping",
  "crown-mini": "Commerce & Shopping",
  "gem": "Commerce & Shopping",
  "gem-round": "Commerce & Shopping",
  "diamond": "Commerce & Shopping",
  "perfume": "Commerce & Shopping",
  "watch": "Commerce & Shopping",
  "watch-round": "Commerce & Shopping",
  "glasses": "Commerce & Shopping",
  "ring": "Commerce & Shopping",
  "shirt": "Commerce & Shopping",
  "necklace": "Commerce & Shopping",
  "chair": "Commerce & Shopping",
  "sneaker": "Commerce & Shopping",
  "hat": "Commerce & Shopping",
  "cap": "Commerce & Shopping",
  "takeaway-cup": "Commerce & Shopping",
  "mug": "Commerce & Shopping",
  "lamp": "Commerce & Shopping",
  "sun": "Weather & Nature",
  "sunrise": "Weather & Nature",
  "sunset": "Weather & Nature",
  "sun-haze": "Weather & Nature",
  "sun-cloud": "Weather & Nature",
  "moon-crescent": "Weather & Nature",
  "moon-full": "Weather & Nature",
  "moon-new": "Weather & Nature",
  "moon-half": "Weather & Nature",
  "moon-gibbous": "Weather & Nature",
  "star-single": "Weather & Nature",
  "star-double": "Weather & Nature",
  "star-shooting": "Weather & Nature",
  "star-cluster": "Weather & Nature",
  "constellation": "Weather & Nature",
  "cloud-single": "Weather & Nature",
  "cloud-double": "Weather & Nature",
  "cloud-sun": "Weather & Nature",
  "cloud-moon": "Weather & Nature",
  "cloud-rain": "Weather & Nature",
  "cloud-drizzle": "Weather & Nature",
  "cloud-storm": "Weather & Nature",
  "cloud-snow": "Weather & Nature",
  "cloud-wind": "Weather & Nature",
  "rain-drop": "Weather & Nature",
  "rain-lines": "Weather & Nature",
  "rain-heavy": "Weather & Nature",
  "drizzle": "Weather & Nature",
  "snowflake": "Weather & Nature",
  "snowfall": "Weather & Nature",
  "snow-hill": "Weather & Nature",
  "hail": "Weather & Nature",
  "lightning-bolt": "Weather & Nature",
  "lightning-cloud": "Weather & Nature",
  "thunder": "Weather & Nature",
  "wind-lines": "Weather & Nature",
  "wind-swirl": "Weather & Nature",
  "breeze": "Weather & Nature",
  "thermometer-cold": "Weather & Nature",
  "thermometer-hot": "Weather & Nature",
  "thermometer-mid": "Weather & Nature",
  "umbrella-closed": "Weather & Nature",
  "umbrella-open": "Weather & Nature",
  "umbrella-rain": "Weather & Nature",
  "rainbow-arc": "Weather & Nature",
  "rainbow-cloud": "Weather & Nature",
  "fog": "Weather & Nature",
  "mist": "Weather & Nature",
  "dew": "Weather & Nature",
  "frost": "Weather & Nature",
  "mountain-peak": "Weather & Nature",
  "mountain-range": "Weather & Nature",
  "mountain-snow": "Weather & Nature",
  "hill": "Weather & Nature",
  "valley": "Weather & Nature",
  "volcano": "Weather & Nature",
  "cliff": "Weather & Nature",
  "cave": "Weather & Nature",
  "dune": "Weather & Nature",
  "island": "Weather & Nature",
  "tree-pine": "Weather & Nature",
  "tree-oak": "Weather & Nature",
  "tree-palm": "Weather & Nature",
  "leaf-single": "Weather & Nature",
  "leaf-double": "Weather & Nature",
  "sprout": "Weather & Nature",
  "flower-single": "Weather & Nature",
  "flower-tulip": "Weather & Nature",
  "flower-sunflower": "Weather & Nature",
  "bouquet": "Weather & Nature",
  "cactus-round": "Weather & Nature",
  "cactus-tall": "Weather & Nature",
  "grass": "Weather & Nature",
  "mushroom": "Weather & Nature",
  "rock": "Weather & Nature",
  "waterfall": "Weather & Nature",
  "river": "Weather & Nature",
  "lake": "Weather & Nature",
  "wave": "Weather & Nature",
  "tide": "Weather & Nature",
  "car-side": "Weather & Nature",
  "car-front": "Weather & Nature",
  "bus-side": "Weather & Nature",
  "bus-front": "Weather & Nature",
  "train-front": "Weather & Nature",
  "train-track": "Weather & Nature",
  "tram": "Weather & Nature",
  "plane-takeoff": "Weather & Nature",
  "plane-side": "Weather & Nature",
  "plane-landing": "Weather & Nature",
  "ship-hull": "Weather & Nature",
  "sailboat": "Weather & Nature",
  "anchor": "Weather & Nature",
  "lifebuoy": "Weather & Nature",
  "bicycle": "Weather & Nature",
  "motorcycle": "Weather & Nature",
  "kick-scooter": "Weather & Nature",
  "fuel-pump": "Weather & Nature",
  "fuel-drop": "Weather & Nature",
  "road-straight": "Weather & Nature",
  "road-curve": "Weather & Nature",
  "bridge": "Weather & Nature",
  "tunnel": "Weather & Nature",
  "traffic-cone": "Weather & Nature",
  "traffic-light": "Weather & Nature",
  "parking": "Weather & Nature",
  "map-folded": "Weather & Nature",
  "map-pin-route": "Weather & Nature",
  "compass-rose": "Weather & Nature",
  "compass-needle": "Weather & Nature",
  "globe-meridian": "Weather & Nature",
  "globe-pin": "Weather & Nature",
  "location-pin": "Weather & Nature",
  "location-ring": "Weather & Nature",
  "flag-single": "Weather & Nature",
  "flag-double": "Weather & Nature",
  "flag-pennant": "Weather & Nature",
  "flag-checkered": "Weather & Nature",
  "tent-tri": "Weather & Nature",
  "tent-cabin": "Weather & Nature",
  "campfire": "Weather & Nature",
  "campfire-logs": "Weather & Nature",
  "backpack": "Weather & Nature",
  "backpack-hike": "Weather & Nature",
  "suitcase": "Weather & Nature",
  "suitcase-roller": "Weather & Nature",
  "passport-book": "Weather & Nature",
  "ticket-travel": "Weather & Nature",
  "camera-tripod": "Weather & Nature",
  "binoculars": "Weather & Nature",
  "lantern": "Weather & Nature",
  "sleeping-bag": "Weather & Nature",
  "hammock": "Weather & Nature",
  "oar": "Weather & Nature",
  "paddle": "Weather & Nature",
  "kayak": "Weather & Nature",
  "surfboard": "Weather & Nature",
  "skateboard": "Weather & Nature",
  "helmet": "Weather & Nature",
  "boot-hike": "Weather & Nature",
  "sunglasses": "Weather & Nature",
  "hat-sun": "Weather & Nature",
  "bottle-water": "Weather & Nature",
  "canteen": "Weather & Nature",
  "first-aid": "Weather & Nature",
  "rope-coil": "Weather & Nature",
  "carabiner": "Weather & Nature",
  "flashlight": "Weather & Nature",
  "knife-pocket": "Weather & Nature",
  "whistle": "Weather & Nature",
  "stopwatch": "Weather & Nature",
  "trophy-cup": "Weather & Nature",
  "medal-round": "Weather & Nature",
  "medal-ribbon": "Weather & Nature",
  "podium": "Weather & Nature",
  "dumbbell": "Weather & Nature",
  "kettlebell": "Weather & Nature",
  "ball-soccer": "Weather & Nature",
  "ball-basket": "Weather & Nature",
  "ball-tennis": "Weather & Nature",
  "racket-tennis": "Weather & Nature",
  "swim-lanes": "Weather & Nature",
  "bike-road": "Weather & Nature",
  "run-sprint": "Weather & Nature",
  "yoga-pose": "Weather & Nature",
  "check-mark": "Weather & Nature",
  "check-circle": "Weather & Nature",
  "cross-mark": "Weather & Nature",
  "cross-circle": "Weather & Nature",
  "info-mark": "Weather & Nature",
  "info-circle": "Weather & Nature",
  "warning-triangle": "Weather & Nature",
  "help-mark": "Weather & Nature",
  "help-circle": "Weather & Nature",
  "plus-mark": "Weather & Nature",
  "plus-circle": "Weather & Nature",
  "minus-mark": "Weather & Nature",
  "minus-circle": "Weather & Nature",
  "asterisk": "Weather & Nature",
  "hash-mark": "Weather & Nature",
  "at-sign": "Weather & Nature",
  "percent-mark": "Weather & Nature",
  "plug-power": "Weather & Nature",
  "bulb-glow": "Weather & Nature",
  "battery-empty": "Weather & Nature",
  "battery-half": "Weather & Nature",
  "battery-full": "Weather & Nature",
  "wifi-arcs": "Weather & Nature",
  "wifi-off": "Weather & Nature",
  "bluetooth-mark": "Weather & Nature",
  "airplane-mode": "Weather & Nature",
  "moon-night": "Weather & Nature",
  "signal-bars": "Weather & Nature",
  "satellite-dish": "Weather & Nature",
  "broadcast-tower": "Weather & Nature",
  "lighthouse": "Weather & Nature",
  "hot-air-balloon": "Weather & Nature",
  "paraglider": "Weather & Nature",
  "cable-car": "Weather & Nature",
  "observation-wheel": "Weather & Nature",
};

export const NAV_CATEGORIES: { name: string; count: number }[] = [
  { name: "Essentials", count: 100 },
  { name: "Arrows & Direction", count: 200 },
  { name: "Media & Playback", count: 200 },
  { name: "Files & Office", count: 200 },
  { name: "Commerce & Shopping", count: 199 },
  { name: "Weather & Nature", count: 200 },
];
