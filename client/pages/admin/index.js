import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Admin.module.scss';
import { Menu } from '../../conponents/Menu';

export default function Admin({ server_host }) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(loadUsers, []);

  function loadUsers() {
    fetch(server_host + '/users/get/all', {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.ok) {
          setUsers(data.users);
        }
      });
  }
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Menu />
      <div>
        <h2>Пользователи</h2>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <td>Емаил</td>
            <td>Пароль</td>
            <td>Роль</td>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
