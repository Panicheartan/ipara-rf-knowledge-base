import { getAllDocs } from '@/lib/docs';
import SearchClient from './search-client';

export default function SearchPage() {
  const docs = getAllDocs();
  return <SearchClient docs={docs} />;
}
