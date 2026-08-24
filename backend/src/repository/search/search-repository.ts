
import { PrismaClient } from "@prisma/client";
import type { Request } from "express";

export class SearchRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }



}
