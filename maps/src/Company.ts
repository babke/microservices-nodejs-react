import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
  name: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;

  constructor() {
    this.name = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
    this.description = faker.lorem.paragraph();
  }

  getDescription(): string {
    return `<div><H2>${this.name}</H2>
    <h3>${this.catchPhrase}</h3>
    ${this.description}<div>`;
  }
}
