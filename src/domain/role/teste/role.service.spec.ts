import { BaseTest } from 'src/core/base/teste/base.service.spec';
import { RoleService } from '../service/role.service';
import { Role } from '../entity/role.entity';

describe('RoleService', () => {
  const baseTest = new BaseTest<Role, RoleService>();

  beforeAll(async () => {
    await baseTest.setup(RoleService);
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
