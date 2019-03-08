//Reducer - pure function
//setting default value for state as it is undefined at the start
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}

//factory function that creates store objects
function createStore() {
  /*
    The store should have 4 parts
    1. The state
    2. Get the state
    3. Listen to changes on the state
    4. Update the state

    */

  let state;
  let listeners = [];

  //get the state
  const getState = () => state;

  //listen to changes
  const subscribe = listener => {
    listeners.push(listener);

    //unsubscribe
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  //update the state
  const dispatch = action => {
    state = todos(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
