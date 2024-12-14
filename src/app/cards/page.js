import { CardClient } from '@/components';
import fs from 'fs';

const filePath = 'file.pdf';

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
}

export default async function Cards() {
  const file = fileToGenerativePart(filePath, 'application/pdf');

  return <CardClient file={file} />;
}
