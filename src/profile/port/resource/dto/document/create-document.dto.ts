import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDocumentDTO as ICreateDocumentDTO } from 'src/profile/application/dto/document';

export class CreateDocumentDTO implements ICreateDocumentDTO {
  @IsString()
  fileName: string;

  @IsNotEmpty()
  file: Buffer;
}
