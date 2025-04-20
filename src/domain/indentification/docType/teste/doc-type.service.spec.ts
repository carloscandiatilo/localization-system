import { BaseTest } from 'src/core/base/teste/base.service.spec';
import { DocType } from '../entity/doc-type.entity';
import { DocTypeService } from '../service/doc-type.service';

describe('DocTypeService', () => {
  const baseTest = new BaseTest<DocType, DocTypeService>();

  beforeAll(async () => {
    await baseTest.setup(DocTypeService);
  });

  afterAll(async () => {
    await baseTest.close();
  });

  it('deve estar definido', () => {
    expect(baseTest.getService()).toBeDefined();
  });

  it('deve chamar o método findAndCount', async () => {
    const service = baseTest.getService();
    const mockRepository = baseTest.getMockRepository();

    await service.findAndCount({});
    expect(mockRepository.findAndCount).toHaveBeenCalled();
  });
});
