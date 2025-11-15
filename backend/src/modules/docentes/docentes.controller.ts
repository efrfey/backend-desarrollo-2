import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DocentesService } from './docentes.service';

@Controller('api/docentes')
export class DocentesController {
  constructor(private readonly service: DocentesService) {}

  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':cedula')
  getOne(@Param('cedula') cedula: string) {
    return this.service.findOne(cedula);
  }

  @Delete(':cedula')
  delete(@Param('cedula') cedula: string) {
    return this.service.delete(cedula);
  }
}
