const botconfig = require("./botconfig.json");

const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
    console.log(`${bot.user.username} has come online. `);
    bot.user.setActivity("Visual Studio Code", { type: "PLAYING" });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Bot greeting message: !Hello
    if (cmd === `${prefix}hello`) {
        return message.channel.send("Hello World!");
    }

    //Bot Display information Message: !serverinfo
    if (cmd === `${prefix}serverinfo`) {
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
            .setDescription("Server information")
            .setColor("#15f153")
            .setThumbnail(sicon)
            .addField("Server Name: ", message.guild.name)
            .addField("Created On : ", message.guild.createdAt)
            .addField("You joined : ", message.guild.joinedAt)
            .addField("Total Members: ", message.guild.memberCount);

        return message.channel.send(serverembed);
    }

    //Bot info message: !botinfo

    if (cmd === `${prefix}botinfo`) {
        let bicon = bot.user.displayAvatarURL;

        let botembed = new Discord.RichEmbed()
            .setDescription("Bienvenido a FreeCodeCamp Bucaramanga")
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("Mi nombre es: ", bot.user.username)
            .addField("Codeando desde: ", bot.user.createdAt);

        return message.channel.send(botembed);
    }

    //Bot report message: !report
    if (cmd === `${prefix}report`) {
        let rUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!rUser) return message.channel.send("Couldn't find user.");
        let rreason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor("#15f153")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField(
                "Reported By",
                `${message.author} with ID: ${message.author.id}`
            )
            .addField("Channel", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", rreason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if (!reportschannel)
            return message.channel.send("Couldn't find reports channel.");

        message.delete().catch(O_o => {});
        reportschannel.send(reportEmbed);

        return;
    }
});

bot.login(botconfig.token);
