class TransformersLoginForm extends LoginForm {
  signOut() {
    console.log("Sign out intercepted")
    this.props.history.push('/logout')
  }
  signUp(options = {}) {
    const { onSignUp } = this.props;
    const { email, password, onSubmitHook, formState } = this.state;

    if (!this.validateField('email', email)) {
      onSubmitHook('Invalid email', formState);
      return
    }

    if (!this.validateField('password', password)) {
      onSubmitHook('Invalid password', formState);
      return
    }
    
    // TODO: validation - see super implementation
    client
      .mutate({
        mutation: gql`
          mutation register($email: String!, $password: String!) {
            register(input: {email: $email, password: $password}) {
              id
              email
              created_at
            }
          }
        `,
        variables: {
          email: email,
          password: password
        },
        update: ( cache, { data }) => {
          console.log("updating cache for register", {whoAmI: data.register})
          cache.writeQuery({
            query: TTCGQueries.WHOAMI,
            data: {whoAmI: data.register},
          });
        },
      })
      .then((user) => {
        console.log("registered user", user)
      })
      .catch((err) => {
        this.showMessage(
          err || 'unknown_error',
          'error'
        );
        onSubmitHook('unknown_error', formState);
      })
  }
  signIn() {
    const { onSignIn } = this.props;
    const { email, password, onSubmitHook, formState } = this.state;
    console.log("email", email, password)

    if (!this.validateField('email', email)) {
      onSubmitHook('Invalid email', formState);
      return
    }

    if (!this.validateField('password', password)) {
      onSubmitHook('Invalid password', formState);
      return
    }

    client
      .mutate({
        mutation: gql`
          mutation login($email: String!, $password: String!) {
            login(input: {email: $email, password: $password}) {
              id
              email
              created_at
            }
          }
        `,
        variables: {
          email: email,
          password: password
        },
        update: ( cache, { data }) => {
          console.log("updating cache", {whoAmI: data.login})
          cache.writeQuery({
            query: TTCGQueries.WHOAMI,
            data: {whoAmI: data.login},
          });
        },
      })
      .then((res) => {
        const success = res.data.login;
        console.log("logged in", success)
      })
      .catch((err) => {
        this.showMessage("Login Failed. Check your credentials.", "error", 10000)
        console.log("error signing in", err)
        onSubmitHook(err, formState);
      })
  }
}
Accounts.ui.LoginForm = TransformersLoginForm;
