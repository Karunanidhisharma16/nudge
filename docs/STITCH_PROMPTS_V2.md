# Stitch Prompt Pack v2: Shelves ("Nudge" placeholder name)

This replaces the earlier pack's master brief. It focuses on the simple core: shelves with types. All in-app text is English. Change "Nudge" later with find-replace.

## How to use

1. Start a new Stitch project and paste **Prompt 0** first.
2. Paste screens **1 to 8** one by one (the core). Then screens 9 to 14.
3. If a screen looks off, reply with one change at a time ("make cards less crowded", "move the + button to the bottom right").
4. Your old screens (Quick add, Tonight, Weekly summary, Ask, Friend page, Onboarding) still work; reuse them later.

---

## Prompt 0: Master brief (paste first)

Design a mobile-first app called **Nudge**, a simple, fast notes app organised into **Shelves**. A shelf is like a folder, but each shelf has a **type** that adds the right tools for that kind of content. If no type is chosen, a shelf is just plain notes.

**Core idea**
- The user (a 20-year-old college student) saves everything in one place: movies to watch, websites, resume PDFs, code snippets, songs, courses, quick notes.
- Everything is written by the user. There is no complicated setup, no heavy database feel. It should feel as easy as a notes app.
- Shelf types unlock specific buttons:
  - **Notes** (default): plain text, pin, copy, share.
  - **Movies and Shows:** title, user's own description, user's own vibe tags, "suggested by", status (To watch / Watched).
  - **Links:** URL, title, note. Buttons: Open, Copy link, Share link.
  - **PDFs and Files:** upload a file with a title and labels (for example "Backend", "AI", "On-campus"). Buttons: Download, Share, Replace file.
  - **Code:** title, language, code with syntax colours. Button: Copy code.
  - **Music, Courses (YouTube playlist), Checklist** are more types.
- Shelves can contain **sub-shelves** (one level only), like Movies > Bollywood, Hollywood, Web Series.
- Any shelf can be **locked with a password**. Locked shelves are hidden from home and search until unlocked.
- Quick notes without a shelf go to an **Inbox** and can be moved to a shelf with one tap.

**Platform:** Android phone first (390 x 844). No bottom tab bar clutter: Home, Search, Inbox, You (4 tabs). A large floating **+ button** at the bottom right on Home and in every shelf.

**Visual style**
- Dark-first, calm, premium feel. Background #0F1115, cards #171A21, primary text #ECE9E4, secondary text #9A9AA3.
- One warm amber accent #F2B66D for the + button and main actions.
- Each shelf type has a small icon and a soft tint colour: Notes grey, Movies rose, Links blue, PDFs and Files green, Code purple, Music teal, Courses amber, Checklist yellow.
- Rounded cards (20 px radius), generous spacing, thin 1 px borders, soft shadows.
- Fonts: Inter for UI and a soft serif (like Fraunces) for big headings. Line icons (Lucide style).
- Minimal and uncluttered: one main action per screen, big tap targets (44 px).

**Sample data (keep consistent):**
- User: Kannu.
- Shelves: Movies (sub-shelves: Bollywood, Hollywood, Web Series), Sports Sites (Links), Resumes (PDFs and Files), Snippets (Code), Songs (Music), Courses, Ideas (Notes), and a locked shelf "Private Links".
- Movies: Dark (thriller series, suggested by Rahul), Panchayat (comedy series, suggested by Aman), Interstellar.
- Resumes: "On-campus resume v3", "Off-campus resume v5", "AI resume v1", "Backend resume v2".
- Code: "Debounce hook (JavaScript)", "Two Sum (C++)".
- Links: ESPN Cricinfo, a live scores site.

Generate the first screen now: **Home** (see screen 1).

---

## Screen 1: Home

Home screen of Nudge, dark theme, mobile.
- Top: search bar with placeholder "Search everything" and a small profile icon.
- Below: an **Inbox** card showing "Inbox, 3 quick notes" with a small preview of the latest note and a "Sort" button.
- Main area: **Shelves grid**, 2 columns of rounded tiles. Each tile has a coloured type icon, shelf name, item count and (for locked shelves) a small lock icon. Tiles: Movies (24), Sports Sites (6), Resumes (4), Snippets (11), Songs (18), Courses (3), Ideas (9), Private Links (locked, no count shown).
- A small row "Recently opened" with 3 small chips (Dark, AI resume v1, Debounce hook).
- Large amber floating **+** button at bottom right.
- Bottom tabs: Home, Search, Inbox, You.

