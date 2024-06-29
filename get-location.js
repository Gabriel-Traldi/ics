// const ceps = [
//   "13085-160", "13203-830", "13209-355", "13210-705", "13212-300", 
//   "13214-883", "13218-010", "13218-590", "13219-323", "13221-300", 
//   "13223-210", "13231-220", "13233-450", "13257-472", "13294-202", 
//   "13471-323", "13473-350", "13477-020", "07713-110"
// ];

const ceps = [
    
];

const getLatLonFromCEP = async (cep) => {
  const url = `https://cep.awesomeapi.com.br/json/${cep}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      const { lat, lng } = data;
      return { label: cep, localization: [lat, lng] };
    } else {
      console.log(`Nenhum resultado encontrado para o CEP ${cep}.`);
      return { cep, lat: null, lon: null };
    }
  } catch (error) {
    console.error(`Erro ao obter dados de geocodificação para o CEP ${cep}:`, error);
    return { cep, lat: null, lon: null };
  }
};

const getAllLatLon = async (ceps) => {
  const results = [];
  for (const cep of ceps) {
    const result = await getLatLonFromCEP(cep);
    results.push(result);
  }
  return results;
};

getAllLatLon(ceps).then((results) => {
  console.log(results);
});