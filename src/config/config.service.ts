import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {config} from 'dotenv';

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
        return {
            type: 'postgres',
            host: this.getValue('DB_HOST'),
            port: Number(this.getValue('DB_PORT')),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_NAME'),
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            cli: {
                migrationsDir: 'src/migration',
                entitiesDir: 'src/models',
            },
            entities: ['models/*.js'],
            synchronize: true,
            ssl: this.isProd(),

        };
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
