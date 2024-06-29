import { ReactNode, useEffect, useState } from 'react';

import { LatLngExpression, Icon, divIcon } from 'leaflet';

import { LayerGroup, MapContainer, Marker, Popup, TileLayer, Circle, useMapEvents, useMap } from 'react-leaflet'

// import MarkerClusterGroup from "react-leaflet-cluster";

import { GeoSearchControl, BingProvider } from 'leaflet-geosearch';

import './App.css'

const greenIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// const orangeIcon = new Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

const orangeOptions = { color: 'orange' }

const ICS_LATLNG = [-23.1792564, -46.9159328] as LatLngExpression;

const RADIUS_RD = 2000;

const RD_POSITIONS = [
  { label: '13085-160', localization: [-22.79789, -47.0838] },
  { label: '13203-830', localization: [-23.22291, -46.85647] },
  { label: '13209-355', localization: [-23.1953, -46.91446] },
  { label: '13210-705', localization: [-23.21291, -46.89145] },
  { label: '13212-300', localization: [-23.17902, -46.99289] },
  { label: '13214-883', localization: [-23.12567, -46.92338] },
  { label: '13218-010', localization: [-23.18794, -46.87502] },
  { label: '13218-590', localization: [-23.17199, -46.8565] },
  { label: '13219-323', localization: [-23.19111, -46.84694] },
  { label: '13221-300', localization: [-23.19695, -46.83364] },
  { label: '13223-210', localization: [-23.21288, -46.81199] },
  { label: '13231-220', localization: [-23.19814, -46.78875] },
  { label: '13233-450', localization: [-23.19271, -46.76436] },
  { label: '13257-472', localization: [-22.987636, -46.8523627] },
  { label: '13294-202', localization: [-23.09618, -46.97754] },
  { label: '13471-323', localization: [-22.72347, -47.33081] },
  { label: '13473-350', localization: [-22.72033, -47.30875] },
  { label: '13477-020', localization: [-22.73562, -47.30917] },
  { label: '07713-110', localization: [-23.35153, -46.74832] }
] as Array<{ label: string, localization: LatLngExpression }>

