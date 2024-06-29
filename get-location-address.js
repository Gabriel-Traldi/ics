const bairros = [
    "Medeiros", "Eloy Chaves", "Fazenda Grande", "Anhangabaú", "Engordadouro",
    "Malota", "Residencial Santa Giovana", "Vila Nambi", "Recanto da Prata", "Centro",
    "Vianelo", "Colônia", "Higienópolis", "Parque Brasil", "Jardim América", 
    "Jardim Caçula", "Jardim Messina", "Jardim Virgínia", "Jardim das Samambaias",
    "Ponte de Campinas", "Ponte São João", "Vila Guarani", "Vila Graff", "Vila Rami",
    "Vila Rio Branco", "Jardim América 1", "Corrupira", "Vila das Hortências",
    "Figueira Branca", "Rio Acima", "Nova Cidade Jardim", "Cidade Jardim", 
    "Cidade Jardim II", "Horto Santo Antônio", "Anhangabau", "Jardim Bonfiglioli",
    "Vila Arens ll", "Serra dos Cristais", "Cidade Nova 1", "Bairro do Retiro",
    "Vila Nova Jundiainópolis", "Recanto do Quarto Centenário ou Gramadão",
    "Vila Jundiainópolis", "Ivoturucaia", "Jardim Ester", "Palmares", "Pacaembú I",
    "Butantã", "Jardim Lizandra", "Jardim Florestal", "Campo Verde", "Jardim Itália",
    "Campo Limpo", "Jardim Samambaia", "Jardim Shangai", "Jardim Guanabara",
    "Santa Terezinha", "Jardim Liberdade", "Jardim Pacaembu", "Jardim Esplanada",
    "Vila Ana", "Capela", "Horto Florestal", "Vila Ieire", "Colinas de Itupeva",
    "Bairro da Mina", "Bosques da Pedra", "Jardim Tamoio", "Cond Fazenda São Joaquim",
    "Condomínio Fazenda São Joaquim", "Cidade Caieiras Bairro Serpa", "Rec Parrillo"
  ];
  
  const getLatLonFromAddress = async (address) => {
    const formattedAddress = encodeURIComponent(address + ', Jundiaí, SP, Brazil');
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { label: address, localization: [lat, lon] };
      } else {
        console.log(`Nenhum resultado encontrado para ${address}.`);
        return { label: address, localization: [null, null] };
      }
    } catch (error) {
      console.error(`Erro ao obter dados de geocodificação para ${address}:`, error);
      return { bairro: address, lat: null, lon: null };
    }
  };
  
  const getAllLatLon = async (bairros) => {
    const results = [];
    for (const bairro of bairros) {
      const result = await getLatLonFromAddress(bairro);
      results.push(result);
    }
    return results;
  };
  
  getAllLatLon(bairros).then((results) => {
    console.log(results);
  });