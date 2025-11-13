import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HorarioDocument = Horario & Document;

@Schema({ collection: 'horarios' })
export class Horario {
  @Prop({ type: String, required: true })
  idDocente: string;

  @Prop({ type: String, required: true })
  materia: string;

  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: String })
  horaInicio: string;

  @Prop({ type: String })
  horaFin: string;
}

export const HorarioSchema = SchemaFactory.createForClass(Horario);
