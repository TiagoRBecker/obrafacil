import { ConflictException, Injectable } from '@nestjs/common';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
@Injectable()
export class CreateInstanceNameUseCase {
  constructor(private readonly evoService: EvoApiClient) {}
  async execute(instanceName: string) {
    const existInstances = await this.evoService.getInstance();

    const exists = existInstances.some(
      (instance) => instance.name === instanceName,
    );
    if (exists) {
      throw new ConflictException(`Ja existe uma instancia   cadastrada!`);
    }
    const createInstance = await this.evoService.create(instanceName);
    console.log(createInstance);
    return `Instancia criada com sucesso`;
  }
}
