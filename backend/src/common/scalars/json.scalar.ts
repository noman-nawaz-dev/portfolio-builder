import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSON')
export class JSONScalar implements CustomScalar<object, object> {
  description = 'JSON custom scalar type';

  parseValue(value: object): object {
    return value;
  }

  serialize(value: object): object {
    return value;
  }

  parseLiteral(ast: ValueNode): object {
    if (ast.kind === Kind.OBJECT) {
      return Object.create(null);
    }
    return null;
  }
}
