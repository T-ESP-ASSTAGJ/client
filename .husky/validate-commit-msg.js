#!/usr/bin/env node

const fs = require("node:fs");

// Get commit message from file
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

// Regex pattern matching your CaptainHook config
const gitmoji_regex =
	/^(:(zap|sparkles|bug|rocket|recycle|art|ambulance|white_check_mark|wrench|memo):) .+/;

if (!gitmoji_regex.test(commitMsg)) {
	console.error(
		"❌ Commit message must start with a valid gitmoji followed by a space and a message.",
	);
	console.error(
		"Allowed: :zap: :sparkles: :bug: :rocket: :recycle: :art: :ambulance: :white_check_mark: :wrench: :memo:",
	);
	console.error("");
	console.error("Examples:");
	console.error("  :sparkles: add new user authentication");
	console.error("  :bug: fix login validation error");
	console.error("  :zap: improve database query performance");
	process.exit(1);
}

console.log("✅ Commit message format is valid");
process.exit(0);
