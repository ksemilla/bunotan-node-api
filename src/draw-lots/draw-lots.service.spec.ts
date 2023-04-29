import { Test, TestingModule } from '@nestjs/testing';
import { DrawLotsService } from './draw-lots.service';

describe('DrawLotsService', () => {
  let service: DrawLotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawLotsService],
    }).compile();

    service = module.get<DrawLotsService>(DrawLotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
