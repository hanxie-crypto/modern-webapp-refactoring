import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/product.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { BannerModule } from './banner/banner.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Log4jsModule } from './libs/log4js/';

const ENV = process.env.NODE_ENV;
const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Abc12345',
};
if (ENV === 'production') {
  dbInfo.host = process.env.dbHost || '10.0.224.4';
  dbInfo.port = parseInt(process.env.dbPort) || 3306;
  dbInfo.username = process.env.dbUserName || 'root';
  dbInfo.password = process.env.dbPassword || '';
}
const { host, port, username, password } = dbInfo;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: 'devs',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ProductsModule,
    ProductCategoriesModule,
    AboutModule,
    HomeModule,
    BannerModule,
    UploadModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: process.env.staticPath || join(__dirname, '..', 'public'),
    }),
    Log4jsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
