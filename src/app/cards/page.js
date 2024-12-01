import uploadFile from '@/api/file';
import { CardClient } from '@/components';

export default async function Cards() {
  let fileUri = null;

  if (!fileUri) {
    fileUri = await uploadFile();
  }

  return <CardClient fileUri={'as'} />;
}
