import { password } from 'bun'
import {pgTable, uuid, varchar, boolean, text, timestamp} from 'drizzle-orm/pg-core'


export const usersTable = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),
    firstName : varchar('first_name', {length: 40}).notNull(),
    lastName : varchar('last_name', {length: 40}),
    email: varchar('email', {length: 322}).notNull().unique(),
    emailVerified: boolean('email_verified').notNull().default(false),
    password: varchar('password', {length: 66}),
    salt: text('salt'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatesAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

// ORM - JS (camelCase)
// DB -- snake_case