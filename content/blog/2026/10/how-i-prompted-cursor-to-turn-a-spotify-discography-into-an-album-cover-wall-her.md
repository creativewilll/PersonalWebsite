---
title: "How I Prompted Cursor to Turn a Spotify Discography Into an Album-Cover Wall Hero"
slug: "how-i-prompted-cursor-to-turn-a-spotify-discography-into-an-album-cover-wall-her"
date: "2026-10-13"
lastModified: "2026-10-13"
author: "William Spurlock"
readingTime: 20
categories:
  - "Web Design and Digital Experiences"
tags:
  - "Spotify album cover wall"
  - "album cover wall hero"
  - "Cursor layout prompt"
  - "Spotify discography hero"
  - "music artist website"
  - "official cover art"
featured: false
draft: false
excerpt: "A Spotify album cover wall hero keeps official art square, links every tile to its album, and puts the logo beside the grid. Cursor only sees a blank schema."
coverImage: "/images/blog/how-i-prompted-cursor-to-turn-a-spotify-discography-into-an-album-cover-wall-her.png"
coverImageAlt: "Night gallery wall of blank square frames with one larger frame circled in red, Spotify album cover wall hero"
seoTitle: "Spotify Album Cover Wall | William Spurlock"
seoDescription: "A Spotify album cover wall is official art, a link on every tile, and the logo beside the grid. I prompt Cursor with a blank schema, not the cover files."
seoKeywords:
  - "Spotify album cover wall"
  - "Spotify album cover wall hero"
  - "Spotify discography hero"
  - "Cursor album cover layout"
  - "official Spotify cover art"
  - "music artist website hero"
  - "Get Artist's Albums covers"
aioTargetQueries:
  - "What is a Spotify album cover wall hero?"
  - "Why does a searched image grid fail an artist homepage?"
  - "How do I pull official Spotify covers for one artist ID?"
  - "How do I prompt Cursor to lay out the wall without redrawing the covers?"
  - "How do I check a Spotify album cover wall before it ships?"
  - "What does the Spotify album images array contain?"
  - "Why does Get Artist's Albums cap a page at 10?"
  - "Do I need a listener login to read a public discography?"
  - "Should features and compilations sit on the cover wall?"
  - "Can I crop, blur, or overlay a Spotify album cover?"
  - "Where does the Spotify logo go on the wall?"
  - "What if Spotify returns an empty album name?"
  - "Does an embed player replace the cover wall?"
  - "Can I paste cover files into Cursor to match the palette?"
contentCluster: "immersive-web"
pillarPost: false
parentPillar: "immersive-web-design-manual"
entityMentions:
  - "William Spurlock"
  - "Spurlock Studios LLC"
  - "Spotify"
  - "Spotify Web API"
  - "Cursor"
  - "Spotify Developer Policy"
serviceTrack: "web-design"
---

# How I Prompted Cursor to Turn a Spotify Discography Into an Album-Cover Wall Hero

A Spotify album cover wall hero is a first screen of square sleeves from one artist's own releases. Each tile uses the image URL Spotify returned, links to that album on Spotify, and leaves the picture uncropped. The logo sits beside the grid.

I am William Spurlock, AI Systems Architect and Fractional AI CTO at Spurlock Studios LLC. I prompt Cursor to build the frame. I do not prompt it to redraw the sleeves. The filled list stays on my server. The chat gets a blank schema.

This is not a WebGL scene or a clearance card for a music supervisor. Each calls for a different first screen. The sleeves are already the art direction. My job is to show them whole.

## What is a Spotify album cover wall hero?

**A Spotify album cover wall hero is the official cover URL, the album name, and the Spotify album link, repeated for the releases I kept, with the newest one large and the logo outside the art.** If any of those three fields is blank, that release is not on the wall.

I keep a sheet before I open Cursor. The sheet sets the page contract. The hero uses those fields. It does not invent a fourth field to look busier.

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Where it comes from</th>
      <th>What fails the row</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>artist_id</td>
      <td>The Spotify ID the artist sent me</td>
      <td>A name I typed into search</td>
    </tr>
    <tr>
      <td>market</td>
      <td>The country code written on the sheet before the call</td>
      <td>A blank market on a server token</td>
    </tr>
    <tr>
      <td>name</td>
      <td>The album name on the response</td>
      <td>An empty string</td>
    </tr>
    <tr>
      <td>url</td>
      <td>The first image URL, widest first</td>
      <td>No URL</td>
    </tr>
    <tr>
      <td>spotify_url</td>
      <td>external_urls.spotify on that album</td>
      <td>A homepage I guessed</td>
    </tr>
  </tbody>
