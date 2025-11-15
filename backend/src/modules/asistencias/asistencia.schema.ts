import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AsistenciaDocument = Asistencia & Document;

@Schema({ collection: 'asistencias' })
export class Asistencia {

  @Prop({ required: true })
  idDocente: string;

  @Prop({ required: true })
  idClase: string;

  @Prop()
  materia: string;

  @Prop()
  fecha: Date;

  @Prop()
  horaInicio: string;

  @Prop()
  horaFin: string;

  @Prop({ default: false })
  asistenciaRegistrada: boolean;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