## Screen 2: + menu

The + button menu in Nudge: a bottom sheet over a dimmed Home.
- Three big options with icons: **Quick note** ("Just write something"), **New item** ("Add to a shelf"), **New shelf** ("Create a folder with a type").
- Under them a row "Recent shelves": Movies, Resumes, Snippets for faster adding.
- Clean, spacious, easy to tap with a thumb.

## Screen 3: New shelf with type picker

Create shelf screen in Nudge.
- Title "New shelf". A name field with "Bollywood".
- Section "Shelf type": a 2-column grid of selectable cards with icons and one-line descriptions: Plain notes ("Just text"), Movies and Shows ("Status, vibe, suggested by"), Links ("Open, copy, share"), PDFs and Files ("Download and share"), Code ("Copy button, syntax colours"), Music ("Playlists and songs"), Courses ("Track lesson progress"), Checklist ("Tasks to tick"). "Movies and Shows" selected with an amber outline.
- Below: icon picker (small row), colour picker (small row), and a toggle "Lock with password".
- "Parent shelf" dropdown showing "Movies".
- Amber "Create shelf" button at the bottom.

## Screen 4: Shelf screen (Movies, with sub-shelves)

Shelf screen for "Movies" (Movies and Shows type) in Nudge.
- Header: back arrow, shelf name "Movies" with a rose movie icon, "24 items", and a three-dot menu (Edit shelf, Lock shelf, Change type).
- A horizontal row of **sub-shelf chips**: All, Bollywood (9), Hollywood (11), Web Series (4).
- Filter chips: To watch, Watched, and vibe tags such as chill, thriller, comedy. "To watch" selected.
- A list of movie rows: a small poster thumbnail (placeholder), title in serif, a line of the user's own vibe tags, "Suggested by Rahul", and a status pill (To watch). Show 5 rows: Dark, Panchayat, Interstellar, Zindagi Na Milegi Dobara, Kabir Singh.
- Amber floating + button bottom right.

## Screen 5: Add movie (item form)

Add item form for a Movies and Shows shelf in Nudge.
- Title: "Add movie". Fields: Title ("Dark"), Description (a multi-line field with placeholder "What is it about?" filled with "German time-travel thriller, very slow burn."), Vibe tags (chips the user types: mind-bending, slow, dark), Suggested by ("Rahul"), Status (segmented control: To watch, Watching, Watched), Optional poster (add image button).
- Bottom: amber **Save** button. A small text "Everything here is written by you".
- Simple, one-column form, lots of space.

## Screen 6: Movie item detail

Item detail for "Dark" in a Movies shelf in Nudge.
- Poster header (placeholder image) fading into the dark background, back arrow, three-dot menu.
- Title in serif, "Thriller series" small label, status pill "To watch".
- "Suggested by Rahul" chip.
- Description paragraph: "German time-travel thriller, very slow burn."
- Vibe tags as chips: mind-bending, slow, dark.
- A personal note box "Your note": "Watch with full focus."
- Actions: amber button **Mark watched**, and a secondary **Share** button.
- Small grey line "Saved Oct 12 in Movies > Web Series".

## Screen 7: PDFs and Files shelf (Resumes)

Shelf screen for "Resumes" (PDFs and Files type) in Nudge.
- Header: back arrow, "Resumes", green file icon, "4 files".
- Filter chips by label: All, On-campus, Off-campus, AI, Backend.
- A list of file cards: each shows a small PDF page thumbnail, the title (for example "On-campus resume v3"), labels as chips, file size (for example "182 KB"), updated date, and two small icon buttons on the right: **Download** and **Share**.
- Four cards: On-campus resume v3, Off-campus resume v5, AI resume v1, Backend resume v2.
- Amber floating + button bottom right with label "Upload".
- A small note at the bottom: "Edit your resume in Overleaf. Upload the PDF here to download and share it anytime."

