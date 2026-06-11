import { Injectable, Logger } from '@nestjs/common';


import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';
import { SignUpDto } from '../../users/dto/sign-up.dto';
import { CreateAccountUseCase } from '../../users/usecase/create-account-usecase';

@Injectable()
export class SignUpUseCase {
  private readonly logger = new Logger(SignUpUseCase.name);

  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly generateHashUseCase: GenerateHashUseCase,
  ) {}

  async execute(input: SignUpDto) {
  
   const  {user} = await this.createAccountUseCase.execute(input);
    return {
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email,
        role: user.role,
       
      },
    };
  }
}
