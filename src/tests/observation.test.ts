// tests/observation.test.ts

import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { mockPrisma } from "./mockPrisma";
import observationService from "../services/observationService";

jest.mock("../config/database", () => ({
  __esModule: true,
  default: mockPrisma,
}));

describe("ObservationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an observation", async () => {
    const input = { quantity: 3, notes: "Test", speciesId: 1, zoneId: 1 };
    const expected = { id: 1, ...input, observedAt: new Date() };

    (mockPrisma.observation.create as jest.Mock<any>).mockResolvedValue(
      expected,
    );

    const result = await observationService.createObservation(input);

    expect(mockPrisma.observation.create).toHaveBeenCalledWith({
      data: input,
    });
    expect(result).toEqual(expected);
  });

  it("should add pages to observations", async () => {
    (mockPrisma.observation.findMany as jest.Mock<any>).mockResolvedValue([]);
    (mockPrisma.observation.count as jest.Mock<any>).mockResolvedValue(0);

    await observationService.getAllObservations({
      page: 2,
      perPage: 5,
    });

    expect(mockPrisma.observation.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 5,
        take: 5,
      }),
    );
  });
  it("should return null if observation is not found", async () => {
    (mockPrisma.observation.findUnique as jest.Mock<any>).mockResolvedValue(
      null,
    );

    const result = await observationService.getObservationById(999);

    expect(mockPrisma.observation.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
      include: {
        species: { select: { commonName: true } },
        zone: { select: { name: true } },
      },
    });
    expect(result).toBeNull();
  });
});
