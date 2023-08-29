-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "options" TEXT[],
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" VARCHAR(255) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);
