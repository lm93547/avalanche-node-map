import { useEffect, useState } from "react";
import { Locations, locations } from "../data/locations";
import { Promise } from "bluebird";

export const useGetLatLngs = () => {
  const buildUrls = (locations: Locations[]) => {
    const urls = locations.map((e) => {
      const countryComputedSpace = e.country.replaceAll(" ", "%20");
      const cityComputedSpace = e.city.replaceAll(" ", "%20");
      const url = `https://nominatim.openstreetmap.org/search/${cityComputedSpace}%2C${countryComputedSpace}?format=json&addressdetails=1&limit=1`;
      return { url, e };
    });
    return urls;
  };

  useEffect(() => {
    (async () => {
      const results = await Promise.map(
        buildUrls(locations),
        (e) => {
          console.log(e.url);
          const response = fetch(e.url)
            .then((response) => response.json())
            .then((data) => {
              return { lat: data[0].lat, lon: data[0].lon };
            });
          return response;
        },
        { concurrency: 10 }
      );
      const locationsGeocoded = locations.map((location, i) => {
        const latLon = results[i];
        return { ...location, latLon };
      });
      console.log(
        "🚀 ~ file: useGetLatLng.tsx ~ line 35 ~ locationsGeocoded ~ locationsGeocoded",
        locationsGeocoded
      );
    })();
  }, []);
};
