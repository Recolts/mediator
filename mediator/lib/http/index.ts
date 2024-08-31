import axios from "axios";

export const RPC_INSTANCE = axios.create({
  baseURL:
    "https://devnet.helius-rpc.com/?api-key=86841795-5a03-4192-bd44-cbe41117cb77",
});
