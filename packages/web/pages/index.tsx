import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: '/fr', permanent: false },
});

export default function RootIndex() {
  return null;
}
