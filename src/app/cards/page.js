import uploadFile from '@/api/file';
import { CardClient } from '@/components';

export default async function Cards() {
  const timeOfUpload = new Date().toISOString();
  const fileUri = await uploadFile(timeOfUpload);
  return <CardClient fileUri={fileUri} />;
}
