# Migration `20200826170856-task-t`

This migration has been generated by Felipe Henrique at 8/26/2020, 2:08:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."task" DROP CONSTRAINT "task_authorId_fkey"

CREATE TABLE "public"."Task" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"finished" boolean   NOT NULL DEFAULT false,
"title" text   NOT NULL ,
"authorId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE "public"."task"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200826165942-lowercased-task..20200826170856-task-t
--- datamodel.dml
+++ datamodel.dml
@@ -3,23 +3,23 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
-model task {
+model User {
+  id       Int     @default(autoincrement()) @id
+  email    String  @unique
+  name     String?
+  password String
+  task     Task[]
+}
+
+model Task {
   id        Int      @default(autoincrement()) @id
   createdAt DateTime @default(now())
   finished  Boolean  @default(false)
   title     String
   authorId  Int
   User      User     @relation(fields: [authorId], references: [id])
 }
-
-model User {
-  id       Int     @default(autoincrement()) @id
-  email    String  @unique
-  name     String?
-  password String
-  Task     task[]
-}
```


