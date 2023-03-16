interface Vehicle {
  name: string,
  year: number,
  broken: boolean,
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
}

const printVehicle = (vehicle: Vehicle):void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Name: ${vehicle.year}`);
  console.log(`Name: ${vehicle.broken}`);

}

printVehicle(oldCivic);