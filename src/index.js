import fs from 'fs';
import chalk from "chalk";

function extraLinks(texto){
    const regex =  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}));
    return resultados.length !== 0 ? resultados: 'Não tem Links';
}

function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório!'));
}

// async / await

async function pegaArquivo(caminhoDoArquivo){
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraLinks(texto);
    } catch (erro) {
       trataErro(erro);
    }
}

export default pegaArquivo;