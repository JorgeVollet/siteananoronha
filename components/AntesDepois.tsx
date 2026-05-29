import { getProjectsByCategory } from '@/lib/portfolio';
import AntesDepoisClient from './AntesDepoisClient';

export default async function AntesDepois() {
  const { engenharia, marcenaria } = await getProjectsByCategory();
  return <AntesDepoisClient engenharia={engenharia} marcenaria={marcenaria} />;
}
