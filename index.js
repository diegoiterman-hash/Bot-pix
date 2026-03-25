const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// comandos
if (!command.data || !command.data.name) {
    console.log(`❌ Comando inválido: ${file}`);
    continue;
}

client.commands.set(command.data.name, command);

// eventos
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on('interactionCreate', (...args) => event.execute(...args));
}

client.once('ready', () => {
    console.log(`✅ Online como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
