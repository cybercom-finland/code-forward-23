const { unstable_dev } = require("wrangler");
const { expect } = require("chai");

describe("Worker", () => {
  let worker;

  before(async () => {
    worker = await unstable_dev("src/worker.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  after(async () => {
    await worker.stop();
  });

  it("should return Hello Worker", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).to.equal("Hello Worker!");
    }
  });
});