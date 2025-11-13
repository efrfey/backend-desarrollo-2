import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clase, ClaseSchema } from './clase.schema';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Clase.name, schema: ClaseSchema }])],
  providers: [ClasesService],
  controllers: [ClasesController],
  exports: [ClasesService],
})
export class ClasesModule {}
