const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                id: 1,
                nome: "Aladin",
                dataNascimento: new Date()
            })
        }, 1000) 
    })  
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) { 
        setTimeout(() => {
            return resolve({
                numero: "11992222",
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "dos bobos",
            numero: 0
        })
    }, 2000)
}

(async function main() {
    try {
        console.time("medida-promise");
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);
    
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}
            Endereco: (${telefone.ddd}) ${telefone.numero}
            Telefone: ${endereco.rua}, ${endereco.numero}
        `);

        console.timeEnd("medida-promise");
    }
    catch(error) {
        console.error("DEU RUIM", error);
    }
})()

//const usuarioPromise = obterUsuario();

// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
//         `);
//     })
//     .catch(function (erro) {
//         console.log("deu ruim!");
//     })

// obterUsuario(function resolverUsuario(erro0, usuario) {

//     if(erro0) {
//         console.error("DEU RUIM em USUARIO", error);
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//         if(erro1) {
//             console.error("DEU RUIM em TELEFONE", erro);
//             return;
//         }
//         obterEndereco(usuario.id, function resolverTelefone(erro2, endereco) {
//             if(erro1) {
//                 console.error("DEU RUIM em ENDERECO", erro);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd}) ${telefone.numero}
//             `)
//         })
//     })
// });