import { useParams } from 'react-router-dom';

const User = () => {
  const { userId } = useParams();
  return <div>User Page of user: {userId}</div>;
};

export default User;
