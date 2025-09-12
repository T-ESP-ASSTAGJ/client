export function formatDate(isoString: string) {
	const date = new Date(isoString);
	const now = new Date();

	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	const targetDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	if (targetDay.getTime() === today.getTime()) {
		return `Today, ${hours}:${minutes}`;
	}

	if (targetDay.getTime() === yesterday.getTime()) {
		return `Yesterday, ${hours}:${minutes}`;
	}

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function getYearFromDate(isoString: string) {
	const date = new Date(isoString);
	return date.getFullYear();
}

export function timeAgo(isoDate: string): string {
	const now = new Date();
	const past = new Date(isoDate);
	const diffMs = now.getTime() - past.getTime();

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) return `${seconds}s`;
	if (minutes < 60) return `${minutes}min`;
	if (hours < 24) return `${hours}h`;
	if (days < 7) return `${days}d`;
	if (weeks < 5) return `${weeks}w`;
	if (months < 12) return `${months}mo`;
	return `${years}y${years > 1 ? "s" : ""}`;
}

export function timeAgoFullString(isoDate: string): string {
	const now = new Date();
	const past = new Date(isoDate);
	const diffMs = now.getTime() - past.getTime();

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds === 1) return `${seconds} second`;
	if (minutes === 1) return `${minutes} minute`;
	if (hours === 1) return `${hours} hour`;
	if (days === 1) return `${days} day`;
	if (weeks === 1) return `${weeks} week`;
	if (months === 1) return `${months} month`;
	if (years === 1) return `${years} year`;
	if (seconds < 60) return `${seconds} seconds`;
	if (minutes < 60) return `${minutes} minutes`;
	if (hours < 24) return `${hours} hours`;
	if (days < 7) return `${days} days`;
	if (weeks < 5) return `${weeks} weeks`;
	if (months < 12) return `${months} months`;
	return `${years}y${years > 1 ? " seconds" : ""}`;
}
