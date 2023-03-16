import {faker} from "@faker-js/faker";
import { Mappable } from "./CustomMap";

export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  

  constructor() {
    this.name = faker.name.firstName().concat(" ".concat(faker.name.lastName()));
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    }
    this.description = faker.lorem.paragraph();
  };

  getDescription(): string {
    return `<H2>${this.name}</H2><div>${this.description}<div>`
  }
};