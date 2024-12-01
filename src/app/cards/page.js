import uploadFile from '@/api/file';
import { CardClient } from '@/components';

export default async function Cards() {
  let fileUri = null;

  if (!fileUri) {
    console.log('called')
    fileUri = await uploadFile();
  }

  return <CardClient fileUri={fileUri} />;
}
