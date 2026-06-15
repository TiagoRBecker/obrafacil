import { InMemoryTeamMemberRepository } from '../src/modules/team/repo/in-memory-team-member.repository';
import { CreateTeamMemberUseCase } from '../src/modules/team/usecase/create-team-member.usecase';
import { teamMock } from './helpers/mocks/team';

describe('Budgets  (Testes Unitários)', () => {
  let create: CreateTeamMemberUseCase;
  let repository: InMemoryTeamMemberRepository;

  const id = '123'; // cliente inexistente erro  ao buscar notfound

  beforeEach(() => {
    // 1. Instanciamos o repositório falso em memória limpo para cada teste
    repository = new InMemoryTeamMemberRepository();

    // 2. Injetamos o repositório direto no serviço (Injeção de Dependência manual)
    create = new CreateTeamMemberUseCase(repository);
  });
  describe('Teste  unitarios time', () => {
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
  });
});
