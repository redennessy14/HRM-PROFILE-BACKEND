import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from 'src/data-access/document.entity';
import { Document } from 'src/profile/domain/document/document';
import { Repository } from 'typeorm';
import { DocumentMapper } from './mapper/document.mapper';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private documentRepo: Repository<DocumentEntity>,
  ) {}

  async findById(id: string) {
    return await this.documentRepo.find({ where: { profileId: id } });
  }

  async save(document: Document) {
    const documentEntity = DocumentMapper.toPersistence(document);
    return await this.documentRepo.save(documentEntity);
  }
}
