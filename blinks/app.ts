import express, { Request, Response, NextFunction } from "express";
import {
  ActionGetResponse,
  ActionPostResponse,
  ActionsJson,
  createPostResponse,
} from "@solana/actions";
import cors from "cors";
import { takeEscrowTransaction, transferSolTransaction } from "./transactions";

export const app = express();

// MIDDLEWARES
app.use(express.json());

app.options(
  "*",
  cors({
    methods: ["GET,HEAD,PUT,PATCH,DELETE,OPTIONS"],
    allowedHeaders: [
      "Context-Type, Authorization, Content-Encoding, Accept-Encoding",
    ],
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Encoding, Accept-Encoding"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader("Content-Encoding", "compress");
  res.setHeader("Content-Type", "application/json");
  next();
});

// ROUTES
app.use("/actions.json", (req: Request, res: Response) => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/*",
        apiPath: "/actions/*",
      },
      {
        pathPattern: "/actions/**",
        apiPath: "/actions/**",
      },
    ],
  };
  res.json(payload);
});

app
  .get("/actions/claim/:id", (req, res) => {
    const { id } = req.params;
    const payload: ActionGetResponse = {
      type: "action",
      title: "Escrow Vault",
      icon: "https://1drv.ms/i/s!AjuN8wsWAP83rNYcb2s2oZhiuoSWaw?e=C6KuA2",
      description: "Mediator Swap",
      label: "Claim bidding",
      links: {
        actions: [
          {
            label: `Claim Now`,
            href: `/actions/claim?escrow=${id}`,
          },
        ],
      },
    };
    res.json(payload);
  })
  .post("/actions/claim", async (req, res) => {
    const { escrow } = req.query;
    const { account } = req.body;
    const transaction = await takeEscrowTransaction({
      taker: account,
      escrow: escrow as string,
    });

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Claim Bid",
      },
    });

    res.json(payload);
  });
