const fs = require("fs");

module.exports = {
    name: "registrarpix",
    description: "Registrar chave pix",

    async execute(interaction) {

        const chave = "SUA_CHAVE_PIX_AQUI";

        fs.writeFileSync("./data/pix.json", JSON.stringify({ chave }, null, 2));

        await interaction.reply("PIX registrado!");
    }
};
