const TelegramBot = require('node-telegram-bot-api');
const { getButtonLables, getDish } = require('./get.js')
require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const mainMenu = [
  [
    {
      text: 'Завтрак', // текст на кнопке
      callback_data: 'Breakfast' // данные для обработчика событий
    }
  ],
  [
    {
      text: 'Обед',
      callback_data: 'Lunch'
    }
  ],
  [
    {
      text: 'Ужин',
      callback_data: 'Dinner'
    }
  ],
  [
    {
      text: 'Перекус',
      callback_data: 'Snack'
    }
  ],
  [
    {
      text: 'К чаю',
      callback_data: 'Teatime'
    }
  ]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет! что будем готовить?', {
    reply_markup: {
      inline_keyboard: mainMenu
    }
  });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  let recepiesMenue = await getButtonLables(query.data);

  if (query.data === 'Breakfast') {
    bot.sendMessage(chatId, 'Какой рецепт тебе нравится?', {
      reply_markup: {
        inline_keyboard: recepiesMenue
      }
    })
  } else if (query.data === 'Lunch') {
    bot.sendMessage(chatId, 'Какой рецепт тебе нравится?', {
      reply_markup: {
        inline_keyboard: recepiesMenue
      }
    })
  } else if (query.data === 'Dinner') {
    bot.sendMessage(chatId, 'Какой рецепт тебе нравится?', {
      reply_markup: {
        inline_keyboard: recepiesMenue
      }
    })
  } else if (query.data === 'Snack') {
    bot.sendMessage(chatId, 'Какой рецепт тебе нравится?', {
      reply_markup: {
        inline_keyboard: recepiesMenue
      }
    })
  } else if (query.data === 'Teatime') {
    bot.sendMessage(chatId, 'Какой рецепт тебе нравится?', {
      reply_markup: {
        inline_keyboard: recepiesMenue
      }
    })
  } else {
    bot.sendMessage(chatId, await getDish(query.data));
  };
});