const PEOPLE_POSITIONS = [
  { label: 'Medeiros, Jundiaí', localization: [-23.181042, -46.9860182], count: 19 },
  {
    label: 'Eloy Chaves, Jundiaí',
    localization: [-23.1848781, -46.9629021],
    count: 9,
  },
  {
    label: 'Fazenda Grande, Jundiaí',
    localization: [-23.1713336, -46.9635092],
    count: 8,
  },
  {
    label: 'Anhangabaú, Jundiaí',
    localization: [-23.1909011, -46.8999397],
    count: 4,
  },
  {
    label: 'Engordadouro, Jundiaí',
    localization: [-23.1573401, -46.9219767],
    count: 4,
  },
  {
    label: 'Malota, Jundiaí',
    localization: [-23.2104496, -46.9088123],
    count: 3,
  },
  {
    label: 'Caxambu, Jundiaí',
    localization: [-23.1559465, -46.8504249],
    count: 2,
  },

  { label: 'Residencial Santa Giovana, Jundiaí', localization: [-23.1605559, -46.961688], count: 3, },
  {
    label: 'Vila Nambi, Jundiaí',
    localization: [-23.1950798, -46.8578569],
    count: 5,
  },
  {
    label: 'Recanto da Prata, Jundiaí',
    localization: [-23.1791725, -46.7986079],
    count: 4,
  },
  {
    label: 'Centro, Jundiaí',
    localization: [-23.1873363, -46.8880201],
    count: 1
  },
  {
    label: 'Vianelo',
    localization: [-23.2072021, -46.8858625],
    count: 3,
  },
  {
    label: 'Colônia',
    localization: [-23.1813772, -46.8524142],
    count: 2,
  },
  { label: 'Higienópolis, SP', localization: [-23.5457512, -46.6599426], count: 2, },
  {
    label: 'Parque Brasil, Louveira',
    localization: [-23.0957275, -46.9768667],
    count: 2,
  },
  {
    label: 'Jardim América, Jundiaí',
    localization: [-23.1903123, -46.912749],
    count: 1,
  },
  {
    label: 'Jardim Caçula, Jundiaí',
    localization: [-23.1742351, -46.855564],
    count: 3,
  },
  {
    label: 'Jardim Messina, Jundiaí',
    localization: [-23.2048514, -46.8894995],
    count: 2,
  },
  { label: 'Jardim Virgínia, Itatiba', localization: [-22.9863178, -46.850718], count: 3, },
  { label: 'Centro, Itatiba', localization: [-23.0052249, -46.8388902], count: 1, },
  { label: 'Jardim do Lago', localization: [ -23.2171093, -46.864455 ], count: 1, },
  {
    label: 'Ponte de Campinas, Jundiaí',
    localization: [-23.1801745, -46.8907119],
    count: 2,
  },
  {
    label: 'Ponte São João, Jundiaí',
    localization: [-23.1880104, -46.8749914],
    count: 2,
  },
  {
    label: 'Vila Guarani, Jundiaí',
    localization: [-23.1758466, -46.9111529],
    count: 2,
  },
  {
    label: 'Vila Graff, Jundiaí',
    localization: [-23.1776729, -46.8798013],
    count: 2,
  },
  {
    label: 'Vila Rami, Jundiaí',
    localization: [-23.2160802, -46.8790706],
    count: 2,
  },
  {
    label: 'Vila Rio Branco, Jundiaí',
    localization: [-23.1751067, -46.8866961],
    count: 2,
  },
  {
    label: 'Jardim América 1, Várzea Paulista',
    localization: [-23.2002695, -46.8337604],
    count: 2,
  },
  {
    label: 'Jardim Bahia, Várzea Paulista',
    localization: [-23.2389074, -46.8367881],
    count: 1,
  },
  {
    label: 'Corrupira, Jundiaí',
    localization: [-23.1121107, -46.9368047],
    count: 2,
  },
  {
    label: 'Vila das Hortências, Jundiaí',
    localization: [-23.17797, -46.9089014],
    count: 4,
  },
  {
    label: 'Figueira Branca, Campo Limpo Pta',
    localization: [-23.2028833, -46.7698532],
    count: 2,
  },
  {
    label: 'Rio Acima, Jundiaí',
    localization: [-23.1181227, -46.8979869],
    count: 2,
  },
  {
    label: 'Nova Cidade Jardim, Jundiaí',
    localization: [-23.2229174, -46.8564746],
    count: 2,
  },
  {
    label: 'Cidade Jardim, Jundiaí',
    localization: [-23.1722577, -46.9095586],
    count: 1,
  },
  {
    label: 'Cidade Jardim II, Jundiaí',
    localization: [-23.225003, -46.8583249],
    count: 2,
  },
  {
    label: 'Horto Santo Antônio, Jundiaí',
    localization: [-23.1860343, -46.9186052],
    count: 1,
  },
  {
    label: 'Jardim Bonfiglioli, Jundiaí',
    localization: [-23.2072407, -46.8894995],
    count: 1,
  },
  {
    label: 'Vila Arens II, Jundiaí',
    localization: [-23.2036306, -46.874587],
    count: 2,
  },
  {
    label: 'Terra uva, Jundiaí',
    localization: [-23.1399529, -46.9194107],
    count: 1,
  },
  {
    label: 'Residencial Anchieta, Jundiaí',
    localization: [-23.2124082, -46.8918286],
    count: 2,
  },
  {
    label: 'Residencial, Jundiaí',
    localization: [-23.1497404, -47.0093216],
    count: 2,
  },
  {
    label: 'Serra dos Cristais',
    localization: [-23.2117434, -46.8316711],
    count: 1,
  },
  {
    label: 'Cidade Nova 1, Jundiaí',
    localization: [-23.1907972, -46.8410273],
    count: 1,
  },
  {
    label: 'Bairro do Retiro, Jundiaí',
    localization: [-23.1785516, -46.9084602],
    count: 1,
  },
  {
    label: 'Vila Nova Jundiainópolis, Jundiaí',
    localization: [-23.2135863, -46.8870748],
    count: 1,
  },
  {
    label: 'Gramadão, Jundiaí',
    localization: [-23.1916725, -46.924671],
    count: 1,
  },
  {
    label: 'Vila Jundiainópolis, Jundiaí',
    localization: [-23.2135863, -46.8870748],
    count: 1,
  },
  {
    label: 'Ivoturucaia, Jundiaí',
    localization: [-23.1618711, -46.815598],
    count: 1,
  },
  { label: 'Jardim Ester, SP', localization: [-23.583596, -46.7611498], count: 1, },
  {
    label: 'Palmares, Vinhedo',
    localization: [-23.0437094, -47.0162795],
    count: 1,
  },
  {
    label: 'Pacaembú I, Itupeva',
    localization: [-23.1548896, -47.0406669],
    count: 1,
  },
  { label: 'Butantã, SP', localization: [-23.5634872, -46.7210095], count: 1, },
  { label: 'Jardim Lizandra, Americana', localization: [-22.7232497, -47.3323024], count: 1, },
  {
    label: "Jaguari, Americana",
    localization: [-22.7153597, -47.2081777],
    count: 1,
  },
  {
    label: 'Jardim Florestal, Jundiaí',
    localization: [-23.1651276, -46.8991995],
    count: 1,
  },
  { label: 'Campo Verde, Americana', localization: [-22.7213881, -47.3074737], count: 1, },
  {
    label: 'Jardim Itália, Várzea Paulista',
    localization: [-23.2242091, -46.8392104],
    count: 1,
  },
  {
    label: 'Campo Limpo, Americana',
    localization: [-22.7365396, -47.3082586],
    count: 2,
  },
  {
    label: 'Jardim Samambaia, Jundiaí',
    localization: [-23.1948993, -46.9124105],
    count: 3,
  },
  {
    label: 'Jardim Shangai, Jundiaí',
    localization: [-23.1784943, -46.8822257],
    count: 1,
  },
  {
    label: 'Jardim Guanabara, Jundiaí',
    localization: [-23.1856479, -46.9323085],
    count: 2,
  },
  {
    label: 'Jardim Ana Maria, Jundiaí',
    localization: [-23.1914125, -46.8991995],
    count: 2,
  },
  {
    label: "Guanciale, Campo Limpo Pta",
    localization: [-23.2097948, -46.800337],
    count: 1,
  },
  {
    label: "Centro, Campo Limpo Pta",
    localization: [-23.2063134, -46.787459],
    count: 1,
  },
  {
    label: "Jardim América, Campo Limpo Pta",
    localization: [-23.2050807, -46.7839527],
    count: 1,
  },
  {
    label: 'Barão Geraldo, Campinas',
    localization: [-22.80998855, -47.0839428207261],
    count: 2,
  },
  {
    label: 'Santa Terezinha',
    localization: [-23.2083759, -46.8470837],
    count: 1,
  },
  {
    label: 'Jardim Liberdade, Jundiaí',
    localization: [-23.168191, -46.8870748],
    count: 1,
  },
  {
    label: 'Jardim Pacaembu, Jundiaí',
    localization: [-23.1836239, -46.8637509],
    count: 1,
  },
  {
    label: 'Jardim Esplanada, Jundiaí',
    localization: [-23.2102188, -46.870105],
    count: 1,
  },
  {
    label: 'Vila Ana, Jundiaí',
    localization: [-23.2042903, -46.8970396],
    count: 1
  },
  { label: 'Capela, Vinhedo', localization: [-23.0457286, -47.0105499], count: 1 },
  {
    label: 'Horto Florestal, Jundiaí',
    localization: [-23.1641414, -46.8986747],
    count: 1
  },
  { label: 'Vila Ieire, Várzea Paulista', localization: [-23.2113247, -46.8258892], count: 1 },
  {
    label: 'Colinas de Itupeva, Itupeva',
    localization: [-23.153936, -47.0527762],
    count: 1
  },
  {
    label: 'Montserrat, Itupeva',
    localization: [-23.1364393, -47.0765516],
    count: 1
  },
  {
    label: 'Bairro da Mina, Itupeva',
    localization: [-23.1369093, -47.037019],
    count: 2
  },
  { label: 'Bosques da Pedra, Bragança Paulista', localization: [-23.0009417, -46.5255891], count: 1 },
  {
    label: 'Jardim Tamoio, Jundiaí',
    localization: [-23.1916018, -46.8495774],
    count: 1
  },
  {
    label: 'Condomínio Fazenda São Joaquim',
    localization: [-23.0630934, -46.9829395],
    count: 2
  },
  {
    label: 'Serpa, Caieiras',
    localization: [-23.348504, -46.7555985],
    count: 1
  },
  { label: 'Recanto Parrillo', localization: [ -23.1918244, -46.8625311 ], count: 1 }
] satisfies Array<{
  label: string;
  localization: LatLngExpression;
  count: number;
}>;

