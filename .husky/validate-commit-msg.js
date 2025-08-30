#!/usr/bin/env node

const fs = require("node:fs");

// Get commit message from file
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

// Regex pattern: TEM-number, space, any gitmoji, space, message
const gitmoji_regex = /^TEM-\d+\s+:[a-zA-Z_]+:\s+.+/;

if (!gitmoji_regex.test(commitMsg)) {
	console.error(
		"❌ Commit message must follow format: TEM-number :gitmoji: message",
	);
	console.error("");
	console.error("Examples:");
	console.error("  TEM-123 :sparkles: add new user authentication");
	console.error("  TEM-456 :bug: fix login validation error");
	console.error("  TEM-789 :zap: improve database query performance");
	process.exit(1);
}

console.log("✅ Commit message format is valid");
process.exit(0);
