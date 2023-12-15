import { PropertyProps } from '../DTO/property-dtos';

export interface ContractorProps {
  id: string
  name: string
  phone: string
  property?: PropertyProps[]
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

  get property() {
    return this.props.property;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  set property(values: PropertyProps[] | undefined) {
    let properties: PropertyProps[] = [];

    if(values) {
      for (const value of values) {
        properties.push(value);
      }
    }
    
    this.props.property = undefined;
  }

  constructor(props: ContractorProps) {
    this.props = props;
  }

}