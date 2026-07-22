# Automation Workflow Screenshots

Drop a screenshot of an n8n canvas here and the overview modal on `/projects` will pick it up automatically.

## Naming

```
public/automations/<slug>.png
```

Also accepted: `.jpg`, `.jpeg`, `.webp`. If both a PNG and a WebP exist for the same slug, WebP wins.

The `<slug>` must match the workflow’s `slug` field in `src/data/automationsData/automations.json` (slugified workflow name).

### Examples

| Workflow name | Filename |
|---|---|
| Website Form Submissions - Music Artists | `website-form-submissions-music-artists.png` |
| Multi-Page Web-Scraper Chatbot | `multi-page-web-scraper-chatbot.png` |

## How it gets used

1. Drop the image in this folder.
2. Run `npm run generate:automation-screenshots` (also runs on `prebuild` / `build:cf`).
3. That writes `src/data/automationsData/screenshots.json` (slug → `/automations/<file>`).
4. `optimize-images` also scans this folder and emits sibling `.webp` files.

Workflows without a screenshot still get a generated n8n-style node-graph placeholder in the modal — the page never looks empty.

## Finding a slug

```bash
node -e "const s=require('./src/data/automationsData/automations.json'); console.log(s.automations.map(a=>a.slug).join('\n'))"
```

Or search by name:

```bash
node -e "const s=require('./src/data/automationsData/automations.json'); const q=process.argv[1].toLowerCase(); s.automations.filter(a=>a.name.toLowerCase().includes(q)).forEach(a=>console.log(a.slug, '←', a.name))" -- "form submissions"
```
