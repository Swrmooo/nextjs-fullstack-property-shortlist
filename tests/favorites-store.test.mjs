import test from "node:test";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

import { addFavorite, removeFavorite } from "../app/api/properties/store.mjs";

const dataPath = new URL("../app/api/properties/data.json", import.meta.url);

test("favorites can be added and removed for a user", async () => {
  const originalRaw = await readFile(dataPath, "utf8");

  try {
    const original = JSON.parse(originalRaw);
    original.favorites["user-test"] = [];
    await writeFile(dataPath, JSON.stringify(original, null, 2));

    const afterAdd = await addFavorite("user-test", "1");
    assert.deepEqual(afterAdd, ["1"]);

    const afterRemove = await removeFavorite("user-test", "1");
    assert.deepEqual(afterRemove, []);
  } finally {
    await writeFile(dataPath, originalRaw);
  }
});
