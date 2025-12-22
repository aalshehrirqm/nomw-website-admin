import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  live() {
    return { status: 'ok' };
  }

  @Get('ready')
  ready() {
    const isConnected = this.connection.readyState === 1;
    if (!isConnected) {
      return { status: 'not-ready' };
    }
    return { status: 'ready' };
  }
}
