import {
  PasswordGeneratorRequest,
  PasswordGeneratorResponse,
  JwtDecodeRequest,
  JwtDecodeResponse,
  JsonFormatterRequest,
  JsonFormatterResponse
} from '@core/interfaces/tools.interface';

export abstract class IToolsRepository {
  abstract generatePassword(request: PasswordGeneratorRequest): Promise<PasswordGeneratorResponse>;
  abstract decodeJwt(request: JwtDecodeRequest): Promise<JwtDecodeResponse>;
  abstract formatJson(request: JsonFormatterRequest): Promise<JsonFormatterResponse>;
}