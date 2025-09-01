#!/usr/bin/env node

const fs = require("node:fs");

// Get commit message from file
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

// Regex pattern: TEM-number, space, any gitmoji, space, message
const gitmoji_regex = /^:[a-zA-Z_]+:\s+TEM-\d+\s+.+/;

if (!gitmoji_regex.test(commitMsg)) {
	console.error(
		"❌ Commit message must follow format: :gitmoji: TEM-number message",
	);
	console.error("");
	console.error("Examples:");
	console.error("  :sparkles: TEM-123 add new user authentication");
	console.error("  :bug: TEM-456 fix login schemas error");
	console.error("  :zap: TEM-789 improve database query performance");
	process.exit(1);
}

console.log("✅ Commit message format is valid");
process.exit(0);
