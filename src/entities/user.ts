export interface UserProps {
  id: string
  name: string
  email: string
  phone: string
  password: string
}

export class User {
  private props: UserProps;

  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  constructor(props: UserProps) {

    if (props.password.length < 6) {
      throw new Error('The password need more than five characters');
    }

    this.props = props;
  }
}