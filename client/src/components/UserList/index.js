import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ id, username }) => {
  return (
    <div key={id} className="card mb-3">
      <h4 className="card-header bg-dark text-light p-2 m-0">
        <Link className="text-light" to={`/users/${id}`}>
          {username}
        </Link>
      </h4>
    </div>
  );
};

const UserList = ({ users, title }) => {
  if (!users.length) return <h3>No Users</h3>;

  const renderUsers = () => {
    if (!users) return null;
    return users
      // .filter(user => )
      .map(user => <User key={user.id} {...user} />);
  }

  return (
    <>
      <h3>{title}</h3>
      {renderUsers()}
    </>
  );
};

export default UserList;
