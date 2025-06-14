import { Test, TestingModule } from '@nestjs/testing';
import { TemService } from './tem.service';

describe('TemService', () => {
    let service: TemService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TemService],
        }).compile();

        service = module.get<TemService>(TemService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