</table>

The wall is a hero on a site the artist asked for. It does not sell the covers by themselves. Three boundaries keep it that way:

- The picture stays square, with the whole sleeve visible.
- The link on the tile is the album URL from the response, not a search page.
- The Spotify logo is a neighbor of the grid, not a stamp on the art.

I cap the first screen at one large sleeve and eight smaller ones. Nine tiles fit the desktop hero I actually ship, so that is my frame. It is not a number Spotify published. If the artist has fewer releases, I show fewer. I do not draw filler squares.

A cinematic canvas is a different commission. I wrote that prompt path in [the immersive WebGL manual](/blog/immersive-web-design-manual). Use it when the scene is the brand. Do not lay it on top of sleeves that are already finished.

## Why does a searched image grid fail an artist homepage?

**A searched image grid fails because the picture did not come from Spotify, the tile does not link to the album, and the art is usually cropped to fit a widescreen frame.** That page looks like a moodboard. It does not pass the rules I have to ship under.

On October 13, 2026, the [Get Artist's Albums](https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums) reference said Spotify content may not be downloaded, visual content has to stay in its original form, and cover art has to link back to Spotify and carry the logo. The same note forbids a crop, an overlay, and a brand placed on the artwork. A Google result violates the first requirement before the CSS starts.

The [Spotify Developer Policy](https://developer.spotify.com/policy), effective 15 May 2025, is where I check the boundaries. Displayed Spotify content has to be attributed with the Spotify Marks. Cover art has to link to the applicable album, content, or playlist. Metadata, cover art, and audio preview clips may not be offered as a standalone service. An SDA may not have one artist as its sole subject unless you have applicable permissions. I build the wall when the artist, or a label that can speak for them, asked for the site. A stranger's discography, published as its own gallery, is the case I turn down.

<table>
  <thead>
    <tr>
      <th>What people ship</th>
      <th>What it breaks</th>
      <th>What I do instead</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A search-result collage</td>
      <td>The art is not the artwork Spotify provided</td>
      <td>The URL on the album object</td>
    </tr>
    <tr>
      <td>A widescreen crop</td>
      <td>The design guidelines say not to crop</td>
      <td>A square frame, whole sleeve</td>
    </tr>
    <tr>
      <td>A play icon on the sleeve</td>
      <td>No overlay and no playback control on the art</td>
      <td>The whole tile is the link</td>
    </tr>
    <tr>
      <td>Apple covers in the same grid</td>
      <td>The policy forbids mixing in another service's content</td>
      <td>Spotify art only in this hero</td>
    </tr>
    <tr>
      <td>A sleeve slideshow under a song</td>
      <td>The policy forbids syncing a recording to visual media, including a slideshow</td>
      <td>Still images, no audio on this hero</td>
    </tr>
  </tbody>
</table>

I keep four rules on the sheet, in this order:

1. Permission first. No ask, no wall.
2. Official URL only. No saved jpeg in the repo.
3. Link and logo. Both, or the tile is unfinished.
4. Original form. Size may change. The picture may not.

Version 10 of the [Spotify Developer Terms](https://developer.spotify.com/terms), also effective 15 May 2025, says you may adjust the size of metadata or cover art as necessary, and that you may not otherwise modify Spotify Content. Scaling a square in CSS is the adjustment. Stretching a sleeve into a banner is the modification.

The policy also says not to integrate a product with streams or content from another service. Other stores can live on a links row elsewhere on the site. They do not sit in this grid. A supervisor desk is a different first screen again. That one is [the brand-sync clearance card](/blog/a-music-artist-portfolio-that-books-brand-sync-deals-built-stitch-cursor-in-a-we), and it leads with owners, not sleeves.

## How do I pull official Spotify covers for one artist ID?

**I pull official Spotify covers with a server-side Client Credentials token, one artist ID, include_groups set to album and single, a market written in advance, and pages followed until next is null.** Then I keep the first image URL on each remaining row.

[Client Credentials](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow) is server-to-server. It does not include a listener's authorization, so it cannot read a private library, and it has no user country. The tutorial's example response sets token_type to bearer and expires_in to 3600. I treat expires_in as the clock on that response, and I request a new token when the window ends. The secret stays in the server environment. It never lands in the chat, the schema, or the repo.

When I read the albums reference on October 13, 2026, it said that if neither market nor user country is provided, the content is considered unavailable for the client. So the sheet has a market before I call. I do not guess a country because the example in the docs happens to say ES.

<table>
  <thead>
    <tr>
      <th>Request field</th>
      <th>Value I send</th>
      <th>Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>The Spotify ID from the artist</td>
      <td>The reference asks for an ID, not a name</td>
    </tr>
    <tr>
      <td>include_groups</td>
      <td>album,single</td>
      <td>Omitting it returns every type, including appears_on and compilation</td>
    </tr>
    <tr>
      <td>market</td>
      <td>The ISO code on the sheet</td>
      <td>A server token has no user country</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>10</td>
      <td>That was the maximum listed on the reference that day</td>
    </tr>
    <tr>
      <td>offset / next</td>
      <td>Follow next until null</td>
      <td>The reference does not list a sort parameter</td>
    </tr>
  </tbody>
</table>

The order of work on the server:

1. Paste the artist ID from the link they sent. If the ID is missing, stop.
2. Confirm the market code is filled in. If it is blank, stop.
3. Request the token on the server. Store nothing but the access token in memory for that run.
4. Call Get Artist's Albums with the fields in the table. Read total, then follow next until it is null.
5. Drop a row whose name is empty, whose images array has no URL, or whose Spotify URL is missing. Drop appears_on if it shows up.
6. Sort from the release_date string Spotify sent. Do not invent a month when release_date_precision is year. Write the precision onto the row so the page can show a year as a year.
7. Write the JSON where the site can read it. Do not commit the image bytes.

On October 13, 2026, that reference listed limit with a default of 5, a minimum of 1, and a maximum of 10. If I forget limit, I get a short page and I will think the catalog is smaller than total. I set 10 on purpose. total is the count of rows available, not the count in the first response.

The images array is cover art in various sizes, widest first. Height and width are nullable. I use the first URL even when width is null. I do not hunt down the list for a pixel size the page did not promise. The sample object on the page is an example shape, not a guarantee that every sleeve arrives at 300 pixels.

album_group is marked deprecated on that same page, and the allowed values are still album, single, compilation, and appears_on. I do not filter only on the deprecated field. include_groups is the request. The deprecated value is a backstop.

The name may be an empty string when an album is taken down. An empty name with a picture still stays off the wall. I will not type a title the response refused to send.

A year-only date and a day-precise date can share a year. I do not rewrite "2019" into a fake January 1. The day-precise row can sort inside that year. The year-only row keeps the label Spotify sent.

## How do I prompt Cursor to lay out the wall without redrawing the covers?

**Cursor lays out the wall from a blank schema and a component that loads the filled file later. It does not open the cover URLs, and it does not generate replacement sleeves.** The [Cursor Agent overview](https://cursor.com/docs/agent/overview), as I read it on October 13, 2026, says Agent opens in the sidepane with Cmd+I and is built from Instructions, Tools, and a Model.

Those tools include reading image files and generating images into the project's assets folder. There is no limit on tool calls in a task. Checkpoints can restore files from the session. That combination is why the prompt is narrow. If I do not forbid it, an agent that can open pictures, draw new ones, and keep calling tools will redraw a sleeve.

The Developer Policy and the Developer Terms, both effective 15 May 2025, forbid using Spotify Content to train a machine learning or AI model, or otherwise ingesting that content into one. Cover art is Spotify Content. I will not paste the files into the chat. A blank schema has empty strings. The real names and URLs are written by the server pull, outside the chat.

This is the prompt I paste:

> Read the blank schema in wall.schema.json. Build one hero component that loads data/wall.json with that shape. Do not open image URLs. Do not generate images. Do not search the web for sleeves. Each item with a url, a name, and a spotify_url becomes a square frame showing the whole picture. Large screens use an 8px corner radius. Small and medium screens use 4px. The first item in the file is the large square. The rest sit in a grid of squares. Each square is a link to spotify_url. Leave a slot for the Spotify logo beside the grid, not on a sleeve. If any of those three fields is blank, skip the item. If the file is missing, render nothing. Stop when that component builds.

The schema Cursor is allowed to see looks like this:

```json
{
  "artist_id": "",
  "market": "",
  "items": [
    {
      "name": "",
      "release_date": "",
      "release_date_precision": "",
      "url": "",
      "width": null,
      "height": null,
      "spotify_url": ""
    }
  ]
}
```

Every line in the prompt blocks one specific miss:

<table>
  <thead>
    <tr>
      <th>Line in the prompt</th>
      <th>What it blocks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Blank schema only</td>
      <td>A real discography pasted into the model</td>
    </tr>
    <tr>
      <td>Do not open image URLs</td>
      <td>The tool that can read png and jpg files</td>
    </tr>
    <tr>
      <td>Do not generate images</td>
      <td>The tool that writes new pictures into assets</td>
    </tr>
    <tr>
      <td>Square frame, whole picture</td>
      <td>A crop into a banner</td>
    </tr>
    <tr>
      <td>8px on large screens, 4px on small and medium</td>
      <td>A radius I invented per tile instead of per device</td>
    </tr>
    <tr>
      <td>Logo beside the grid</td>
      <td>A mark stamped on the sleeve</td>
    </tr>
    <tr>
      <td>Stop when that component builds</td>
      <td>A second page, a player, or a tour of the repo</td>
    </tr>
  </tbody>
</table>

The [design guidelines](https://developer.spotify.com/documentation/design), as I read them on October 13, 2026, say small and medium devices use a 4px corner radius and large devices use 8px. That is a device rule, not a "small tile" rule. Every sleeve on a desktop hero gets 8px, including the ones in the grid. On a phone, all of them get 4px. Rounding the corner of the frame is the guideline. Cropping to get that radius is not.

The same page says you may only use artwork Spotify provides, and you may not animate it, distort it, blur it, or overlay images or text. I do not Ken Burns the sleeve. The page can scroll. The picture does not move. Playback controls do not sit on the art. The whole square is the link.

If the agent crops anyway, I restore the checkpoint from that session and run the same prompt again. The overview says a checkpoint restores files. It does not erase the chat. I do not "fix" a cropped sleeve by generating a new one.

What Cursor may touch, and what it may not:

- It may add the hero component and the blank schema file.
- It may not open data/wall.json once that file holds real rows.
- It may not add a player, a second store's art, or a generated sleeve.
- It may not commit image bytes that were downloaded from the CDN.

This component is only one part of the full artist site. I have written that wider build up separately, including [the Fordo artist site](/blog/building-fordo-immersive-artist-website-ai-studio-cursor). This prompt stops at the wall.

## How do I check a Spotify album cover wall before it ships?

**The wall ships only when every tile is official, square, linked, and unlabeled by an overlay, the logo sits beside the grid, and the secret is still only on the server.** One miss sends it back. I do not publish a pretty failure.

The design guidelines also set the logo. Partner integrations should use the full logo, icon plus wordmark. The icon alone is allowed when there is not enough room for the full logo. The minimum is 70px in digital for the logo and 21px for the icon. The exclusion zone is half the icon height, so the mark does not touch a sleeve or sit in a muddy part of a photo. The green logo is for a black or white background. A dark colored background gets the white logo. I ship charcoal pages more often than pure black, so I use the white logo. I do not rotate it, recolor it, or stretch it. The guidelines say the orientation, color, and composition stay as specified.

Labels have a length budget on that same page. A layout should accommodate an album name of 25 characters, an artist name of 18, and a track name of 23. I may truncate on screen only if the full string can still be read. The link's accessible name carries the full album name, and the Spotify page shows it again. I do not shorten a title and throw away the rest.

One number on that page is easy to copy onto the wrong layout. The browsing section says that when an app links to a listener's Spotify account, a content set should never show more than 20 items. This wall does not link to a listener account. I still refuse to dump a whole catalog on the first screen. Nine is my hero. If more releases belong on the page, they go in a later Spotify-only grid, each one linked, none of them cropped.

<table>
  <thead>
    <tr>
      <th>Check</th>
      <th>Pass</th>
      <th>Fail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Permission</td>
      <td>The artist or label asked for this site</td>
      <td>The artist is a stranger</td>
    </tr>
    <tr>
      <td>ID and market</td>
      <td>Both filled before the call</td>
      <td>Name search, or a blank market</td>
    </tr>
    <tr>
      <td>Groups</td>
      <td>album,single, then drop appears_on</td>
      <td>Features on the hero</td>
    </tr>
    <tr>
      <td>Picture</td>
      <td>First URL, square, whole, still</td>
      <td>Crop, blur, overlay, motion, or a drawn replacement</td>
    </tr>
    <tr>
      <td>Link</td>
      <td>external_urls.spotify on that album</td>
      <td>A search URL or a dead tile</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>The string Spotify sent, full name still available</td>
      <td>Empty, or truncated with no way to read it</td>
    </tr>
    <tr>
      <td>Logo</td>
      <td>White full logo beside the grid, 70px or larger, gap of half an icon</td>
      <td>On the sleeve, green on charcoal, or smaller than the minimum</td>
    </tr>
    <tr>
      <td>Audio</td>
      <td>None on this hero</td>
      <td>A track under a moving wall</td>
    </tr>
    <tr>
      <td>Secret</td>
      <td>Server environment only</td>
      <td>In the prompt, the schema, or the repo</td>
    </tr>
  </tbody>
</table>

I run that list in order. Permission and the secret are not visual, so a screenshot is not the review. I also open the filled JSON and confirm the chat transcript never received it.

Before I publish it, I check the hero one more time:

1. Count the tiles against the filled file, not against memory.
2. Confirm the large square is the first row after my sort, and that a year-only date was not given a fake day.
3. Resize the browser. Desktop radius is 8px. Smaller breakpoints are 4px. The picture stays whole at both.
4. Tab to a tile. The accessible name is the full album name, and the link is the Spotify URL.
5. Look at the logo gap. If the mark touches a sleeve, it fails, even when the art itself is correct.

If you want this hero on a custom artist site, start with [the discovery call I use for a custom site](/blog/discovery-call-template-5-figure-web). Bring the artist ID and the country you actually sell in. If either one is missing, the call is about finding them, not about picking a typeface.

## FAQ

### What does the Spotify album images array contain?

**The images array is cover art in various sizes, widest first, and height and width on each object can be null.** On October 13, 2026, the [Get Artist's Albums](https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums) reference described it that way. I take the first URL. I do not skip ahead looking for a pixel size the page did not promise.

### Why does Get Artist's Albums cap a page at 10?

**On October 13, 2026, that reference listed a default limit of 5, a minimum of 1, and a maximum of 10.** I send 10 and follow next until it is null, because the page does not list a sort parameter and the first response is not the catalog. total is the number of rows available. Forgetting limit means I only asked for 5.

### Do I need a listener login to read a public discography?

**No. A public discography can be read with Client Credentials, which is server-to-server and does not log a listener in.** The [tutorial](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow) example I read on October 13, 2026 sets expires_in to 3600 seconds. Because that token has no user country, the albums reference says the content is considered unavailable unless I send market.

### Should features and compilations sit on the cover wall?

**Not on the hero.** I send include_groups=album,single. The albums reference says that omitting include_groups returns every type, including appears_on and compilation. A feature on someone else's record is not this artist's sleeve. If a deprecated album_group of appears_on still arrives, I drop that row.

### Can I crop, blur, or overlay a Spotify album cover?

**No. The sleeve stays in the form Spotify sent.** The albums reference and the [design guidelines](https://developer.spotify.com/documentation/design) I read on October 13, 2026 forbid a crop, a blur, an overlay, and a playback control on the art. Version 10 of the [Developer Terms](https://developer.spotify.com/terms), effective 15 May 2025, allows changing the size, but not redrawing the art.

### Where does the Spotify logo go on the wall?

**Beside the grid, never on a cover.** The design guidelines say a partner integration should use the full logo, at least 70px in digital, with an exclusion zone of half the icon height. A dark page gets the white logo, because green is for a black or white background. The icon alone, at least 21px, is only when the full logo does not fit.

### What if Spotify returns an empty album name?

**That release stays off the wall.** The albums reference says the name may be an empty string when an album is taken down. I also drop a row with no image URL or no Spotify URL. I do not invent a title to fill the gap.

### Does an embed player replace the cover wall?

**No. This hero does not play audio.** The [Developer Policy](https://developer.spotify.com/policy), effective 15 May 2025, limits streaming of music recordings through the platform to Premium subscribers, and it forbids synchronizing a recording with a slideshow or video. Widgets are a separate allowance in that policy. This page is the still grid.

### Can I paste cover files into Cursor to match the palette?

**No. Pasting the files asks a model to ingest Spotify Content.** The Developer Policy and version 10 of the Developer Terms, both effective 15 May 2025, forbid that. Cover art is included in Spotify Content. Cursor gets a blank schema. A color the artist wrote on their own brand note is theirs. I do not sample a sleeve to get it.
