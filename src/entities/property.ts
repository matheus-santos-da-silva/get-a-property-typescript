import { Decimal } from '@prisma/client/runtime/library';
import { Contractor } from './contractor';

interface PropertyProps {
  id: string
  category: string
  title: string
  address: string
  price: Decimal
  description: string
  images?: string[]
  contractor?: Contractor
  available: boolean
  contractorId: string | null
  user: { connect: { id: string } };
  id_user: string
}

export class Property {

  private props: PropertyProps;

  get id() {
    return this.props.id;
  }
  get category() {
    return this.props.category;
  }
  get title() {
    return this.props.title;
  }
  get address() {
    return this.props.address;
  }
  get price() {
    return this.props.price;
  }
  get description() {
    return this.props.description;
  }
  get images() {
    return this.props.images;
  }
  get contractor() {
    return this.props.contractor;
  }
  get available() {
    return this.props.available;
  }
  get user() {
    return this.props.user;
  }

  get contractorId() {
    return this.props.contractorId;
  }

  get id_user() {
    return this.props.id_user;
  }

  set category(value: string) {
    this.props.category = value;
  }
  set title(value: string) {
    this.props.title = value;
  }
  set address(value: string) {
    this.props.address = value;
  }
  set price(value: Decimal) {
    this.props.price = value;
  }
  set description(value: string) {
    this.props.description = value;
  }
  set images(value: string[] | undefined) {
    this.props.images = value;
  }
  set available(value: boolean) {
    this.props.available = value;
  }
  set user(value: { connect: { id: string } }) {
    this.props.user = value;
  }
  set contractor(value: Contractor | undefined) {
    this.props.contractor = value;
  }

  set contractorId(value: string | null) {
    this.props.contractorId = value;
  }

  set id_user(value: string) {
    this.props.id_user = value;
  }

  constructor(props: PropertyProps) {
    this.props = props;
  }

}

