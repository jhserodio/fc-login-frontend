import { useParams } from 'react-router-dom';

export const User = () => {
  const { userId } = useParams();
  return <div>User Page of user: {userId}</div>;
};