import dotenv from "dotenv";
dotenv.config();

import { Agent } from "@storacha/access";
import { Client } from "@storacha/client";
import { filesFromPaths } from "files-from-path";

const SPACE_DID = process.env.SPACE_DID;

async function run() {
  // Load files from folder
  const files = await filesFromPaths(["./"]);

  // Load the agent from your local store (this includes your proofs)
  const agent = await Agent.fromFileSystem();

  // Initialize client with the agent
  const client = new Client({ agent });

  // Set the current Space DID
  await client.setCurrentSpace(SPACE_DID);

  // Upload directory
  const cid = await client.uploadDirectory(files);

  console.log("Uploaded! CID:", cid.toString());
}

run();
