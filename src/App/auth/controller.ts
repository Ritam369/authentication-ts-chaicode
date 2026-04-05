import type { Request, Response, NextFunction } from "express";
import {randomBytes, createHmac} from "node:crypto"
import { loginPayloadValidation, signupPayloadValidation } from "./validator";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { createUserToken, verifyUserToken } from "./utils/token";
import type { UserTokenPayload } from "./utils/token"; 
import ApiError from "./utils/api-error.js";
import ApiResponse from "./utils/api-response";

const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult = await signupPayloadValidation.safeParseAsync(req.body);
  if(!validationResult.success){
    return next(ApiError.badRequest("Payload Validation failed", validationResult.error.issues));
  }
  const {firstName, lastName, email, password } = validationResult.data;
  const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if(existingUser.length > 0){
    return next(ApiError.conflict(`User already exists with this email: ${email}`));
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

  return ApiResponse.created(res, "User Created Successfully", {id : result?.id});
};

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = await loginPayloadValidation.safeParseAsync(req.body);
    if(!validationResult.success){
        return next(ApiError.badRequest("Payload Validation failed", validationResult.error.issues));
    }
    const { email, password } = validationResult.data;
    const [selectUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(!selectUser){
        return next(ApiError.notFound(`User not found with this email: ${email}`));
    }

    const salt = selectUser.salt!
    const hash = createHmac('sha256', salt).update(password).digest('hex');

    if(hash !== selectUser.password){
        return next(ApiError.badRequest("Email or Password did not match"));
    }

    const token = createUserToken({ id: selectUser.id });

    return ApiResponse.success(res, "Login Successful", {token});
}

const handleMe = async (req: Request, res: Response) => {
    // @ts-ignore
    const {id} = req.user! as UserTokenPayload

    const [userResult] = await db.select().from(usersTable).where(eq(usersTable.id, id))

    return res.json({
        firstName: userResult?.firstName,
        lastName: userResult?.lastName,
        email: userResult?.email
    })
}

export {registerHandler, loginHandler, handleMe}