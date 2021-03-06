import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({name, username, password}: IUserRequest) {
    // Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    // Cadastra um usuário
    const user = await client.user.create({
      data: {
        name,
        password: passwordHash,
        username,
      }
    });

    return user;
  }
}

export { CreateUserUseCase }