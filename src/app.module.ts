import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env';

/* nest项目可以理解为由好多模块组成的，app.module.ts是项目的根模块 */
@Module({
  // imports的作用是引入其他模块，providers的作用是为当前模块提供服务的文件
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 在全局任何地方都可以使用ConfigService来获取配置信息
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'), // 后面的localhost是当前没有配置环境变量时，默认值
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', 'word123'),
        database: configService.get('DB_DATABASE', 'blog'),
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表，生产环境建议关闭
      }),
    }),
    PostsModule,
  ],
  controllers: [AppController], // 处理http请求，包括路由控制，向客户端返回响应
  providers: [AppService], // 服务提供者，处理具体的业务逻辑
})
export class AppModule {}
