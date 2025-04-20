import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { DocType } from '../entity/doc-type.entity';

@Injectable()
export class DocTypeRepository extends BaseRepository<DocType> {
  constructor(dataSource: DataSource) {
    super(DocType, dataSource);
  }
}
