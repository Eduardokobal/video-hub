// One-off / reusable utility: uploads public/videos/*.mp4 and public/avatar.jpg
// to Vercel Blob (public access) and prints the resulting URLs — paste the
// video URLs into src/data/videos.ts (the `src` field) and the avatar URL
// into .env.local as AVATAR_URL.
//
// Usage: node --env-file=.env.local scripts/upload-to-blob.mjs
// Requires BLOB_READ_WRITE_TOKEN in .env.local (create a Blob store —
// access: Public — in the Vercel dashboard's Storage tab to get one).

import { put } from "@vercel/blob";
import { readdir, readFile, access as fsAccess } from "node:fs/promises";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");
const videosDir = path.join(publicDir, "videos");
const avatarPath = path.join(publicDir, "avatar.jpg");

async function uploadFile(filePath, blobName) {
  const buffer = await readFile(filePath);
  const blob = await put(blobName, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  console.log(`${blobName}\n  -> ${blob.url}\n`);
}

const videoFiles = (await readdir(videosDir).catch(() => [])).filter((f) =>
  f.endsWith(".mp4")
);

console.log(`Uploading ${videoFiles.length} video file(s)...\n`);
for (const file of videoFiles) {
  await uploadFile(path.join(videosDir, file), file);
}

const avatarExists = await fsAccess(avatarPath)
  .then(() => true)
  .catch(() => false);

if (avatarExists) {
  console.log("Uploading avatar...\n");
  await uploadFile(avatarPath, "avatar.jpg");
} else {
  console.log("No public/avatar.jpg found — skipping avatar upload.");
}
