import { Test, TestingModule } from '@nestjs/testing';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

const mockSpecializationTitle = 'dermatologist';
const mockSpecialization = new Specialization();

describe('RolesService', () => {
  let specializationsService: SpecializationsService;
  let specializationsRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecializationsService,
        {
          provide: SpecializationsRepository,
          useValue: {
            getSpecializationByTitle: jest.fn(),
          },
        },
      ],
    }).compile();

    specializationsService = module.get(SpecializationsService);
    specializationsRepository = module.get(SpecializationsRepository);
  });

  describe('calls getSpecializationByTitle', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      specializationsRepository.getSpecializationByTitle.mockResolvedValue(
        mockSpecialization,
      );

      const result = await specializationsService.getSpecializationByTitle(
        mockSpecializationTitle,
      );

      expect(result).toEqual(mockSpecialization);
    });
  });
});
