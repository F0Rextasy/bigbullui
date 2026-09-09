import * as React from "react";

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

export const ICON_PATHS: Record<NavIconName, React.ReactNode> = {
  "home": (
    <path d="M4 11.5 12 4l8 7.5M6.5 10v9.5h11V10" />
  ),
  "components": (
    <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9ZM4 7.5l8 4.5 8-4.5M12 12v9" />
  ),
  "blocks": (
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  ),
  "showcase": (
    <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />
  ),
  "install": (
    <path d="M13 2 5.5 13.5H11L10 22l7.5-11.5H12L13 2Z" />
  ),
  "design": (
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5c0-2-1.5-3-3-3h-2.6a2.4 2.4 0 0 1-2.4-2.4V4.5c0-.6-.5-1-.5-1ZM7 12h.01M10 9.5h.01M14.5 9.5h.01M9 16.5h.01" />
  ),
  "agents": (
    <path d="M5 4h14v11H9l-4 4V4ZM9 9h.01M12.5 9h.01M16 9h.01M8.5 13.5h7" />
  ),
  "contribute": (
    <path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10ZM7 10h.01" />
  ),
  "dashboard": (
    <path d="M4 4h9v9H4zM15 4h5v5h-5zM15 11h5v9h-5zM4 15h9v5H4z" />
  ),
  "app": (
    <path d="M7 2.5h10v19H7zM10.5 18.5h3" />
  ),
  "auth": (
    <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v10H5zM12 14v2.5" />
  ),
  "system": (
    <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
  ),
  "marketing": (
    <path d="M4 20V10M10 20V4M16 20v-9M21 20H3" />
  ),
  "content": (
    <path d="M6 2.5h9L20 7.5V21.5H6zM14.5 2.5v5.5H20M9 12h7M9 15.5h7" />
  ),
  "operations": (
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.8 1.8 0 1 0 0-.01M17.5 19a1.8 1.8 0 1 0 0-.01" />
  ),
  "storefront": (
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16v2.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0M6.5 14.5V21M17.5 14.5V21" />
  ),
  "service": (
    <path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 3v4h-4M6 21v-4h4" />
  ),
  "pages": (
    <path d="M8 3.5h11v17H8zM4 7.5h4M4 12h3M4 16.5h4" />
  ),
  "theme": (
    <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11ZM9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  ),
  "ticket": (
    <>
      <path d="M4 7.5h16v9H4zM4 7.5a2.5 2.5 0 0 0 0 9M20 7.5a2.5 2.5 0 0 1 0 9" />
      <path d="M14.5 7.5v9" strokeDasharray="2 2" />
      <circle cx="9" cy="12" r="1.4" />
    </>
  ),
  "stub": (
    <>
      <path d="M6 3.5h12v17H6zM6 3.5 4.5 6l1.5 2.5L4.5 11l1.5 2.5L4.5 16l1.5 2.5L6 20.5" />
      <path d="M9.5 8h5M9.5 12h5" strokeDasharray="2 1.6" />
    </>
  ),
  "perforation": (
    <>
      <path d="M3 12h2M7 12h1.6M10.6 12h1.6M14.2 12h1.6M17.8 12h1.6M21 12h0.01" strokeDasharray="0.1 2.4" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M3 5.5h18M3 18.5h18" strokeWidth="1.2" opacity="0.55" />
    </>
  ),
  "stamp": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5.2" strokeDasharray="2.4 1.8" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  "gate": (
    <>
      <path d="M4 21V11a8 8 0 0 1 16 0v10M4 21h16" />
      <path d="M12 11v10" />
      <circle cx="12" cy="8" r="1.6" />
    </>
  ),
  "settings": (
    <>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "user": (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  "users": (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 8.5a3 3 0 1 0-2-5.2M17.5 14.7c2 .7 4 2.2 4 4.3" />
    </>
  ),
  "sparkles": (
    <>
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <path d="M12 9.5 14 12l-2 2.5L10 12l2-2.5Z" />
    </>
  ),
  "plus": (
    <path d="M12 5v14M5 12h14" />
  ),
  "check": (
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  ),
  "x": (
    <path d="M6 6l12 12M18 6 6 18" />
  ),
  "menu": (
    <path d="M4 7h16M4 12h16M4 17h16" />
  ),
  "lock-open": (
    <>
      <path d="M6 11V8a6 6 0 0 1 11.5-2.5" />
      <path d="M5 11h14v9.5H5zM12 15v2.5" />
    </>
  ),
  "star-outline": (
    <path d="M12 3.5 14.7 9l6.3.7-4.7 4.2 1.3 6.1L12 16.8 6.4 20l1.3-6.1L3 9.7 9.3 9 12 3.5Z" />
  ),
  "edit": (
    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1ZM14.5 6.5l3 3" />
  ),
  "download": (
    <path d="M12 4v11M7 11l5 5 5-5M4 20h16" />
  ),
  "upload": (
    <path d="M12 15V4M7 8l5-5 5 5M4 20h16" />
  ),
  "share": (
    <>
      <circle cx="7" cy="12" r="2.5" />
      <circle cx="16" cy="6" r="2.5" />
      <circle cx="16" cy="18" r="2.5" />
      <path d="M9.2 10.8 13.8 7.2M9.2 13.2l4.6 3.6" />
    </>
  ),
  "link": (
    <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1.5 1.5M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1.5-1.5" />
  ),
  "external": (
    <path d="M14 3.5h6.5V10M20.5 3.5 11 13M9 5H6.5A2.5 2.5 0 0 0 4 7.5V18.5A2.5 2.5 0 0 0 6.5 21H17.5A2.5 2.5 0 0 0 20 18.5V16" />
  ),
  "check-double": (
    <path d="M2.5 13 7.5 18 13.5 10M11.5 15.5 13 17 20.5 8" />
  ),
  "info": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 7.5h.01" />
    </>
  ),
  "alert-triangle": (
    <path d="M12 4 2.5 20h19L12 4ZM12 10v4.5M12 17.5h.01" />
  ),
  "help": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 9.5A2.5 2.5 0 0 1 12 8c1.4 0 2.5 1 2.5 2.2 0 1.7-2.2 2-2.5 3.3M12 17h.01" />
    </>
  ),
  "filter": (
    <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />
  ),
  "sort": (
    <path d="M8 5v14M8 19l-3.5-3.5M8 19l3.5-3.5M16 19V5M16 5l-3.5 3.5M16 5l3.5 3.5" />
  ),
  "grid": (
    <path d="M6.5 6.5h.01M12 6.5h.01M17.5 6.5h.01M6.5 12h.01M12 12h.01M17.5 12h.01M6.5 17.5h.01M12 17.5h.01M17.5 17.5h.01" />
  ),
  "list": (
    <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
  ),
  "more": (
    <path d="M5.5 12h.01M12 12h.01M18.5 12h.01" />
  ),
  "undo": (
    <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
  ),
  "redo": (
    <path d="M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
  ),
  "maximize": (
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  ),
  "minimize": (
    <path d="M4 14h6v6M20 10h-6V4M14 10l7 7M10 14l-7 7" />
  ),
  "history": (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  "refresh": (
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8M21 3v5h-5" />
  ),
  "arrow-up": <path d="M12 20V6M6.5 11.5 12 6l5.5 5.5" />,
  "arrow-down": <path d="M12 4v14M6.5 12.5 12 18l5.5-5.5" />,
  "arrow-left": <path d="M20 12H6M11.5 6.5 6 12l5.5 5.5" />,
  "arrow-right": <path d="M4 12h14M12.5 6.5 18 12l-5.5 5.5" />,
  "arrow-up-right": <path d="M6 18 18 6M9 6h9v9" />,
  "arrow-up-left": <path d="M18 18 6 6M15 6H6v9" />,
  "arrow-down-right": <path d="M6 6l12 12M9 18h9v-9" />,
  "arrow-down-left": <path d="M18 6 6 18M6 9v9h9" />,
  "arrow-up-double": <path d="M12 20v-9M12 13V4M7.5 9.5 12 5l4.5 4.5M7.5 16.5 12 12l4.5 4.5" />,
  "arrow-down-double": <path d="M12 4v9M12 11v9M7.5 7.5 12 12l4.5-4.5M7.5 14.5 12 19l4.5-4.5" />,
  "arrow-left-double": <path d="M20 12h-9M13 12H4M9.5 7.5 5 12l4.5 4.5M16.5 7.5 12 12l4.5 4.5" />,
  "arrow-right-double": <path d="M4 12h9M11 12h9M14.5 7.5 19 12l-4.5 4.5M7.5 7.5 12 12l-4.5 4.5" />,
  "arrow-up-long": <path d="M12 21V4M6.5 9.5 12 4l5.5 5.5" />,
  "arrow-down-long": <path d="M12 3v17M6.5 14.5 12 20l5.5-5.5" />,
  "arrow-left-long": <path d="M21 12H3M8.5 6.5 3 12l5.5 5.5" />,
  "arrow-right-long": <path d="M3 12h18M15.5 6.5 21 12l-5.5 5.5" />,
  "arrow-up-short": <path d="M12 19v-8M8 14.5l4-4 4 4" />,
  "arrow-down-short": <path d="M12 5v8M8 9.5l4 4 4-4" />,
  "arrow-left-short": <path d="M19 12h-8M14.5 8 10.5 12l4 4" />,
  "arrow-right-short": <path d="M5 12h8M9.5 8l4 4-4 4" />,
  "arrow-up-thin": <path d="M12 20.5V5M7.5 10.5 12 5.5 16.5 10.5" />,
  "arrow-down-thin": <path d="M12 3.5v15.5M7.5 13.5 12 18.5l4.5-5" />,
  "arrow-left-thin": <path d="M20.5 12h-15.5M10.5 7.5 5.5 12l5 4.5" />,
  "arrow-right-thin": <path d="M3.5 12h15.5M13.5 7.5 18.5 12l-5 4.5" />,
  "arrow-up-curved": <path d="M7 20c0-6 2.5-9.5 8-11M11.5 6.5 15.5 9l-3 3.5" />,
  "arrow-down-curved": <path d="M7 4c0 6 2.5 9.5 8 11M11.5 12.5l4 2.5-3 3.5" />,
  "arrow-left-curved": <path d="M20 7c-6 0-9.5 2.5-11 8M6.5 11.5 9 15.5l3.5-3" />,
  "arrow-right-curved": <path d="M4 7c6 0 9.5 2.5 11 8M17.5 11.5 15 15.5l-3.5-3" />,
  "arrow-bent-up-right": <path d="M4 20v-7c0-3 2-5 5-5h9M13.5 4.5 18.5 8l-5 3.5" />,
  "arrow-bent-down-right": <path d="M4 4v7c0 3 2 5 5 5h9M13.5 12.5l5 3.5-5 3.5" />,
  "arrow-bent-up-left": <path d="M20 20v-7c0-3-2-5-5-5H6M10.5 4.5 5.5 8l5 3.5" />,
  "arrow-bent-down-left": <path d="M20 4v7c0 3-2 5-5 5H6M10.5 12.5 5.5 16l5 3.5" />,
  "arrow-u-turn-up": <path d="M7 20v-8a5 5 0 0 1 10 0v2M12.5 10.5 17 14l-4.5 3.5" />,
  "arrow-u-turn-down": <path d="M7 4v8a5 5 0 0 0 10 0v-2M12.5 13.5 17 10l-4.5-3.5" />,
  "arrow-u-turn-left": <path d="M20 7H12a5 5 0 0 0 0 10h2M10.5 12.5 14 17l3.5-4.5" />,
  "arrow-u-turn-right": <path d="M4 7h8a5 5 0 0 1 0 10h-2M13.5 12.5 10 17l-3.5-4.5" />,
  "arrow-shuffle": <path d="M4 7h3l9 10h4M4 17h3l2.5-2.8M13.5 9.8 16 7h4M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5" />,
  "arrow-shuffle-horizontal": <path d="M3 8h4l5 8h9M3 16h4l2-3.2M14.5 12.8 16 16h5M18.5 13.5 21 16l-2.5 2.5" />,
  "arrow-swap-horizontal": <path d="M4 8.5h13M14.5 5.5 17.5 8.5l-3 3M4 15.5h13M14.5 12.5l3 3-3 3" />,
  "arrow-swap-vertical": <path d="M8.5 4v13M5.5 14.5l3 3 3-3M15.5 20V7M12.5 9.5l3-3 3 3" />,
  "arrow-expand": <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />,
  "arrow-expand-diagonal": <path d="M10 4H4v6M14 20h6v-6M4 4l7 7M20 20l-7-7" />,
  "arrow-shrink": <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  "arrow-shrink-diagonal": <path d="M4 10V4h6M20 14v6h-6M4 4l6 6M20 20l-6-6" />,
  "arrow-maximize": (<><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M9.5 4v3h-3M14.5 4v3h3M9.5 20v-3h-3M14.5 20v-3h3" /></>),
  "arrow-minimize": (<><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M9.5 7V4M6.5 7h3M14.5 7V4M17.5 7h-3M9.5 17v3M6.5 17h3M14.5 17v3M17.5 17h-3" /></>),
  "arrow-fullscreen": <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />,
  "arrow-fullscreen-exit": <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" />,
  "arrow-move": <path d="M12 3v18M3 12h18M12 3 9.5 5.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5" />,
  "arrow-move-diagonal": <path d="M6 6l12 12M18 6 6 18M6 6H9M6 6v3M18 18h-3M18 18v-3M18 6h-3M18 6v3M6 18h3M6 18v-3" />,
  "arrow-drag": (<><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></>),
  "arrow-drag-horizontal": <path d="M3 12h18M5.5 9.5 3 12l2.5 2.5M18.5 9.5 21 12l-2.5 2.5M9 9v6M12 9v6M15 9v6" />,
  "arrow-drag-vertical": <path d="M12 3v18M9.5 5.5 12 3l2.5 2.5M9.5 18.5 12 21l2.5-2.5M9 9h6M9 12h6M9 15h6" />,
  "arrow-upload": <path d="M12 16V5M7 10l5-5 5 5M4 20h16" />,
  "arrow-upload-long": <path d="M12 19V3M6.5 8.5 12 3l5.5 5.5M4 21h16" />,
  "arrow-download": <path d="M12 4v11M7 10l5 5 5-5M4 20h16" />,
  "arrow-download-long": <path d="M12 3v16M6.5 12.5 12 18l5.5-5.5M4 21h16" />,
  "arrow-share-right": <path d="M4 12h9M11 7.5 15.5 12 11 16.5M17 5v14" />,
  "arrow-share-up": <path d="M12 20V8M7.5 11.5 12 7l4.5 4.5M5 3.5h14" />,
  "arrow-reply": <path d="M10 7 4.5 12 10 17M4.5 12H15a4 4 0 0 1 0 8h-3" />,
  "arrow-reply-all": <path d="M8 7 3.5 12 8 17M12.5 7 8 12l4.5 5M8 12h7a4 4 0 0 1 0 8h-2" />,
  "arrow-forward": <path d="M14 7l5.5 5L14 17M19.5 12H9a4 4 0 0 0 0 8h3" />,
  "arrow-undo": <path d="M8 6 4 10l4 4M4 10h9a6 6 0 0 1 0 12h-2" />,
  "arrow-undo-sharp": <path d="M9 5 4 10l5 5M4 10h10a5 5 0 0 1 0 10h-4" />,
  "arrow-redo": <path d="M16 6l4 4-4 4M20 10h-9a6 6 0 0 0 0 12h2" />,
  "arrow-redo-sharp": <path d="M15 5l5 5-5 5M20 10H10a5 5 0 0 0 0 10h4" />,
  "arrow-refresh": <path d="M20 12a8 8 0 0 1-14 5M4 12a8 8 0 0 1 14-5M18 3v4h-4M6 21v-4h4" />,
  "arrow-refresh-reverse": <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M18 3v4h-4M6 21v-4h4" />,
  "arrow-rotate-clockwise": <path d="M20 12a8 8 0 1 1-2.5-5.8M20 3v4h-4" />,
  "arrow-rotate-counterclockwise": <path d="M4 12a8 8 0 1 0 2.5 5.8M4 21v-4h4" />,
  "arrow-flip-horizontal": (<><path d="M12 3v18" strokeDasharray="2 2" /><path d="M8 7 4 12l4 5M16 7l4 5-4 5" /></>),
  "arrow-flip-vertical": (<><path d="M3 12h18" strokeDasharray="2 2" /><path d="M7 8l5-4 5 4M7 16l5 4 5-4" /></>),
  "arrow-sort-up": <path d="M12 20V6M7.5 10.5 12 6l4.5 4.5M5 3.5h14" />,
  "arrow-sort-down": <path d="M12 4v14M7.5 13.5 12 18l4.5-4.5M5 20.5h14" />,
  "arrow-sort-double": <path d="M9 4v16M6 7l3-3 3 3M15 20v-16M12 17l3 3 3-3" />,
  "arrow-filter-up": <path d="M4 5h16M7 10h10M10 15h4M12 15v5M10 18.5l2 2 2-2" />,
  "arrow-filter-down": <path d="M4 5h16M7 10h10M10 15h4M12 19V9M10 11.5l2-2 2 2" />,
  "chevron-up": <path d="M6 14.5 12 8.5l6 6" />,
  "chevron-down": <path d="M6 9.5l6 6 6-6" />,
  "chevron-left": <path d="M14.5 6 8.5 12l6 6" />,
  "chevron-right": <path d="M9.5 6l6 6-6 6" />,
  "chevron-up-double": <path d="M6 15.5 12 10l6 5.5M6 10.5 12 5l6 5.5" />,
  "chevron-down-double": <path d="M6 8.5l6 5.5 6-5.5M6 13.5l6 5.5 6-5.5" />,
  "chevron-left-double": <path d="M15.5 6 10 12l5.5 6M10.5 6 5 12l5.5 6" />,
  "chevron-right-double": <path d="M8.5 6 14 12l-5.5 6M13.5 6 19 12l-5.5 6" />,
  "chevron-up-thin": <path d="M5.5 14.5 12 8l6.5 6.5" />,
  "chevron-down-thin": <path d="M5.5 9.5 12 16l6.5-6.5" />,
  "chevron-left-thin": <path d="M14.5 5.5 8 12l6.5 6.5" />,
  "chevron-right-thin": <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  "chevron-up-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 13.5 12 10l3.5 3.5" /></>),
  "chevron-down-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 10.5 12 14l3.5-3.5" /></>),
  "chevron-left-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M13.5 8.5 10 12l3.5 3.5" /></>),
  "chevron-right-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M10.5 8.5 14 12l-3.5 3.5" /></>),
  "caret-up": <path d="M6 15l6-7 6 7M6 19l6-2 6 2" />,
  "caret-down": <path d="M6 9l6 7 6-7M6 5l6 2 6-2" />,
  "caret-left": <path d="M15 6l-7 6 7 6M19 6l-2 6 2 6" />,
  "caret-right": <path d="M9 6l7 6-7 6M5 6l2 6-2 6" />,
  "caret-up-double": <path d="M6 13l6-6 6 6M6 19l6-6 6 6" />,
  "caret-down-double": <path d="M6 5l6 6 6-6M6 11l6 6 6-6" />,
  "caret-left-double": <path d="M13 6l-6 6 6 6M19 6l-6 6 6 6" />,
  "caret-right-double": <path d="M5 6l6 6-6 6M11 6l6 6-6 6" />,
  "play-next": <path d="M6 5.5v13l8-6.5M17 5.5v13" />,
  "play-previous": <path d="M18 5.5v13l-8-6.5M7 5.5v13" />,
  "play-skip-forward": <path d="M5 5.5v13l7-6.5M15 5.5v13M19 5.5v13" />,
  "play-skip-back": <path d="M19 5.5v13l-7-6.5M9 5.5v13M5 5.5v13" />,
  "play-fast-forward": <path d="M4 5.5v13l7-6.5M12 5.5v13l7-6.5" />,
  "play-rewind": <path d="M20 5.5v13l-7-6.5M12 5.5v13l-7-6.5" />,
  "play-triangle-right": <path d="M8 5.5v13l9-6.5M4 5.5h2M18 5.5h2" />,
  "play-triangle-left": <path d="M16 5.5v13l-9-6.5M20 5.5h-2M6 5.5H4" />,
  "arrow-log-in": <path d="M14 4h-8v16h8M10 12h11M17.5 8.5 21 12l-3.5 3.5" />,
  "arrow-log-out": <path d="M10 4H4v16h6M14 12h7M17.5 8.5 21 12l-3.5 3.5" />,
  "arrow-enter-right": <path d="M4 12h12M12.5 7.5 17 12l-4.5 4.5M18 4h3v16h-3" />,
  "arrow-exit-right": <path d="M8 12h12M16.5 7.5 21 12l-4.5 4.5M3 4h3v16H3" />,
  "arrow-external-link": <path d="M10 5H5v14h14v-5M14 4h6v6M20 4l-9 9" />,
  "arrow-external-up-right": <path d="M9 5H5v14h4M15 19h4V9M19 5h-5M19 5v5M19 5l-8 8" />,
  "arrow-corner-up-right": <path d="M5 19V9h10M9.5 5.5 13 9l-3.5 3.5M17 4h3v16" />,
  "arrow-corner-down-right": <path d="M5 5v10h10M9.5 11.5 13 15l-3.5 3.5M17 4h3v16" />,
  "arrow-corner-up-left": <path d="M19 19V9H9M14.5 5.5 11 9l3.5 3.5M4 4h3v16" />,
  "arrow-corner-down-left": <path d="M19 5v10H9M14.5 11.5 11 15l3.5 3.5M4 4h3v16" />,
  "compass-north": <path d="M12 20V8M7.5 11.5 12 7l4.5 4.5M12 3.5h0.01" />,
  "compass-south": <path d="M12 4v12M7.5 12.5 12 17l4.5-4.5M12 20.5h0.01" />,
  "compass-east": <path d="M4 12h12M12.5 7.5 17 12l-4.5 4.5M20.5 12h0.01" />,
  "compass-west": <path d="M20 12H8M11.5 7.5 7 12l4.5 4.5M3.5 12h0.01" />,
  "compass-northeast": <path d="M6.5 17.5 14 10M10 10h5v5M19 5h0.01" />,
  "compass-northwest": <path d="M17.5 17.5 10 10M14 10H9v5M5 5h0.01" />,
  "compass-southeast": <path d="M6.5 6.5 14 14M10 14h5v-5M19 19h0.01" />,
  "compass-southwest": <path d="M17.5 6.5 10 14M14 14H9v-5M5 19h0.01" />,
  "nav-back": <path d="M15 5l-7 7 7 7" />,
  "nav-forward": <path d="M9 5l7 7-7 7" />,
  "nav-back-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M14 8.5 10.5 12 14 15.5" /></>),
  "nav-forward-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M10 8.5 13.5 12 10 15.5" /></>),
  "nav-up-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14 12 10.5 15.5 14" /></>),
  "nav-down-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 10 12 13.5 15.5 10" /></>),
  "arrow-back-step": <path d="M13 5l-6 7 6 7M19 5l-6 7 6 7" />,
  "arrow-forward-step": <path d="M11 5l6 7-6 7M5 5l6 7-6 7" />,
  "arrow-turn-left": <path d="M14 4 7 11l7 7M7 11h9a4 4 0 0 1 0 8h-1" />,
  "arrow-turn-right": <path d="M10 4l7 7-7 7M17 11H8a4 4 0 0 0 0 8h1" />,
  "arrow-loop": <path d="M17 8H7a4 4 0 0 0 0 8h10M15 13.5 18 16.5l-3 3" />,
  "arrow-loop-reverse": <path d="M7 8h10a4 4 0 0 1 0 8H7M9 13.5 6 16.5l3 3" />,
  "arrow-infinity": <path d="M6 16c-1.7 0-3-1.3-3-3s1.3-3 3-3c2.5 0 3.5 6 6 6 1.7 0 3-1.3 3-3s-1.3-3-3-3c-2.5 0-3.5 6-6 6" />,
  "arrow-sync-up": <path d="M7 17a6 6 0 0 1 10-4.5M17 7a6 6 0 0 1-10 4.5M17 3v4.5h-4.5M7 21v-4.5h4.5" />,
  "arrow-sync-down": <path d="M17 17a6 6 0 0 1-10-4.5M7 7a6 6 0 0 1 10 4.5M7 3v4.5h4.5M17 21v-4.5h-4.5" />,
  "arrow-split-up": <path d="M12 20v-8M12 12 6 6M12 12l6-6M4.5 4.5 6 6 4.5 7.5M19.5 4.5 18 6l1.5 1.5" />,
  "arrow-split-down": <path d="M12 4v8M12 12l-6 6M12 12l6 6M4.5 16.5 6 18l-1.5 1.5M19.5 16.5 18 18l1.5 1.5" />,
  "arrow-merge-up": <path d="M12 20v-6M6 18l6-6 6 6M6 6l2-2M18 6l-2-2" />,
  "arrow-merge-down": <path d="M12 4v6M6 6l6 6 6-6M6 18l2 2M18 18l-2 2" />,
  "arrow-branch-right": <path d="M5 5v8a4 4 0 0 0 4 4h10M15.5 13.5 19 17l-3.5 3.5" />,
  "arrow-branch-left": <path d="M19 5v8a4 4 0 0 1-4 4H5M8.5 13.5 5 17l3.5 3.5" />,
  "arrow-cross-up": <path d="M12 20V6M7 11l5-5 5 5M5 3.5h14" />,
  "arrow-cross-down": <path d="M12 4v14M7 13l5 5 5-5M5 20.5h14" />,
  "arrow-notch-up": <path d="M12 20v-6M5 13l7-6 7 6M9 8.5 12 5.5l3 3" />,
  "arrow-notch-down": <path d="M12 4v6M5 11l7 6 7-6M9 15.5l3 3 3-3" />,
  "arrow-dashed-up": (<><path d="M12 20v-3M12 14.5v-2.5M12 9.5V7" strokeDasharray="0.1 2.2" strokeWidth="2.4" strokeLinecap="round" /><path d="M7.5 10.5 12 6l4.5 4.5" /></>),
  "arrow-dashed-down": (<><path d="M12 4v3M12 9.5v2.5M12 14.5V17" strokeDasharray="0.1 2.2" strokeWidth="2.4" strokeLinecap="round" /><path d="M7.5 13.5 12 18l4.5-4.5" /></>),
  "arrow-dashed-left": (<><path d="M20 12h-3M14.5 12H12M9.5 12H7" strokeDasharray="0.1 2.2" strokeWidth="2.4" strokeLinecap="round" /><path d="M10.5 7.5 6 12l4.5 4.5" /></>),
  "arrow-dashed-right": (<><path d="M4 12h3M9.5 12H12M14.5 12h2.5" strokeDasharray="0.1 2.2" strokeWidth="2.4" strokeLinecap="round" /><path d="M13.5 7.5 18 12l-4.5 4.5" /></>),
  "arrow-dotted-up": (<><path d="M12 20v-9" strokeDasharray="1 2.4" /><path d="M7.5 10.5 12 6l4.5 4.5" /></>),
  "arrow-dotted-down": (<><path d="M12 4v9" strokeDasharray="1 2.4" /><path d="M7.5 13.5 12 18l4.5-4.5" /></>),
  "arrow-tail-notch-up": <path d="M12 20v-5M12 15V5M7.5 9.5 12 5l4.5 4.5M9 20l3-2 3 2" />,
  "arrow-tail-notch-down": <path d="M12 4v5M12 9v10M7.5 14.5 12 19l4.5-4.5M9 4l3 2 3-2" />,
  "arrow-bar-up": <path d="M12 19V7M7.5 11.5 12 7l4.5 4.5M5 4h14" />,
  "arrow-bar-down": <path d="M12 5v12M7.5 12.5 12 17l4.5-4.5M5 20h14" />,
  "arrow-bar-left": <path d="M19 12H7M11.5 7.5 7 12l4.5 4.5M4 5v14" />,
  "arrow-bar-right": <path d="M5 12h12M12.5 7.5 17 12l-4.5 4.5M20 5v14" />,
  "arrow-target-up": (<><circle cx="12" cy="14" r="5" /><path d="M12 9V4M9.5 6.5 12 4l2.5 2.5" /></>),
  "arrow-target-down": (<><circle cx="12" cy="10" r="5" /><path d="M12 15v5M9.5 17.5 12 20l2.5-2.5" /></>),
  "arrow-circle-up": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 16.5v-9M8.5 11 12 7.5 15.5 11" /></>),
  "arrow-circle-down": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v9M8.5 13 12 16.5 15.5 13" /></>),
  "arrow-circle-left": (<><circle cx="12" cy="12" r="8.5" /><path d="M16.5 12h-9M11 8.5 7.5 12 11 15.5" /></>),
  "arrow-circle-right": (<><circle cx="12" cy="12" r="8.5" /><path d="M7.5 12h9M13 8.5 16.5 12 13 15.5" /></>),
  "arrow-square-up": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 16v-7M8.5 11.5 12 8l3.5 3.5" /></>),
  "arrow-square-down": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v7M8.5 12.5 12 16l3.5-3.5" /></>),
  "arrow-square-left": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M16 12H9M12.5 8.5 9 12l3.5 3.5" /></>),
  "arrow-square-right": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 12h7M11.5 8.5 15 12l-3.5 3.5" /></>),
  "arrow-elbow-up-right": <path d="M5 19v-9a4 4 0 0 1 4-4h8M13.5 3.5 17 6.5l-3.5 3" />,
  "arrow-elbow-down-right": <path d="M5 5v9a4 4 0 0 0 4 4h8M13.5 14.5 17 17.5l-3.5 3" />,
  "arrow-zigzag-right": <path d="M4 6h6l-4 6h6l-4 6H4M14 6h2M14 18h6M18 6v3M18 15v3" />,
  "arrow-zigzag-left": <path d="M20 6h-6l4 6h-6l4 6h4M10 6H8M10 18H4M6 6v3M6 15v3" />,
  "arrow-wave-right": <path d="M3 12c2.5 0 2.5-4 5-4s2.5 8 5 8 2.5-4 5-4h3M18 9.5l3 2.5-3 2.5" />,
  "arrow-wave-up": <path d="M12 21c0-2.5 4-2.5 4-5s-8-2.5-8-5 4-2.5 4-5M9.5 6 12 3l2.5 3" />,
  "arrow-step-up-right": <path d="M4 20v-5h5M9 15v-5h5M14 10V5h6M14 5l1.5 1.5M20 5l-1.5 1.5" />,
  "arrow-step-down-right": <path d="M4 4v5h5M9 9v5h5M14 14v5h6M14 19l1.5-1.5M20 19l-1.5-1.5" />,
  "arrow-hop-up": <path d="M5 16c3-1 4-6 7-6s4 5 7 4M15 7.5 19 10l-1 4" />,
  "arrow-hop-down": <path d="M5 8c3 1 4 6 7 6s4-5 7-4M15 16.5 19 14l-1-4" />,
  "arrow-pin-up": <path d="M12 21v-8M8.5 9.5 12 6l3.5 3.5M9 6h6" />,
  "arrow-pin-down": <path d="M12 3v8M8.5 14.5 12 18l3.5-3.5M9 18h6" />,
  "arrow-anchor-left": <path d="M20 12H6M4 12V6M4 12v6M4 6l-1.5 0M4 18l-1.5 0M10.5 7.5 6 12l4.5 4.5" />,
  "arrow-anchor-right": <path d="M4 12h14M20 12V6M20 12v6M20 6l1.5 0M20 18l1.5 0M13.5 7.5 18 12l-4.5 4.5" />,
  "arrow-ticket-up": (<><path d="M5 19V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11" /><path d="M5 19h14M5 15.5h2M8.5 15.5h1.5M17 15.5h2" strokeDasharray="0.1 2" strokeWidth="2.2" strokeLinecap="round" /><path d="M12 13V7M9.5 9.5 12 7l2.5 2.5" /></>),
  "arrow-ticket-down": (<><path d="M5 5v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5" /><path d="M5 5h14M5 8.5h2M8.5 8.5H10M17 8.5h2" strokeDasharray="0.1 2" strokeWidth="2.2" strokeLinecap="round" /><path d="M12 11v6M9.5 14.5 12 17l2.5-2.5" /></>),
  "arrow-stub-left": (<><path d="M19 6H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10" /><path d="M19 6v12M15.5 6v12" strokeDasharray="2 2" /><path d="M13 12H7M10.5 9.5 8 12l2.5 2.5" /></>),
  "arrow-stub-right": (<><path d="M5 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5" /><path d="M5 6v12M8.5 6v12" strokeDasharray="2 2" /><path d="M11 12h6M13.5 9.5 16 12l-2.5 2.5" /></>),
  "arrow-perforated-right": (<><path d="M4 12h11" /><path d="M12 5v14" strokeDasharray="2 2" /><path d="M11.5 7.5 16 12l-4.5 4.5" /></>),
  "arrow-perforated-left": (<><path d="M20 12H9" /><path d="M12 5v14" strokeDasharray="2 2" /><path d="M12.5 7.5 8 12l4.5 4.5" /></>),
  "nav-compass-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M15 9l-2 5-4 1 2-5" /></>),
  "nav-direction-up": <path d="M12 20l-5-9 5-7 5 9M12 20v-6M9.5 11.5h5" />,
  "nav-direction-down": <path d="M12 4l-5 9 5 7 5-9M12 4v6M9.5 12.5h5" />,
  "nav-history-back": <path d="M5 5v5h5M5.5 10a8 8 0 1 1-1 6M10 8.5 5.5 10 7 14.5" />,
  "nav-history-forward": <path d="M19 5v5h-5M18.5 10a8 8 0 1 0 1 6M14 8.5l4.5 1.5L17 14.5" />,
  "arrow-orbit": (<><circle cx="12" cy="12" r="3.5" /><path d="M20 9.5A9 9 0 0 0 4 14.5M20 5.5v4h-4M4 18.5v-4h4" /></>),
  "play": <path d="M7 4.5 19 12 7 19.5Z" />,
  "play-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M10 8.5 15.5 12 10 15.5Z" /></>),
  "play-square": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M10 8.5 15.5 12 10 15.5Z" /></>),
  "play-notch": (<><path d="M7 4.5 19 12 7 19.5Z" /><path d="M4.5 9v6" /></>),
  "pause": <path d="M8.5 5v14M15.5 5v14" />,
  "pause-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M9.8 8.5v7M14.2 8.5v7" /></>),
  "pause-square": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9.8 8.5v7M14.2 8.5v7" /></>),
  "stop": <path d="M7.5 7.5h9v9h-9Z" />,
  "stop-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M9.5 9.5h5v5h-5Z" /></>),
  "stop-square": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9.5 9.5h5v5h-5Z" /></>),
  "record-dot": (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.5" /></>),
  "record-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 8.5v1.5M12 14v1.5M8.5 12H10M14 12h1.5" /></>),
  "skip-forward": <path d="M6 5.5 13.5 12 6 18.5Z M16 5.5v13" />,
  "skip-back": <path d="M18 5.5 10.5 12l7.5 6.5Z M8 5.5v13" />,
  "rewind": <path d="M12 5.5 4.5 12l7.5 6.5Z M19.5 5.5 12 12l7.5 6.5Z" />,
  "fast-forward": <path d="M4.5 5.5 12 12l-7.5 6.5Z M12 5.5l7.5 6.5L12 18.5Z" />,
  "loop-track": <path d="M5 12a7 7 0 0 1 12.5-4.5M19 12a7 7 0 0 1-12.5 4.5M17.5 4.5v4h-4M6.5 19.5v-4h4" />,
  "shuffle-tracks": <path d="M4 7h3l9 10h4M4 17h3l2.5-2.8M13.5 9.8 16 7h4M17.5 4.5 20 7l-2.5 2.5" />,
  "repeat-track": <path d="M4 9h13l-2.5-2.5M20 15H7l2.5 2.5M17 4v5M7 15v5" />,
  "eject-media": <path d="M12 5.5 19 13H5Z M5 16.5h14M5 19.5h14" />,
  "volume-off": <path d="M4 9.5v5h3.5L12 18.5v-13Z M15.5 9.5l5 5M20.5 9.5l-5 5" />,
  "volume-low": (<><path d="M4 9.5v5h3.5L12 18.5v-13Z" /><path d="M15 10.5a3.5 3.5 0 0 1 0 3" /></>),
  "volume-mid": (<><path d="M4 9.5v5h3.5L12 18.5v-13Z" /><path d="M15 8.5a6 6 0 0 1 0 7" /></>),
  "volume-high": (<><path d="M4 9.5v5h3.5L12 18.5v-13Z" /><path d="M15 8.5a6 6 0 0 1 0 7M17.5 6a9.5 9.5 0 0 1 0 12" /></>),
  "mute-x": (<><path d="M4 9.5v5h3.5L12 18.5v-13Z" /><path d="M15 12h5" /></>),
  "speaker": <path d="M4 9.5v5h3.5L12 18.5v-13Z M15 9v6M18 7.5V16.5" />,
  "speaker-box": (<><rect x="3.5" y="7" width="9" height="10" rx="1.5" /><circle cx="8" cy="12" r="2.5" /></>),
  "speaker-tower": (<><rect x="7" y="3.5" width="10" height="17" rx="1.5" /><circle cx="12" cy="8" r="2" /><circle cx="12" cy="15.5" r="3" /></>),
  "headphones": <path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3M4.5 15h3v5h-3Z M19.5 15h-3v5h3Z" />,
  "headphones-mic": <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2M4.5 14h3v5h-3Z M16.5 19v-3h3M16.5 19h-2" />,
  "earbuds": (<><path d="M8.5 4a3 3 0 0 1 3 3v5M15.5 4a3 3 0 0 0-3 3v5" /><circle cx="11.5" cy="16.5" r="2.5" /><circle cx="12.5" cy="16.5" r="2.5" /></>),
  "earbud-single": (<><path d="M11 3a3.5 3.5 0 0 1 3.5 3.5V12" /><circle cx="11" cy="16" r="3.5" /></>),
  "microphone": (<><rect x="9" y="3.5" width="6" height="10" rx="3" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V20.5M9 20.5h6" /></>),
  "microphone-off": (<><rect x="9" y="3.5" width="6" height="10" rx="3" /><path d="M6 11.5a6 6 0 0 0 12 0M4.5 4.5l15 15" /></>),
  "microphone-stand": (<><rect x="9.5" y="3" width="5" height="7" rx="2.5" /><path d="M7 10a5 5 0 0 0 10 0M12 15v5.5M8 20.5h8" /></>),
  "microphone-retro": (<><rect x="7.5" y="3.5" width="9" height="8" rx="4" /><path d="M9 11.5h6M8 14.5h8M12 14.5v6M8.5 20.5h7" /></>),
  "podcast-mic": (<><rect x="9" y="2.5" width="6" height="9" rx="3" /><circle cx="12" cy="16.5" r="4" /><path d="M12 20.5v1" /></>),
  "podcast-stand": (<><circle cx="12" cy="9" r="4.5" /><path d="M12 13.5V19M8.5 19.5h7M10 6.5h4" /></>),
  "equalizer-bars": <path d="M5 20v-6M10 20V7M15 20v-9M20 20V4" />,
  "equalizer-sliders": <path d="M5 4v16M10 4v16M15 4v16M20 4v16M7.5 9.5h-5M12.5 14.5h-5M17.5 8.5h-5M22 16.5h-5" />,
  "audio-wave": <path d="M4 12h2M8 8v8M12 5v14M16 8.5v7M20 10.5v3" />,
  "audio-wave-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M9 10v4M12 8v8M15 10v4" /></>),
  "sound-ripple": (<><circle cx="8" cy="12" r="1.5" /><path d="M11.5 9.5a4 4 0 0 1 0 5M14.5 7.5a7.5 7.5 0 0 1 0 9M17.5 5a11 11 0 0 1 0 14" /></>),
  "mute-ring": (<><circle cx="12" cy="12" r="8.5" /><path d="M8 9.5v5h2.5L14 17.5v-11Z M16 9.5l3 5M19 9.5l-3 5" /></>),
  "music-note": <path d="M10 17.5V5l8-2v12.5M10 17.5a2.5 2.5 0 1 0 .1 0M18 15.5a2.5 2.5 0 1 0 .1 0" />,
  "music-note-double": <path d="M9 16V6l10-2.5V14M9 16a2.5 2.5 0 1 0 .1 0M19 14a2.5 2.5 0 1 0 .1 0M9 6l10-2.5" />,
  "beamed-notes": <path d="M7 18V7l10-3v14M7 18a2.5 2.5 0 1 0 .1 0M17 15a2.5 2.5 0 1 0 .1 0M7 7l10-3" />,
  "beamed-notes-tilt": <path d="M8 18.5 6.5 8l10-3 1.5 10.5M8 18.5a2.5 2.5 0 1 0 .1 0M18 15.5a2.5 2.5 0 1 0 .1 0" />,
  "music-rest": <path d="M9 4h6l-2 5 2.5 3.5-7 7.5 2-4.5L8 12Z" />,
  "treble-stub": <path d="M13.5 3.5a3 3 0 0 1 3 3c0 4-8 5-8 10a3.5 3.5 0 0 0 7 1M12 3.5v17" />,
  "bass-dot": (<><circle cx="10" cy="17" r="2.5" /><path d="M12.5 17V5l7-2v9" /></>),
  "tempo-mark": (<><path d="M12 4 19 18H5Z" /><path d="M12 9.5v4M10 13.5h4" /></>),
  "metronome": <path d="M9 3.5h6L18 20H6Z M12 7v5l3 2M12 3.5 7 20" />,
  "metronome-tick": (<><path d="M9 3.5h6L18 20H6Z" /><circle cx="12" cy="12" r="1.5" /></>),
  "playlist-note": (<><rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M10 15.5V9l5-1.5V13M10 15.5a1.8 1.8 0 1 0 .1 0" /></>),
  "note-circle": (<><circle cx="12" cy="12" r="8.5" /><path d="M10.5 15.5V9.5L15 8v6" /></>),
  "note-square": (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M10.5 15.5V9.5L15 8v6" /></>),
  "chord-bars": <path d="M4 7h16M4 12h16M4 17h16M8 4.5V7M16 9.5V12M9 14.5v2.5" />,
  "harmony-lines": <path d="M4 9c4-3 12-3 16 0M4 15c4 3 12 3 16 0M12 4v3M12 17v3" />,
  "song-ticket": (<><rect x="3.5" y="7" width="17" height="10" rx="1.5" /><path d="M10 14.5V10l4-1v4M12 7v10" /></>),
  "camera": (<><rect x="3.5" y="7" width="17" height="12" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="M8.5 7 10 4.5h4L15.5 7" /></>),
  "camera-flash": (<><rect x="3.5" y="8" width="17" height="11" rx="2" /><path d="M17.5 4.5 15 6.5h2.5M12 11.5l-1 2h2.5l-1 2.5 3-3.5h-2.5Z" /></>),
  "camera-reel": (<><circle cx="12" cy="13" r="6" /><circle cx="12" cy="13" r="2" /><path d="M8 4.5h8" /></>),
  "photo-frame": (<><rect x="4" y="5" width="16" height="14" rx="1.5" /><circle cx="9" cy="10" r="1.5" /><path d="M4 16.5 10 11l4 3.5 2-2 4 3.5" /></>),
  "photo-stack": (<><rect x="6" y="6" width="14" height="14" rx="1.5" /><path d="M6 6V5a1.5 1.5 0 0 1 1.5-1.5H18M4 18v-9" /></>),
  "photo-strip": (<><rect x="6" y="3.5" width="12" height="17" rx="1" /><circle cx="10" cy="8" r="1.5" /><circle cx="14" cy="13" r="1.5" /></>),
  "film-strip": (<><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M8 5v14M16 5v14M4 9.5h4M4 14.5h4M16 9.5h4M16 14.5h4" /></>),
  "film-frame": (<><rect x="3.5" y="6" width="17" height="12" rx="1.5" /><path d="M3.5 9.5h17M3.5 14.5h17M7 6v12M17 6v12" /></>),
  "film-reel": (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="7" r="1.5" /><circle cx="8" cy="15" r="1.5" /></>),
  "clapper": (<><path d="M4 10.5h16V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" /><path d="M4.5 10.5 5.5 4.5l15 2-1 4M9 5.5l1.5 4M13.5 6l1.5 4" /></>),
  "clapper-open": (<><path d="M4 12h16v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" /><path d="M4.5 12 6 5l15 3" /></>),
  "projector": (<><rect x="3.5" y="8" width="11" height="9" rx="1.5" /><circle cx="9" cy="12.5" r="2.5" /><path d="M14.5 11h3l3-2.5M14.5 14h3l3 2.5" /></>),
  "projector-beam": (<><rect x="3" y="9" width="8" height="7" rx="1.5" /><path d="M11 10.5h6l4-3M11 13.5h6l4 3M15 8v8" /></>),
  "projector-reel": (<><circle cx="7" cy="7" r="3" /><circle cx="17" cy="6" r="2.5" /><path d="M4 14h16v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" /></>),
  "tv": (<><rect x="3.5" y="5.5" width="17" height="12" rx="1.5" /><path d="M9 20.5h6M12 17.5v3" /></>),
  "tv-static": (<><rect x="3.5" y="5.5" width="17" height="12" rx="1.5" /><path d="M7 9.5h2M11 9.5h1M14 12h3M8 13.5h3" /></>),
  "tv-retro": (<><rect x="5" y="8" width="14" height="11" rx="2" /><path d="M8.5 8 5 4M15.5 8 19 4M9 19.5h6" /></>),
  "radio": (<><rect x="4" y="9" width="16" height="10" rx="1.5" /><circle cx="9" cy="14" r="2.5" /><path d="M14.5 12.5h3M14.5 15.5h3M7 9l5-5" /></>),
  "radio-tower": (<><circle cx="12" cy="7" r="1.5" /><path d="M12 8.5V20M8 20h8M9.5 12 7 20M14.5 12 17 20M9.7 10.5a4 4 0 0 1 4.6 0" /></>),
  "antenna-dish": <path d="M5 15a8 8 0 0 1 11-7M5 15l-1.5 5.5M5 15l5.5-1.5M16 16l4 4M13 5.5 19 4l-1.5 6" />,
  "spotlight-cone": <path d="M9 3.5h6M10.5 3.5 7 10l10 0-3.5-6.5M8 14l-3 6.5M16 14l3 6.5" />,
  "spotlight-double": <path d="M4 4h4M16 4h4M6 4l-2 6h6Z M18 4l-2 6h6Z M8 14l-2 6M16 14l2 6" />,
  "stage-curtain": <path d="M4 4h16M4 4v9c3 0 3 3 4.5 3S10 13 10 13V4M20 4v9c-3 0-3 3-4.5 3S14 13 14 13V4" />,
  "curtain-tie": <path d="M12 3.5v17M6 4c0 5 2 7 4 9l-2 7M18 4c0 5-2 7-4 9l2 7" />,
  "drama-mask-happy": (<><path d="M6 4h12v7a6 6 0 0 1-12 0Z" /><path d="M9 9.5h1.5M13.5 9.5H15M9 13.5c1 1.5 5 1.5 6 0" /></>),
  "drama-mask-sad": (<><path d="M6 4h12v7a6 6 0 0 1-12 0Z" /><path d="M9 9.5h1.5M13.5 9.5H15M9.5 15.5c1-1.5 4-1.5 5 0" /></>),
  "masks-duo": (<><path d="M3.5 5h8v5.5a4 4 0 0 1-8 0Z" /><path d="M12.5 9h8v5.5a4 4 0 0 1-8 0Z" /></>),
  "ticket-tear-left": (<><rect x="5" y="6" width="15" height="12" rx="1.5" /><path d="M9 6v3M9 11v2M9 15v3" /></>),
  "ticket-tear-right": (<><rect x="4" y="6" width="15" height="12" rx="1.5" /><path d="M15 6v3M15 11v2M15 15v3" /></>),
  "ticket-tear-zigzag": (<><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M11 6l2 2-2 2 2 2-2 2 2 2-2 2" /></>),
  "ticket-tear-dashed": (<><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M12 6.5v2M12 10.5v2M12 14.5v2" /></>),
  "ticket-stub-play": (<><rect x="3.5" y="7" width="17" height="10" rx="1.5" /><path d="M9 7v10M11 10.5 14.5 12 11 13.5Z" /></>),
  "marquee-frame": (<><rect x="5" y="7" width="14" height="10" rx="1" /><path d="M7 4.5v2M12 4.5v2M17 4.5v2M7 17.5v2M12 17.5v2M17 17.5v2" /></>),
  "marquee-bulbs": (<><rect x="6" y="8" width="12" height="8" rx="1" /><circle cx="6" cy="8" r="1" /><circle cx="12" cy="5.5" r="1" /><circle cx="18" cy="8" r="1" /></>),
  "marquee-arrow": (<><rect x="4" y="8" width="16" height="8" rx="1" /><path d="M7 12h8M12.5 9.5 15 12l-2.5 2.5" /></>),
  "neon-star": <path d="M12 4l2 5.5L20 11l-4.5 3.5L17 20l-5-3-5 3 1.5-5.5L4 11l6-1.5Z" />,
  "popcorn": (<><path d="M6 10h12l-1.5 9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1Z" /><circle cx="9" cy="7.5" r="1.8" /><circle cx="12.5" cy="6" r="2" /><circle cx="15" cy="8" r="1.5" /></>),
  "popcorn-box": <path d="M6 9h12l-1.5 11H7.5Z M9 9V6M12 9V5M15 9V6M6 12.5h12" />,
  "soda-cup": <path d="M7 8h10l-1.5 12h-7Z M6 4.5h12M12 4.5V8M14.5 12.5 12 15l-2.5-2.5" />,
  "intermission-bell": (<><path d="M6 16v-6a6 6 0 0 1 12 0v6" /><path d="M4.5 16h15M10 19.5a2 2 0 0 0 4 0" /></>),
  "stage-lights": <path d="M4 4h16M7 4v4M12 4v4M17 4v4M8 12l-2 8M12 12v8M16 12l2 8" />,
  "footlight-row": (<><path d="M4 16h16M4 20h16" /><circle cx="8" cy="13" r="1.5" /><circle cx="12" cy="13" r="1.5" /></>),
  "backdrop-arch": <path d="M5 20v-8a7 7 0 0 1 14 0v8M9 20v-6a3 3 0 0 1 6 0v6" />,
  "velvet-rope": <path d="M5 5v10M19 5v10M5 10c0 4 14 4 14 0M9 20h6" />,
  "show-bell": (<><path d="M12 4a5 5 0 0 1 5 5v5l1.5 2.5h-13L7 14V9a5 5 0 0 1 5-5Z" /><path d="M10.5 19a1.5 1.5 0 0 0 3 0" /></>),
  "applause-hands": <path d="M5 12 9 6l2 3 2-4 3 6 3-2-2 9H8Z" />,
  "encore-star": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5l1.5 3L17 11l-2.5 2 1 3.5-3.5-2-3.5 2 1-3.5L7 11l3.5-.5Z" /></>),
  "usher-torch": <path d="M10 3.5h4v5h-4Z M12 8.5V14M9 17l3-3 3 3M7 20.5h10" />,
  "balcony-arch": (<><path d="M4 20v-6a8 8 0 0 1 16 0v6" /><path d="M4 17h16" /></>),
  "stage-door": (<><rect x="6" y="3.5" width="12" height="17" rx="1" /><circle cx="14.5" cy="12" r="1" /><path d="M6 7.5h12" /></>),
  "gamepad": (<><rect x="3.5" y="8" width="17" height="9" rx="4.5" /><path d="M8 11v4M6 13h4M15.5 12h1M16.8 14.5h1" /></>),
  "gamepad-wireless": (<><rect x="4.5" y="10" width="15" height="8" rx="4" /><path d="M9.5 5.5a5 5 0 0 1 5 0M10 13v3M8.5 14.5h3" /></>),
  "joystick": (<><circle cx="12" cy="16.5" r="4.5" /><circle cx="12" cy="7" r="2.5" /><path d="M12 9.5v7" /></>),
  "joystick-base": (<><path d="M5 20h14M7 20v-3h10v3" /><circle cx="12" cy="7" r="2.5" /><path d="M12 9.5V17" /></>),
  "dpad-cross": <path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5Z M9 9v6M9 12h6" />,
  "dice-one": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><circle cx="12" cy="12" r="1.5" /></>),
  "dice-two": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><circle cx="9.5" cy="9.5" r="1.2" /><circle cx="14.5" cy="14.5" r="1.2" /></>),
  "dice-three": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><circle cx="9" cy="9" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="15" cy="15" r="1.2" /></>),
  "dice-four": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><circle cx="9.3" cy="9.3" r="1.2" /><circle cx="14.7" cy="9.3" r="1.2" /><circle cx="9.3" cy="14.7" r="1.2" /></>),
  "dice-five": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><circle cx="9.3" cy="9.3" r="1.1" /><circle cx="14.7" cy="9.3" r="1.1" /><circle cx="12" cy="12" r="1.1" /></>),
  "dice-six": (<><rect x="5" y="5" width="14" height="14" rx="2.5" /><path d="M9.3 9.3h.1M14.7 9.3h.1M9.3 12h.1M14.7 12h.1M9.3 14.7h.1M14.7 14.7h.1" /></>),
  "puzzle-piece": <path d="M10 4v3.5a1.5 1.5 0 0 0 3 0V4h6v6h-3.5a1.5 1.5 0 0 0 0 3H19v6h-9v-3.5a1.5 1.5 0 0 0-3 0V19H4v-6h3" />,
  "puzzle-duo": <path d="M4 8h5V4.5A1.5 1.5 0 0 1 12 6v2h5v5h-2.5a1.5 1.5 0 0 0 0 3H17v4.5h-8v-2a1.5 1.5 0 0 0-3 0v2H4Z" />,
  "disco-ball": (<><circle cx="12" cy="13" r="7" /><path d="M12 3.5V6M6.5 10.5h11M6.5 14.5h11M9 6.5 8 20M15 6.5l1 13.5" /></>),
  "disco-spark": (<><circle cx="12" cy="13" r="6" /><path d="M12 4v2M19 5l-1.5 1.5M5 5l1.5 1.5M8 19.5l1-2M16 19.5l-1-2" /></>),
  "arcade-cabinet": (<><path d="M7 3.5h10v17h-10Z" /><rect x="9" y="6" width="6" height="4" rx="1" /><path d="M9 14h6M12 14v3" /></>),
  "arcade-joystick": (<><circle cx="9" cy="15" r="1.2" /><path d="M9 15v-4M9 11a1.8 1.8 0 1 0 .1 0M15 13.5h3" /></>),
  "chess-knight-stub": <path d="M9 20h9M7 20v-2l3-1V9l4-5.5L16.5 6 18 5l-1 4-2 1.5V15l4 5Z" />,
  "cards-fan": <path d="M12 18 6 6.5 11 4l3 4M12 18l-1-9 5-3 2 5ZM12 18l6-3 1-6" />,
  "spinner-prize": (<><circle cx="12" cy="12" r="8" /><path d="M12 12 12 4.5M12 12l7 4M12 12l-7 4" /></>),
  "vinyl": (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="12" r="5.5" /></>),
  "vinyl-sleeve": (<><rect x="4" y="4" width="14" height="16" rx="1.5" /><circle cx="18" cy="12" r="5" /><circle cx="18" cy="12" r="1.2" /></>),
  "turntable": (<><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><circle cx="9.5" cy="12" r="4.5" /><circle cx="9.5" cy="12" r="1" /></>),
  "tonearm": (<><circle cx="9" cy="13" r="5" /><path d="M15 4.5h3l-4.5 10M15.5 7.5h2" /></>),
  "cassette": (<><rect x="3.5" y="6" width="17" height="12" rx="1.5" /><circle cx="9" cy="12" r="1.8" /><circle cx="15" cy="12" r="1.8" /><path d="M6 18l1.5-3M18 18l-1.5-3" /></>),
  "cassette-notch": (<><rect x="3.5" y="6" width="17" height="12" rx="1.5" /><path d="M7 9.5h10M9 12h.5M14.5 12h.5" /></>),
  "reel-tape": (<><circle cx="7.5" cy="8" r="3.5" /><circle cx="16.5" cy="8" r="3.5" /><path d="M4 16.5h16M7.5 11.5V16M16.5 11.5V16" /></>),
  "boombox": (<><rect x="3.5" y="8" width="17" height="10" rx="1.5" /><circle cx="8.5" cy="13" r="2.5" /><circle cx="15.5" cy="13" r="2.5" /><path d="M6 8 9 4.5M18 8l-3-3.5" /></>),
  "jukebox-arch": <path d="M6 20v-7a6 6 0 0 1 12 0v7M6 20h12M9 13.5h6M12 7.5v2" />,
  "amplifier-stack": (<><rect x="4" y="4" width="16" height="7" rx="1" /><rect x="4" y="13" width="16" height="7" rx="1" /><circle cx="8" cy="7.5" r="1" /><circle cx="8" cy="16.5" r="1" /></>),
  "amplifier-knobs": (<><rect x="4" y="8" width="16" height="9" rx="1.5" /><circle cx="9" cy="12.5" r="1.2" /><circle cx="12.5" cy="12.5" r="1.2" /><circle cx="16" cy="12.5" r="1.2" /></>),
  "mixer-faders": (<><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M8.5 4v16M12 4v16M15.5 4v16M6.5 9h4M10 15h4M13.5 8h4" /></>),
  "mixer-dials": (<><rect x="4" y="6" width="16" height="12" rx="1.5" /><circle cx="9" cy="12" r="1.8" /><circle cx="15" cy="12" r="1.8" /></>),
  "tuner-dial": (<><rect x="3.5" y="7" width="17" height="10" rx="1.5" /><path d="M6 10.5h11M16.5 10.5 15 12M8 14.5h8" /></>),
  "speaker-grille": (<><rect x="6" y="3.5" width="12" height="17" rx="2" /><path d="M9.5 7h.5M14 7h.5M9.5 11h.5M14 11h.5M9.5 15h.5M14 15h.5" /></>),
  "earphone-monitor": <path d="M6 18a4 4 0 0 1 0-8 4 4 0 0 1 4 4v6a1.5 1.5 0 0 0 3 0v-7M16 10h4v6h-4" />,
  "tape-loop": <path d="M7 16a5 5 0 1 1 10 0 5 5 0 1 1-10 0M12 8.5v3l2.5 2.5" />,
  "record-notch": (<><circle cx="12" cy="12" r="8" /><path d="M12 4.5v3M12 16.5v3M4.5 12h3" /></>),
  "groove-rings": (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="1.5" /></>),
  "needle-drop": <path d="M5 20a8.5 8.5 0 0 1 14-6.5M14 4h5v5M19 4l-6 7" />,
  "guitar": <path d="M9 15a3.5 3.5 0 1 0 4 4l6-6-4-4ZM14.5 5.5l4 4M6 18l3-3" />,
  "guitar-electric": <path d="M14 4l6 6-2 2-6-6ZM8 13a3.5 3.5 0 1 0 5 5l2-2-5-5ZM6 18l2-2" />,
  "guitar-pick": <path d="M12 4c3 0 6 3.5 6 6.5S14 19 12 19 6 14 6 10.5 9 4 12 4ZM12 9v4" />,
  "drum": (<><path d="M5 8h14v3a7 7 0 0 1-14 0Z" /><path d="M5 8a7 2.5 0 0 0 14 0 7 2.5 0 0 0-14 0M4 5.5 7 3M20 5.5 17 3" /></>),
  "drum-sticks": (<><path d="M5 7h14v4a7 7 0 0 1-14 0Z" /><path d="M8 3.5 15 8M16 3.5 9 8" /></>),
  "snare-drum": (<><path d="M6 9h12v8H6Z" /><path d="M6 12.5h12M8 17l-1.5 3M16 17l1.5 3M4.5 7 6 9M19.5 7 18 9" /></>),
  "piano-keys": (<><rect x="4" y="7" width="16" height="10" rx="1.5" /><path d="M8 7v6M12 7v6M16 7v6M4 12.5h16" /></>),
  "piano-grand": <path d="M4 16V8l10-3.5c3 0 6 2 6 5.5L13 16ZM8 8v8M12 6.5V16" />,
  "keyboard-synth": (<><rect x="3.5" y="9" width="17" height="9" rx="1.5" /><path d="M7 9v5M10.5 9v5M14 9v5M17.5 9v5M3.5 6h4M16.5 6h4" /></>),
  "saxophone": <path d="M10 3.5c-2 5-3 9-1 13l4 4M9 16.5h5.5a2.5 2.5 0 0 0 0-5H13M10 3.5h4" />,
  "trumpet": <path d="M3.5 10h11v4h-11M14.5 10l5-3v10l-5-3M7 10V8M10 10V8M13 10V8" />,
  "trumpet-bell": <path d="M4 11h9l5-4v10l-5-4M18 7v10M7 14v4M10.5 14v3" />,
  "violin": (<><path d="M13 3.5 5.5 15a3 3 0 1 0 5 3L19 6.5" /><path d="M7.5 13.5l2 2M15 4.5l2 2" /></>),
  "violin-bow": <path d="M5 19 17 5M19 4l1 1M5 19l-1 1M8 16.5 10 14.5M12 12.5l2-2" />,
  "cello-arch": <path d="M10 3.5c-3 4-3 12 0 15M10 3.5c4 2 6 8 2 11l-3 6M8 8h5" />,
  "banjo-round": (<><circle cx="10" cy="15" r="5.5" /><path d="M13.5 10.5 19 4M17 4h3v3" /></>),
  "harmonica-rect": (<><rect x="4" y="9" width="16" height="6" rx="1" /><path d="M8 9v6M12 9v6M16 9v6" /></>),
  "accordion-fold": (<><path d="M5 6v12M9.5 6v12M14 6v12M18.5 6v12" /><path d="M5 9l4.5-2 4.5 2 4.5-2" /></>),
  "tambourine-ring": (<><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3" /><path d="M12 5V3.5M19 12h1.5M12 19v1.5" /></>),
  "maraca-pair": (<><circle cx="8" cy="7" r="3.5" /><circle cx="16.5" cy="7" r="3.5" /><path d="M10 10l-3 10M14.5 10l3 10" /></>),
  "xylophone-bars": <path d="M5 17 18 6M8 18.5 19 9.5M7 12l2-1.5M10.5 12.5l2-1.5M14 13l2-1.5M5 18.5h5" />,
  "chime-bars": (<><path d="M5 4h14" /><path d="M7.5 4v9M12 4v12M16.5 4v9M7.5 15.5h.5M12 18.5h.5" /></>),
  "flute-line": <path d="M4 14h14l2-2M6 14v1.5M9.5 14v1.5M13 14v1.5M16.5 14v1.5" />,
  "clarinet-reed": <path d="M13 3.5 9 16l-2 4.5M13 3.5l2 1.5L11 17M9.5 13.5h4" />,
  "harp-frame": <path d="M7 4v16M7 4c6 0 11 4 11 10l-2 6M9.5 7v4M12 8.5V14M14.5 10.5v4" />,
  "headphones-case": (<><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M7 12V9a5 5 0 0 1 10 0v3" /></>),
  "stream-live-dot": (<><rect x="3.5" y="6" width="17" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6.5 9h.5M17 14.5h.5" /></>),
  "on-air-sign": (<><rect x="3.5" y="8" width="17" height="8" rx="1.5" /><circle cx="8" cy="12" r="1.5" /><path d="M11.5 10.5h6M11.5 13.5h6" /></>),
  "clap-sync": <path d="M4 12l4-6 3 4 3-5 6 7M7 18h13M9 15.5l2 2.5 2-2.5" />,
  "slate-mark": (<><rect x="5" y="9" width="14" height="11" rx="1" /><path d="M5 9l1-4.5L19 7 18 9M9 5.5 10 8.5M13 6l-1 3" /></>),
  "take-reel": (<><circle cx="9" cy="14" r="5.5" /><circle cx="9" cy="14" r="1.2" /><path d="M14 5h6v6h-6M16 5v6M14 7h6" /></>),
  "scene-curtain-call": <path d="M4 3.5h16M6 3.5V13l3 2 3-2 3 2 3-2V3.5M9 20h6" />,
  "reel-can": (<><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="M12 5v2M12 17v2M5 12h2M17 12h2" /></>),
  "film-perforation": <path d="M7 4v16M17 4v16M4 8h3M4 12h3M4 16h3M17 8h3M17 12h3M17 16h3" />,
  "ticket-perforation": (<><rect x="4" y="7" width="16" height="10" rx="1.5" /><circle cx="8" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="16" cy="12" r="1" /></>),
  "stub-notch": (<><path d="M6 5h12a1 1 0 0 1 1 1v5l-2 1 2 1v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5l2-1-2-1V6a1 1 0 0 1 1-1Z" /></>),
  "popcorn-tub-notch": (<><path d="M6 9h12l-1.2 10H7.2Z" /><path d="M6 12.5h12" /></>),
  "karaoke-mic": (<><rect x="10" y="3" width="5" height="8" rx="2.5" /><path d="M7.5 13a5 5 0 0 0 9 0M12.5 18v2.5M10 14.5 7 20.5M15 14.5l3 6" /></>),
  "karaoke-screen": (<><rect x="4" y="4" width="16" height="11" rx="1.5" /><path d="M7 11h4M7 8.5h7M9 18.5h6M12 15v3.5" /></>),
  "lyrics-lines": <path d="M5 6h14M5 10h14M5 14h9M5 18h12M17 13.5l2 2 2-2" />,
  "subtitle-frame": (<><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="M7 15h10M9 12.5h6" /></>),
  "caption-box": (<><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M4 14.5h16M8 9.5h8" /></>),
  "surround-speakers": (<><rect x="3.5" y="10" width="5" height="7" rx="1" /><rect x="15.5" y="10" width="5" height="7" rx="1" /><path d="M9 7l3-3 3 3M9 20l3-2 3 2" /></>),
  "bass-boost": <path d="M4 14v-3h3l4 4v-9l4 4h5" />,
  "treble-boost": <path d="M4 10v-2h4l3 5 3-8 3 5h3" />,
  "volume-fader": (<><rect x="6" y="3.5" width="12" height="17" rx="2" /><path d="M9 10.5h6M9 13.5h6" /></>),
  "cue-flag": <path d="M7 20.5V4M7 4.5h11l-2.5 3.5L18 11.5H7" />,
  "backstage-star": (<><path d="M9 4h6v5H9Z" /><path d="M12 11l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z M9 18.5h6" /></>),
  "afterparty-confetti": <path d="M5 19 9 5M12 20l1.5-9M17 19l3-8M7 9l2 1M14 6l2-1M18 12l2 .5" />,
  "finale-curtain": (<><path d="M4 4h16v10c-2.5 0-2.5 2.5-4 2.5S14.5 14 12 14s-2 2.5-4 2.5-1.5-2.5-4-2.5Z" /><path d="M9 20h6" /></>),
  "file": <path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" />,
  "file-text": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M9 11.5 L15.5 11.5 M9 14.5 L15.5 14.5 M9 17 L13.5 17" /></>),
  "file-plus": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M12.2 12.5 L12.2 16.5 M10.2 14.5 L14.2 14.5" /></>),
  "file-minus": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10.2 14.5 L14.2 14.5" /></>),
  "file-check": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10 14.5 L11.8 16.3 L14.5 12.5" /></>),
  "file-x": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10.5 13 L14 16.5 M14 13 L10.5 16.5" /></>),
  "file-star": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M12.2 12 L12.8 13.6 L14.5 13.8 L13.2 15 L13.5 16.7 L12.2 15.9 L10.9 16.7 L11.2 15 L9.9 13.8 L11.6 13.6 Z" /></>),
  "file-heart": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M12.2 16.5 L10 14.3 C9.3 13.6 9.3 12.5 10 11.9 C10.7 11.3 11.7 11.4 12.2 12.1 C12.7 11.4 13.7 11.3 14.4 11.9 C15.1 12.5 15.1 13.6 14.4 14.3 Z" /></>),
  "file-lock": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><rect x="10.2" y="13.5" width="4" height="3.5" rx="0.8" /><path d="M10.8 13.5 L10.8 12.3 C10.8 11.5 11.4 11 12.2 11 C13 11 13.6 11.5 13.6 12.3 L13.6 13.5" /></>),
  "file-search": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><circle cx="11.5" cy="14" r="2" /><path d="M13 15.5 L15 17.5" /></>),
  "file-code": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10 13 L11 14.5 L10 16 M14.4 13 L13.4 14.5 L14.4 16" /></>),
  "file-image": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><circle cx="10.5" cy="11.5" r="1.2" /><path d="M8 17.5 L11 14.5 L13 16.2 L14.5 14.8 L16.5 17.5" /></>),
  "file-music": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M11 16.5 L11 11.5 L14 11 L14 15.5" /><circle cx="10" cy="16.5" r="1" /><circle cx="13" cy="15.5" r="1" /></>),
  "file-video": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><rect x="9" y="12.5" width="6" height="4" rx="0.8" /><path d="M10.8 13.8 L11.8 14.5 L10.8 15.2 Z" /></>),
  "file-pdf": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M9 16.5 L9 12.5 L10.8 12.5 C11.6 12.5 12 13 12 13.7 C12 14.4 11.6 14.9 10.8 14.9 L9 14.9 M13 12.5 L14.8 16.5 M14.8 12.5 L13 16.5" /></>),
  "file-zip": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10 12.5 L14 12.5 M10 12.5 L12.5 14.5 L10 16.5 L14 16.5" /></>),
  "file-blank": <path d="M6.5 3.5 L14.5 3.5 L18 7.5 L18 20.5 L6.5 20.5 Z" />,
  "file-draft": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M9 9 L12 9 L12 12 M9 18 L9 15 L13 15 L15.5 15" /></>),
  "file-copy": (<><path d="M8 8 L15 8 L17.5 10.5 L17.5 20 L8 20 Z" /><path d="M6.5 4 L13 4 L13 16 M6.5 4 L6.5 16 L6.5 4" /></>),
  "file-edit": (<><path d="M6 3.5 L14 3.5 L18.5 8 L18.5 20.5 L6 20.5 Z" /><path d="M10 16.5 L11 13.5 L14 10.5 L15 11.5 L12 14.5 Z" /></>),
  "folder": <path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" />,
  "folder-open": (<><path d="M3.5 7.5 L20.5 7.5 L20.5 18.5 L3.5 18.5 Z" /><path d="M3.5 7.5 L5 5 L11 5 L12.5 7.5" /></>),
  "folder-plus": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M13.5 12.5 L13.5 15.5 M12 14 L15 14" /></>),
  "folder-minus": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M12 14 L15 14" /></>),
  "folder-check": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M11.8 13.8 L13.2 15.2 L15.5 12.5" /></>),
  "folder-x": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M12.2 12.5 L15 15.3 M15 12.5 L12.2 15.3" /></>),
  "folder-star": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M13.5 12 L14 13.2 L15.3 13.4 L14.3 14.3 L14.6 15.6 L13.5 15 L12.4 15.6 L12.7 14.3 L11.7 13.4 L13 13.2 Z" /></>),
  "folder-lock": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><rect x="11.5" y="13" width="4" height="3.2" rx="0.7" /><path d="M12.2 13 L12.2 12 C12.2 11.3 12.8 10.8 13.5 10.8 C14.2 10.8 14.8 11.3 14.8 12 L14.8 13" /></>),
  "folder-search": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><circle cx="13.5" cy="13.5" r="1.8" /><path d="M14.8 14.8 L16.5 16.5" /></>),
  "folder-zip": (<><path d="M3.5 6.5 L3.5 18.5 L20.5 18.5 L20.5 9 L10.5 9 L8.5 6.5 Z" /><path d="M5.5 12.5 L5.5 12.5 M12 12.5 L14.5 12.5 M12 12.5 L13.5 14 L12 15.5 L14.5 15.5" /></>),
  "archive-box": (<><rect x="4" y="8.5" width="16" height="11" rx="0.5" /><path d="M3 5.5 L21 5.5 L21 8.5 L3 8.5 Z M10 5.5 L10 3.5 L14 3.5 L14 5.5" /></>),
  "archive-tray": (<><path d="M4 12.5 L4 19.5 L20 19.5 L20 12.5" /><path d="M3 8.5 L5 12.5 L19 12.5 L21 8.5 Z M10 8.5 L10 6.5 L14 6.5 L14 8.5" /></>),
  "document": (<><path d="M6 3.5 L18 3.5 L18 20.5 L6 20.5 Z" /><path d="M9 8.5 L15 8.5 M9 12 L15 12 M9 15.5 L13 15.5" /></>),
  "document-text": (<><path d="M7 3.5 L17 3.5 L17 20.5 L7 20.5 Z" /><path d="M9.5 8 L14.5 8 M9.5 11 L14.5 11 M9.5 14 L14.5 14 M9.5 17 L12.5 17" /></>),
  "document-check": (<><path d="M6 3.5 L18 3.5 L18 20.5 L6 20.5 Z" /><path d="M9.5 13.5 L11.3 15.3 L14.8 11.5" /></>),
  "document-plus": (<><path d="M6 3.5 L18 3.5 L18 20.5 L6 20.5 Z" /><path d="M12 10.5 L12 15.5 M9.5 13 L14.5 13" /></>),
  "clipboard": (<><rect x="6" y="5" width="12" height="15.5" rx="1" /><rect x="9" y="3" width="6" height="3.5" rx="0.8" /><path d="M9 11.5 L15 11.5 M9 14.5 L15 14.5" /></>),
  "clipboard-check": (<><rect x="6" y="5" width="12" height="15.5" rx="1" /><rect x="9" y="3" width="6" height="3.5" rx="0.8" /><path d="M9.8 14 L11.2 15.4 L14.3 12" /></>),
  "clipboard-list": (<><rect x="6" y="5" width="12" height="15.5" rx="1" /><rect x="9" y="3" width="6" height="3.5" rx="0.8" /><path d="M9 11 L15 11 M9 14 L13 14 M9 17 L14 17" /></>),
  "clipboard-copy": (<><rect x="7.5" y="5.5" width="11" height="15" rx="1" /><path d="M5.5 5.5 L5.5 19.5 M5.5 5.5 L10 5.5" /><rect x="9.5" y="3" width="6" height="3.2" rx="0.7" /></>),
  "pencil": <path d="M5 19 L6.5 15.5 L15.5 6.5 L18.5 9.5 L9.5 18.5 Z M14 5 L19 10" />,
  "pencil-line": (<><path d="M5 19 L6.5 15.5 L15.5 6.5 L18.5 9.5 L9.5 18.5 Z" /><path d="M4 21.5 L20 21.5" /></>),
  "pencil-ruler": (<><path d="M4.5 19.5 L13.5 10.5 L16 13 L7 22 L4.5 19.5" /><path d="M14.5 5.5 L19.5 10.5 L18 12 L13 7 Z M16 7 L16.8 7.8 M17.5 8.5 L18.3 9.3" /></>),
  "pen": <path d="M5 19 C5 19 13 11 16.5 7.5 C17.5 6.5 19.5 8.5 18.5 9.5 C15 13 7 21 7 21 L4.5 21.5 Z M15 6 L18 9" />,
  "pen-nib": (<><path d="M12 3.5 L15.5 11.5 L12 20.5 L8.5 11.5 Z" /><circle cx="12" cy="11.5" r="1.2" /><path d="M12 12.7 L12 17" /></>),
  "fountain-pen": (<><path d="M6 18 L13.5 10.5 L17.5 14.5 L10 22 L6 18" /><path d="M13.5 10.5 L16 4.5 L19.5 8 L14.5 11.5 M11 15 L13 17" /></>),
  "eraser": (<><path d="M7.5 15.5 L14.5 8.5 L19.5 13.5 L12.5 20.5 L6.5 20.5 Z" /><path d="M6.5 20.5 L4.5 18.5 L4.5 20.5 Z M12 11 L17 16" /></>),
  "ruler": (<><rect x="3.5" y="10" width="17" height="5" rx="0.5" /><path d="M7 10 L7 12.5 M10 10 L10 13.5 M13 10 L13 12.5 M16 10 L16 13.5 M19 10 L19 12.5" /></>),
  "ruler-triangle": (<><path d="M5 19.5 L5 6.5 L18.5 19.5 Z" /><path d="M8 16.5 L8 14.5 M11 16.5 L11 13.5 M14 16.5 L14 14.5" /></>),
  "scissors": (<><circle cx="6.5" cy="7" r="2.2" /><circle cx="6.5" cy="17" r="2.2" /><path d="M8.2 8.5 L20 17.5 M8.2 15.5 L20 6.5" /></>),
  "scissors-cut": (<><circle cx="6" cy="7" r="2" /><circle cx="6" cy="17" r="2" /><path d="M7.7 8.3 L19 16 M7.7 15.7 L13 11 M15.5 8.5 L17.5 8.5 M16.5 7.5 L16.5 9.5" /></>),
  "stapler": (<><path d="M4 17.5 L4 12.5 L14 12.5 L18.5 15.5 L18.5 17.5 Z" /><path d="M4 19.5 L20 19.5 M7 12.5 L6 8.5 L12 8.5 L13 12.5" /></>),
  "paperclip": <path d="M9 4 C7 4 6 6 6 8 L6 16 C6 19 8.5 20.5 11 20.5 C13.8 20.5 16 18.5 16 15.5 L16 8 C16 6 14.5 5 13 5 C11.5 5 10 6 10 8 L10 15 C10 16.5 11 17.5 12.3 17.5 C13.6 17.5 14.5 16.5 14.5 15 L14.5 9" />,
  "pin": (<><path d="M9 3.5 L15 3.5 L13.5 10.5 L16 13.5 L16 15 L8 15 L8 13.5 L10.5 10.5 Z" /><path d="M12 15 L12 20.5" /></>),
  "pin-slant": (<><path d="M7 3.5 L13.5 5.5 L11.5 11.5 L13.5 15 L12 16.5 L7.5 13.5 L7 12 L9.5 9.5 Z" /><path d="M7.5 13.5 L4.5 20" /></>),
  "bookmark": <path d="M7 3.5 L17 3.5 L17 20.5 L12 16.5 L7 20.5 Z" />,
  "bookmark-plus": (<><path d="M7 3.5 L17 3.5 L17 20.5 L12 16.5 L7 20.5 Z" /><path d="M12 8 L12 12 M10 10 L14 10" /></>),
  "bookmark-star": (<><path d="M7 3.5 L17 3.5 L17 20.5 L12 16.5 L7 20.5 Z" /><path d="M12 7.5 L12.5 8.8 L13.9 9 L12.8 9.9 L13.1 11.3 L12 10.5 L10.9 11.3 L11.2 9.9 L10.1 9 L11.5 8.8 Z" /></>),
  "tag": (<><path d="M4.5 4.5 L13.5 4.5 L19.5 10.5 L12 18 L4.5 10.5 Z" /><circle cx="9.5" cy="9.5" r="1.3" /></>),
  "tag-plus": (<><path d="M4.5 4.5 L13 4.5 L19 10.5 L11.5 18 L4.5 11 Z" /><path d="M13 13.5 L13 16.5 M11.5 15 L14.5 15" /><circle cx="9.3" cy="9.3" r="1.2" /></>),
  "tag-sale": (<><path d="M4.5 4.5 L13.5 4.5 L19.5 10.5 L12 18 L4.5 10.5 Z" /><path d="M8 13 L13 8 M8.5 14.5 L8.6 14.5 M12.5 10.5 L12.6 10.5" /></>),
  "tags": (<><path d="M3.5 6 L10.5 6 L15.5 11 L10 16.5 L3.5 10 Z" /><path d="M11 4 L18 4 L21 7 L15.5 12.5 L13 10 Z" /><circle cx="8" cy="10" r="1.1" /></>),
  "calendar": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7" /></>),
  "calendar-plus": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M12 13.5 L12 17.5 M10 15.5 L14 15.5" /></>),
  "calendar-minus": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M10 15.5 L14 15.5" /></>),
  "calendar-check": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M10 15 L11.3 16.3 L14 13.5" /></>),
  "calendar-x": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M10.5 13.8 L13.7 17 M13.7 13.8 L10.5 17" /></>),
  "calendar-day": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7" /><rect x="10" y="13" width="4" height="4" rx="0.6" /></>),
  "calendar-week": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M8 14 L8 17 M12 14 L12 17 M16 14 L16 17" /></>),
  "calendar-month": (<><rect x="4" y="6" width="16" height="14" rx="1" /><path d="M4 10.5 L20 10.5 M8 3.5 L8 7 M16 3.5 L16 7 M8 13.5 L9.5 13.5 M11 13.5 L12.5 13.5 M14 13.5 L15.5 13.5 M8 16.5 L9.5 16.5 M11 16.5 L12.5 16.5" /></>),
  "clock": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5 L12 12 L15.5 14" /></>),
  "clock-plus": (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5 L12 10 M14.5 12.5 L14.5 15.5 M13 14 L16 14" /></>),
  "timer": (<><circle cx="12" cy="13.5" r="7.5" /><path d="M12 10 L12 13.5 L14.5 15 M9 3.5 L15 3.5 M12 3.5 L12 6" /></>),
  "timer-play": (<><circle cx="12" cy="13.5" r="7.5" /><path d="M9 3.5 L15 3.5 M12 3.5 L12 6 M11 11.5 L13.5 13.5 L11 15.5 Z" /></>),
  "alarm-clock": (<><circle cx="12" cy="13" r="7" /><path d="M12 9.5 L12 13 L14.5 14.5 M5.5 5.5 L3.5 3.5 M18.5 5.5 L20.5 3.5 M7 20.5 L5.5 19 M17 20.5 L18.5 19" /></>),
  "alarm-off": (<><circle cx="12" cy="13" r="7" /><path d="M5.5 5.5 L3.5 3.5 M18.5 5.5 L20.5 3.5 M6.5 6.5 L17.5 19" /></>),
  "hourglass": <path d="M6.5 3.5 L17.5 3.5 L17.5 6.5 L13.5 12 L17.5 17.5 L17.5 20.5 L6.5 20.5 L6.5 17.5 L10.5 12 L6.5 6.5 Z" />,
  "hourglass-half": (<><path d="M6.5 3.5 L17.5 3.5 L17.5 6.5 L13.5 12 L17.5 17.5 L17.5 20.5 L6.5 20.5 L6.5 17.5 L10.5 12 L6.5 6.5 Z" /><path d="M7.5 17.5 L16.5 17.5 L14.5 14.5 L9.5 14.5 Z" /></>),
  "inbox": (<><path d="M3.5 13.5 L6 7.5 L18 7.5 L20.5 13.5 L20.5 19.5 L3.5 19.5 Z" /><path d="M3.5 13.5 L7.5 13.5 L9 15.5 L15 15.5 L16.5 13.5 L20.5 13.5" /></>),
  "inbox-full": (<><path d="M3.5 13.5 L6 7.5 L18 7.5 L20.5 13.5 L20.5 19.5 L3.5 19.5 Z" /><path d="M9 9.5 L15 9.5 M9 11.5 L15 11.5 M3.5 13.5 L7.5 13.5 L9 15.5 L15 15.5 L16.5 13.5 L20.5 13.5" /></>),
  "outbox": (<><path d="M3.5 10.5 L20.5 10.5 L20.5 19.5 L3.5 19.5 Z" /><path d="M7 10.5 L9.5 4.5 L14.5 4.5 L17 10.5 M3.5 13.5 L7.5 13.5 L9 15.5 L15 15.5 L16.5 13.5 L20.5 13.5" /></>),
  "outbox-empty": (<><path d="M3.5 10.5 L20.5 10.5 L20.5 19.5 L3.5 19.5 Z" /><path d="M9 4.5 L15 4.5 L15 10.5 L9 10.5 Z" /></>),
  "send-plane": <path d="M20.5 3.5 L11 14.5 L8.5 15.5 L10.5 12 L20.5 3.5 M20.5 3.5 L14 20.5 L11 14.5 L20.5 3.5" />,
  "send-plane-up": (<><path d="M20.5 3.5 L11 14.5 L8.5 15.5 L10.5 12 L20.5 3.5 M20.5 3.5 L14 20.5 L11 14.5 L20.5 3.5" /><path d="M4 4.5 L4 8.5 M2.5 6.5 L5.5 6.5" /></>),
  "mail": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L12 13 L20 7" /></>),
  "mail-open": (<><path d="M3.5 8 L12 14 L20.5 8 L20.5 18.5 L3.5 18.5 Z" /><path d="M4 6.5 L12 12 L20 6.5 L20 5 L4 5 Z" /></>),
  "mail-plus": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L12 13 L20 7 M12 10.5 L12 15.5 M9.5 13 L14.5 13" /></>),
  "mail-check": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L9 11 M20 7 L15 11 M10 13.5 L11.3 14.8 L14 12" /></>),
  "mail-x": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L9 11 M20 7 L15 11 M10.5 12.5 L13.5 15.5 M13.5 12.5 L10.5 15.5" /></>),
  "mail-star": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L9 11 M20 7 L15 11 M12 12 L12.5 13.3 L13.9 13.5 L12.8 14.4 L13.1 15.8 L12 15 L10.9 15.8 L11.2 14.4 L10.1 13.5 L11.5 13.3 Z" /></>),
  "mail-forward": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L12 13 L20 7 M10 14.5 L14 14.5 M12 12.5 L14 14.5 L12 16.5" /></>),
  "mail-reply": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><path d="M4 7 L12 13 L20 7 M14 14.5 L10 14.5 M12 12.5 L10 14.5 L12 16.5" /></>),
  "envelope-seal": (<><rect x="3.5" y="6" width="17" height="12" rx="1" /><circle cx="12" cy="12" r="2.2" /><path d="M4 7 L9 11 M20 7 L15 11" /></>),
  "printer": (<><rect x="6.5" y="9.5" width="11" height="8" rx="1" /><path d="M7 9.5 L7 5.5 L17 5.5 L17 9.5 M7 14.5 L17 14.5 M6.5 17.5 L6.5 20.5 L17.5 20.5 L17.5 17.5" /><circle cx="15.5" cy="12" r="0.8" /></>),
  "printer-plus": (<><rect x="6.5" y="9.5" width="11" height="8" rx="1" /><path d="M7 9.5 L7 5.5 L17 5.5 L17 9.5 M6.5 18 L6.5 20.5 L11 20.5 M12 16 L12 19 M10.5 17.5 L13.5 17.5" /></>),
  "scanner": (<><rect x="4" y="7.5" width="16" height="12" rx="1" /><path d="M7 7.5 L7 4.5 L17 4.5 L17 7.5 M7 13.5 L17 13.5" /><circle cx="12" cy="16.5" r="0.8" /></>),
  "scanner-flat": (<><rect x="3.5" y="10.5" width="17" height="9" rx="1" /><path d="M3.5 13.5 L20.5 13.5 M6 7.5 L18 7.5 L18 10.5 L6 10.5 Z" /></>),
  "phone-handset": <path d="M6 4 L9.5 4 L11.5 9 L9.5 10.5 C10.5 12.5 12 14 14 15 L15.5 13 L20.5 15 L20.5 18.5 C20.5 19.5 19.5 20.5 18.5 20.5 C11 20.5 3.5 13 3.5 5.5 C3.5 4.5 5 4 6 4 Z" />,
  "phone-classic": (<><rect x="8" y="3.5" width="8" height="17" rx="1.2" /><path d="M6 6.5 L8 6.5 M6 9.5 L8 9.5 M16 6.5 L18 6.5 M16 9.5 L18 9.5 M5 12 L3.5 12 L3.5 14 L5 14 M19 12 L20.5 12 L20.5 14 L19 14" /><circle cx="12" cy="17.5" r="1" /></>),
  "mobile-phone": (<><rect x="7.5" y="3.5" width="9" height="17" rx="1.5" /><path d="M10.5 6 L13.5 6 M12 17.5 L12.1 17.5" /></>),
  "mobile-plus": (<><rect x="7.5" y="3.5" width="9" height="17" rx="1.5" /><path d="M12 8.5 L12 13.5 M9.5 11 L14.5 11" /></>),
  "keyboard": (<><rect x="3" y="8" width="18" height="10" rx="1.2" /><path d="M6 11 L6.1 11 M9 11 L12 11 M15 11 L18 11 M6 14.5 L7.5 14.5 M9.5 14.5 L14.5 14.5 M16.5 14.5 L18 14.5" /></>),
  "keyboard-wireless": (<><rect x="3" y="10.5" width="18" height="9" rx="1.2" /><path d="M6 13.8 L7.5 13.8 M10 13.8 L14 13.8 M16.5 13.8 L18 13.8 M10 16.8 L14 16.8 M7 5 L9 7 M17 5 L15 7 M12 3.5 L12 7" /></>),
  "mouse": (<><rect x="8" y="3.5" width="8" height="17" rx="4" /><path d="M12 3.5 L12 9 M12 6.5 L12.1 6.5" /></>),
  "mouse-wireless": (<><rect x="8" y="7" width="8" height="13.5" rx="4" /><path d="M12 7 L12 11.5 M9.5 3.5 L10.8 4.8 M14.5 3.5 L13.2 4.8 M12 2.5 L12 4" /></>),
  "monitor": (<><rect x="4" y="4.5" width="16" height="11" rx="1" /><path d="M9 19.5 L15 19.5 M12 15.5 L12 19.5 M6 19.5 L18 19.5" /></>),
  "monitor-plus": (<><rect x="4" y="4.5" width="16" height="11" rx="1" /><path d="M12 15.5 L12 20 M9.5 18 L14.5 18 M8 8 L8 12 M6 10 L10 10" /></>),
  "laptop": (<><path d="M6 6 L18 6 L18 15 L6 15 Z" /><path d="M3.5 18 L20.5 18 L19 15 L5 15 Z" /></>),
  "laptop-bag": (<><path d="M6 8 L18 8 L18 15.5 L6 15.5 Z" /><path d="M3.5 18.5 L20.5 18.5 L19.2 15.5 L4.8 15.5 Z M9.5 8 L9.5 6 C9.5 5 10.2 4.2 12 4.2 C13.8 4.2 14.5 5 14.5 6 L14.5 8" /></>),
  "tablet": (<><rect x="6" y="3.5" width="12" height="17" rx="1.2" /><circle cx="12" cy="17.5" r="0.9" /><path d="M9 6 L15 6" /></>),
  "tablet-pen": (<><rect x="3.5" y="4" width="11" height="16" rx="1" /><path d="M16 17 L20.5 7.5 L18.5 5.5 L14 15 Z M15 18.5 L16.8 16.7" /></>),
  "server-rack": (<><rect x="5" y="3.5" width="14" height="17" rx="1" /><path d="M5 8.5 L19 8.5 M5 12.5 L19 12.5 M5 16.5 L19 16.5" /><circle cx="7.5" cy="6" r="0.8" /><circle cx="7.5" cy="10.5" r="0.8" /><circle cx="7.5" cy="14.5" r="0.8" /></>),
  "server-stack": (<><rect x="4" y="4" width="16" height="5" rx="1" /><rect x="4" y="11" width="16" height="5" rx="1" /><circle cx="7" cy="6.5" r="0.8" /><circle cx="7" cy="13.5" r="0.8" /></>),
  "database": (<><path d="M5 6 C5 4.5 8 3.5 12 3.5 C16 3.5 19 4.5 19 6 L19 18 C19 19.5 16 20.5 12 20.5 C8 20.5 5 19.5 5 18 Z" /><path d="M5 6 C5 7.5 8 8.5 12 8.5 C16 8.5 19 7.5 19 6 M5 12 C5 13.5 8 14.5 12 14.5 C16 14.5 19 13.5 19 12" /></>),
  "database-plus": (<><path d="M5 6 C5 4.5 8 3.5 12 3.5 C16 3.5 19 4.5 19 6 L19 11" /><path d="M5 6 C5 7.5 8 8.5 12 8.5 C16 8.5 19 7.5 19 6 M14 15 L14 20 M11.5 17.5 L16.5 17.5" /></>),
  "database-search": (<><path d="M5 6 C5 4.5 8 3.5 12 3.5 C16 3.5 19 4.5 19 6 L19 11" /><path d="M5 6 C5 7.5 8 8.5 12 8.5 C16 8.5 19 7.5 19 6" /><circle cx="15" cy="16.5" r="3" /><path d="M17.2 18.7 L20 21.5" /></>),
  "cloud": <path d="M7 18.5 C4.5 18.5 3.5 16.5 3.5 14.8 C3.5 13 5 11.8 6.8 11.5 C7.3 8.5 9.5 6.5 12.5 6.5 C15.5 6.5 17.8 8.5 18.3 11.3 C19.8 11.5 20.5 12.8 20.5 14.3 C20.5 16.3 19.3 18.5 17 18.5 Z" />,
  "cloud-up": (<><path d="M7 15.5 C4.8 15.5 3.5 14 3.5 12.5 C3.5 11 5 10 6.5 9.8 C7 7.3 9.2 5.5 12 5.5 C14.8 5.5 16.8 7.2 17.5 9.5 C18.8 9.7 20 10.8 20 12.3" /><path d="M12 19.5 L12 12.5 M9.5 15 L12 12.5 L14.5 15" /></>),
  "cloud-down": (<><path d="M7 15.5 C4.8 15.5 3.5 14 3.5 12.5 C3.5 11 5 10 6.5 9.8 C7 7.3 9.2 5.5 12 5.5 C14.8 5.5 16.8 7.2 17.5 9.5 C18.8 9.7 20 10.8 20 12.3" /><path d="M12 12.5 L12 19.5 M9.5 17 L12 19.5 L14.5 17" /></>),
  "cloud-lock": (<><path d="M7 18.5 C4.5 18.5 3.5 16.5 3.5 14.8 C3.5 13 5 11.8 6.8 11.5 C7.3 8.5 9.5 6.5 12.5 6.5 C15.5 6.5 17.8 8.5 18.3 11.3 C19.8 11.5 20.5 12.8 20.5 14.3" /><rect x="11" y="14" width="6" height="5" rx="0.8" /></>),
  "lock": (<><rect x="5.5" y="10.5" width="13" height="9.5" rx="1.2" /><path d="M8 10.5 L8 7.5 C8 5.3 9.8 3.8 12 3.8 C14.2 3.8 16 5.3 16 7.5 L16 10.5" /><circle cx="12" cy="15" r="1.2" /></>),
  "unlock": (<><rect x="5.5" y="10.5" width="13" height="9.5" rx="1.2" /><path d="M8 10.5 L8 7.5 C8 5.3 9.8 3.8 12 3.8 C14.2 3.8 16 5.5 16 8" /><circle cx="12" cy="15" r="1.2" /></>),
  "key": (<><circle cx="8" cy="12" r="4.5" /><path d="M11.5 15.5 L20.5 6.5 M17 10 L19.5 7.5 M15 12 L17 10" /></>),
  "key-round": (<><circle cx="8.5" cy="14.5" r="4.5" /><path d="M12 11 L20 3.5 M16.5 7 L18.8 4.7 M14.5 9 L16.8 6.7" /><circle cx="8.5" cy="14.5" r="1.2" /></>),
  "shield": <path d="M12 3.5 L18.5 6 L18.5 11.5 C18.5 16 15.5 18.8 12 20.5 C8.5 18.8 5.5 16 5.5 11.5 L5.5 6 Z" />,
  "shield-check": (<><path d="M12 3.5 L18.5 6 L18.5 11.5 C18.5 16 15.5 18.8 12 20.5 C8.5 18.8 5.5 16 5.5 11.5 L5.5 6 Z" /><path d="M9.3 11.8 L11.3 13.8 L14.8 10.3" /></>),
  "shield-lock": (<><path d="M12 3.5 L18.5 6 L18.5 11.5 C18.5 16 15.5 18.8 12 20.5 C8.5 18.8 5.5 16 5.5 11.5 L5.5 6 Z" /><rect x="10" y="11" width="4" height="3.5" rx="0.6" /><path d="M10.7 11 L10.7 10 C10.7 9.3 11.3 8.8 12 8.8 C12.7 8.8 13.3 9.3 13.3 10 L13.3 11" /></>),
  "eye": (<><path d="M3.5 12 C5.5 8.5 8.5 6.5 12 6.5 C15.5 6.5 18.5 8.5 20.5 12 C18.5 15.5 15.5 17.5 12 17.5 C8.5 17.5 5.5 15.5 3.5 12 Z" /><circle cx="12" cy="12" r="2.5" /></>),
  "eye-off": (<><path d="M4 5.5 L20 18.5" /><path d="M6 8.5 C8 7 10 6.5 12 6.5 C15.5 6.5 18.5 8.5 20.5 12 C19.5 13.8 17.8 15.3 15.8 16.2 M9 9.5 C9.8 9.2 10.9 9 12 9 C13.5 9 14.8 10 15.5 11.5" /><circle cx="12" cy="12" r="2.5" /></>),
  "eye-plus": (<><path d="M3.5 12 C5.5 8.5 8.5 6.5 12 6.5 C13.8 6.5 15.5 7.2 17 8.3" /><circle cx="12" cy="12" r="2.5" /><path d="M17.5 14.5 L17.5 19.5 M15 17 L20 17" /></>),
  "search": (<><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5 L20.5 20.5" /></>),
  "search-plus": (<><circle cx="11" cy="11" r="6" /><path d="M15.5 15.5 L20.5 20.5 M11 8.5 L11 13.5 M8.5 11 L13.5 11" /></>),
  "search-folder": (<><circle cx="13.5" cy="13.5" r="5" /><path d="M17.2 17.2 L21 21 M4 6 L4 9.5 L11 9.5 L12.5 11 L12.5 8 L7 8 L6 6 Z" /></>),
  "gear": (<><circle cx="12" cy="12" r="3" /><path d="M12 4.5 L12 7 M12 17 L12 19.5 M4.5 12 L7 12 M17 12 L19.5 12 M6.7 6.7 L8.5 8.5 M15.5 15.5 L17.3 17.3 M17.3 6.7 L15.5 8.5 M8.5 15.5 L6.7 17.3" /></>),
  "gears": (<><circle cx="9" cy="13" r="2.5" /><circle cx="16" cy="9.5" r="2" /><path d="M9 7.5 L9 9.5 M9 16.5 L9 18.5 M3.5 13 L5.5 13 M12.5 13 L13.5 13 M16 4.5 L16 6 M16 13 L16 14.5 M11.5 9.5 L13 9.5 M19 9.5 L20.5 9.5" /></>),
  "gear-plus": (<><circle cx="12" cy="12" r="3" /><path d="M12 4.5 L12 6.5 M12 17.5 L12 19.5 M4.5 12 L6.5 12 M17.5 12 L19.5 12 M16 16.5 L16 20.5 M14 18.5 L18 18.5" /></>),
  "wrench": <path d="M18.5 3.5 C17 3.5 15.5 4.5 15 6 C14.5 7.5 15 9 16.3 10.3 L8.5 18.1 L5.9 15.5 L13.7 7.7 C12.4 6.4 10.9 6 9.4 6.5 C9.9 8 9.5 9.8 8 11.3 C9.5 12.3 11.5 12 13 10.5 L14.5 12 C13 14 10.8 14.5 9 13.5 L8 14.5 L9.5 16 L10.5 15 C11.5 16.8 14 17.3 16 15.3 L20.5 10.8 C21 8 20 4.5 18.5 3.5 Z" />,
  "wrench-plus": (<><path d="M14.5 5.5 C13.5 5.5 12.5 6.3 12.2 7.3 C12 8.3 12.4 9.2 13.2 10 L6 17.2 L8.8 20 L16 12.8 C16.8 13.6 17.7 14 18.7 13.8" /><path d="M17 16 L17 21 M14.5 18.5 L19.5 18.5" /></>),
  "hammer": (<><path d="M13.5 4.5 L19.5 10.5 L17.5 12.5 L11.5 6.5 Z" /><path d="M11 7 L4.5 13.5 L6 15 L7.5 16.5 L9 18 L10.5 19.5 L11.5 20.5 L20 12 L19 11 Z M4.5 13.5 L3 15" /></>),
  "screwdriver": <path d="M14.5 4.5 L19.5 9.5 L12.5 16.5 L9.5 20.5 L7.5 20.5 L7.5 18.5 L11.5 15.5 Z M15.5 3.5 L20.5 8.5" />,
  "trash": (<><path d="M5 7 L19 7 L18 20.5 L6 20.5 Z" /><path d="M9 7 L9 4.5 L15 4.5 L15 7 M10 11 L10 17 M14 11 L14 17 M4 7 L20 7" /></>),
  "trash-plus": (<><path d="M5 7 L19 7 L18 20.5 L6 20.5 Z" /><path d="M9 7 L9 4.5 L15 4.5 L15 7 M12 11 L12 17 M9.5 14 L14.5 14" /></>),
  "edit-line": (<><path d="M5 19 L6 15 L14.5 6.5 C15.2 5.8 16.3 5.8 17 6.5 C17.7 7.2 17.7 8.3 17 9 L8.5 17.5 Z" /><path d="M13 8 L16 11 M4 21.5 L12 21.5" /></>),
  "copy": (<><rect x="8.5" y="8.5" width="11" height="11" rx="1" /><path d="M5 15.5 L5 5.5 C5 4.5 5.5 4 6.5 4 L15.5 4" /></>),
  "copy-plus": (<><rect x="8.5" y="8.5" width="11" height="11" rx="1" /><path d="M5 15.5 L5 5.5 C5 4.5 5.5 4 6.5 4 L15.5 4 M12 12.5 L12 16.5 M10 14.5 L14 14.5" /></>),
  "paste": (<><rect x="5" y="9" width="14" height="11" rx="1" /><path d="M9 9 L9 6.5 L8 6.5 L8 4.5 L16 4.5 L16 6.5 L15 6.5 L15 9 M9 13 L15 13" /></>),
  "paste-clip": (<><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M9 10 L9 7 L9.5 7 L9.5 4 L14.5 4 L14.5 7 L15 7 L15 10 M10 8 L14 8" /></>),
  "save-floppy": (<><path d="M5 5 L15.5 5 L19 8.5 L19 19.5 L5 19.5 Z" /><path d="M8 5 L8 10 L15 10 L15 5 M8 19.5 L8 14.5 L16 14.5 L16 19.5" /></>),
  "save-disk": (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /><path d="M12 3.5 L12 6 M12 18 L12 20.5 M3.5 12 L6 12 M18 12 L20.5 12" /></>),
  "star": <path d="M12 4 L14.2 9.2 L19.8 9.6 L15.2 13 L16.6 18.5 L12 15.5 L7.4 18.5 L8.8 13 L4.2 9.6 L9.8 9.2 Z" />,
  "star-plus": (<><path d="M12 4 L13.8 8.5 L18.5 8.8 L15 11.8 L15.8 15.5 L12 13.2 L8.2 15.5 L9 11.8 L5.5 8.8 L10.2 8.5 Z" /><path d="M17.5 15 L17.5 20 M15 17.5 L20 17.5" /></>),
  "star-half": (<><path d="M12 4 L14.2 9.2 L19.8 9.6 L15.2 13 L16.6 18.5 L12 15.5 L7.4 18.5 L8.8 13 L4.2 9.6 L9.8 9.2 Z" /><path d="M12 4 L12 15.5" /></>),
  "heart": <path d="M12 20 C7 16 4 13 4 9.5 C4 7 6 5.5 8 5.5 C9.5 5.5 11 6.5 12 8 C13 6.5 14.5 5.5 16 5.5 C18 5.5 20 7 20 9.5 C20 13 17 16 12 20 Z" />,
  "heart-plus": (<><path d="M12 18.5 C8 15.2 5.5 12.8 5.5 10 C5.5 8.2 7 7 8.5 7 C9.7 7 10.8 7.8 12 9.3 C13.2 7.8 14.3 7 15.5 7" /><path d="M17.5 11.5 L17.5 17.5 M14.5 14.5 L20.5 14.5" /></>),
  "flag": (<><path d="M6 21.5 L6 3.5" /><path d="M6 4.5 L18.5 4.5 L16 8.5 L18.5 12.5 L6 12.5" /></>),
  "flag-plus": (<><path d="M6 21.5 L6 3.5" /><path d="M6 4.5 L18.5 4.5 L16 8.5 L18.5 12.5 L6 12.5 M14 15.5 L14 20.5 M11.5 18 L16.5 18" /></>),
  "flag-wave": (<><path d="M6 21.5 L6 3.5" /><path d="M6 5 C9 3.5 11 6.5 14 5 C16 4 17.5 4.5 19 5.5 L19 12.5 C17.5 11.5 16 11 14 12 C11 13.5 9 10.5 6 12 Z" /></>),
  "bell": (<><path d="M6 16.5 L6 11 C6 7.5 8.5 5 12 5 C15.5 5 18 7.5 18 11 L18 16.5 L20 18 L4 18 Z" /><path d="M10 18.5 C10 19.8 11 20.5 12 20.5 C13 20.5 14 19.8 14 18.5" /></>),
  "bell-off": (<><path d="M4.5 4.5 L19.5 19.5" /><path d="M9 6 C10 5.3 11 5 12 5 C15.5 5 18 7.5 18 11 L18 16.5 L20 18 L14 18 M10 18.5 C10.2 19.5 11 20.5 12 20.5" /></>),
  "bell-plus": (<><path d="M6 13.5 L6 10.5 C6 7.5 8.5 5 12 5 C15.5 5 18 7.5 18 10.5 L18 13.5 L19.5 15 L4.5 15 Z" /><path d="M12 15 L12 20 M9.5 17.5 L14.5 17.5" /></>),
  "bell-ring": (<><path d="M6 16.5 L6 11 C6 7.5 8.5 5 12 5 C15.5 5 18 7.5 18 11 L18 16.5 L20 18 L4 18 Z" /><path d="M3 8 L4.5 9.5 M21 8 L19.5 9.5 M10 18.5 C10 19.8 11 20.5 12 20.5 C13 20.5 14 19.8 14 18.5" /></>),
  "megaphone": (<><path d="M4 11 L16 5.5 L16 18.5 L4 14 Z" /><path d="M4 11 L4 14 M6.5 14 L6.5 19.5 L10.5 19.5 L10.5 15.5 M18 9 L19.5 9.5 L19.5 14.5 L18 15" /></>),
  "megaphone-plus": (<><path d="M3.5 10.5 L14 5.5 L14 16.5 L3.5 13 Z" /><path d="M6 13 L6 18 L9.5 18 M17 13 L17 18 M14.5 15.5 L19.5 15.5" /></>),
  "briefcase": (<><rect x="4" y="8" width="16" height="11" rx="1.2" /><path d="M9 8 L9 6 C9 4.8 9.8 4 12 4 C14.2 4 15 4.8 15 6 L15 8 M4 13 L20 13" /></>),
  "briefcase-plus": (<><rect x="4" y="8" width="16" height="11" rx="1.2" /><path d="M9 8 L9 6 C9 4.8 9.8 4 12 4 C14.2 4 15 4.8 15 6 L15 8 M12 11.5 L12 15.5 M10 13.5 L14 13.5" /></>),
  "briefcase-check": (<><rect x="4" y="8" width="16" height="11" rx="1.2" /><path d="M9 8 L9 6 C9 4.8 9.8 4 12 4 C14.2 4 15 4.8 15 6 L15 8 M9.8 13.5 L11.2 14.9 L14.3 12" /></>),
  "id-card": (<><rect x="3.5" y="6" width="17" height="12" rx="1.2" /><circle cx="8.5" cy="11" r="1.8" /><path d="M6 15.5 C6 14 7.2 13.2 8.5 13.2 C9.8 13.2 11 14 11 15.5 M13.5 10 L17.5 10 M13.5 13 L17.5 13 M13.5 16 L16.5 16" /></>),
  "id-badge": (<><rect x="6.5" y="7.5" width="11" height="13" rx="1" /><circle cx="12" cy="12" r="2" /><path d="M9.5 17 C9.5 16 10.5 15.2 12 15.2 C13.5 15.2 14.5 16 14.5 17 M9 7.5 L9 4.5 L15 4.5 L15 7.5" /></>),
  "business-card": (<><rect x="3" y="7" width="18" height="10" rx="1.2" /><path d="M6 10.5 L9 10.5 M6 13.5 L10 13.5" /><circle cx="16" cy="12" r="1.8" /></>),
  "coffee-cup": (<><path d="M5 9 L18 9 L16.8 18 L6.2 18 Z" /><path d="M18 10.5 L19.8 10.5 C20.5 10.5 20.8 11.5 20.5 12.5 C20.2 13.8 19.3 14.8 18 14.8 M7 5.5 C7 6.5 8 6.5 8 7.5 M11 5.5 C11 6.5 12 6.5 12 7.5" /></>),
  "coffee-mug": (<><rect x="4.5" y="7.5" width="12" height="11" rx="1" /><path d="M16.5 10 L19 10 C20 10 20.5 11 20.3 12.5 C20.1 14 19.2 15.5 16.5 15.5 M7.5 4.5 C7.5 5.5 8.3 5.5 8.3 6.5 M11.5 4.5 C11.5 5.5 12.3 5.5 12.3 6.5" /></>),
  "paper-stack": (<><path d="M7 7 L19 7 L19 19 L7 19 Z" /><path d="M5 17 L5 5 L17 5 M3.5 15 L3.5 3.5 L15.5 3.5" /></>),
  "paper-shred": (<><path d="M6 3.5 L18 3.5 L18 12.5 L6 12.5 Z" /><path d="M6 12.5 L7 20.5 L9 14.5 L11 20.5 L13 14.5 L15 20.5 L17 14.5 L18 20.5" /></>),
  "sticky-note": (<><path d="M5.5 4.5 L18.5 4.5 L18.5 15.5 L13.5 20.5 L5.5 20.5 Z" /><path d="M13.5 20.5 L13.5 15.5 L18.5 15.5 M8.5 9 L15.5 9 M8.5 12 L13.5 12" /></>),
  "sticky-notes": (<><path d="M9 9 L20 9 L20 20 L9 20 Z" /><path d="M4 4 L15 4 L15 12 M6.5 12 L6.5 17.5 L4 15" /></>),
  "note-pen": (<><path d="M4.5 4.5 L13.5 4.5 L13.5 17.5 L4.5 17.5 Z" /><path d="M15 18.5 L19.5 9 L17.5 7 L13 16.5 Z M14 19.5 L15.8 17.7" /></>),
  "desk-lamp": (<><path d="M5 20.5 L10 20.5 M8 20.5 L8 14 L15 7.5" /><path d="M13 5.5 L18.5 11 L16.5 13 L11 7.5 Z M8 14 L5.5 16.5" /><circle cx="8" cy="14" r="1" /></>),
  "desk-organizer": (<><path d="M4.5 12.5 L19.5 12.5 L18 20.5 L6 20.5 Z" /><path d="M7 12.5 L7 8 L10 8 L10 12.5 M14 12.5 L14 5.5 L17 5.5 L17 12.5" /></>),
  "binder": (<><path d="M7 4.5 L18.5 4.5 L18.5 19.5 L7 19.5 Z" /><path d="M4.5 7 L7 7 M4.5 12 L7 12 M4.5 17 L7 17 M10 9 L15.5 9 M10 12.5 L15.5 12.5 M10 16 L15.5 16" /></>),
  "binder-clip": (<><path d="M7 10 L17 10 L18 20 L6 20 Z" /><path d="M9 10 C9 7 10 4.5 12 4.5 C14 4.5 15 7 15 10 M10.5 6.5 L7.5 3.5 M13.5 6.5 L16.5 3.5" /></>),
  "tape": (<><circle cx="10" cy="13" r="6" /><circle cx="10" cy="13" r="2.2" /><path d="M13.5 8.5 L20 5.5 L19 9.5 Z" /></>),
  "glue": (<><path d="M10 9 L18 9 L18 20 L10 20 Z" /><path d="M12 9 L12 5.5 L14.5 5.5 L14.5 3.5 M10 13.5 L14 13.5" /></>),
  "highlighter": (<><path d="M6 16 L13.5 8.5 L16.5 11.5 L9 19 L5 20 Z" /><path d="M14.5 4.5 L19.5 9.5 L18 11 L13 6 Z" /></>),
  "marker": (<><path d="M5 19 L7 17 L15.5 8.5 L17.5 10.5 L9 19 Z" /><path d="M14 5 L19 10 L17.5 11.5 L12.5 6.5 Z M4 21 L7 20 L5.5 18.5 Z" /></>),
  "calculator": (<><rect x="6" y="3.5" width="12" height="17" rx="1.2" /><path d="M8.5 7 L15.5 7 M8.5 11 L9.5 11 M11.5 11 L12.5 11 M14.5 11 L15.5 11 M8.5 14 L9.5 14 M11.5 14 L12.5 14 M14.5 14 L15.5 14 M8.5 17 L9.5 17 M11.5 17 L15.5 17" /></>),
  "calculator-plus": (<><rect x="6" y="3.5" width="12" height="17" rx="1.2" /><path d="M8.5 6.5 L15.5 6.5 M9 13 L9 17 M7 15 L11 15" /></>),
  "abacus": (<><rect x="5" y="4" width="14" height="16" rx="1" /><path d="M5 12 L19 12 M8 4 L8 20 M12 4 L12 20 M16 4 L16 20" /><circle cx="8" cy="9" r="1.2" /><circle cx="12" cy="14.5" r="1.2" /><circle cx="16" cy="8" r="1.2" /></>),
  "whiteboard": (<><rect x="3.5" y="5" width="17" height="11" rx="0.8" /><path d="M7 20.5 L17 20.5 M12 16 L12 20.5 M7 9 L10 9 L10 12 L14 12" /></>),
  "presentation-board": (<><rect x="4" y="4.5" width="16" height="10" rx="0.8" /><path d="M12 14.5 L12 18.5 M8 20.5 L16 20.5 M9 8 L15 8 M10 10.5 L14 10.5" /></>),
  "overhead-projector": (<><rect x="7" y="10.5" width="10" height="6" rx="1" /><circle cx="12" cy="13.5" r="1.8" /><path d="M12 10.5 L12 5.5 L18 5.5 M4 20.5 L20 20.5 M9 16.5 L9 18.5 M15 16.5 L15 18.5" /></>),
  "projector-screen": (<><path d="M5 12 L19 12 L18 19.5 L6 19.5 Z" /><path d="M12 12 L12 8 M8 5.5 L16 5.5 M7 8.5 C7 8.5 9 10 12 10 C15 10 17 8.5 17 8.5" /></>),
  "file-cabinet": (<><rect x="5.5" y="3.5" width="13" height="17" rx="0.8" /><path d="M5.5 9 L18.5 9 M5.5 14.5 L18.5 14.5 M10 6 L14 6 M10 11.5 L14 11.5 M10 17 L14 17" /><circle cx="12" cy="6" r="0.5" /></>),
  "drawer": (<><rect x="4" y="5" width="16" height="14" rx="1" /><path d="M4 12 L20 12 M10 7.5 L14 7.5 M10 14.5 L14 14.5" /><circle cx="12" cy="8.5" r="0.6" /><circle cx="12" cy="15.5" r="0.6" /></>),
  "shelf": (<><path d="M4 7 L20 7 M4 14.5 L20 14.5 M4 20.5 L20 20.5" /><path d="M6 7 L6 14.5 M18 14.5 L18 20.5 M7 4.5 L9 4.5 L9 7 L7 7 M14 11.5 L16.5 11.5 L16.5 14.5 L14 14.5" /></>),
  "box-seal": (<><rect x="4.5" y="8" width="15" height="11.5" rx="0.6" /><path d="M4.5 8 L12 12 L19.5 8 M12 12 L12 19.5 M8 5.5 L16 5.5 L16 8 L8 8 Z" /></>),
  "package-check": (<><path d="M4 7.5 L12 3.5 L20 7.5 L20 16.5 L12 20.5 L4 16.5 Z" /><path d="M4 7.5 L12 11.5 L20 7.5 M12 11.5 L12 20.5 M9 13.8 L10.8 15.5 L14 12.5" /></>),
  "rubber-stamp": (<><path d="M8 9 L8 12 C8 13.5 6.5 14 6 15.5 C5.5 17 6 19.5 6 19.5 L18 19.5 C18 19.5 18.5 17 18 15.5 C17.5 14 16 13.5 16 12 L16 9 Z" /><path d="M9.5 9 L9.5 5.5 L14.5 5.5 L14.5 9 M6 19.5 L4.5 21 M18 19.5 L19.5 21" /></>),
  "stamp-pad": (<><rect x="3.5" y="14.5" width="17" height="5" rx="1" /><path d="M7 14.5 L7 11.5 L17 11.5 L17 14.5 M10 11.5 L10 8 L14 8 L14 11.5 M10 5.5 L14 5.5" /></>),
  "ink-bottle": (<><path d="M8.5 10.5 L15.5 10.5 L17 20.5 L7 20.5 Z" /><path d="M10 10.5 L10 7.5 L14 7.5 L14 10.5 M10.5 4.5 L13.5 4.5 L14 7.5 L10 7.5 Z M10 14 L14 14" /></>),
  "coffee-beans": (<><path d="M9 4.5 C6 4.5 4.5 7.5 4.5 12 C4.5 16.5 6 19.5 9 19.5 C12 19.5 13.5 16.5 13.5 12 C13.5 7.5 12 4.5 9 4.5 Z" /><path d="M9 4.5 C7.5 7 10.5 9 9 12 C7.5 15 10 17 9 19.5 M15.5 7 C14 7 13.2 8.8 13.2 11.5 M15.5 13 C17.5 13 19.5 14.5 19.5 16.5" /></>),
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
  "sun": (<><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/></>),
  "sunrise": (<><path d="M4 16.5h16M7 16.5a5 5 0 0 1 10 0"/><path d="M12 4v5M9.5 6.5 12 4l2.5 2.5"/></>),
  "sunset": (<><path d="M4 16.5h16M7 16.5a5 5 0 0 1 10 0"/><path d="M12 9V4M9.5 6.5 12 9l2.5-2.5"/></>),
  "sun-haze": (<><circle cx="12" cy="9" r="3.5"/><path d="M4 15.5h16M6 18.5h12M8 21h8"/></>),
  "sun-cloud": (<><circle cx="9" cy="8" r="3"/><path d="M7 19h10.5a3 3 0 0 0 .5-6A4.5 4.5 0 0 0 9.5 14 2.5 2.5 0 0 0 7 19Z"/></>),
  "moon-crescent": <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z"/>,
  "moon-full": (<><circle cx="12" cy="12" r="7.5"/><circle cx="10" cy="10.5" r="1.2"/><circle cx="13.5" cy="13.5" r="1.6"/></>),
  "moon-new": (<><circle cx="12" cy="12" r="7.5"/><path d="M7 12h10"/></>),
  "moon-half": (<><circle cx="12" cy="12" r="7.5"/><path d="M12 4.5v15"/></>),
  "moon-gibbous": (<><circle cx="12" cy="12" r="7.5"/><path d="M14 4.8a6 6 0 0 1 0 14.4"/></>),
  "star-single": <path d="M12 3.5 14.5 9.5l6.5.8-4.8 4.4 1.3 6.3L12 17.8 6.5 21l1.3-6.3L3 10.3l6.5-.8L12 3.5Z"/>,
  "star-double": (<><path d="M8 4.5 9.8 8.4l4.2.5-3.1 2.8.8 4.1L8 13.7l-3.7 2.1.8-4.1-3.1-2.8 4.2-.5L8 4.5Z"/><path d="M16.5 13.5l1.2 2.6 2.8.3-2.1 1.9.6 2.7-2.5-1.4-2.5 1.4.6-2.7-2.1-1.9 2.8-.3 1.2-2.6Z"/></>),
  "star-shooting": (<><path d="M5 4.5 6.8 8.2l4 .6-3 2.7.8 4L5 13.6l-3.6 1.9.8-4-1.2-1.1"/><path d="M9 4.5l8 8M13 4.5h5v5"/></>),
  "star-cluster": (<><circle cx="7" cy="7" r="1.5"/><circle cx="16.5" cy="6.5" r="1.5"/><circle cx="12" cy="15" r="1.5"/><path d="M8.3 7.8l2.4 5M15.3 7.6l-2 5.2"/></>),
  "constellation": (<><circle cx="5" cy="6" r="1.3"/><circle cx="12" cy="4.5" r="1.3"/><circle cx="18.5" cy="8" r="1.3"/><path d="M6.2 6.3 10.8 5M13.2 5.2l4 2M18 9.3 15 18l-6 2.5"/></>),
  "cloud-single": <path d="M6.5 19h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 13.5 3 3 0 0 0 6.5 19Z"/>,
  "cloud-double": (<><path d="M4 15.5h9a2.5 2.5 0 0 0 .5-5A4 4 0 0 0 6 12 2.2 2.2 0 0 0 4 15.5Z"/><path d="M12 20h7.5a2.8 2.8 0 0 0 .5-5.5 4.2 4.2 0 0 0-8 1 2.3 2.3 0 0 0 0 4.5Z"/></>),
  "cloud-sun": (<><circle cx="8" cy="7" r="2.8"/><path d="M8 19.5h10.5a3 3 0 0 0 .5-6A4.5 4.5 0 0 0 10.5 15 2.5 2.5 0 0 0 8 19.5Z"/></>),
  "cloud-moon": (<><path d="M14.5 3.5a3.5 3.5 0 1 0 4 4"/><path d="M8 20h10.5a3 3 0 0 0 .5-6A4.5 4.5 0 0 0 10.5 15.5 2.5 2.5 0 0 0 8 20Z"/></>),
  "cloud-rain": (<><path d="M6.5 15h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 9.5 3 3 0 0 0 6.5 15Z"/><path d="M8.5 17.5 7.5 21M12.5 17.5l-1 3.5M16.5 17.5l-1 3.5"/></>),
  "cloud-drizzle": (<><path d="M6.5 14h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 8.5 3 3 0 0 0 6.5 14Z"/><path d="M9 17v2M12 17v2.5M15 17v2"/></>),
  "cloud-storm": (<><path d="M6.5 14h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 8.5 3 3 0 0 0 6.5 14Z"/><path d="M12.5 14 10 18.5h3L11.5 22"/></>),
  "cloud-snow": (<><path d="M6.5 14h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 8.5 3 3 0 0 0 6.5 14Z"/><path d="M9 17.5h.1M12 19.5h.1M15 17.5h.1"/></>),
  "cloud-wind": (<><path d="M6.5 12h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 6.5 3 3 0 0 0 6.5 12Z"/><path d="M4 16.5h11M6 19.5h9"/></>),
  "rain-drop": <path d="M12 3.5s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11Z"/>,
  "rain-lines": (<><circle cx="12" cy="8" r="4"/><path d="M8 14.5 6.5 20M12 14.5 10.5 20M16 14.5 14.5 20"/></>),
  "rain-heavy": (<><path d="M6.5 12h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 6.5 3 3 0 0 0 6.5 12Z"/><path d="M7.5 15 6 20M11.5 15l-1.5 5M15.5 15l-1.5 5M19 15l-1 3.5"/></>),
  "drizzle": (<><path d="M7 11a4.5 4.5 0 1 1 .8 8.9H5"/><path d="M9.5 16.5 8.5 20M13 16.5l-1 3.5M16.5 16.5 15.5 20"/></>),
  "snowflake": (<><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><path d="M10 5.5 12 3l2 2.5M10 18.5 12 21l2-2.5"/></>),
  "snowfall": (<><circle cx="7" cy="6" r="1.4"/><circle cx="16.5" cy="8" r="1.4"/><path d="M7 10.5 5.5 17M16.5 12.5l-1.5 6M11 4v3M12.5 18.5l-1 3"/></>),
  "snow-hill": (<><path d="M3 18.5h18"/><path d="M4 18.5a5 5 0 0 1 9-3 4.5 4.5 0 0 1 7 3"/><circle cx="17" cy="7" r="1.5"/></>),
  "hail": (<><path d="M6.5 12h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 6.5 3 3 0 0 0 6.5 12Z"/><circle cx="9.5" cy="17.5" r="1.3"/><circle cx="14.5" cy="18.5" r="1.3"/></>),
  "lightning-bolt": <path d="M13.5 2.5 5.5 13.5H11l-1 8 8-11h-5.5l1-8Z"/>,
  "lightning-cloud": (<><path d="M6.5 12h11a3.5 3.5 0 0 0 .6-7A5.5 5.5 0 0 0 8 6.5 3 3 0 0 0 6.5 12Z"/><path d="M12.5 12 9.5 16.5h2.5l-1 5 4-6.5h-2.5l1-3Z"/></>),
  "thunder": (<><path d="M4 8l3-3M20 8l-3-3"/><path d="M13 9.5 6.5 17H11l-1 4.5L16.5 14H12l1-4.5Z"/></>),
  "wind-lines": <path d="M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5M3 12.5h14a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7"/>,
  "wind-swirl": (<><path d="M3 9h9a2.5 2.5 0 1 0-2.5-2.5"/><circle cx="16.5" cy="15" r="4.5"/><path d="M16.5 12.5v2.5l2-1.5"/></>),
  "breeze": (<><path d="M3 10h12M3 14h16"/><circle cx="17.5" cy="10" r="1.5"/><circle cx="7" cy="14" r="1.5"/></>),
  "thermometer-cold": (<><path d="M10 4.5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0V4.5Z"/><path d="M12 8.5v5M10.5 11.5 9 13M13.5 11.5 15 13"/></>),
  "thermometer-hot": (<><path d="M10 4.5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0V4.5Z"/><circle cx="12" cy="17" r="1.6"/><path d="M17.5 4.5 20 7M20 4.5l-2.5 2.5"/></>),
  "thermometer-mid": (<><path d="M10 4.5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0V4.5Z"/><path d="M12 14v3"/></>),
  "umbrella-closed": (<><path d="M12 2.5v17M12 19.5a1.5 1.5 0 0 0 3 0"/><path d="M10.5 4.5 12 2.5l1.5 2"/></>),
  "umbrella-open": (<><path d="M12 3.5a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z"/><path d="M12 11.5V21a1.8 1.8 0 0 0 3.5 0"/></>),
  "umbrella-rain": (<><path d="M12 3.5a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z"/><path d="M12 11.5V19M7 15.5 6 19M17 15.5l1 3.5"/></>),
  "rainbow-arc": (<><path d="M4 18.5a8 8 0 0 1 16 0"/><path d="M7 18.5a5 5 0 0 1 10 0"/><circle cx="12" cy="18.5" r="1.3"/></>),
  "rainbow-cloud": (<><path d="M5 17.5a7 7 0 0 1 14 0"/><path d="M5 17.5h5M14 17.5h5"/></>),
  "fog": (<><circle cx="12" cy="7" r="3"/><path d="M4 13.5h16M6 16.5h12M4 19.5h16"/></>),
  "mist": (<><path d="M4 7.5h16M6 11h12M4 14.5h16M6 18h12"/></>),
  "dew": (<><path d="M12 3.5s5 5.8 5 9.5a5 5 0 0 1-10 0C7 9.3 12 3.5 12 3.5Z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/></>),
  "frost": (<><path d="M12 3v18M5 7l14 10M19 7 5 17"/><path d="M9.5 6 12 3l2.5 3M9.5 18 12 21l2.5-3"/></>),
  "mountain-peak": <path d="M3 19.5 9.5 6 13 12.5 15 9l6 10.5H3Z"/>,
  "mountain-range": (<><path d="M2.5 19.5 8 9l4 6 3-4.5L21.5 19.5H2.5Z"/><path d="M8 9l1.5 2-1.5 2-1.5-2L8 9Z"/></>),
  "mountain-snow": (<><path d="M3 19.5 10 5.5 14.5 13l2-2.5L21 19.5H3Z"/><path d="M8 9.5 10 5.5l2 4-2 1.5-2-1.5Z"/></>),
  "hill": (<><path d="M3 19.5h18"/><path d="M4 19.5a6 6 0 0 1 12 0M14 19.5a4 4 0 0 1 7-2.5"/></>),
  "valley": <path d="M3 6.5 9 17l3-4 3 4 6-10.5"/>,
  "volcano": (<><path d="M8 8h8l4 12H4L8 8Z"/><path d="M8 8c1-2 2.5-2 2-4 2 1 1.5 3 4 2.5-.5 1-1 1.5-2 1.5H8Z"/></>),
  "cliff": (<><path d="M6 3.5h9v6l-3 2v9H6V3.5Z"/><path d="M6 9h6M6 13.5h4"/></>),
  "cave": (<><path d="M4 20a8 8 0 0 1 16 0H4Z"/><path d="M9 8.5 12 5l3 3.5"/></>),
  "dune": (<><path d="M3 18.5h18"/><path d="M3 15.5c4-1 6-4.5 10-4.5 3 0 4 2 8 1.5"/></>),
  "island": (<><path d="M4 19.5h16"/><path d="M12 5a3.5 3.5 0 0 1 3.5 3.5h-7A3.5 3.5 0 0 1 12 5Z"/><path d="M7 12.5h10l-1.5 3h-7L7 12.5Z"/></>),
  "tree-pine": <path d="M12 2.5 7.5 10h2.8L6 16.5h12L13.7 10h2.8L12 2.5ZM12 16.5V21"/>,
  "tree-oak": (<><circle cx="12" cy="9" r="5.5"/><path d="M12 14.5V21M9 18.5h6"/></>),
  "tree-palm": (<><path d="M12 21v-8"/><path d="M12 13C9 10 6 9.5 3.5 11c2.5.5 3 2 3.5 3-2.5-1-4 0-4.5 1C5 15 9 14.5 12 13ZM12 13c3-3 6-3.5 8.5-2-2.5.5-3 2-3.5 3 2.5-1 4 0 4.5 1-2.5 0-6.5-.5-9.5-2Z"/></>),
  "leaf-single": (<><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z"/><path d="M5 19C8 14 11 11 16 8"/></>),
  "leaf-double": (<><path d="M4 18C4 11 8 7 14 7c0 6-4 11-10 11Z"/><path d="M12 20c0-5 3-8 8-8 0 5-3 8-8 8Z"/></>),
  "sprout": (<><path d="M12 21v-8"/><path d="M12 13C8 13 5.5 11 5 7.5 8.5 8 11 10 12 13ZM12 13c3.5 0 6-2 6.5-5.5C15 8 13 10 12 13Z"/></>),
  "flower-single": (<><circle cx="12" cy="12" r="2"/><path d="M12 3.5a2.5 2.5 0 0 1 0 5M12 15.5a2.5 2.5 0 0 1 0 5M3.5 12a2.5 2.5 0 0 1 5 0M15.5 12a2.5 2.5 0 0 1 5 0"/></>),
  "flower-tulip": (<><path d="M8 4.5 9.5 8 12 5.5 14.5 8 16 4.5c0 4-1.5 7-4 7s-4-3-4-7Z"/><path d="M12 11.5V21M12 17l-3 1.5M12 17l3 1.5"/></>),
  "flower-sunflower": (<><circle cx="12" cy="12" r="2.5"/><path d="M10.5 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M10.5 18.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M4 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M17 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/></>),
  "bouquet": (<><circle cx="9" cy="8" r="2.5"/><circle cx="15" cy="8" r="2.5"/><circle cx="12" cy="11" r="2.5"/><path d="M12 13.5 9 21l3-1.5L15 21l-3-7.5Z"/></>),
  "cactus-round": (<><circle cx="12" cy="11" r="5.5"/><path d="M12 16.5V21M9 21h6"/></>),
  "cactus-tall": (<><path d="M10 21V7a2 2 0 0 1 4 0v14"/><path d="M10 12H7.5a1.5 1.5 0 0 1 0-3H10M14 14.5h2.5a1.5 1.5 0 0 0 0-3H14"/></>),
  "grass": (<><path d="M4 20c1-4 2-6 3.5-8-.5 3 0 5 .5 6M12 20V9c1.5 2.5 2 5 2 8M12 20c2-3 4-4 7-4.5-2 1.5-3 3-3.5 4.5"/></>),
  "mushroom": (<><path d="M4.5 10a7.5 5 0 0 1 15 0H4.5Z"/><path d="M10 10v8a2 2 0 0 0 4 0v-8"/><circle cx="10" cy="7" r="1"/><circle cx="14.5" cy="7.5" r="1"/></>),
  "rock": <path d="M5 9.5 8.5 5h7L20 10l-2.5 8h-10L5 9.5Z"/>,
  "waterfall": (<><path d="M5 3.5h14"/><path d="M7 3.5v9l-2 8M12 3.5v12M17 3.5v9l2 8"/></>),
  "river": <path d="M9 3.5c-2 3 2 5 0 8.5S7 17 9 20.5M15 3.5c-2 3 2 5 0 8.5S13 17 15 20.5"/>,
  "lake": (<><circle cx="12" cy="11" r="6.5"/><path d="M7 10.5h4M10 13.5h5"/></>),
  "wave": <path d="M3 10c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0M3 15c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0"/>,
  "tide": (<><path d="M3 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0"/><path d="M5 6.5 4 4.5M10 6.5 9 4.5M14 6.5l1-2M19 6.5l1-2"/></>),
  "car-side": (<><path d="M3 15.5V11l2-4.5h9L17 11h4v4.5"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/><path d="M9.3 16.5h5.4"/></>),
  "car-front": (<><rect x="5" y="5" width="14" height="10"/><circle cx="8.5" cy="18" r="1.5"/><circle cx="15.5" cy="18" r="1.5"/><path d="M8 8.5h8M12 5v3.5"/></>),
  "bus-side": (<><rect x="3" y="6" width="18" height="9"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M3 10h18M8 6v4"/></>),
  "bus-front": (<><rect x="5" y="3.5" width="14" height="13"/><path d="M5 10h14"/><circle cx="8.5" cy="19" r="1.3"/><circle cx="15.5" cy="19" r="1.3"/></>),
  "train-front": (<><rect x="6" y="3" width="12" height="14"/><circle cx="9" cy="13.5" r="1.2"/><circle cx="15" cy="13.5" r="1.2"/><path d="M8 20.5 6.5 22M16 20.5l1.5 1.5M6 6.5h12"/></>),
  "train-track": (<><path d="M8 3.5 6 21M16 3.5 18 21"/><path d="M7.5 8h9M7 12.5h10M6.5 17h11"/></>),
  "tram": (<><rect x="5" y="7" width="14" height="10"/><path d="M9 7V3.5M15 7V3.5M5 4.5h14"/><circle cx="8.5" cy="19.5" r="1.3"/><circle cx="15.5" cy="19.5" r="1.3"/></>),
  "plane-takeoff": (<><path d="M3 19.5h18"/><path d="M5 15.5 19 8l-4 1 1.5-3.5L9 9.5 6 8.5l-1 7Z"/></>),
  "plane-side": <path d="M2.5 12.5 21 7l-6 6H8l-2 4H4l1-3-2.5-1.5Z"/>,
  "plane-landing": (<><path d="M3 5h18"/><path d="M5 12.5 19 18l-4-1.5 1.5 3L9 15.5 6 16.5l-1-4Z"/></>),
  "ship-hull": (<><path d="M4 14h16l-2.5 5h-11L4 14Z"/><path d="M8 14V8h8v6M12 8V4.5"/></>),
  "sailboat": (<><path d="M4 16.5h16l-2 4H6l-2-4Z"/><path d="M12 16.5V4M12 4c3 2 4 5 4 9h-4"/></>),
  "anchor": (<><circle cx="12" cy="5" r="2"/><path d="M12 7v13M5 13a7 7 0 0 0 14 0M5 13l-1.5-2M5 13l2-1.5M19 13l1.5-2M19 13l-2-1.5"/></>),
  "lifebuoy": (<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M6.5 6.5l3.5 3.5M14 14l3.5 3.5M17.5 6.5 14 10M10 14l-3.5 3.5"/></>),
  "bicycle": (<><circle cx="6" cy="16.5" r="3.5"/><circle cx="18" cy="16.5" r="3.5"/><path d="M6 16.5 9.5 9H14l4 7.5M9.5 9 8 5.5h2.5M14 9l-2 7.5"/></>),
  "motorcycle": (<><circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5 9 10h5l4.5 6.5M9 10 7.5 7H10M14 10l1.5-4h3"/></>),
  "kick-scooter": (<><path d="M5 4.5h4M5 4.5v13h9"/><circle cx="6" cy="19" r="1.8"/><circle cx="17" cy="19" r="1.8"/><path d="M14 4.5 10 17.5"/></>),
  "fuel-pump": (<><rect x="4" y="6" width="10" height="14"/><rect x="6.5" y="9" width="5" height="4"/><path d="M14 10h3v6M17 10v5.5L20 18"/></>),
  "fuel-drop": (<><path d="M12 3.5s5 5.8 5 9.5a5 5 0 0 1-10 0C7 9.3 12 3.5 12 3.5Z"/><path d="M18.5 16.5h3M19.5 14v5"/></>),
  "road-straight": <path d="M8 3.5 6 21M16 3.5 18 21M12 5v2.5M12 10v2.5M12 15v2.5"/>,
  "road-curve": (<><path d="M9 3.5C7 9 7 12 5 20.5M15 3.5c2 5.5 2 8.5 4 17"/><path d="M12 6v2M11.5 10.5 12 13M11 17.5l.5 2"/></>),
  "bridge": (<><path d="M3 18.5h18M5 18.5v-5M19 18.5v-5"/><path d="M5 13.5a7 7 0 0 1 14 0"/></>),
  "tunnel": (<><path d="M4 20V12a8 8 0 0 1 16 0v8"/><path d="M8 20v-7a4 4 0 0 1 8 0v7"/></>),
  "traffic-cone": (<><path d="M12 3.5 8 18h8L12 3.5Z"/><path d="M9.5 12.5h5M6 20.5h12"/></>),
  "traffic-light": (<><rect x="8.5" y="3" width="7" height="15"/><circle cx="12" cy="7" r="1.3"/><circle cx="12" cy="11" r="1.3"/><path d="M12 18.5V21M9 21h6"/></>),
  "parking": (<><rect x="4" y="3.5" width="16" height="17"/><path d="M9.5 17V7.5h3a2.8 2.8 0 0 1 0 5.6h-3"/></>),
  "map-folded": <path d="M9 4.5 4 6v14l5-1.5 6 1.5 5-1.5V4.5L15 6 9 4.5ZM9 4.5V18M15 6v14"/>,
  "map-pin-route": (<><path d="M5 19.5c3-1 5-3 6-6"/><circle cx="16.5" cy="7" r="3"/><path d="M16.5 10V13M14 20.5h8"/></>),
  "compass-rose": (<><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5 13.5 13.5 8.5 15.5l2-5 5-2Z"/></>),
  "compass-needle": (<><circle cx="12" cy="12" r="8.5"/><path d="M12 5.5 13.5 12 12 18.5 10.5 12 12 5.5Z"/></>),
  "globe-meridian": (<><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-4.5 4.5-4.5 12.5 0 17M12 3.5c4.5 4.5 4.5 12.5 0 17"/></>),
  "globe-pin": (<><circle cx="12" cy="10" r="7"/><path d="M12 5.5a2.5 2.5 0 0 1 2.5 2.5c0 2-2.5 4-2.5 4s-2.5-2-2.5-4A2.5 2.5 0 0 1 12 5.5Z"/><path d="M6 20.5h12"/></>),
  "location-pin": (<><path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0c0 5 6.5 11 6.5 11Z"/><circle cx="12" cy="10" r="2.2"/></>),
  "location-ring": (<><circle cx="12" cy="11" r="2.2"/><circle cx="12" cy="11" r="6"/><path d="M12 20.5v1.5"/></>),
  "flag-single": (<><path d="M6 21V4"/><path d="M6 4.5h12l-3 4 3 4H6"/></>),
  "flag-double": (<><path d="M5 21V4M12 21V8"/><path d="M5 4.5h7v6H5M12 8h7l-2 2.5 2 2.5h-7"/></>),
  "flag-pennant": (<><path d="M6 21V4"/><path d="M6 4.5h13l-4 3.5 4 3.5H6"/></>),
  "flag-checkered": (<><rect x="6.5" y="4.5" width="12" height="8"/><path d="M6.5 4.5V21M10.5 4.5v8M14.5 4.5v8M6.5 8.5h12"/></>),
  "tent-tri": (<><path d="M12 4 3 19.5h18L12 4Z"/><path d="M12 12.5 9.5 19.5h5L12 12.5Z"/></>),
  "tent-cabin": (<><path d="M4 10.5 12 4l8 6.5"/><path d="M6 9.5V20M18 9.5V20M6 20h12"/></>),
  "campfire": (<><path d="M5 17.5 8 20.5h8l3-3"/><path d="M12 6.5c1.5 2 3.5 3 3.5 5.5a3.5 3.5 0 0 1-7 0c0-1.2.5-2 1.2-2.8.2 1 1 1.3 1.3.8C11.5 9 11 7.5 12 6.5Z"/></>),
  "campfire-logs": (<><path d="M6 18.5 18 14M6 14l12 4.5"/><path d="M12 4.5c1.5 2 3 2.8 3 4.8a3 3 0 0 1-6 0c0-2 1.5-2.8 3-4.8Z"/></>),
  "backpack": (<><rect x="7" y="6" width="10" height="14"/><path d="M9 6V5a3 3 0 0 1 6 0v1"/><rect x="9.5" y="11" width="5" height="4"/></>),
  "backpack-hike": (<><rect x="7" y="7" width="10" height="13"/><path d="M12 7V3.5M9.5 3.5h5"/><path d="M7 12h10"/></>),
  "suitcase": (<><rect x="4.5" y="8" width="15" height="12"/><path d="M9 8V6a3 3 0 0 1 6 0v2M4.5 13h15"/></>),
  "suitcase-roller": (<><rect x="7" y="9" width="12" height="11"/><path d="M10 9V3.5h4M12 20v1.5"/><circle cx="9.5" cy="21" r=".8"/><circle cx="14.5" cy="21" r=".8"/></>),
  "passport-book": (<><rect x="6" y="3.5" width="12" height="17"/><circle cx="12" cy="10" r="3"/><path d="M9 16.5h6"/></>),
  "ticket-travel": (<><path d="M4 8h16v3.5a2 2 0 0 0 0 4V19H4v-3.5a2 2 0 0 0 0-4V8Z"/><path d="M14.5 8v11"/></>),
  "camera-tripod": (<><rect x="7" y="5" width="10" height="7"/><circle cx="12" cy="8.5" r="2"/><path d="M12 12v3M12 15 7.5 21M12 15l4.5 6M9 21h6"/></>),
  "binoculars": (<><circle cx="8" cy="14" r="3.5"/><circle cx="16" cy="14" r="3.5"/><path d="M8 10.5V7h8v3.5M5.5 7 4 4.5M18.5 7 20 4.5"/></>),
  "lantern": (<><path d="M9 3.5h6M10 3.5V5M14 3.5V5"/><path d="M8 8a4 4.5 0 0 1 8 0v5a4 4.5 0 0 1-8 0V8Z"/><path d="M10 20.5h4M12 17.5v3"/></>),
  "sleeping-bag": (<><path d="M8 3.5h8v14a2 2 0 0 1-4 1.5A2 2 0 0 1 8 17.5v-14Z"/><path d="M8 8h8"/></>),
  "hammock": (<><path d="M4 6c0 7 4 11 8 11s8-4 8-11"/><path d="M4 6v3M20 6v3M7 9.5h10"/></>),
  "oar": (<><path d="M5 19 15 9"/><path d="M15 9c2-1 3-3 2.5-5.5C15 4 13 5 12 7l3 2ZM5 19l-1 1.5L5.5 22 7 21l-2-2Z"/></>),
  "paddle": (<><rect x="11" y="11" width="2" height="9.5"/><path d="M9.5 3.5h5l1 4-3.5 3.5L8.5 7.5l1-4Z"/></>),
  "kayak": (<><path d="M3 14.5c3-2 5-2.5 9-2.5s6 .5 9 2.5c-3 2-5 2.5-9 2.5s-6-.5-9-2.5Z"/><path d="M10 12V9.5h4V12"/></>),
  "surfboard": (<><circle cx="12" cy="12" r="8.5"/><path d="M9 4.5c-2 5-2 10 0 15M15 4.5c2 5 2 10 0 15"/></>),
  "skateboard": (<><path d="M4 14.5h16"/><circle cx="8.5" cy="18.5" r="1.6"/><circle cx="15.5" cy="18.5" r="1.6"/></>),
  "helmet": (<><path d="M5 14a7 7 0 0 1 14 0v3h-14v-3Z"/><path d="M5 14h9M12 7.5V14"/></>),
  "boot-hike": (<><path d="M8 3.5h6V12l5 2.5V19H8V3.5Z"/><path d="M8 12h6M10 7h2"/></>),
  "sunglasses": (<><rect x="3.5" y="8.5" width="7" height="5"/><rect x="13.5" y="8.5" width="7" height="5"/><path d="M10.5 10.5h3M3.5 10 2.5 8M20.5 10l1-2"/></>),
  "hat-sun": (<><circle cx="12" cy="10" r="4"/><path d="M4.5 16.5c2.5 1.5 5 2 7.5 2s5-.5 7.5-2l-2-2h-11l-2 2Z"/></>),
  "bottle-water": (<><path d="M10 3.5h4M10.5 3.5V6l-1 2v12.5h5V8l-1-2V3.5"/><path d="M9.5 13h5"/></>),
  "canteen": (<><rect x="7" y="7" width="10" height="13"/><path d="M10 7V4.5h4V7M7 11h10"/></>),
  "first-aid": (<><rect x="3.5" y="8" width="17" height="11"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M12 11.5v5M9.5 14h5"/></>),
  "rope-coil": (<><circle cx="12" cy="13" r="6"/><circle cx="12" cy="13" r="3"/><path d="M12 7V3.5"/></>),
  "carabiner": (<><path d="M9 3.5h6v10a5 5 0 0 1-10 0v-3"/><path d="M9 3.5v6l3 3"/></>),
  "flashlight": (<><path d="M9 4.5 13 3l8 8-1.5 4"/><path d="M13 8.5 9.5 12 4 19l1.5 1.5L13 15l3.5-3.5"/></>),
  "knife-pocket": (<><path d="M4 18.5 13 9.5"/><path d="M13 9.5 19 4l1.5 1.5L15 12l-2 1-2-1.5 2-2Z"/></>),
  "whistle": (<><circle cx="9" cy="13" r="5.5"/><circle cx="9" cy="13" r="1.5"/><path d="M13.5 10 20 6.5v4L14 14"/></>),
  "stopwatch": (<><circle cx="12" cy="14" r="6.5"/><path d="M12 14V9.5M9 3.5h6M12 3.5V7.5M16 5l1.5-1.5"/></>),
  "trophy-cup": (<><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 5.5H5a3 3 0 0 0 3.5 4M16 5.5h3a3 3 0 0 1-3.5 4M12 13v4M8.5 20.5h7M10 17h4"/></>),
  "medal-round": (<><circle cx="12" cy="14.5" r="5.5"/><path d="M12 9.5 9 3.5H6.5L12 12l5.5-8.5H15L12 9.5Z"/></>),
  "medal-ribbon": (<><circle cx="12" cy="13.5" r="4.5"/><path d="M9.5 10 7 3.5h4L12 7l1-3.5h4L14.5 10"/></>),
  "podium": (<><path d="M6 20.5h12"/><rect x="9.5" y="8" width="5" height="12.5"/><rect x="4" y="12" width="5.5" height="8.5"/><rect x="14.5" y="12" width="5.5" height="8.5"/></>),
  "dumbbell": (<><path d="M7 8v8M17 8v8M7 12h10"/><path d="M4 10v4M4 10M20 10v4M10 9.5v5M14 9.5v5"/></>),
  "kettlebell": (<><path d="M9 8a3 3 0 0 1 6 0"/><circle cx="12" cy="14.5" r="6"/><circle cx="12" cy="14.5" r="1.5"/></>),
  "ball-soccer": (<><circle cx="12" cy="12" r="8.5"/><path d="M12 8.5l2.5 1.8-1 3.2h-3.5l-1-3.2 3-1.8ZM12 3.5v5M4.8 9.5l4.7 1M19.2 9.5l-4.7 1M7.5 19l1.5-4.5M16.5 19l-1.5-4.5"/></>),
  "ball-basket": (<><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-3 4.5-3 12.5 0 17M12 3.5c3 4.5 3 12.5 0 17"/></>),
  "ball-tennis": (<><circle cx="12" cy="12" r="8.5"/><path d="M5.5 5.5c3 2.5 3 10.5 0 13M18.5 5.5c-3 2.5-3 10.5 0 13"/></>),
  "racket-tennis": (<><circle cx="9" cy="9" r="5.5"/><path d="M9 3.5v11M3.5 9h11M13 13l7.5 7.5"/></>),
  "swim-lanes": (<><path d="M4 7.5h16M4 12h16"/><path d="M3 16.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></>),
  "bike-road": (<><circle cx="6.5" cy="16" r="3.5"/><circle cx="17.5" cy="16" r="3.5"/><path d="M6.5 16 10 9h4M10 9 8.5 5.5h2M14 9l3.5 7"/></>),
  "run-sprint": (<><circle cx="15" cy="5" r="2"/><path d="M13 8.5 9 10l3 3 1 5M13 8.5l3 2 4 1M12 13l-4 2-1 5.5M12 13l3 1 1 5"/></>),
  "yoga-pose": (<><circle cx="12" cy="5" r="2"/><path d="M12 7.5v6M12 10 6 12M12 10l6 2M12 13.5 9 20.5M12 13.5l3 7"/></>),
  "check-mark": <path d="M4.5 12.5 10 18 19.5 6.5"/>,
  "check-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.8 2.8L16.5 9"/></>),
  "cross-mark": <path d="M6 6l12 12M18 6 6 18"/>,
  "cross-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></>),
  "info-mark": (<><path d="M12 11v6"/><circle cx="12" cy="7.5" r="1.3"/></>),
  "info-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r="1.2"/></>),
  "warning-triangle": (<><path d="M12 4 21 20H3L12 4Z"/><path d="M12 10v4"/><circle cx="12" cy="16.8" r="1"/></>),
  "help-mark": (<><path d="M9 9a3 3 0 1 1 4.5 2.5c-1 .7-1.5 1.2-1.5 2.5"/><circle cx="12" cy="17.5" r="1.2"/></>),
  "help-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.5a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.5 1-1.5 2"/><circle cx="12" cy="16.8" r="1"/></>),
  "plus-mark": <path d="M12 5v14M5 12h14"/>,
  "plus-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M12 8.5v7M8.5 12h7"/></>),
  "minus-mark": <path d="M5 12h14"/>,
  "minus-circle": (<><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12h7"/></>),
  "asterisk": <path d="M12 4v16M4.5 8l15 8M19.5 8l-15 8"/>,
  "hash-mark": (<><path d="M9.5 4 7.5 20M16.5 4l-2 16"/><path d="M4.5 9.5h16M4.5 14.5h16"/></>),
  "at-sign": (<><circle cx="12" cy="12" r="4"/><path d="M16 12v2a3 3 0 0 0 6 0V9a8 8 0 1 0 1 6.5"/></>),
  "percent-mark": (<><path d="M19 5 5 19"/><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="16" r="2.5"/></>),
  "plug-power": (<><path d="M9 3.5V9M15 3.5V9"/><path d="M7 9h10v4a5 5 0 0 1-10 0V9Z"/><path d="M12 18v3.5"/></>),
  "bulb-glow": (<><path d="M9 18h6M10 21h4"/><path d="M12 3.5a6 6 0 0 1 3.5 10.5c-.8.7-1.5 1.2-1.5 2.5H10c0-1.3-.7-1.8-1.5-2.5A6 6 0 0 1 12 3.5Z"/></>),
  "battery-empty": (<><rect x="3" y="8" width="16" height="8"/><path d="M21 11v2"/></>),
  "battery-half": (<><rect x="3" y="8" width="16" height="8"/><rect x="5" y="10" width="6" height="4"/><path d="M21 11v2"/></>),
  "battery-full": (<><rect x="3" y="8" width="16" height="8"/><rect x="5" y="10" width="12" height="4"/><path d="M21 11v2"/></>),
  "wifi-arcs": (<><circle cx="12" cy="18.5" r="1.3"/><path d="M8.5 15a5 5 0 0 1 7 0M5.5 12a9.5 9.5 0 0 1 13 0M3 8.5a13 13 0 0 1 18 0"/></>),
  "wifi-off": (<><circle cx="12" cy="18.5" r="1.3"/><path d="M5.5 12a9.5 9.5 0 0 1 5-2.8M8.5 15a5 5 0 0 1 3.5-1.5M3 8.5a13 13 0 0 1 6-2.5M4 4l16 16"/></>),
  "bluetooth-mark": <path d="M7 4.5 17 12l-10 7.5v-15ZM17 12 8.5 7.5M17 12l-8.5 4.5"/>,
  "airplane-mode": (<><path d="M10.5 13.5 3.5 11l1.5-1.5 5 1 3.5-5.5 2.5 2.5-2.5 4 4.5 1.5L16.5 14l-6 .5"/><path d="M5 20.5 15.5 14"/></>),
  "moon-night": (<><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5Z"/><circle cx="17.5" cy="5.5" r="1"/><circle cx="20" cy="9" r=".8"/></>),
  "signal-bars": (<><path d="M5 20v-4M10 20v-8M15 20V8M20 20V4"/></>),
  "satellite-dish": (<><path d="M5 15a8 8 0 0 1 8-8"/><path d="M5 15l3-1 1 3-4-2ZM9.5 15.5l3 3M12.5 18.5 20 20M15 15l5.5-1"/></>),
  "broadcast-tower": (<><circle cx="12" cy="12" r="1.5"/><path d="M12 13.5V21M8.5 21h7M8.8 9.5a4.5 4.5 0 0 0-1.8 2M15.2 9.5a4.5 4.5 0 0 1 1.8 2M6 7a8.5 8.5 0 0 0-2.5 3M18 7a8.5 8.5 0 0 1 2.5 3"/></>),
  "lighthouse": (<><path d="M9 21 10 8h4l1 13"/><path d="M8 8l4-4.5L16 8H8ZM10 12h4"/></>),
  "hot-air-balloon": (<><path d="M12 3.5a6.5 6.5 0 0 1 0 10c-1.5-1.5-2-4-2-6.5S10.5 5 12 3.5ZM12 3.5a6.5 6.5 0 0 0 0 10c1.5-1.5 2-4 2-6.5S13.5 5 12 3.5Z"/><path d="M10 16.5h4l-1 4h-2l-1-4Z"/></>),
  "paraglider": (<><path d="M4 8a8 5 0 0 1 16 0"/><path d="M12 8v5M12 13l-3 7M12 13l3 7"/></>),
  "cable-car": (<><path d="M3 5.5h18"/><path d="M12 5.5V8M8 8h8v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8Z"/><path d="M8 12h8"/></>),
  "observation-wheel": (<><circle cx="12" cy="11" r="7.5"/><circle cx="12" cy="11" r="1.5"/><path d="M12 12.5 8 21M12 12.5 16 21M4.5 18.5h15"/></>),
};

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
  { name: "Essentials", count: 55 },
  { name: "Arrows & Direction", count: 200 },
  { name: "Media & Playback", count: 200 },
  { name: "Files & Office", count: 200 },
  { name: "Commerce & Shopping", count: 199 },
  { name: "Weather & Nature", count: 200 },
];
