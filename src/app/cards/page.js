import uploadFile from '@/api/file';
import { CardClient } from '@/components';

export default async function Cards() {
  let fileUri = null;

  if (!fileUri) {
    fileUri = await uploadFile();
  } else {
    const lastModified = await fetch(fileUri).then(
      (res) => new Date(res.headers.get('last-modified'))
    );
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (lastModified < oneDayAgo) {
      fileUri = await uploadFile();
    }
  }
  return <CardClient fileUri={fileUri} />;
}
