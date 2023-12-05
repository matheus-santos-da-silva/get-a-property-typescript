export interface ContractorProps {
  id: string
  name: string
  phone: string
}

export class Contractor {

  private props: ContractorProps;

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  constructor(props: ContractorProps) {
    this.props = props;
  }

}