## Screen 8: Links shelf and link item

Two frames for the Links type in Nudge.
- Frame 1: shelf "Sports Sites" (blue link icon, 6 items). Each row shows the site's favicon, title ("ESPN Cricinfo"), the domain in grey, a one-line note by the user, and three small icon buttons: **Open**, **Copy link**, **Share link**. Amber + button.
- Frame 2: item detail for ESPN Cricinfo: big favicon header, title, URL in a copyable text row, the user's note "Live scores and match centre", and three large buttons in a row: Open, Copy link, Share link.

## Screen 9: Code shelf and code item

Two frames for the Code type in Nudge.
- Frame 1: shelf "Snippets" (purple code icon, 11 items). Rows show title ("Debounce hook"), a language badge (JavaScript), and a two-line code preview in a monospace font. Filter chips: All, JavaScript, C++, Python.
- Frame 2: item detail "Debounce hook (JavaScript)": title, language badge, the code in a dark code block with syntax colours and line numbers, a prominent **Copy code** button on top of the block, a small "Copied" toast, and below it a Share button and an "Edit" button.

## Screen 10: Inbox and quick note

Two frames in Nudge.
- Frame 1: Quick note editor (opened from + > Quick note): a clean full-screen text area with the cursor ready, placeholder "Just write...", top-right amber **Save** button, and under the keyboard a row of small buttons: Add link, Add photo, Checklist.
- Frame 2: Inbox screen: a list of 3 quick notes, each with a one-line text and time ("2 min ago"). Each row has a **Move to shelf** button. Tapping it opens a bottom sheet listing shelves (Movies, Ideas, Snippets) to pick from. Title "Inbox" with the subtitle "Sort these when you have a minute".

## Screen 11: Locked shelf (lock flow)

Three frames in Nudge showing a locked shelf.
- Frame 1: Shelf settings: a section "Lock this shelf" with a toggle on, a "Set password" field, a "Confirm password" field, and a warning card: "If you forget this password, your data cannot be recovered. Save your recovery key." Amber **Lock shelf** button.
- Frame 2: Recovery key screen: a card with a 24-character key "A7K9-2PQ3-..." in a monospace font, buttons "Copy" and "Save as file", and a checkbox "I saved my recovery key".
- Frame 3: Unlock screen when opening the "Private Links" shelf: a lock icon, the shelf name, a password field, an amber **Unlock** button, and "Use fingerprint" below. Small text: "Locked shelves are hidden from search and notifications."

## Screen 12: Search

Search screen in Nudge.
- Search bar at the top with the query "dark" and a clear button.
- Filter chips: All, Movies, Links, Files, Code, Notes.
- Results grouped by shelf: under "Movies" a row for "Dark (Web Series)", under "Notes" a row "Dark mode colours idea". Each result has a type icon, title, the shelf path in small grey text, and a small snippet with the matching word highlighted in amber.
- A line at the bottom: "Locked shelves are not searched."

## Screen 13: Music and Courses shelves

Two frames in Nudge.
- Frame 1: Music shelf "Songs": rows with a play-link icon, song or playlist title, a mood tag (Chill, Workout), and **Open** and **Copy link** buttons.
- Frame 2: Course shelf "Courses" with one course card "GenAI Course (CampusX)": a progress ring "14 of 60 lessons, 23%", a **Continue** button, and a lesson list with checkboxes below.

## Screen 14: Desktop layout

Desktop (1440 x 900) layout of Nudge, dark theme.
- Left sidebar: the shelf tree. Movies (expanded with Bollywood, Hollywood, Web Series), Sports Sites, Resumes, Snippets, Songs, Courses, Ideas, Private Links (lock icon). A **+ New** button on top.
- Middle column: the items of the selected shelf (Resumes) as a list with Download and Share buttons.
- Right column: a preview of the selected item (PDF preview) with its title, labels, Download, Share, and Replace file buttons.
- A command palette overlay (Ctrl+K) in a second frame with a search field and recent shelves and items.
- Same colours, fonts and card style as the mobile screens.
