import {sign} from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "bc93954c-45dd-41fe-9f2f-6f74d9b5c8e8", {
      subject: userId,
      expiresIn: "2m",
    });

    return token;
  }
}

export { GenerateTokenProvider };