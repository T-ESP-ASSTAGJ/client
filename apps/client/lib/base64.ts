import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function getBase64FromUri(phAssetUri: string) {
	try {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== "granted") {
			throw new Error("Media library permission not granted");
		}

		const assetId = phAssetUri.replace("ph://", "").split("/")[0];

		const asset = await MediaLibrary.getAssetInfoAsync(assetId);

		if (!asset || !asset.localUri) {
			throw new Error("Could not get asset local URI");
		}

		return await FileSystem.readAsStringAsync(asset.localUri, {
			encoding: FileSystem.EncodingType.Base64,
		});
	} catch (error) {
		console.error("Error converting PHAsset:", error);
		throw error;
	}
}
