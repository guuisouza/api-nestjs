import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common'

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body }
  }

  @Get()
  async list() {
    return {
      users: []
    }
  }

  @Get(':id')
  async showById(@Param() params) {
    return { user: {}, params }
  }

  @Put(':id')
  async update(@Param() params, @Body() body) {
    return {
      method: 'Put',
      body,
      params
    }
  }

  @Patch(':id')
  async updatePartial(@Param() params, @Body() body) {
    return {
      method: 'Patch',
      body,
      params
    }
  }

  @Delete(':id')
  async delete(@Param() params) {
    return { params }
  }
}
