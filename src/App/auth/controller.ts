import type { Request, Response } from "express";
import {randomBytes, createHmac} from "node:crypto"
import { loginPayloadValidation, signupPayloadValidation } from "./validator";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { id } from "zod/v4/locales";
import { safeParseAsync } from "zod";
import { createUserToken, verifyUserToken } from "./utils/token";

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

const loginHandler = async (req: Request, res: Response) => {
    const validationResult = await loginPayloadValidation.safeParseAsync(req.body);
    if(!validationResult.success){
        return res
                .status(400)
                .json({
                    message: "Payload Validation failed" , 
                    error: validationResult.error.issues
                });
    }
    const { email, password } = validationResult.data;
    const [selectUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(!selectUser){
        return res.status(404).json({error: "User not found" ,message: `User not found with this email: ${email}`})
    }

    const salt = selectUser.salt!
    const hash = createHmac('sha256', salt).update(password).digest('hex');

    if(hash !== selectUser.password){
        return res.status(400).json({error: "Invalid Credentials", message: "Email or Password did not match"})
    }

    const token = createUserToken({ id: selectUser.id });

    return res.status(200).json({message: "Login Successful", data: {token}})

}

export {registerHandler, loginHandler}