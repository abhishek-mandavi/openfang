#!/usr/bin/env bun


import { Command } from "commander";
import { runStartup } from "./tui/startup";

const program = new Command();

program.name("openfang-build").description("Openfang cli").version("0.0.1");

program.command("start").description("Show banner and cli")
    .action(
        async()=>{
            await runStartup()
        }
    );
await program.parseAsync(process.argv);