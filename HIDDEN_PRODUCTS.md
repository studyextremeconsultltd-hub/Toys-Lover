# Hidden products

These 12 older catalogue products are hidden until the client sends real photos.
Their data is kept unchanged in the stock files (lib/data/*.ts and lib/data/products.ts).
Hidden products get no product page and don't appear in listings, the homepage, search or the sitemap.

| Slug | Name | Reason |
|---|---|---|
| lucky-cat-squishy | Lucky Cat Squishy | AI-looking photo |
| jumbo-pencil-squishy | Jumbo Pencil Squishy | AI-looking photo (yellow; product is hot pink) |
| jammy-toast-squishy | Jammy Toast Squishy | AI-looking photo |
| giant-strawberry-squishy | Giant Strawberry Squishy | AI-looking photo |
| watermelon-slice-squishy | Watermelon Slice Squishy | AI-looking photo |
| cloud-ghost-squishy | Cloud Ghost Squishy | AI-looking photo |
| sunshine-squeeze-blob | Sunshine Squeeze Blob | AI-looking photo |
| bear-bubbles-twin-dolls | Bear Bubbles Twin Dolls | Damaged cut-out photo |
| fairy-light-bubble-wand | Fairy Light Bubble Wand | Damaged cut-out photo |
| electric-water-blaster | Electric Water Blaster | Damaged cut-out photo |
| crystal-unicorn-squeeze | Crystal Unicorn Squeeze | Damaged cut-out photo |
| funtasy-bubble-gun | FunTasy Bubble Gun | Wrong photo (shows Animal Bubble Camera Set) |

## How to unhide

1. Put the real photo at `public/images/products/<slug>.jpg` (square, white background, no AI).
2. Delete the slug from `HIDDEN_PRODUCT_SLUGS` in `lib/data/hidden-products.ts`.
3. Run `npm run build`, commit and push to `main`. GitHub Pages redeploys automatically.
