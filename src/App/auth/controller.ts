import type { Request, Response } from "express";
import {randomBytes, createHmac} from "node:crypto"
import { signupPayloadValidation } from "./validator";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { id } from "zod/v4/locales";

const registerHandler = async (req: Request, res: Response) => {
  const validationResult = await signupPayloadValidation.safeParseAsync(req.body);
  if(!validationResult.success){
    return res
            .status(400)
            .json({
                message: "Payload Validation failed" , 
                error: validationResult.error.issues
            });
  }
  const {firstName, lastName, email, password } = validationResult.data;
  const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if(existingUser.length > 0){
    return res.status(400).json({error: "Duplicate Entry" ,message: `User already exists with this email: ${email}`})
  }

  const salt = randomBytes(32).toString('hex');
  const hash = createHmac('sha256', salt).update(password).digest('hex');

  const [result] = await db.insert(usersTable).values({
    firstName,
    lastName,
    email,
    password: hash,
    salt
  }).returning({ id: usersTable.id })

  return res.status(201).json({message: "User Created Successfully", data: {id : result?.id}})
};

// const loginHandler = async (req: Request, res: Response) => {

// }

export {registerHandler}