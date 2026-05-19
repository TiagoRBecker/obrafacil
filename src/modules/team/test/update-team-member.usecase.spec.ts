import { BadRequestException, NotFoundException } from '@nestjs/common';

import { TeamMemberRole } from '../dto/create-team-member.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepository } from '../repo/team-member.repository';
import { UpdateTeamMemberUseCase } from '../usecase/update-team-member.usecase';

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

describe('UpdateTeamMemberUseCase', () => {
  let teamMemberRepository: TeamMemberRepositoryMock;
  let useCase: UpdateTeamMemberUseCase;

  beforeEach(() => {
    teamMemberRepository = createRepositoryMock();
    useCase = new UpdateTeamMemberUseCase(teamMemberRepository);
  });

  it('should update a team member successfully', async () => {
    const existingMember = TeamMemberEntity.create({
      id: 'team-1',
      name: 'Joao Mendonca',
      jobTitle: 'Electrician',
      email: 'joao@eletrica.com',
      phone: '(11) 98765-4321',
      role: TeamMemberRole.ADMIN,
      createdAt: new Date('2026-03-01T10:00:00.000Z'),
      updatedAt: new Date('2026-03-01T10:00:00.000Z'),
    });

    teamMemberRepository.findById.mockResolvedValue(existingMember);
    teamMemberRepository.findByEmail.mockResolvedValue(null);
    teamMemberRepository.update.mockImplementation(async (member) => member);

    const result = await useCase.execute('team-1', {
      name: 'Joao Silva',
      jobTitle: 'Senior Electrician',
      email: 'joao.silva@eletrica.com',
      phone: '(11) 99999-0000',
      role: TeamMemberRole.MEMBER,
    });

    expect(teamMemberRepository.findById).toHaveBeenCalledWith('team-1');
    expect(teamMemberRepository.findByEmail).toHaveBeenCalledWith(
      'joao.silva@eletrica.com',
    );
    expect(teamMemberRepository.update).toHaveBeenCalledTimes(1);

    const updatedEntity = teamMemberRepository.update.mock.calls[0][0] as TeamMemberEntity;
    expect(updatedEntity.id).toBe('team-1');
    expect(updatedEntity.name).toBe('Joao Silva');
    expect(updatedEntity.email).toBe('joao.silva@eletrica.com');
    expect(updatedEntity.role).toBe(TeamMemberRole.MEMBER);

    expect(result).toMatchObject({
      id: 'team-1',
      name: 'Joao Silva',
      jobTitle: 'Senior Electrician',
      email: 'joao.silva@eletrica.com',
    });
  });

  it('should throw when team member is not found', async () => {
    teamMemberRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('missing-id', {
        name: 'Joao Silva',
        jobTitle: 'Senior Electrician',
        email: 'joao.silva@eletrica.com',
        phone: '(11) 99999-0000',
        role: TeamMemberRole.MEMBER,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(teamMemberRepository.update).not.toHaveBeenCalled();
  });

  it('should throw when another member already uses the email', async () => {
    teamMemberRepository.findById.mockResolvedValue(
      TeamMemberEntity.create({
        id: 'team-1',
        name: 'Joao Mendonca',
        jobTitle: 'Electrician',
        email: 'joao@eletrica.com',
        phone: '(11) 98765-4321',
        role: TeamMemberRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    teamMemberRepository.findByEmail.mockResolvedValue(
      TeamMemberEntity.create({
        id: 'team-2',
        name: 'Carlos Pereira',
        jobTitle: 'Assistant',
        email: 'carlos@eletrica.com',
        phone: '(11) 90000-0000',
        role: TeamMemberRole.MEMBER,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      useCase.execute('team-1', {
        name: 'Joao Silva',
        jobTitle: 'Senior Electrician',
        email: 'carlos@eletrica.com',
        phone: '(11) 99999-0000',
        role: TeamMemberRole.MEMBER,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(teamMemberRepository.update).not.toHaveBeenCalled();
  });
});
