import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type dbConfig = {
  database: TypeOrmModuleOptions;
};

export const loadDbConfig = (): dbConfig => ({
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/src/data-access/*.{schema,entity}.{ts,js}'],
    autoLoadEntities: true,
    migrations: ['dist/migrations/*{.js,.ts}'],
    migrationsRun: true,
    migrationsTableName: 'migrations_history',
  },
});
