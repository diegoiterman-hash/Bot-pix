const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// 📁 carregar comandos
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (!command.data || !command.data.name) {
        console.log(`❌ Comando inválido: ${file}`);
        continue;
    }

    client.commands.set(command.data.name, command);
}

// 📁 eventos
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

// 🚀 bot online
client.once('ready', () => {
    console.log(`✅ Online como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
