import { BadRequestException } from '@nestjs/common';

import { CreateTeamMemberDto, TeamMemberRole } from '../dto/create-team-member.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepository } from '../repo/team-member.repository';
import { CreateTeamMemberUseCase } from '../usecase/create-team-member.usecase';

type TeamMemberRepositoryMock = jest.Mocked<TeamMemberRepository>;

function createRepositoryMock(): TeamMemberRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };
}

describe('CreateTeamMemberUseCase', () => {
  let teamMemberRepository: TeamMemberRepositoryMock;
  let useCase: CreateTeamMemberUseCase;

  beforeEach(() => {
    teamMemberRepository = createRepositoryMock();
    useCase = new CreateTeamMemberUseCase(teamMemberRepository);
  });

  it('should create a team member successfully', async () => {
    teamMemberRepository.findByEmail.mockResolvedValue(null);
    teamMemberRepository.create.mockImplementation(async (member) => member);

    const input: CreateTeamMemberDto = {
      name: 'Joao Mendonca',
      jobTitle: 'Electrician',
      email: 'JOAO@ELETRICA.COM',
      phone: ' (11) 98765-4321 ',
      role: TeamMemberRole.ADMIN,
    };

    const result = await useCase.execute(input);

    expect(teamMemberRepository.findByEmail).toHaveBeenCalledWith('JOAO@ELETRICA.COM');
    expect(teamMemberRepository.create).toHaveBeenCalledTimes(1);

    const createdEntity = teamMemberRepository.create.mock.calls[0][0] as TeamMemberEntity;
    expect(createdEntity.name).toBe('Joao Mendonca');
    expect(createdEntity.email).toBe('joao@eletrica.com');
    expect(createdEntity.phone).toBe('(11) 98765-4321');
    expect(createdEntity.role).toBe(TeamMemberRole.ADMIN);

    expect(result.name).toBe('Joao Mendonca');
    expect(result.email).toBe('joao@eletrica.com');
    expect(result.role).toBe(TeamMemberRole.ADMIN);
    expect(result.id).toBeTruthy();
  });

  it('should throw when email is already in use', async () => {
    teamMemberRepository.findByEmail.mockResolvedValue(
      TeamMemberEntity.create({
        id: 'team-1',
        name: 'Existing Member',
        jobTitle: 'Technician',
        email: 'existing@company.com',
        phone: '(11) 90000-0000',
        role: TeamMemberRole.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      useCase.execute({
        name: 'Another Member',
        jobTitle: 'Electrician',
        email: 'existing@company.com',
        phone: '(11) 91111-1111',
        role: TeamMemberRole.VIEWER,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(teamMemberRepository.create).not.toHaveBeenCalled();
  });
});
