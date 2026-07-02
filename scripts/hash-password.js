// Run this locally to generate a value for ADMIN_PASSWORD_HASH.
// Usage:  node scripts/hash-password.js "your-chosen-password"

const { scryptSync, randomBytes } = require("crypto");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js \"your-chosen-password\"");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log("\nAdd this to your environment variables as ADMIN_PASSWORD_HASH:\n");
console.log(`${salt}:${hash}`);
console.log("\nDo not commit this value or the plaintext password anywhere.\n");
