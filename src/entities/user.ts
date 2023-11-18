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

  get password() {
    return this.props.password;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  set password(value: string) {
    this.props.password = value;
  }

  constructor(props: UserProps) {
    this.props = props;
  }
}