import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { Response } from 'express';

@Controller('api/asistencias')
export class AsistenciasController {
  constructor(private readonly service: AsistenciasService) {}

  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':idDocente')
  getByDocente(@Param('idDocente') idDocente: string) {
    return this.service.findByDocente(idDocente);
  }

  @Get('reporte/download')
  async reporte(@Res() res: Response) {
    const buffer = await this.service.generarReporte();
    res.setHeader('Content-Disposition', 'attachment; filename=asistencias.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  }
}
