module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error("Erro no comando:", error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "Erro ao executar comando", ephemeral: true });
            } else {
                await interaction.reply({ content: "Erro ao executar comando", ephemeral: true });
            }
        }
    }
};
