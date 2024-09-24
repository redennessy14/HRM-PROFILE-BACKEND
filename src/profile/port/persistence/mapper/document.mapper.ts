import { DocumentEntity } from 'src/data-access/document.entity';
import { Document } from 'src/profile/domain/document/document';

export class DocumentMapper {
  static toPersistence(document: Document): DocumentEntity {
    const documentEntity = new DocumentEntity();
    documentEntity.id = document.id;
    documentEntity.profileId = document.profileId;
    documentEntity.type = document.type;
    documentEntity.fileName = document.fileName;
    return documentEntity;
  }
}
