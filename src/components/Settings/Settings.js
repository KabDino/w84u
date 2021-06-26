import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeName } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const Settings = ({ changeName, name }) => {
  const [newName, setNewName] = useState();

  const catchNewName = (e) => {
    setNewName(e.target.value);
  };

  const sendNewName = () => {
    changeName(newName);
  };

  return (
    <>
      <div className="container formContainer">
        <div className="someInputs">
          <div>
            <label>Изменить имя - {name}</label>
            <input
              className="input"
              defaultValue={newName}
              onChange={catchNewName}
            />
          </div>
        </div>
        <div>
          <button onClick={sendNewName}>Сохранить</button>
        </div>
      </div>
    </>
  );
};

let mapStateToProps = (state) => ({
  isFetching: state.mainReducer.isFetching,
  name: state.profileReducer.name || state.authReducer.name,
});

// export default connect(mapStateToProps, { changeName })(
//   Settings
// );

export default compose(
  connect(mapStateToProps, { changeName }),
  withAuthRedirect
)(Settings);


/*
const LoginScreen = () => {
    const login = (values) => {
      console.log(values) // { email: '', password: '' }
    }

return <Form 
        onSubmit={login}
        initialValues={{
         email: '',
         password: '',
        }}
      >

        <FormInput name="email" />
        <FormInput name="password"/>
        <Button text="submit" />
     </Form>
}

const Form = (data) => {
}

const FormInput = (props) => {
  return <input  />
}

const Button = (props) => {
  return <button>{props.name}</button>
}
*/