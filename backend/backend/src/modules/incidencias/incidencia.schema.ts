import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncidenciaDocument = Incidencia & Document;

@Schema({ collection: 'incidencias' })
export class Incidencia {
  @Prop({ type: String, required: true })
  idDocente: string;

  @Prop({ type: String, required: true })
  idClase: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: Date, default: Date.now })
  fechaReporte: Date;

  @Prop({ type: String, default: 'pendiente' })
  estado: string;
}

export const IncidenciaSchema = SchemaFactory.createForClass(Incidencia);
