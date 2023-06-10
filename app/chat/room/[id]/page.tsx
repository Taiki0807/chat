import { ChatDetail } from '@/app/components/pages';

interface Props {
  params: { id: string };
}
const page = (props: Props): JSX.Element => {
  return (
    <div>
      <ChatDetail id={props.params.id} />
    </div>
  );
};

export default page;
