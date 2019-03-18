/**************************************************
Library Code
**************************************************/

//factory function that creates store objects
function createStore(reducer) {
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
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

/**************************************************
App Code
**************************************************/

//Action creators
function addTodoAction(todo) {
  return {
    type: "ADD_TODO",
    todo
  };
}

function removeTodoAction(id) {
  return {
    type: "REMOVE_TODO",
    id
  };
}

function addGoalAction(goal) {
  return {
    type: "ADD_GOAL",
    goal
  };
}

//Reducer - pure function
//setting default value for state as it is undefined at the start
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  } else if (action.type === "REMOVE_TODO") {
    return state.filter(s => s.id !== action.id);
  } else if (action.type === "TOGGLE_TODO") {
    return state.map(s =>
      s.id !== action.id ? s : Object.assign({}, s, { complete: !s.complete })
    );
  } else {
    return state;
  }
}

//Another reducer
function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

//Root reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log("The current state is: " + store.getState());
});

store.dispatch(
  addTodoAction({
    id: 0,
    name: "learn Redux",
    complete: false
  })
);

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1000,
    name: "React dev",
    complete: false
  }
});

//---------------------------------------------------------
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
