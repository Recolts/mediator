import { UMI_INSTANCE } from "./config";

(async () => {
  try {
    const image =
      "https://arweave.net/jgqEvcijKnempqMLmE3BV3wH25VNQpVwdHi5bcVZDRA";
    const metadata = {
      name: "Image",
      symbol: "IMG",
      description: "A simple description",
      image,
      attributes: [{ trait_type: "Simplicity Level", value: "100" }],
      properties: {
        files: [
          {
            type: "image/jpeg",
            uri: image,
          },
        ],
      },
      creators: [],
    };
    const myUri = await UMI_INSTANCE.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
