import { Controller } from '@nestjs/common';
import { BaseController } from 'src/controller/core-controller/base.controller';
import { DocTypeDto } from 'src/domain/indentification/docType/dto/doc-type-dto';
import { DocType } from 'src/domain/indentification/docType/entity/doc-type.entity';
import { DocTypeService } from 'src/domain/indentification/docType/service/doc-type.service';

@Controller('doc-types')
export class DocTypeController extends BaseController<DocType, DocTypeDto> {
  constructor(private readonly docTypeService: DocTypeService) {
    super(docTypeService, DocTypeDto); 
  }
}