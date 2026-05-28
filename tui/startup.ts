import { isCancel, select } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE = chalk.hex('#e8dcf8').bold;

function printBannerWithShadow(ascii:string){
    const bannerLines = ascii.replace(/\s+$/, '').split('\n');
    const maxlen = Math.max(...bannerLines.map((l) => l.length),0);
    const rowWidth = maxlen + 2;

    for(const line of bannerLines) {
        console.log(SHADOW(('  ' + line).padEnd(rowWidth)));
    }
    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for(const line of bannerLines){
        console.log(FACE(line.padEnd(rowWidth)));
    }
    console.log();
}

export async function runStartup(){
    let ascii:string;
    try {
        ascii = figlet.textSync("openfang",{font:BANNER_FONT})
    } catch (error) {
        ascii =figlet.textSync("openfang",{font:"Standard"})
    }
    printBannerWithShadow(ascii)

    const mode = await select({
        message: "which mode you want to proceed with?",
        options:[
            {value:"cli",label: "CLI"},
            {value:"telegram", label:"Telegram"},
            {value:"whatsapp", label:"Whatsapp"}
        ]
    });
    if(isCancel(mode)){
        process.exit(0);
    }
    if(mode === "cli"){
        console.log(chalk.dim("Starting cli mode....."))
    }
    else{
        console.log(chalk.dim("Starting Telegram mode....."))
    }
}