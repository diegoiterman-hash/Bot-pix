const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// 📁 carregar comandos
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);

        if (!command.data || !command.data.name) {
            console.log(`❌ Comando inválido: ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);

    } catch (err) {
        console.log(`❌ Erro ao carregar: ${file}`);
        console.error(err);
    }
}

// 📁 carregar eventos
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    try {
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(...args));
    } catch (err) {
        console.log(`❌ Erro no evento: ${file}`);
        console.error(err);
    }
}

// 🚀 bot online
client.once('ready', () => {
    console.log(`✅ Online como ${client.user.tag}`);
});

// 🛡️ ANTI-CRASH
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Promise rejeitada:', err);
});

client.login(process.env.TOKEN);
