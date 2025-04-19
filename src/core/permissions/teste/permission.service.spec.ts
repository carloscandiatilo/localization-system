import { BaseTest } from 'src/core/base/teste/base.service.spec';
import { PermissionService } from '../service/permission.service';
import { Permission } from '../entity/permission.entity';

describe('PermissionService', () => {
  const baseTest = new BaseTest<Permission, PermissionService>();

  beforeAll(async () => {
    await baseTest.setup(PermissionService);
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