function App() {

  return (
    <>
      <MapContainer center={ICS_LATLNG} zoom={15} scrollWheelZoom>
        {/* <SearchField apiKey="AiYUrWF37c9my3XDT-tAP4kaT8LtAMXwA0ifx_LvszLAjfD4xjjmVDiD0v2IPXXE" /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={ICS_LATLNG} icon={greenIcon}>
          <Popup>
            ICS
          </Popup>
        </Marker>
        {RD_POSITIONS.map(item => (
          <LayerGroup key={item.label}>
            <Circle
              center={item.localization}
              radius={RADIUS_RD}
            />
            <Marker position={item.localization}>
              <Popup>
                {item.label}
              </Popup>
            </Marker>
          </LayerGroup>
        ))}
        {/* <MarkerClusterGroup maxClusterRadius={50}> */}
        {PEOPLE_POSITIONS.map(item => (
          <LayerGroup key={item.label}>
            {/* <Circle
              {...orangeOptions}
              center={item.localization}
              radius={400}
            /> */}
            <DynamicLabel
              key={item.label}
              position={item.localization as LatLngExpression}
              text={item.count}>
              <Popup>
                {item.label}
              </Popup>
            </DynamicLabel>

          </LayerGroup>
        ))}
        {/* </MarkerClusterGroup> */}

      </MapContainer>
    </>
  )
}

