import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';

import { WebResponse } from '../models/web-response.model';

export const ApiCreatedResponseCustom = <GenericType extends Type<unknown>>({
  type,
  description,
}: {
  type: GenericType;
  description?: string;
}) =>
  applyDecorators(
    ApiExtraModels(WebResponse, type),
    ApiCreatedResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(WebResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(type),
              },
            },
          },
        ],
      },
    }),
  );
