interface Location {
  lat: number;
  lng: number;
}

export interface Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  getDescription(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 15,
          lng: 24,
        },
      }
    );
  }

  // addMarker(location: Location) {
  //   new google.maps.Marker( {
  //     map: this.googleMap,
  //     position: location,
  //   })
  // }

  addMarker(object: Mappable) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: object.location,
      title: object.name,
    });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: object.getDescription(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
