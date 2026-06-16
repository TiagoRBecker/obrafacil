import { ConflictException, NotFoundException } from '@nestjs/common';
import { InMemoryTeamMemberRepository } from '../src/modules/team/repo/in-memory-team-member.repository';
import { CreateTeamMemberUseCase } from '../src/modules/team/usecase/create-team-member.usecase';
import { teamMock } from './helpers/mocks/team';
import { UpdateTeamMemberUseCase } from '../src/modules/team/usecase/update-team-member.usecase';
import { FindTeamMemberByIdUseCase } from '../src/modules/team/usecase/find-team-member-by-id.usecase';
import { FindAllTeamMembersUseCase } from '../src/modules/team/usecase/find-all-team-members.usecase';
import { DeleteTeamMemberUseCase } from '../src/modules/team/usecase/delete-team-member.usecase';

describe('Budgets  (Testes Unitários)', () => {
  let create: CreateTeamMemberUseCase;
  let repository: InMemoryTeamMemberRepository;
  let update: UpdateTeamMemberUseCase;
  let findById: FindTeamMemberByIdUseCase;
  let findAll: FindAllTeamMembersUseCase;
  let deleteTeam: DeleteTeamMemberUseCase;
  const id = '123'; // cliente inexistente erro  ao buscar notfound

  beforeEach(() => {
    // 1. Instanciamos o repositório falso em memória limpo para cada teste
    repository = new InMemoryTeamMemberRepository();

    // 2. Injetamos o repositório direto no serviço (Injeção de Dependência manual)
    create = new CreateTeamMemberUseCase(repository);
    update = new UpdateTeamMemberUseCase(repository);
    findById = new FindTeamMemberByIdUseCase(repository);
    findAll = new FindAllTeamMembersUseCase(repository);
    deleteTeam = new DeleteTeamMemberUseCase(repository);
  });
  describe('Teste  unitarios team', () => {
    describe('Testes de criaçao de team ', () => {
      it('Deve criar um colaborador ', async () => {
        const newTeam = await create.execute(teamMock);

        expect(newTeam.id).toBeDefined();
        expect(newTeam).toHaveProperty('id');
        expect(newTeam).toMatchObject({
          name: teamMock.name,
          email: teamMock.email,
          phone: teamMock.phone,
          jobTitle: teamMock.jobTitle,
        });
      });
      it('Deve falhar ao criar um colaborador email já cadastrado  ', async () => {
        const newTeam = await create.execute(teamMock);

        const newMockTeam = {
          ...teamMock,
          email: newTeam.email,
        };

        await expect(create.execute(newMockTeam)).rejects.toBeInstanceOf(
          ConflictException,
        );
      });
      it('Deve falhar ao criar um colaborador telefone já cadastrado  ', async () => {
        const newTeam = await create.execute(teamMock);

        const newMockTeam = {
          ...teamMock,
          phone: newTeam.phone as string,
        };

        await expect(create.execute(newMockTeam)).rejects.toBeInstanceOf(
          ConflictException,
        );
      });
    });
    describe('Testes de atualizaçao de team ', () => {
      it('Deve criar um colaborador  e atualizar um colaborador ', async () => {
        const createNew = await create.execute(teamMock);

        const newTeamDTO = {
          ...createNew,
          name: 'Novo Nome',
          jobTitle: 'Novo  nome de cardo ',
        };

        const updateTeam = await update.execute(createNew.id, newTeamDTO);
        expect(updateTeam.id).toBeDefined();
        expect(updateTeam).toHaveProperty('id');
        expect(updateTeam).toMatchObject({
          name: newTeamDTO.name,
          email: newTeamDTO.email,
          phone: newTeamDTO.phone,
          jobTitle: newTeamDTO.jobTitle,
        });
      });
      it('Deve falhar ao atualizar um colaborador  id nao encontrado  ', async () => {
        await create.execute(teamMock);

        const newMockTeam = {
          ...teamMock,
          email: 'novo email ',
        };

        await expect(update.execute(id, newMockTeam)).rejects.toBeInstanceOf(
          NotFoundException,
        );
      });
    });
    describe('Testes listagem  de team ', () => {
      it('Deve listar todos os colaboradores  ', async () => {
        for (let i = 0; i <= 5; i++) {
          await create.execute({
            email: `${i}${teamMock.email}`,
            phone: `${teamMock.phone}${i}`,
            jobTitle: teamMock.jobTitle,
            name: teamMock.name,
          });
        }

        const allTeams = await findAll.execute();
        expect(allTeams.data).toHaveLength(5);
      });
      it('Deve listar um  colaboradores  ', async () => {
        const newTeam = await create.execute(teamMock);

        const findTeam = await findById.execute(newTeam.id);

        expect(findTeam).toMatchObject({
          id: newTeam.id,
          name: newTeam.name,
          jobTitle: newTeam.jobTitle,
          phone: newTeam.phone,
        });
      });
      it('Deve falhar ao listar um  colaboradores ID nao existente  ', async () => {
        await create.execute(teamMock);

        await expect(findById.execute(id)).rejects.toBeInstanceOf(
          NotFoundException,
        );
      });
    });
    describe('Testes exclusao de um team ', () => {
      it('Deve  excluir um colaborador   ', async () => {
        const newTeam = await create.execute(teamMock);

        await deleteTeam.execute(newTeam.id);

        await expect(findById.execute(id)).rejects.toBeInstanceOf(
          NotFoundException,
        );
      });
    });
  });
});
