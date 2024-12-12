import uploadFile from '@/api/file';
import { CardClient } from '@/components';

export default async function Cards() {
  const fileUri = await uploadFile();
  return <CardClient fileUri={fileUri} />;
}
