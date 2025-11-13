import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocenteSchema } from './docente.schema';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Docente.name, schema: DocenteSchema }])],
  providers: [DocentesService],
  controllers: [DocentesController],
  exports: [DocentesService],
})
export class DocentesModule {}
