import { createGenericFile } from "@metaplex-foundation/umi";
import { readFile } from "fs/promises";
import { UMI_INSTANCE } from "./config";

(async () => {
  try {
    const imageFile = await readFile("./assets/images.jpeg");
    const image = createGenericFile(imageFile, "image.jpeg");
    const [myUri] = await UMI_INSTANCE.uploader.upload([image]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
