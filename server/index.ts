import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import stytch, { UsersDeleteResponse } from "stytch";

dotenv.config({ path: "../.env.local" });

const app: Express = express();

app.use(express.json());
app.use(cors());

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID as string,
  secret: process.env.STYTCH_SECRET as string,
});

interface DeleteUserReqInputs {
  user_id: string;
}

app.post("/delete_user", (req: Request, res: Response) => {
  console.log("hit!");
  const { user_id }: DeleteUserReqInputs = req.body;

  client.users
    .delete({ user_id })
    .then((resp: UsersDeleteResponse) => {
      console.log(resp);
      return res.status(200).json(resp);
    })
    .catch((err: any) => {
      console.log(err);
      return res.status(400).send(err);
    });
});

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
  console.log(`Stytch passkey example app server listening on port ${port}`);
});
