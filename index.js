import { Intents, Client } from 'discord.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import express from 'express';
dotenv.config();
const config = JSON.parse(fs.readFileSync('./config.json'));
const app = express();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

app.get('/', (req, res) => res.send('Jett'));

client.once('ready', () => {
  console.clear();
  console.log(chalk.green(`Logged in as ${client.user.tag}`));
  app.listen(process.env.PORT, () =>
    console.log(chalk.green(`Server listening to port ${process.env.PORT}`))
  );
});

// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isCommand()) return;

//   const { commandName } = interaction;
// });

client.on('guildMemberAdd', (member) => {
  if (!member.guild.id == config.guildId) return;
  member.guild.channels.cache
    .get('989998664669888612')
    .send(`A wild ${member.user.username} appears!`);
  member.send(
    `Hey ${member.user.username}\ndont forget to read <#989998737986314261>`
  );
  member.roles.add('990002241987551252');
});

client.login(process.env.TOKEN);
