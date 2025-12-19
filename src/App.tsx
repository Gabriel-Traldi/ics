import { ReactNode, useState } from 'react';

import { LatLngExpression, Icon, divIcon } from 'leaflet';

import { LayerGroup, MapContainer, Marker, Popup, TileLayer, Circle, useMapEvents } from 'react-leaflet'

// import MarkerClusterGroup from "react-leaflet-cluster";

// import { GeoSearchControl, BingProvider } from 'leaflet-geosearch';

import './App.css'

const greenIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const rdIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// const orangeOptions = { color: 'orange' }

const ICS_LATLNG = [-23.1792564, -46.9159328] as LatLngExpression;

const RADIUS_RD = 2000;

const RD_POSITIONS = [
  { "label": "Chácaras Campo Limpo", "localization": [-23.1810709, -46.753819] },
  { "label": "Jardim Bela Vista (Zona Sul)", "localization": [-23.7211473, -46.7527399] },
  { "label": "Betel", "localization": [-22.7770291, -47.0967859] },
  { "label": "Ponte de Campinas", "localization": [-23.1768005, -46.8917728] },
  { "label": "Nova Cidade Jardim", "localization": [-23.2229174, -46.8564746] },
  { "label": "Anhangabaú", "localization": [-23.2022632, -46.8919528] },
  { "label": "Vila das Hortencias", "localization": [-23.1875994, -46.8963196] },
  { "label": "Jardim das Samambaias", "localization": [-23.1936009, -46.9154903] },
  { "label": "Jardim das Samambaias", "localization": [-23.1878303, -46.9129239] },
  { "label": "Jardim Ermida II", "localization": [-23.2020743, -46.9627304] },
  { "label": "Medeiros", "localization": [-23.1768345, -47.003308] },
  { "label": "Residencial Santa Giovana", "localization": [-23.16005, -46.95911] },
  { "label": "Parque Residencial Jundiaí II", "localization": [-23.1518768, -47.0097442] },
  { "label": "Cidade Luíza", "localization": [-23.1711518, -46.9042018] },
  { "label": "Rio Acima", "localization": [-23.1125326, -46.8909462] },
  { "label": "Ponte de Sao Joao", "localization": [-23.1883929, -46.8566827] },
  { "label": "Jardim Pacaembu", "localization": [-23.1903073, -46.8602591] },
  { "label": "Vila Nambi", "localization": [-23.194382, -46.8610601] },
  { "label": "Jardim Paraiso", "localization": [-23.2136378, -46.8263555] },
  { "label": "Residencial Fazenda Santa Rosa - Fase 1", "localization": [-23.0222475, -46.8295976] },
  { "label": "Marambaia", "localization": [-23.0512349, -46.9954668] },
  { "label": "Campo Limpo", "localization": [-22.7365229, -47.3086596] }
]as Array<{ label: string, localization: LatLngExpression }>

