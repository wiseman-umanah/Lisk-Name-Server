import { LNSClient } from "../src";

const client = new LNSClient("d795e9bb81ff6cfa4738bd7eb2c330717741c80fce7c7081b819897e7bbf2950");

async function testResolve() {
  try {
    const address = await client.resolve("testname");
    console.log("✅ Resolved:", address);
  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  }
}

testResolve();
