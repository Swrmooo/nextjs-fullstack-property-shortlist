import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dataFilePath = join(process.cwd(), "app/api/properties/data.json");

async function readDb() {
  const raw = await readFile(dataFilePath, "utf8");
  return JSON.parse(raw);
}

async function writeDb(db) {
  await writeFile(dataFilePath, JSON.stringify(db, null, 2));
}

export async function getPropertiesWithFavorites(userId) {
  const db = await readDb();
  const favorites = db.favorites[userId] ?? [];

  return {
    properties: db.properties,
    favorites,
  };
}

export async function getFavorites(userId) {
  const db = await readDb();
  return db.favorites[userId] ?? [];
}

export async function addFavorite(userId, propertyId) {
  const db = await readDb();
  const propertyExists = db.properties.some((property) => property.id === propertyId);

  if (!propertyExists) {
    throw new Error("Property not found");
  }

  const current = db.favorites[userId] ?? [];
  if (!current.includes(propertyId)) {
    db.favorites[userId] = [...current, propertyId];
    await writeDb(db);
  }

  return db.favorites[userId] ?? [];
}

export async function removeFavorite(userId, propertyId) {
  const db = await readDb();
  const current = db.favorites[userId] ?? [];
  db.favorites[userId] = current.filter((id) => id !== propertyId);
  await writeDb(db);
  return db.favorites[userId] ?? [];
}
