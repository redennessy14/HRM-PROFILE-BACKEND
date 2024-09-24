import { AggregateRoot } from '@nestjs/cqrs';
import { DocumentType } from '../enum';

export class Document extends AggregateRoot {
  id: string;
  profileId: string;
  type: DocumentType;
  fileName: string;

  constructor(
    id: string,
    profileId: string,
    type: DocumentType,
    fileName: string,
  ) {
    super();
    this.id = id;
    this.profileId = profileId;
    this.type = type;
    this.fileName = fileName;
  }

  static New(
    id: string,
    profileId: string,
    type: DocumentType,
    fileName: string,
  ): Document {
    return new Document(id, profileId, type, fileName);
  }
}
