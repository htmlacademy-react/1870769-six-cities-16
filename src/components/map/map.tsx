import leaflet, { LayerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City, Offer, Offers } from '../../types/offer-types/offer-list-types';
import useMap from '../hook/use-map';

type MapTypes = {
  offers: Offers;
  activeOffer: Offer | null;
  city: City;
}

function Map({offers, activeOffer, city}: MapTypes):JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      // markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map && offers) {
      markerLayer.current.clearLayers();

      offers.forEach((offer) => {
        const marker = leaflet
          .marker(
            {
              lat: offer.city.location.latitude,
              lng: offer.city.location.longitude
            }, {
              icon: (activeOffer && activeOffer.id === offer.id)
                ? currentCustomIcon
                : defaultCustomIcon
            }
          );

        marker.addTo(markerLayer.current);
      });
    }
  }, [offers, activeOffer, city, map, currentCustomIcon, defaultCustomIcon]);


  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
