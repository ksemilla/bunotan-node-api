import { Test, TestingModule } from '@nestjs/testing';
import { DrawLotsController } from './draw-lots.controller';
import { ConfigService } from '@nestjs/config';

describe('DrawLotsController', () => {
  let controller: DrawLotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawLotsController],
      providers: [ConfigService],
    }).compile();

    controller = module.get<DrawLotsController>(DrawLotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
