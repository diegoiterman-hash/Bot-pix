const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "painel",
    description: "Criar painel",

    async execute(interaction) {

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("comprar")
                .setLabel("Comprar")
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({
            content: "🛒 Clique no botão para comprar",
            components: [row]
        });
    }
};
