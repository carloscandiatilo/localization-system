import { BaseTest } from 'src/core/base/teste/base.service.spec';
import { Provincia } from '../../provincia/entity/provincia.entity';
import { ProvinciaService } from '../../provincia/service/provincia.service';

describe('ProvinciaService', () => {
  const baseTest = new BaseTest<Provincia, ProvinciaService>();

  beforeAll(async () => {
    await baseTest.setup(ProvinciaService);
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
