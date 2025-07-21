import { getEmojiUrl } from "@/actions/emojis/emoji.action";
import { Image } from "expo-image";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

interface EmojiImageProps {
	icon: string;
	size?: number;
	useCaching?: boolean;
}

/**
 * Composant pour afficher un emoji depuis GitHub avec gestion de cache optionnelle
 */
export const EmojiIcon: React.FC<EmojiImageProps> = ({
	icon,
	size = 42,
	useCaching = true,
}) => {
	// Utiliser useMemo pour calculer l'URL une seule fois
	const emojiUrl = useMemo(() => {
		const emojiCategory = icon.split("/")[0];
		const emojiName = icon.split("/")[1].replace(".png", "");

		return getEmojiUrl({ category: emojiCategory, name: emojiName });
	}, [icon]);

	return (
		<Image
			style={{ width: size, height: size }}
			source={{ uri: emojiUrl }}
			contentFit={"contain"}
			cachePolicy="memory-disk"
			className={"rounded-full"}
		/>
	);
};

export default EmojiIcon;
