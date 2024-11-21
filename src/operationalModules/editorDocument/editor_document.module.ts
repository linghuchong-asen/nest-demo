import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditorDocument, EditorDocumentSchema } from './editor_document.schema';
import { EditorDocumentController } from './editor_document.controller';
import { EditorDocumentService } from './editor_document.service';

/* 编辑器文档保存至MongoDB模块 */
@Module({
  imports: [
    // name要和service依赖注入的scheme名一致
    // forFeature 方法在 NestJS 中用于注册特定的 Mongoose 模型到模块中,，使得这些模型可以在模块内的服务中被注入和使用。
    MongooseModule.forFeature([
      { name: EditorDocument.name, schema: EditorDocumentSchema },
    ]),
  ],
  controllers: [EditorDocumentController],
  providers: [EditorDocumentService],
})
export class EditorDocumentModule {}