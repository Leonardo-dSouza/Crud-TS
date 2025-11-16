import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
const path = require('path');
const { PrismaClient } = require(path.join(process.cwd(), 'node_modules', '@prisma', 'client', '.prisma', 'client', 'client.js'));

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        (this as any).$on('beforeExit', async () => {
            await app.close();
        });
    }
}