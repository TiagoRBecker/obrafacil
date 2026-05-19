import { NotFoundException } from '@nestjs/common';

import { TeamMemberRole } from '../dto/create-team-member.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepository } from '../repo/team-member.repository';
import { DeleteTeamMemberUseCase } from '../usecase/delete-team-member.usecase';

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

describe('DeleteTeamMemberUseCase', () => {
  let teamMemberRepository: TeamMemberRepositoryMock;
  let useCase: DeleteTeamMemberUseCase;

  beforeEach(() => {
    teamMemberRepository = createRepositoryMock();
    useCase = new DeleteTeamMemberUseCase(teamMemberRepository);
  });

  it('should delete a team member successfully', async () => {
    teamMemberRepository.findById.mockResolvedValue(
      TeamMemberEntity.create({
        id: 'team-1',
        name: 'Joao Mendonca',
        jobTitle: 'Electrician',
        email: 'joao@eletrica.com',
        phone: '(11) 98765-4321',
        role: TeamMemberRole.ADMIN,
        createdAt: new Date('2026-03-01T10:00:00.000Z'),
        updatedAt: new Date('2026-03-01T10:00:00.000Z'),
      }),
    );
    teamMemberRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('team-1');

    expect(teamMemberRepository.findById).toHaveBeenCalledWith('team-1');
    expect(teamMemberRepository.delete).toHaveBeenCalledWith('team-1');
    expect(result).toEqual({
      id: 'team-1',
      deleted: true,
    });
  });

  it('should throw when team member is not found', async () => {
    teamMemberRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(teamMemberRepository.delete).not.toHaveBeenCalled();
  });
});
