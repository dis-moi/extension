import React from 'react';
import ProfileList from '../app/profiles/App/Pages/Profiles/List';
import { wrapper } from '../app/profiles/store';
import { put, take } from 'redux-saga/effects';
import {
  CONTRIBUTORS_TRANSMITTED,
  refreshContributors,
  UPDATE_CONTRIBUTORS
} from '../app/actions';
import { END } from 'redux-saga';

export default function Home() {
  return (
    <>
      <ProfileList />
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {} // will be passed to the page component as props
//   };
// }

// export const getServerSideProps = wrapper.getServerSideProps(
//   ({ store, req, res, ...etc }) => {
//     console.log('2. Page.getServerSideProps uses the store to dispatch things');
//     store.dispatch({ type: 'TICK', payload: 'was set in other page' });
//   }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    // take(UPDATE_CONTRIBUTORS);
    // const allTasks: any[] = [];
    store.dispatch(END);
    // (store as any).injectedSagas.each((saga: any) => {
    //   allTasks.push(saga.task);
    // });
    // await Promise.all(allTasks.map(t => t.done));
    await (store as any).sagaTask.toPromise();
    console.log(store.getState());
  }
);
