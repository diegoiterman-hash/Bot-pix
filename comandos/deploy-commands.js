const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: "ping",
        description: "Testar bot"
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registrando comandos...');

        await rest.put(
            Routes.applicationCommands("SEU_CLIENT_ID"),
            { body: commands }
        );

        console.log('✅ Comandos registrados!');
    } catch (error) {
        console.error(error);
    }
})();
