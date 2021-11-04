import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { UserRole } from '@macc4-clinic/common';

const mockRoleTitle = UserRole.PATIENT;
const mockRole = new Role();

describe('RolesService', () => {
  let rolesService: RolesService;
  let rolesRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RolesRepository,
          useValue: {
            getRoleByTitle: jest.fn(),
          },
        },
      ],
    }).compile();

    rolesService = module.get(RolesService);
    rolesRepository = module.get(RolesRepository);
  });

  describe('calls getRoleByTitle', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      rolesRepository.getRoleByTitle.mockResolvedValue(mockRole);

      const result = await rolesService.getRoleByTitle(mockRoleTitle);

      expect(result).toEqual(mockRole);
    });
  });
});
