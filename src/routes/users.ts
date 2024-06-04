import { Router, response } from "express";
import { db } from "@/db/db.js";
import { users } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/users/:id", async (request, response) => {
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ message: "Invalid user ID" });
  }
  try {
    const result = await db
      .select({
        user_id: users.user_id,
        surname: users.surname,
        lastname: users.lastname,
        email: users.email,
        phone: users.phone,
        address: users.address,
      })
      .from(users)
      .where(eq(users.user_id, parsedId));
    console.log(result);

    if (!result[0]) return response.status(404).send({ msg: "User not found" });
    response.status(200).send(result[0]);
  } catch (err) {
    response.status(500).send({ msg: "An error occured" });
    console.log("Error: ", err);
  }
});

// validation of user post request before it is stored in the database
const validateNewUser = () => {
  return [
    body("surname")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name must not be empty")
      .trim(),
    body("lastname")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name must not be empty")
      .trim(),
    body("email", "Field must be an email").trim().isEmail(),
    body("password")
      .isLength({ min: 6, max: 50 })
      .withMessage("Password must be 6-50 characters"),
    body("phone")
      .isString()
      .notEmpty()
      .withMessage("Phone number cannot be empty")
      .trim(),
    body("address")
      .isString()
      .notEmpty()
      .withMessage("Address cannot be empty"),
  ];
};

// post request for creating a new user
router.post("/users", validateNewUser(), async (request, response) => {
  const { body } = request;
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).send({ errors: result.array() });
  }

  try {
    await db.insert(users).values({
      surname: body.surname,
      lastname: body.lastname,
      password: body.password,
      address: body.address,
      email: body.email,
      phone: body.phone,
    });
  } catch (err) {
    switch (err.code) {
      case "23505":
        return response.status(409).send({ msg: "email already exists" });
        break;
    }
  }

  response.sendStatus(200);
});

router.put("/users/:id", validateNewUser(), async (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).send({ error: result.array() });
  }

  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).send({ message: "Invalid user ID" });
  try {
    await db
      .update(users)
      .set({
        surname: body.surname,
        lastname: body.lastname,
        password: body.password,
        phone: body.phone,
        address: body.address,
        email: body.email,
      })
      .where(eq(users.user_id, parsedId));
    response.status(200).send({ msg: "Successful" });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/users", (request, response) => {});
export default router;
