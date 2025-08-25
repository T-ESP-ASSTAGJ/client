export function formatDate(isoString: string) {
    const date = new Date(isoString);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (targetDay.getTime() === today.getTime()) {
        return `Today, ${hours}:${minutes}`;
    } else if (targetDay.getTime() === yesterday.getTime()) {
        return `Yesterday, ${hours}:${minutes}`;
    } else {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
}

export function getYearFromDate(isoString: string) {
    const date = new Date(isoString);
    return date.getFullYear();
}