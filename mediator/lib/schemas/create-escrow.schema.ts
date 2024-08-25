import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateEscrowSchema = z.object({
  mintA: z.string().min(2).max(50),
  mintB: z.string().min(2).max(50),
  deposit: z.coerce.number(),
  receive: z.coerce.number(),
});

export type ICreateEscrowSchema = z.infer<typeof CreateEscrowSchema>;

export const CreateEscrowSchemaDefaults: ICreateEscrowSchema = {
  mintA: "",
  mintB: "",
  deposit: 0,
  receive: 0,
};
