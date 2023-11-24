import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `porto_resq2_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const chat_sessions = mysqlTable("chat_sessions", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  start_time: timestamp("start_time").defaultNow(),
  end_time: timestamp("end_time"),
});

export const chat_messages = mysqlTable("chat_messages", {
  id: int("id").primaryKey().autoincrement(),
  session_id: int("session_id").notNull(),
  content_type: varchar("content_type", { length: 20 }).default("text"),
  sender: varchar("sender", { length: 20 }),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const questions = mysqlTable("questions", {
  id: int("id").primaryKey().autoincrement(),
  question_text: text("question_text").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const options = mysqlTable("options", {
  id: int("id").primaryKey().autoincrement(),
  question_id: int("question_id").notNull(),
  option_text: text("option_text").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const user_answers = mysqlTable("user_answers", {
  id: int("id").primaryKey().autoincrement(),
  session_id: int("session_id").notNull(),
  question_id: int("question_id").notNull(),
  option_id: int("option_id").notNull(),
  user_id: varchar("user_id", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
});

// Relations
export const chat_sessionsRelations = relations(chat_sessions, ({ one }) => ({
  user: one(users, { fields: [chat_sessions.userId], references: [users.id] }),
}));

export const chat_messagesRelations = relations(chat_messages, ({ one }) => ({
  session: one(chat_sessions, {
    fields: [chat_messages.session_id],
    references: [chat_sessions.id],
  }),
}));

export const optionsRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.question_id],
    references: [questions.id],
  }),
}));

export const user_answersRelations = relations(user_answers, ({ one }) => ({
  session: one(chat_sessions, {
    fields: [user_answers.session_id],
    references: [chat_sessions.id],
  }),
  question: one(questions, {
    fields: [user_answers.question_id],
    references: [questions.id],
  }),
  option: one(options, {
    fields: [user_answers.option_id],
    references: [options.id],
  }),
}));
