import { UMI_INSTANCE } from "./config";

(async () => {
  try {
    const image =
      "https://arweave.net/B5qUjbvM23zytb2ptc0rAjlYhsQckdqUsMslJuTGxq4";
    const metadata = {
      name: "Solana",
      symbol: "SOL",
      description: "Solana",
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
