import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsRepository } from './specializations.repository';
import { SpecializationsService } from './specializations.service';

const mockSpecializationTitle = 'dermatologist';
const mockSpecialization = new Specialization();

describe('SpecializationsService', () => {
  let specializationsService: SpecializationsService;
  let specializationsRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecializationsService,
        {
          provide: SpecializationsRepository,
          useValue: {
            getSpecializations: jest.fn(),
            getSpecializationByTitle: jest.fn(),
          },
        },
      ],
    }).compile();

    specializationsService = module.get(SpecializationsService);
    specializationsRepository = module.get(SpecializationsRepository);
  });

  describe('calls getSpecializations', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      specializationsRepository.getSpecializations.mockResolvedValue([
        mockSpecialization,
      ]);

      expect(await specializationsService.getSpecializations()).toEqual([
        mockSpecialization,
      ]);
    });
  });

  describe('calls getSpecializationByTitle', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      specializationsRepository.getSpecializationByTitle.mockResolvedValue(
        mockSpecialization,
      );

      expect(
        await specializationsService.getSpecializationByTitle(
          mockSpecializationTitle,
        ),
      ).toEqual(mockSpecialization);
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      specializationsRepository.getSpecializationByTitle.mockResolvedValue(
        undefined,
      );

      await expect(
        specializationsService.getSpecializationByTitle(
          mockSpecializationTitle,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
