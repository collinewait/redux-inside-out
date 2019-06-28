import React from 'react';
import { connect } from "react-redux";

import { addTodo } from '../../actions';

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </>
  );
};

AddTodo = connect()(AddTodo); // dispatch will be injected as a prop

export default AddTodo;
