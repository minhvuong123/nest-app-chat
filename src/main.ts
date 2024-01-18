import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const { PORT } = process.env;
    await app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
