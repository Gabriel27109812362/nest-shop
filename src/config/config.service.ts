import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {config} from 'dotenv';
import * as fs from 'fs';

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) {
    }

    private getValue(key: string, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(key => this.getValue(key, true));
        return this;
    }

    public getAppPort() {
        return this.getValue('APP_PORT', true);
    }

    public isProd() {
        const mode = this.getValue('MODE', false);
        return mode !== 'dev';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {

        const typeOrmConfig: TypeOrmModuleOptions = {
            type: 'postgres',
            host: this.getValue('DB_HOST'),
            port: Number(this.getValue('DB_PORT')),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_NAME'),
            migrationsTableName: 'migration',
            migrations: ['dist/migration/*.js'],
            cli: {
                migrationsDir: 'src/migration',
                entitiesDir: 'src/models',
            },
            entities: ['dist/models/*.js'],
            synchronize: true,
            ssl: this.isProd(),
        };

        fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig, null, 2));

        return typeOrmConfig;
    }
}

config();

export const configService = new ConfigService(process.env)
    .ensureValues([
        'DB_HOST',
        'DB_PORT',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_NAME',
        'APP_PORT',
        'MODE',
    ]);