const PEOPLE_POSITIONS = [
  { "label": "Jardim Carolina", "count": 9, "localization": [-23.1784479, -46.9813427] },
  { "label": "Anhangabaú", "count": 5, "localization": [-23.2022632, -46.8919528] },
  { "label": "Medeiros", "count": 5, "localization": [-23.181675, -46.9856059] },
  { "label": "Fazenda Grande", "count": 5, "localization": [-23.1676049, -46.9672311] },
  { "label": "Itatiba", "count": 5, "localization": [-22.9779089, -46.8931368] },
  { "label": "Vila Nova Jundiainopolis", "count": 4, "localization": [-23.212663, -46.8915071] },
  { "label": "Jardim Ermida II", "count": 4, "localization": [-23.2020743, -46.9627304] },
  { "label": "Engordadouro", "count": 4, "localization": [-23.1568044, -46.9283229] },
  { "label": "Jardim Caçula", "count": 4, "localization": [-23.1721549, -46.8564164] },
  { "label": "Jardim Ana Maria", "count": 3, "localization": [-23.188798, -46.9049679] },
  { "label": "Parque Residencial Eloy Chaves", "count": 3, "localization": [-23.1878406, -46.9601704] },
  { "label": "Jardim Ermida I", "count": 3, "localization": [-23.1849339, -46.9711955] },
  { "label": "Cidade Luiza", "count": 3, "localization": [-23.1657296, -46.91819] },
  { "label": "Bosque dos Jacarandás", "count": 3, "localization": [-23.1400946, -46.9302087] },
  { "label": "Recanto da Prata", "count": 3, "localization": [-23.1798866, -46.7985766] },
  { "label": "Vila Nambi", "count": 3, "localization": [-23.194382, -46.8610601] },
  { "label": "Cidade Nova", "count": 3, "localization": [-23.1868843, -46.8454796] },
  { "label": "Jardim Colonia", "count": 3, "localization": [-23.1859344, -46.8529277] },
  { "label": "São Venâncio", "count": 3, "localization": [-23.1574896, -47.0472793] },
  { "label": "Campo Verde", "count": 3, "localization": [-22.7202257, -47.3087809] },
  { "label": "Jardim Bela Vista (Zona Sul)", "count": 2, "localization": [-23.7211473, -46.7527399] },
  { "label": "Parque Reboucas", "count": 2, "localization": [-23.6258811, -46.7490507] },
  { "label": "Betel", "count": 2, "localization": [-22.7770291, -47.0967859] },
  { "label": "Centro", "count": 2, "localization": [-23.1926572, -46.8800058] },
  { "label": "Ponte de Campinas", "count": 2, "localization": [-23.1768005, -46.8917728] },
  { "label": "Centro", "count": 2, "localization": [-23.1849694, -46.8817058] },
  { "label": "Vila Arens II", "count": 2, "localization": [-23.2028859, -46.8692064] },
  { "label": "Jardim Bonfiglioli", "count": 2, "localization": [-23.207869, -46.8927538] },
  { "label": "Vila Della Piazza", "count": 2, "localization": [-23.2019436, -46.8875294] },
  { "label": "Jardim Ana Maria", "count": 2, "localization": [-23.1900638, -46.9035955] },
  { "label": "Jardim Ana Maria", "count": 2, "localization": [-23.1892889, -46.8960165] },
  { "label": "Vila das Hortencias", "count": 2, "localization": [-23.1875994, -46.8963196] },
  { "label": "Horto Santo Antonio", "count": 2, "localization": [-23.1862442, -46.9196666] },
  { "label": "Jardim Santa Teresa", "count": 2, "localization": [-23.1888297, -46.9108913] },
  { "label": "Chácara Malota", "count": 2, "localization": [-23.2119695, -46.9051086] },
  { "label": "Jardim Guanabara", "count": 2, "localization": [-23.1786632, -46.9206269] },
  { "label": "Medeiros", "count": 2, "localization": [-23.1768345, -47.003308] },
  { "label": "Chácaras Saudáveis e Encantadoras", "count": 2, "localization": [-23.1825257, -46.9943851] },
  { "label": "Fazenda Grande", "count": 2, "localization": [-23.1718232, -46.9668581] },
  { "label": "Jardim das Tulipas", "count": 2, "localization": [-23.1524172, -46.9650269] },
  { "label": "Residencial Santa Giovana", "count": 2, "localization": [-23.1586365, -46.9588804] },
  { "label": "Loteamento Parque Industrial", "count": 2, "localization": [-23.1524581, -47.0134661] },
  { "label": "Vila Lacerda", "count": 2, "localization": [-23.1700025, -46.9087498] },
  { "label": "Cidade Santos Dumont", "count": 2, "localization": [-23.1697401, -46.9123885] },
  { "label": "Chácara Morada Mediterrânea", "count": 2, "localization": [-23.1384159, -46.9387184] },
  { "label": "Vila Graff", "count": 2, "localization": [-23.1826327, -46.8781346] },
  { "label": "Jardim Liberdade", "count": 2, "localization": [-23.170637, -46.8875682] },
  { "label": "Jardim Florestal", "count": 2, "localization": [-23.1646938, -46.8999134] },
  { "label": "Rio Acima", "count": 2, "localization": [-23.1125326, -46.8909462] },
  { "label": "Vila Joana", "count": 2, "localization": [-23.1811763, -46.8754724] },
  { "label": "Roseira", "count": 2, "localization": [-23.1173973, -46.8090511] },
  { "label": "Vila Ruy Barbosa", "count": 2, "localization": [-23.1962351, -46.8582614] },
  { "label": "Jardim Tamoio", "count": 2, "localization": [-23.19034, -46.8557563] },
  { "label": "Jardim América", "count": 2, "localization": [-23.2027533, -46.8329644] },
  { "label": "Loteamento Serra dos Cristais", "count": 2, "localization": [-23.2416942, -46.8368638] },
  { "label": "Jardim America", "count": 2, "localization": [-23.1982133, -46.7871096] },
  { "label": "Centro", "count": 2, "localization": [-23.0016524, -46.8451462] },
  { "label": "São Joaquim", "count": 2, "localization": [-23.0688377, -46.9846855] },
  { "label": "Jardim Samambaia", "count": 2, "localization": [-23.15073, -47.05785] },
  { "label": "Residencial Colinas de Itupeva", "count": 2, "localization": [-23.2067457, -47.0354232] },
  { "label": "Jardim Arco Íris", "count": 2, "localization": [-23.1550882, -47.0639283] },
  { "label": "Jardim Lizandra", "count": 2, "localization": [-22.7235051, -47.3306669] },
  { "label": "Campo Limpo", "count": 2, "localization": [-22.7365229, -47.3086596] },
  { "label": "Jardim Ester", "count": 1, "localization": [-23.5819467, -46.7637197] },
  { "label": "Colina Maria Luíza (Jordanésia)", "count": 1, "localization": [-23.3473594, -46.8287651] },
  { "label": "Vila Bela", "count": 1, "localization": [-23.3108315, -46.7262433] },
  { "label": "Conjunto Residencial Dom Pedro I", "count": 1, "localization": [-23.2789265, -45.889562] },
  { "label": "Nova Cidade Jardim", "count": 1, "localization": [-23.2229174, -46.8564746] },
  { "label": "Vila Jundiainopolis", "count": 1, "localization": [-23.2133859, -46.8849205] },
  { "label": "Vila Vianelo", "count": 1, "localization": [-23.1982187, -46.8835894] },
  { "label": "Jardim Bizarro", "count": 1, "localization": [-23.2036986, -46.8875577] },
  { "label": "Bela Vista", "count": 1, "localization": [-23.1960518, -46.8874884] },
  { "label": "Jardim Paris", "count": 1, "localization": [-23.1823723, -46.9011701] },
  { "label": "Vila das Hortencias", "count": 1, "localization": [-23.1769758, -46.909053] },
  { "label": "Vila das Hortencias", "count": 1, "localization": [-23.1761561, -46.9082182] },
  { "label": "Vila Guarani", "count": 1, "localization": [-23.1769195, -46.9122379] },
  { "label": "Vila Viotto", "count": 1, "localization": [-23.1893033, -46.9059586] },
  { "label": "Jardim Campos Elisios", "count": 1, "localization": [-23.186582, -46.9038986] },
  { "label": "Vila Josefina", "count": 1, "localization": [-23.2233978, -46.8829833] },
  { "label": "Loteamento Residencial Reserva Marajoara", "count": 1, "localization": [-23.2012126, -46.9177712] },
  { "label": "Jardim das Samambaias", "count": 1, "localization": [-23.1936009, -46.9154903] },
  { "label": "Jardim das Samambaias", "count": 1, "localization": [-23.1947202, -46.9111301] },
  { "label": "Jardim das Samambaias", "count": 1, "localization": [-23.1878303, -46.9129239] },
  { "label": "Jardim America", "count": 1, "localization": [-23.1889871, -46.913654] },
  { "label": "Jardim Guanabara", "count": 1, "localization": [-23.1807646, -46.9274066] },
  { "label": "Parque Eloy Chaves", "count": 1, "localization": [-23.1870762, -46.9640048] },
  { "label": "Loteamento Villaggio di San Francisco", "count": 1, "localization": [-23.180468, -46.9810417] },
  { "label": "Fazenda Grande", "count": 1, "localization": [-23.1756555, -46.9670376] },
  { "label": "Parque Residencial Jundiaí", "count": 1, "localization": [-23.1503386, -47.0125503] },
  { "label": "Residencial Santa Giovana", "count": 1, "localization": [-23.159879, -46.9585769] },
  { "label": "Residencial Santa Giovana", "count": 1, "localization": [-23.1601016, -46.9590530] },
  { "label": "Parque Residencial Jundiaí II", "count": 1, "localization": [-23.1518768, -47.0097442] },
  { "label": "Cidade Luíza", "count": 1, "localization": [-23.1711518, -46.9042018] },
  { "label": "Jardim Shangai", "count": 1, "localization": [-23.1751136, -46.8826045] },
  { "label": "Jardim Torres Sao Jose", "count": 1, "localization": [-23.1657925, -46.9154749] },
  { "label": "CECAP", "count": 1, "localization": [-23.1402441, -46.9205765] },
  { "label": "Horto Florestal", "count": 1, "localization": [-23.1721854, -46.8882871] },
  { "label": "Jardim Tarumã", "count": 1, "localization": [-23.1708331, -46.8662279] },
  { "label": "Ponte Sao Joao", "count": 1, "localization": [-23.1879267, -46.870408] },
  { "label": "Ponte de Sao Joao", "count": 1, "localization": [-23.1883929, -46.8566827] },
  { "label": "Jardim Pacaembu", "count": 1, "localization": [-23.1903073, -46.8602591] },
  { "label": "Jardim Pacaembu", "count": 1, "localization": [-23.1877197, -46.8569173] },
  { "label": "Jardim Roma", "count": 1, "localization": [-23.1783743, -46.8574764] },
  { "label": "Caxambu", "count": 1, "localization": [-23.1615518, -46.8457153] },
  { "label": "Vila Ruy Barbosa", "count": 1, "localization": [-23.1951576, -46.856936] },
  { "label": "Jardim Santa Rita de Cassia", "count": 1, "localization": [-23.1900338, -46.8532924] },
  { "label": "Cidade Nova", "count": 1, "localization": [-23.1914896, -46.8406487] },
  // { "label": "não encontrado", "count": 1, "localization": [43.0365582, -76.2189421] },
  { "label": "Caxambu", "count": 1, "localization": [-23.1703434, -46.8357284] },
  // { "label": "Local não encontrado", "count": 1, "localization": null },
  { "label": "Jardim Promeca", "count": 1, "localization": [-23.2132231, -46.8123914] },
  { "label": "Jardim Paraiso", "count": 1, "localization": [-23.2136378, -46.8263555] },
  { "label": "Ieiri", "count": 1, "localization": [-23.2131357, -46.824016] },
  { "label": "Parque Guarani", "count": 1, "localization": [-23.2242052, -46.8447703] },
  { "label": "Vila Iguacu", "count": 1, "localization": [-23.2220989, -46.8477254] },
  { "label": "Centro", "count": 1, "localization": [-23.2071277, -46.7861675] },
  { "label": "Parque Residencial California", "count": 1, "localization": [-23.2142871, -46.7651121] },
  { "label": "Parque Niagara", "count": 1, "localization": [-23.1794086, -46.7654003] },
  { "label": "Jardim Guanciale", "count": 1, "localization": [-23.2065195, -46.7995216] },
  { "label": "Jarinu", "count": 1, "localization": [-23.08999, -46.71345] },
  { "label": "Residencial Fazenda Santa Rosa - Fase 1", "count": 1, "localization": [-23.0222475, -46.8295976] },
  { "label": "Nova Vinhedo", "count": 1, "localization": [-23.0239942, -46.9846855] },
  { "label": "Marambaia", "count": 1, "localization": [-23.0512349, -46.9954668] },
  { "label": "Itupeva", "count": 1, "localization": [-23.145228, -47.0777685] },
  { "label": "Jardim Primavera", "count": 1, "localization": [-23.1634589, -47.057578] },
  { "label": "Gleba Santa Izabel", "count": 1, "localization": [-23.1565128, -47.0672739] },
  { "label": "Mina", "count": 1, "localization": [-23.1427052, -47.0502438] },
  { "label": "Jardim Colina da Serra", "count": 1, "localization": [-23.2586231, -47.0532845] }
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
            <Marker position={item.localization} icon={rdIcon}>
              <Popup>
                RD: {item.label}
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


// const SearchField = ({ apiKey }: { apiKey: string }) => {
//   const provider = new BingProvider({
//     params: {
//       key: apiKey,
//     },
//   });

//   // @ts-ignore
//   const searchControl = new GeoSearchControl({
//     provider: provider,
//     style: 'bar',
//     showMarker: false, // Não mostrar marcador automaticamente
//     updateMap: false,
//   });

//   const map = useMap();

//   useEffect(() => {
//     map.addControl(searchControl);

//     map.on('geosearch/showlocation', (result) => {
//       console.log('Localização selecionada:', result);
//       // onLocationSelected(result.location); // Passar a localização para o callback
//     });
//     return () => {
//       map.removeControl(searchControl);
//       map.off('geosearch/showlocation');
//     };
//   }, []);

//   return null;
// };

export default App
