import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: Logger) {
    super();
    this.logger.log('Create prisma service');
  }

  async onModuleInit() {
    this.logger.log('Connect to prisma');
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.fatal('Disconnect from prisma');
    await this.$disconnect();
  }
}
