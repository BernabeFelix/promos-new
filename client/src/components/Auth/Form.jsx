import React, { Component } from 'react';
import { RaisedButton, FlatButton } from 'material-ui';
import { func, bool } from 'prop-types';
import Auth from '../../api/auth/Auth';

class Form extends Component {
  state = {
    shouldValid: false
  };

  // return an object of key values
  /* eslint-disable no-return-assign, no-param-reassign */
  getFormValues = () =>
    Object.keys(this.controlsWithValidation).reduce(
      (objToReturn, controlName) => {
        objToReturn[controlName] = this.controlsWithValidation[
          controlName
        ].value;

        return objToReturn;
      },
      {}
    );

  formIsValid = () =>
    Object.keys(this.controlsWithValidation).every(
      key => this.controlsWithValidation[key].valid
    );

  controlsWithValidation = {};

  submit = async () => {
    // condition valid
    const isFormIsValid = this.formIsValid();
    console.log(isFormIsValid);
    if (!isFormIsValid) {
      if (!this.state.shouldValid) {
        this.setState({ shouldValid: true });
      }
      return;
    }
    const auth = new Auth();
    if (this.props.isLogin === true) {
      // Try login
      console.log('try login');
      const { user, password } = this.getFormValues();
      console.log(user);
      console.log(password);
      let error = null;
      const res = await auth.login(user, password).catch(err => {
        error = err;
        console.log('Error in login:');
        console.log(error);
      });
      console.log(error);
      if (error) {
        // show error
        return;
      }
      // get token
      // validate against backend
      // redirect to home?
      console.log(res);
    } else {
      // Try to create account
      const { email, password } = this.getFormValues();
      let error = null;
      const res = await auth.signUp({ email, password }).catch(err => {
        error = err;
        console.log('Error in signUp:');
        console.log(error);
      });

      if (error) {
        // show error
        return;
      }
      // Show success message and invite to check the email
      console.log(res);
    }
    //    reset form
    this.setState({ shouldValid: false });
  };

  updateControl = (controlName, values) => {
    // todo: add validation to shouldComponentUpdate
    // Controls are added to the state, so we know when all controls are valid
    // eg. controlWithValidValue = { password: false, value: '' }
    this.controlsWithValidation = {
      ...this.controlsWithValidation,
      [controlName]: values
    };

    if (this.state.shouldValid) this.formIsValid();
  };

  logout = () => {
    const auth = new Auth();
    auth.logout();
  };

  render() {
    const { shouldValid } = this.state;

    return (
      <form className="form" autoComplete="off">
        {this.props.children(this.updateControl, shouldValid)}

        <div className="submit-btn-wrapper">
          <RaisedButton
            label="Entrar"
            fullWidth
            backgroundColor="#ee3335"
            labelColor="#fff"
            onClick={this.submit}
          />
          <FlatButton label="Sign out" onClick={this.logout} fullWidth />
        </div>
      </form>
    );
  }
}

Form.defaultProps = {
  isLogin: false
};

Form.propTypes = {
  children: func.isRequired,
  isLogin: bool
};

export default Form;
