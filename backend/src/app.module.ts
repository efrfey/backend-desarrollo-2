import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DocentesModule } from './modules/docentes/docentes.module';
import { ClasesModule } from './modules/clases/clase.module';
import { HorariosModule } from './modules/horarios/horarios.module';
import { AsistenciasModule } from './modules/asistencias/asistencias.module';
import { IncidenciasModule } from './modules/incidencias/incidencias.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DB!,
    }),

    DocentesModule,
    ClasesModule,
    HorariosModule,
    AsistenciasModule,
    IncidenciasModule,
  ],
})
export class AppModule {}
