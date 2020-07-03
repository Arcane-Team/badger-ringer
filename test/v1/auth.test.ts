import request from "supertest";
import server from "../../src/server";
import moment from "moment";
import Helper from "../helpers/helpers";

const headerValuesPromise = Helper.apiHeadersValues(moment().unix());
describe("GET /api/v1/requestToken", () => {
  it("should return 200 OK", async () => {
    const headerValues = await headerValuesPromise;
    const result = await request(server)
      .get("/api/v1/requestToken")
      .set({
        "X-API-Key": headerValues.apiKey,
        "X-API-Timestamp": headerValues.apiTimestamp,
        "X-API-Signature": headerValues.apiSignature
      });

    expect(result.body).toHaveProperty("success");
    expect(result.body.success).toEqual(true);
    expect(result.body).toHaveProperty("expires");
    expect(result.body).toHaveProperty("token");
    expect(result.status).toEqual(200);
  });

  it("should return 401 Unauthorized because expired timestamp", async () => {
    const headerExpiredValues = await Helper
      .apiHeadersValues(moment().subtract(11, "minutes")
      .unix());
    const result = await request(server)
      .get("/api/v1/requestToken")
      .set({
        "X-API-Key": headerExpiredValues.apiKey,
        "X-API-Timestamp": headerExpiredValues.apiTimestamp,
        "X-API-Signature": headerExpiredValues.apiSignature
      });

    expect(result.status).toEqual(401);
  });

  it("should return 401 Unauthorized because wrong signature", async () => {
    const headerValues = await headerValuesPromise;
    const result = await request(server)
      .get("/api/v1/requestToken")
      .set({
        "X-API-Key": headerValues.apiKey,
        "X-API-Timestamp": headerValues.apiTimestamp,
        "X-API-Signature": "test"
      });

    expect(result.status).toEqual(401);
  });
});
