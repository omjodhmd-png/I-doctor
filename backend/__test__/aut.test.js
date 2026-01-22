import { jest } from "@jest/globals";

/**
 * 1️⃣ MOCKS (خاصهم يكونو قبل أي import)
 */

// Mock User model
jest.mock("../models/user.js", () => ({
  __esModule: true,
  default: {
    hasOne: jest.fn(),     // باش ما يطيحش Sequelize
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock Doctor model (فارغ حيث ما محتاجينو)
jest.mock("../models/doctor.js", () => ({
  __esModule: true,
  default: {},
}));

// Mock bcrypt
jest.mock("bcrypt", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
  },
}));

// Mock jwt
jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

/**
 * 2️⃣ IMPORTS (من بعد mocks)
 */
import { register } from "../controllers/authController.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("REGISTER controller", () => {
  let req, res;

  beforeEach(() => {
    // نحبسو console.error باش ما يبانش فـ test
    jest.spyOn(console, "error").mockImplementation(() => {});

    req = {
      body: {
        fullName: "Test User",
        email: "test@test.com",
        password: "123456",
        role: "user",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  /**
   * ✅ SUCCESS
   */
  it("should register user successfully", async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.create.mockResolvedValue({
      id: 1,
      fullName: "Test User",
      email: "test@test.com",
      role: "user",
    });
    jwt.sign.mockReturnValue("fakeToken");

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User registered successfully",
        token: "fakeToken",
        role: "user",
      })
    );
  });

  /**
   * ❌ EMAIL EXISTS
   */
  it("should return 400 if email already exists", async () => {
    User.findOne.mockResolvedValue({ id: 1 });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email already in use",
    });
  });

  /**
   * ❌ MISSING FIELDS
   */
  it("should return 400 if required fields are missing", async () => {
    req.body = { email: "", password: "" };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  /**
   * ⚠️ INVALID ROLE → user
   */
  it("should force role to user if invalid role provided", async () => {
    req.body.role = "invalidRole";

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.create.mockResolvedValue({
      id: 2,
      fullName: "Test User",
      email: "test@test.com",
      role: "user",
    });
    jwt.sign.mockReturnValue("fakeToken2");

    await register(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        role: "user",
        token: "fakeToken2",
      })
    );
  });

  /**
   * 💥 SERVER ERROR
   */
  it("should handle server error", async () => {
    User.findOne.mockRejectedValue(new Error("DB error"));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
    });
  });
});
