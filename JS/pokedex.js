const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            document.getElementById("pokeImg").src = "./img/Missingno.png";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            setPokeData(data);
        }
    });
}

const setPokeData = (data) => {
    const pokeName = document.getElementById("pokeNombre");
    const pokePhoto = document.getElementById("pokeImg");
    const pokeType = document.getElementById("pokeTipo");

    pokeName.innerHTML = `${data.name}`.charAt(0).toUpperCase() + `${data.name}`.slice(1);
    pokePhoto.src = data.sprites.front_default;
    if (data.types.length === 2) {
        pokeType.innerHTML = `${data.types[0].type.name} / ${data.types[1].type.name}`
    } else {
        pokeType.innerHTML = data.types[0].type.name
    }

    genera_tabla(data.stats,'<tr><th>Stat</th><th>Value</th></tr>', `pokeEstadisticas`);
    genera_tabla(data.moves,'<tr><th>Move</th><th>Learning method</th></tr>', `pokeMovimientos`);
}
function genera_tabla(itemList,headers, pokeId) {

    items_table = document.getElementById(`${pokeId}`);
    items_table.innerHTML = headers;
    if (pokeId === `pokeEstadisticas`) {
        for (var ctr = 0; ctr < itemList.length; ctr++) {
            items_table.innerHTML += '<tr><td>' + itemList[ctr].stat.name + '</td><td>' + itemList[ctr].base_stat + '</td></tr>';
        }
    } else {
        for (var ctr = 0; ctr < itemList.length; ctr++) {
            items_table.innerHTML += '<tr><td>' +  itemList[ctr].move.name + '</td><td>' + itemList[ctr].version_group_details[0].move_learn_method.name + '</td></tr>';
        }
    }
}