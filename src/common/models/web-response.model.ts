import { ApiProperty } from '@nestjs/swagger';

export class WebResponse<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];

  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: string;
}
