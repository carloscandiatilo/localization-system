import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AuditService } from 'src/domain/audit/service/audit.service';
import { BaseService } from '../service/base.service';
import { BaseRepository } from '../repository/base.repository';

export class BaseTest<T extends { id: number; isDeleted?: boolean }, S extends BaseService<T>> {
  private service: S;
  private mockRepository: Partial<BaseRepository<T>>;
  private mockAuditService: Partial<AuditService>;
  private module: TestingModule;

  async setup(serviceClass: new (...args: any[]) => S) {
    this.mockRepository = {
      findAndCount: jest.fn().mockResolvedValue([[], 0]),
      findById: jest.fn().mockResolvedValue(null),
      createEntity: jest.fn().mockResolvedValue({ id: 1 }),
      updateEntity: jest.fn().mockResolvedValue({ id: 1 }),
      deleteEntity: jest.fn().mockResolvedValue({ affected: 1 }),
      findByCondition: jest.fn().mockResolvedValue(null),
    };

    this.mockAuditService = {
      log: jest.fn(),
    };

    this.module = await Test.createTestingModule({
      providers: [
        {
          provide: BaseRepository,
          useValue: this.mockRepository,
        },
        {
          provide: AuditService,
          useValue: this.mockAuditService,
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: serviceClass,
          useFactory: (repo, audit, dataSource) => new serviceClass(repo, audit, dataSource),
          inject: [BaseRepository, AuditService, DataSource],
        },
      ],
    }).compile();

    this.service = this.module.get<S>(serviceClass);
  }

  getService(): S {
    return this.service;
  }

  getMockRepository(): Partial<BaseRepository<T>> {
    return this.mockRepository;
  }

  async close() {
    await this.module.close();
  }
}

// Testando se a BaseTest funciona corretamente
describe('BaseTest', () => {
  class MockEntity {
    id: number;
    isDeleted?: boolean;
  }

  class MockService extends BaseService<MockEntity> {
    constructor() {
      super({} as any, {} as any, {} as any);
    }
  }

  const baseTest = new BaseTest<MockEntity, MockService>();

  beforeAll(async () => {
    await baseTest.setup(MockService);
  });

  afterAll(async () => {
    await baseTest.close();
  });

  it('deve inicializar corretamente', () => {
    expect(baseTest.getService()).toBeDefined();
  });

  it('deve mockar o repositório corretamente', () => {
    expect(baseTest.getMockRepository()).toBeDefined();
  });
});