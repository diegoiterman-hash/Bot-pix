const { REST, Routes } = require('discord.js');

const commands = [
    require('./commands/registrarpix').data.toJSON(),
    require('./commands/painel').data.toJSON(),
    require('./commands/addproduto').data.toJSON()
];

const rest = new REST({ version: '10' }).setToken('SEU_TOKEN_AQUI');

(async () => {
    await rest.put(
        Routes.applicationCommands('SEU_CLIENT_ID'),
        { body: commands }
    );
    console.log('✅ Slash registrados');
})();