import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';

@Controller('api/asistencias')
export class AsistenciasController {
  constructor(private readonly service: AsistenciasService) {}

  // Crear asistencia
  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }

  // Listar todas
  @Get()
  getAll() {
    return this.service.findAll();
  }

  // Buscar asistencias por estudiante
  @Get('estudiante/:id')
  getByEstudiante(@Param('id') id: string) {
    return this.service.findByEstudiante(id);
  }
}
