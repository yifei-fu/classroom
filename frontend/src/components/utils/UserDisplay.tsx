import React from 'react';
import {UserProfile} from '../../api/type';

export interface Props {
  user: UserProfile;
}

const UserDisplay: React.FC<Props> = (props: Props) => {
  const {user} = props;
  return (
    <div className='user-display d-inline'>
      <span className='name mr-1'>{user.firstName} {user.lastName}</span>
      <span className='badge badge-pill badge-primary primary-gradient font-weight-normal'>{user.role}</span>
    </div>
  );
};

export default UserDisplay;
