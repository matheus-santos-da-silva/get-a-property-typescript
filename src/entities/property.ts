interface PropertyProps {
  id: string
  category: string
  title: string
  address: string
  price: number
  description: string
  images?: string[]
  contractor?: string[]
  available: boolean
  user: { connect: { id: string } };
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


  set category(value: string) {
    this.props.category = value;
  }
  set title(value: string) {
    this.props.title = value;
  }
  set address(value: string) {
    this.props.address = value;
  }
  set price(value: number) {
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

  constructor(props: PropertyProps) {
    this.props = props;
  }

}