// const MarkerLabel = ({ position, text }: { position: LatLngExpression, text: string }) => {
//   const icon = divIcon({
//     className: 'custom-icon',
//     html: `<span className="h-full w-full">${text}</span>`,
//   });
//   return <Marker position={position} icon={icon} />;
// };

const DynamicLabel = ({ position, text, children }: { children: ReactNode, position: LatLngExpression, text: string | number }) => {
  const [circleRadius, setCircleRadius] = useState(50); // Initialize with some default value

  useMapEvents({
    zoom: (event) => {
      const newZoom = event.target.getZoom();

      // Adjust the circle radius or label size based on zoom level
      const newCircleRadius = 50 + (newZoom - 13) * 10; // Adjust the formula as needed
      setCircleRadius(newCircleRadius);
    },
  });

  const icon = divIcon({
    className: 'custom-icon',
    html: `<div style="font-size: ${circleRadius / 3}px; width: ${circleRadius}px; height: ${circleRadius}px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background-color: rgb(255 165 0 / 0.5); border: 4px solid orange; color: black; transform: translate(-50%, -50%);">${text}</div>`,
  });

  return <Marker position={position} icon={icon}>{children}</Marker>;
};


const SearchField = ({ apiKey }: { apiKey: string }) => {
  const provider = new BingProvider({
    params: {
      key: apiKey,
    },
  });

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: false, // Não mostrar marcador automaticamente
    updateMap: false,
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      console.log('Localização selecionada:', result);
      // onLocationSelected(result.location); // Passar a localização para o callback
    });
    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, []);

  return null;
};

export default App
