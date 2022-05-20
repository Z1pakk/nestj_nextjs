import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
    }

    async onModuleInit(): Promise<any> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<any> {
        await this.$disconnect();
    }
}
