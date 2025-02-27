---
title: 文件上传
date: 2024-12-30
tags: ['nest', '大文件上传']
description: nest文件上传
category: 'note'
---

## 一、大文件上传

### 1. 前端
```html
<body>
  <input id="fileInput" type="file" multiple />
  <script>
    const fileInput = document.querySelector('#fileInput');
    const chunkSize = 40 * 1024;  // 每个分片大小为 40KB
    const uploadUrl = 'http://localhost:3000/upload';

    fileInput.onchange = async function () {
      const file = fileInput.files[0];

      const chunks = [];
      let startPos = 0;
      while (startPos < file.size) {
        chunks.push(file.slice(startPos, startPos + chunkSize));  // 切割文件为多个分片
        startPos += chunkSize;
      }

      // 使用 Promise.all 来并行上传每个分片
      await Promise.all(chunks.map((chunk, index) => {
        const formData = new FormData();
        formData.append('files', chunk);
        formData.append('name', `${file.name}-${index}`);  // 文件名称 + 分片索引
        formData.append('total', chunks.length);  // 总分片数
        return axios.post(uploadUrl, formData);
      }));

      console.log('所有分片上传完成');
    }
  </script>
</body>
```
### 2. 后端
```ts
import { Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Post('upload')
@UseInterceptors(
  FilesInterceptor('files', 20, {
    dest: './uploads',
  }),
)
async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
  const fileName = body.name.match(/(.+)-\d+$/)[1];
  const chunkDir = path.join(__dirname, 'uploads', `chunks_${fileName}`);
  const totalChunks = Number(body.total);

  // 检查并创建分片目录
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  // 将当前分片保存到分片目录
  const chunkPath = path.join(chunkDir, body.name);
  fs.renameSync(files[0].path, chunkPath);  // 使用 fs.renameSync 更高效地移动文件

  // 检查是否所有分片上传完成
  const uploadedChunks = fs.readdirSync(chunkDir);  // 获取已上传的分片

  if (totalChunks === uploadedChunks.length) {
    // 如果所有分片都上传完成，开始合并文件
    const mergedFilePath = path.join(__dirname, 'uploads', fileName);
    const writeStream = fs.createWriteStream(mergedFilePath);

    // 按顺序合并分片
    const sortedChunks = uploadedChunks.sort((a, b) => a.localeCompare(b));
    for (const chunk of sortedChunks) {
      const chunkPath = path.join(chunkDir, chunk);
      const chunkBuffer = fs.readFileSync(chunkPath);
      writeStream.write(chunkBuffer);
    }

    // 写入完成后清理临时分片
    await new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        fs.rm(chunkDir, { recursive: true, force: true }, (err) => {
          if (err) reject(err);
          else resolve(true);
        });
      });
      writeStream.end();
    });

    return {
      success: true,
      message: '文件合并完成',
      fileName: fileName,
    };
  }

  return {
    success: true,
    message: '分片上传成功，等待其他分片上传完成。',
  };
}
```
### 3. 总结

- 前端：
  - 使用 slice() 方法将大文件切分成多个小块
  - 使用 FormData 进行每个分片的上传

- 后端：
  - 使用 fs.createWriteStream 按顺序合并分片，确保文件正确生成
  - fs.cpSync 复制文件
  - fs.rmSync 删除文件
  - fs.readdirSync 读取目录
  - fs.rm 删除目录
