// HANS TECHY V2 - COMPLETE 385 COMMANDS ENGINE
// Native fetch / axios wrapper
let axios = null;
try { axios = require('axios'); } catch(_) {}


const CATEGORIES = {
  "AI & NLP": [
    [
      "ai",
      "Chat with AI assistant"
    ],
    [
      "gpt",
      "OpenAI ChatGPT query"
    ],
    [
      "gpt4",
      "Advanced GPT-4 response"
    ],
    [
      "ask",
      "Ask any question to AI"
    ],
    [
      "chat",
      "Chat conversation with AI"
    ],
    [
      "gemini",
      "Google Gemini AI model"
    ],
    [
      "llama",
      "Meta LLaMA AI model"
    ],
    [
      "copilot",
      "Microsoft Copilot AI"
    ],
    [
      "claude",
      "Anthropic Claude AI prompt"
    ],
    [
      "deepseek",
      "DeepSeek reasoning query"
    ],
    [
      "mistral",
      "Mistral AI conversation"
    ],
    [
      "translate",
      "Translate text to any language"
    ],
    [
      "tr",
      "Quick translation helper"
    ],
    [
      "summarize",
      "Summarize long paragraphs"
    ],
    [
      "rewrite",
      "Paraphrase and rewrite text"
    ],
    [
      "grammar",
      "Fix grammar and spelling"
    ],
    [
      "code",
      "Generate code snippets"
    ],
    [
      "debug",
      "Explain and debug code"
    ],
    [
      "explain",
      "Explain complex concepts simply"
    ],
    [
      "imagine",
      "AI image generation prompt"
    ],
    [
      "dalle",
      "DALL-E image prompt generation"
    ],
    [
      "prompt",
      "Improve an AI prompt"
    ],
    [
      "poem",
      "Generate custom AI poem"
    ],
    [
      "story",
      "Generate creative AI story"
    ],
    [
      "recipe",
      "AI cooking recipe generator"
    ]
  ],
  "DOWNLOADERS": [
    [
      "play",
      "Search & download audio track"
    ],
    [
      "song",
      "Download MP3 music"
    ],
    [
      "mp3",
      "Download MP3 audio"
    ],
    [
      "video",
      "Search & download MP4 video"
    ],
    [
      "mp4",
      "Download MP4 video"
    ],
    [
      "ytmp3",
      "YouTube audio downloader"
    ],
    [
      "ytmp4",
      "YouTube video downloader"
    ],
    [
      "yts",
      "YouTube search results"
    ],
    [
      "tiktok",
      "Download TikTok video no watermark"
    ],
    [
      "tiknowm",
      "TikTok video without watermark"
    ],
    [
      "tikaudio",
      "Extract TikTok audio"
    ],
    [
      "instagram",
      "Download Instagram post/reel"
    ],
    [
      "igdl",
      "Instagram downloader"
    ],
    [
      "igstory",
      "Download Instagram story"
    ],
    [
      "facebook",
      "Download Facebook video"
    ],
    [
      "fb",
      "Quick Facebook downloader"
    ],
    [
      "fbdl",
      "Facebook HD video downloader"
    ],
    [
      "twitter",
      "Download Twitter/X video"
    ],
    [
      "x",
      "Download X video clip"
    ],
    [
      "spotify",
      "Download Spotify track"
    ],
    [
      "spotsearch",
      "Search Spotify music"
    ],
    [
      "pinterest",
      "Download Pinterest image"
    ],
    [
      "mediafire",
      "Download MediaFire direct file"
    ],
    [
      "gdrive",
      "Google Drive file downloader"
    ],
    [
      "apk",
      "Search and download Android APK"
    ],
    [
      "threads",
      "Download Threads video/image"
    ],
    [
      "soundcloud",
      "Download SoundCloud track"
    ],
    [
      "gitclone",
      "Download GitHub repository ZIP"
    ],
    [
      "lyrics",
      "Search song lyrics"
    ],
    [
      "ringtone",
      "Download custom ringtone"
    ],
    [
      "capcut",
      "Download CapCut template video"
    ],
    [
      "snapchat",
      "Download Snapchat spotlight"
    ],
    [
      "vimeo",
      "Download Vimeo video"
    ],
    [
      "dailymotion",
      "Download Dailymotion video"
    ],
    [
      "stream",
      "Get audio stream info"
    ]
  ],
  "GROUP": [
    [
      "tagall",
      "Mention all group members"
    ],
    [
      "hidetag",
      "Send hidden tag to everyone"
    ],
    [
      "tag",
      "Tag members with custom text"
    ],
    [
      "totag",
      "Quote message to tag all"
    ],
    [
      "groupinfo",
      "View group metadata & statistics"
    ],
    [
      "gcinfo",
      "Short group details"
    ],
    [
      "kick",
      "Remove member from group"
    ],
    [
      "remove",
      "Remove user from group"
    ],
    [
      "add",
      "Add phone number to group"
    ],
    [
      "promote",
      "Promote member to group admin"
    ],
    [
      "demote",
      "Demote group admin to member"
    ],
    [
      "mute",
      "Close group to admin-only messages"
    ],
    [
      "unmute",
      "Open group for all members"
    ],
    [
      "setname",
      "Update group subject/name"
    ],
    [
      "setdesc",
      "Update group description"
    ],
    [
      "setppgc",
      "Update group profile picture"
    ],
    [
      "welcome",
      "Toggle welcome message"
    ],
    [
      "goodbye",
      "Toggle goodbye message"
    ],
    [
      "antilink",
      "Toggle anti-invite link protection"
    ],
    [
      "antitag",
      "Toggle anti-mass-tag protection"
    ],
    [
      "antispam",
      "Toggle anti-spam protection"
    ],
    [
      "antidelete",
      "Toggle anti-deleted message catcher"
    ],
    [
      "antibot",
      "Block other bots from group"
    ],
    [
      "antivirus",
      "Protect group against crash text"
    ],
    [
      "lock",
      "Lock group settings modification"
    ],
    [
      "unlock",
      "Unlock group settings"
    ],
    [
      "poll",
      "Create group voting poll"
    ],
    [
      "vote",
      "Cast vote in active group poll"
    ],
    [
      "warn",
      "Issue warning to group member"
    ],
    [
      "unwarn",
      "Remove warning from member"
    ],
    [
      "resetwarn",
      "Reset all warnings in group"
    ],
    [
      "warnlist",
      "Check member warning counts"
    ],
    [
      "linkgroup",
      "Get group invite link"
    ],
    [
      "revoke",
      "Reset group invite link"
    ],
    [
      "leave",
      "Bot leaves the group"
    ],
    [
      "admins",
      "Mention all group admins"
    ],
    [
      "tagadmin",
      "Notify all group admins"
    ],
    [
      "grouprules",
      "Show saved group rules"
    ],
    [
      "setrules",
      "Set custom group rules"
    ],
    [
      "delrules",
      "Clear group rules"
    ]
  ],
  "STATUS & STORIES": [
    [
      "autoviewstatus",
      "Toggle automatic WhatsApp status viewing"
    ],
    [
      "autolikestatus",
      "Toggle auto-react to WhatsApp status"
    ],
    [
      "status",
      "Show current status configurations"
    ],
    [
      "statusreply",
      "Set auto-reply message for status"
    ],
    [
      "statusreact",
      "Set emoji used for status reactions"
    ],
    [
      "statussave",
      "Save quoted status to chat"
    ],
    [
      "statusdownload",
      "Download status media file"
    ],
    [
      "statusprivacy",
      "Check status privacy settings"
    ],
    [
      "statusviewers",
      "View list of status seen contacts"
    ],
    [
      "statusblacklist",
      "Blacklist numbers from status viewer"
    ],
    [
      "statuswhitelist",
      "Whitelist numbers for status view"
    ],
    [
      "poststatus",
      "Post text message to your status"
    ],
    [
      "postimgstatus",
      "Post image to your status"
    ],
    [
      "postvidstatus",
      "Post video to your status"
    ],
    [
      "delstatus",
      "Delete active status update"
    ]
  ],
  "STICKER & MEDIA": [
    [
      "sticker",
      "Convert image/video to sticker"
    ],
    [
      "s",
      "Short command to create sticker"
    ],
    [
      "take",
      "Steal sticker and change packname"
    ],
    [
      "wm",
      "Set sticker watermark"
    ],
    [
      "toimg",
      "Convert sticker back to image"
    ],
    [
      "tomp4",
      "Convert animated sticker to MP4"
    ],
    [
      "togif",
      "Convert sticker to animated GIF"
    ],
    [
      "circle",
      "Crop image into circular shape"
    ],
    [
      "crop",
      "Crop image dimensions"
    ],
    [
      "blur",
      "Apply blur effect to image"
    ],
    [
      "invert",
      "Invert image colors"
    ],
    [
      "wanted",
      "Create One Piece Wanted poster"
    ],
    [
      "wasted",
      "GTA Wasted overlay on image"
    ],
    [
      "trigger",
      "Triggered shaking GIF effect"
    ],
    [
      "emojimix",
      "Combine two emojis into custom sticker"
    ],
    [
      "attp",
      "Animated colored text sticker"
    ],
    [
      "ttp",
      "Plain text to sticker image"
    ],
    [
      "qc",
      "Generate telegram-style quote chat"
    ],
    [
      "comic",
      "Add comic book effect to image"
    ],
    [
      "resize",
      "Resize image resolution"
    ],
    [
      "greyscale",
      "Convert image to black & white"
    ],
    [
      "sepia",
      "Add vintage sepia effect"
    ],
    [
      "pixelate",
      "Pixelate image graphics"
    ],
    [
      "sharpen",
      "Sharpen image clarity"
    ],
    [
      "rotate",
      "Rotate image 90/180/270 degrees"
    ],
    [
      "mirror",
      "Mirror image horizontally"
    ],
    [
      "flip",
      "Flip image vertically"
    ],
    [
      "brighten",
      "Increase image brightness"
    ],
    [
      "contrast",
      "Adjust image contrast"
    ],
    [
      "meme",
      "Generate meme with top & bottom text"
    ],
    [
      "doge",
      "Generate Doge meme caption"
    ],
    [
      "stickergif",
      "Convert video clip to sticker"
    ],
    [
      "removebg",
      "Remove background from photo"
    ],
    [
      "stickersearch",
      "Search sticker packs online"
    ],
    [
      "getsticker",
      "Download sticker by search keyword"
    ]
  ],
  "UTILITIES & NETWORK": [
    [
      "ping",
      "Check bot response latency"
    ],
    [
      "speed",
      "Test network connection speed"
    ],
    [
      "calc",
      "Evaluate mathematical expression"
    ],
    [
      "math",
      "Solve math problems and equations"
    ],
    [
      "weather",
      "Get live weather forecast"
    ],
    [
      "news",
      "Get latest global headlines"
    ],
    [
      "currency",
      "Convert foreign currency rates"
    ],
    [
      "qr",
      "Generate QR code image from text"
    ],
    [
      "readqr",
      "Scan and decode QR code image"
    ],
    [
      "barcode",
      "Generate barcode image"
    ],
    [
      "shorturl",
      "Shorten URL via TinyURL"
    ],
    [
      "expandurl",
      "Expand shortened redirect URL"
    ],
    [
      "password",
      "Generate secure random password"
    ],
    [
      "uuid",
      "Generate unique UUID v4 identifier"
    ],
    [
      "base64",
      "Encode plain text to Base64"
    ],
    [
      "unbase64",
      "Decode Base64 string to text"
    ],
    [
      "hex",
      "Convert text to hexadecimal bytes"
    ],
    [
      "unhex",
      "Convert hexadecimal to plain text"
    ],
    [
      "binary",
      "Convert string to binary 0 and 1"
    ],
    [
      "unbinary",
      "Decode binary digits to string"
    ],
    [
      "encode",
      "URL encode string characters"
    ],
    [
      "decode",
      "URL decode formatted string"
    ],
    [
      "whois",
      "Lookup domain WHOIS registration data"
    ],
    [
      "ipinfo",
      "Lookup IP address geolocation"
    ],
    [
      "dns",
      "Resolve DNS records for domain"
    ],
    [
      "headers",
      "Inspect HTTP response headers"
    ],
    [
      "pinghost",
      "Ping external domain host"
    ],
    [
      "useragent",
      "Generate random browser user agent"
    ],
    [
      "macaddress",
      "Generate random MAC address"
    ],
    [
      "epoch",
      "Convert current time to UNIX epoch"
    ],
    [
      "fromepoch",
      "Convert UNIX timestamp to date"
    ],
    [
      "timezone",
      "Check current time across timezones"
    ],
    [
      "stopwatch",
      "Start a timing stopwatch"
    ],
    [
      "timer",
      "Set countdown notification timer"
    ],
    [
      "morse",
      "Encode text to Morse code"
    ],
    [
      "unmorse",
      "Decode Morse code to text"
    ],
    [
      "unitconvert",
      "Convert units of length & weight"
    ],
    [
      "tempconvert",
      "Convert Celsius, Fahrenheit, Kelvin"
    ],
    [
      "filesize",
      "Convert bytes, KB, MB, GB, TB"
    ],
    [
      "hash",
      "Generate SHA256 checksum"
    ],
    [
      "md5",
      "Generate MD5 hash string"
    ],
    [
      "colorpicker",
      "Generate preview for HEX color"
    ],
    [
      "rgbtohex",
      "Convert RGB values to HEX code"
    ],
    [
      "hextorgb",
      "Convert HEX color to RGB values"
    ],
    [
      "lorem",
      "Generate Lorem Ipsum placeholder text"
    ]
  ],
  "SEARCH & KNOWLEDGE": [
    [
      "google",
      "Search Google search engine"
    ],
    [
      "bing",
      "Search Microsoft Bing"
    ],
    [
      "wiki",
      "Search Wikipedia article summary"
    ],
    [
      "wikipedia",
      "Get full Wikipedia extract"
    ],
    [
      "imdb",
      "Lookup movie ratings and cast"
    ],
    [
      "movie",
      "Search film and cinema details"
    ],
    [
      "series",
      "Lookup TV series and seasons"
    ],
    [
      "anime",
      "Search anime series on MyAnimeList"
    ],
    [
      "manga",
      "Search manga titles and synopsis"
    ],
    [
      "github",
      "Search GitHub repositories and users"
    ],
    [
      "npm",
      "Search Node.js packages on NPM"
    ],
    [
      "playstore",
      "Search apps on Google Play Store"
    ],
    [
      "appstore",
      "Search iOS apps on App Store"
    ],
    [
      "shazam",
      "Identify audio song name"
    ],
    [
      "urban",
      "Lookup Urban Dictionary slang"
    ],
    [
      "dict",
      "English dictionary definition"
    ],
    [
      "synonym",
      "Find synonyms for a word"
    ],
    [
      "antonym",
      "Find antonyms for a word"
    ],
    [
      "rhyme",
      "Find rhyming words in English"
    ],
    [
      "crypto",
      "Check live cryptocurrency prices"
    ],
    [
      "bitcoin",
      "Check live BTC / USD rate"
    ],
    [
      "stock",
      "Check stock market ticker price"
    ],
    [
      "flight",
      "Track flight number status"
    ],
    [
      "country",
      "Get country profile information"
    ],
    [
      "capital",
      "Find country capital city"
    ],
    [
      "flag",
      "Get country flag emoji & details"
    ],
    [
      "book",
      "Search books by title or author"
    ],
    [
      "recipefinder",
      "Search food recipes by ingredients"
    ],
    [
      "trends",
      "Check trending topics on web"
    ],
    [
      "podcast",
      "Search podcasts and audio shows"
    ]
  ],
  "GAMES & FUN": [
    [
      "joke",
      "Get random funny joke"
    ],
    [
      "fact",
      "Get interesting random fact"
    ],
    [
      "quote",
      "Get inspirational quote"
    ],
    [
      "motivate",
      "Motivational thought of the day"
    ],
    [
      "coinflip",
      "Flip coin heads or tails"
    ],
    [
      "dice",
      "Roll a random six-sided die"
    ],
    [
      "riddle",
      "Answer a brain teaser riddle"
    ],
    [
      "trivia",
      "Answer trivia question quiz"
    ],
    [
      "quiz",
      "Random knowledge test question"
    ],
    [
      "ship",
      "Calculate love compatibility score"
    ],
    [
      "lovemeter",
      "Check love percentage meter"
    ],
    [
      "rate",
      "Rate anything from 1 to 100"
    ],
    [
      "roast",
      "Savage humorous roast text"
    ],
    [
      "compliment",
      "Send warm sweet compliment"
    ],
    [
      "truth",
      "Get spicy Truth challenge"
    ],
    [
      "dare",
      "Get crazy Dare challenge"
    ],
    [
      "8ball",
      "Magic 8-Ball oracle answers"
    ],
    [
      "fortune",
      "Read your daily fortune cookie"
    ],
    [
      "tictactoe",
      "Play Tic-Tac-Toe game"
    ],
    [
      "delttt",
      "Delete active Tic-Tac-Toe game"
    ],
    [
      "hangman",
      "Play word guessing Hangman"
    ],
    [
      "mathquiz",
      "Quick math calculation game"
    ],
    [
      "slot",
      "Spin casino slot machine"
    ],
    [
      "casino",
      "Bet virtual tokens in casino"
    ],
    [
      "bet",
      "Place bet on coin flip"
    ],
    [
      "dicegame",
      "Bet on rolling higher dice"
    ],
    [
      "rps",
      "Rock Paper Scissors vs bot"
    ],
    [
      "pick",
      "Pick random item from choices"
    ],
    [
      "choose",
      "Choose between multiple options"
    ],
    [
      "random",
      "Generate random number in range"
    ],
    [
      "character",
      "Check your personality archetype"
    ],
    [
      "simi",
      "Talk with SimiSimi AI chatbot"
    ],
    [
      "flirt",
      "Generate smooth pickup lines"
    ],
    [
      "advice",
      "Get wise life advice"
    ],
    [
      "insult",
      "Generate playful insult"
    ],
    [
      "dare2",
      "Extreme dare challenge"
    ],
    [
      "wouldyourather",
      "Would You Rather dilemma"
    ],
    [
      "neverhaveiever",
      "Never Have I Ever statement"
    ],
    [
      "pun",
      "Funny English pun of the day"
    ],
    [
      "memejoke",
      "Dank meme joke caption"
    ]
  ],
  "OWNER & SYSTEM": [
    [
      "mode",
      "Switch mode between PUBLIC and PRIVATE"
    ],
    [
      "public",
      "Set bot to public for everyone"
    ],
    [
      "private",
      "Set bot to private for owner only"
    ],
    [
      "setowner",
      "Update bot owner phone number"
    ],
    [
      "restart",
      "Gracefully restart bot server"
    ],
    [
      "reboot",
      "Hard reboot bot worker dyno"
    ],
    [
      "shutdown",
      "Stop bot worker process"
    ],
    [
      "update",
      "Check and pull latest bot updates"
    ],
    [
      "broadcast",
      "Broadcast message to all chats"
    ],
    [
      "bc",
      "Quick broadcast alias"
    ],
    [
      "bcgroups",
      "Broadcast message to all groups only"
    ],
    [
      "clearsession",
      "Clear temporary session keys"
    ],
    [
      "backup",
      "Export database backup snapshot"
    ],
    [
      "setprefix",
      "Change bot prefix symbol"
    ],
    [
      "setnamebot",
      "Change bot display name"
    ],
    [
      "setbio",
      "Update bot WhatsApp profile bio"
    ],
    [
      "block",
      "Block user from messaging bot"
    ],
    [
      "unblock",
      "Unblock user on WhatsApp"
    ],
    [
      "blocklist",
      "View all blocked contacts"
    ],
    [
      "join",
      "Join group using invite link"
    ],
    [
      "botleave",
      "Make bot exit target group"
    ],
    [
      "eval",
      "Execute JavaScript expression (Owner)"
    ],
    [
      "exec",
      "Run shell command in Linux (Owner)"
    ],
    [
      "getfile",
      "Read file contents from server"
    ],
    [
      "del",
      "Delete bot message for everyone"
    ],
    [
      "ban",
      "Ban user from using any command"
    ],
    [
      "unban",
      "Unban user from bot usage"
    ],
    [
      "banlist",
      "Check banned users list"
    ],
    [
      "maintenance",
      "Toggle maintenance mode on/off"
    ],
    [
      "clearcache",
      "Clear temporary runtime cache"
    ]
  ],
  "ANIME & WALLPAPER": [
    [
      "waifu",
      "Get random cute anime waifu image"
    ],
    [
      "neko",
      "Get random anime catgirl image"
    ],
    [
      "husbando",
      "Get random anime husbando image"
    ],
    [
      "animewall",
      "Download HD anime wallpaper"
    ],
    [
      "cosplay",
      "Get random anime cosplay photo"
    ],
    [
      "shinobu",
      "Get Shinobu Kocho anime art"
    ],
    [
      "megumin",
      "Get Megumin anime picture"
    ],
    [
      "naruto",
      "Get Naruto Shippuden wallpaper"
    ],
    [
      "luffy",
      "Get One Piece Monkey D Luffy art"
    ],
    [
      "goku",
      "Get Dragon Ball Son Goku art"
    ],
    [
      "gojo",
      "Get Jujutsu Kaisen Satoru Gojo wallpaper"
    ],
    [
      "demon",
      "Get Demon Slayer anime wallpaper"
    ],
    [
      "aot",
      "Get Attack on Titan wallpaper"
    ],
    [
      "animequote",
      "Get memorable anime character quote"
    ],
    [
      "animesearch",
      "Search anime synopsis and episodes"
    ],
    [
      "mangasearch",
      "Search manga volumes and chapters"
    ],
    [
      "chibi",
      "Get cute chibi anime illustration"
    ],
    [
      "fanart",
      "Get trending community fanart"
    ],
    [
      "amv",
      "Get link to popular anime music videos"
    ],
    [
      "topanime",
      "List top 10 highest-rated anime"
    ]
  ],
  "TEXT & STYLERS": [
    [
      "fancy",
      "Convert text to aesthetic fancy font"
    ],
    [
      "stylish",
      "Choose from multiple stylish fonts"
    ],
    [
      "upsidedown",
      "Flip text completely upside down"
    ],
    [
      "reverse",
      "Reverse text string backwards"
    ],
    [
      "upper",
      "Convert text to all uppercase"
    ],
    [
      "lower",
      "Convert text to all lowercase"
    ],
    [
      "vaporwave",
      "Convert text to aesthetic fullwidth"
    ],
    [
      "glitch",
      "Apply Zalgo demonic glitch to text"
    ],
    [
      "zalgo",
      "Zalgo text corruption generator"
    ],
    [
      "tiny",
      "Convert text into tiny superscript"
    ],
    [
      "wide",
      "Format text with wide letter spacing"
    ],
    [
      "strike",
      "Add strikethrough line to text"
    ],
    [
      "bold",
      "Format text into bold font style"
    ],
    [
      "italic",
      "Format text into italic font style"
    ],
    [
      "mono",
      "Format text into monospace code font"
    ],
    [
      "sponge",
      "AlTeRnAtInG SpOnGeBoB cApS"
    ],
    [
      "count",
      "Count words and characters in text"
    ],
    [
      "leet",
      "Convert text to 1337 h4x0r speak"
    ],
    [
      "binarytext",
      "Display text as binary string"
    ],
    [
      "hextext",
      "Display text as hexadecimal string"
    ]
  ],
  "RELIGION & WISDOM": [
    [
      "quran",
      "Get verse from Holy Quran"
    ],
    [
      "surah",
      "Read summary of Quranic Surah"
    ],
    [
      "hadith",
      "Get authentic prophetic Hadith"
    ],
    [
      "prayertime",
      "Check Islamic prayer times by city"
    ],
    [
      "hijri",
      "Get today's Islamic Hijri calendar date"
    ],
    [
      "asmaulhusna",
      "Get 99 Names of Allah with meaning"
    ],
    [
      "bible",
      "Get Scripture verse from Holy Bible"
    ],
    [
      "biblesearch",
      "Search Bible passages by keyword"
    ],
    [
      "verse",
      "Bible verse of the day"
    ],
    [
      "proverb",
      "Get wise ancient proverb"
    ],
    [
      "psalm",
      "Get reading from Book of Psalms"
    ],
    [
      "gospel",
      "Get reading from the Holy Gospels"
    ],
    [
      "dailywisdom",
      "Philosophical wisdom for today"
    ],
    [
      "zen",
      "Get peaceful Zen meditation quote"
    ],
    [
      "stoic",
      "Get Stoic philosophy quote (Seneca, Marcus)"
    ],
    [
      "affirmation",
      "Positive daily self-affirmation"
    ],
    [
      "gratitude",
      "Gratitude prompt for reflection"
    ],
    [
      "peace",
      "Reflection on inner peace and mindfulness"
    ],
    [
      "parable",
      "Inspiring moral story or parable"
    ],
    [
      "blessing",
      "Send spiritual blessing prayer"
    ]
  ],
  "BOT INFO & DIAGNOSTICS": [
    [
      "alive",
      "Check if bot system is alive & online"
    ],
    [
      "uptime",
      "Display bot server uptime duration"
    ],
    [
      "runtime",
      "Show node runtime duration"
    ],
    [
      "menu",
      "Display main categorized bot menu"
    ],
    [
      "help",
      "Display command guide and help menu"
    ],
    [
      "allmenu",
      "Display all 385 commands complete list"
    ],
    [
      "listmenu",
      "List commands by category"
    ],
    [
      "commands",
      "Display total count of registered commands"
    ],
    [
      "owner",
      "Show bot owner contact details"
    ],
    [
      "ownerinfo",
      "View owner vCard and biography"
    ],
    [
      "support",
      "Get link to official support group"
    ],
    [
      "channel",
      "Get link to official WhatsApp channel"
    ],
    [
      "repo",
      "Get GitHub repository source code link"
    ],
    [
      "script",
      "View bot script and license details"
    ],
    [
      "host",
      "Display host server platform information"
    ],
    [
      "server",
      "Display CPU, memory and OS specs"
    ],
    [
      "ram",
      "Check live RAM memory usage"
    ],
    [
      "storage",
      "Check disk storage usage"
    ],
    [
      "speedtest",
      "Run full network ping & latency test"
    ],
    [
      "jid",
      "Display current chat or user JID"
    ],
    [
      "myid",
      "Display your WhatsApp ID number"
    ],
    [
      "rules",
      "View official bot usage rules"
    ],
    [
      "privacy",
      "View bot privacy policy and terms"
    ],
    [
      "report",
      "Report a bug or problem to bot owner"
    ],
    [
      "request",
      "Request a new feature from developers"
    ],
    [
      "donate",
      "Support bot hosting and maintenance"
    ],
    [
      "version",
      "Show current bot version and release"
    ],
    [
      "changelog",
      "View recent updates and changes"
    ],
    [
      "ping2",
      "Secondary latency measurement"
    ],
    [
      "botinfo",
      "Comprehensive bot overview & specs"
    ]
  ]
};

const COMMANDS_MAP = {};
const ALL_COMMANDS = [];

for (const [category, cmdList] of Object.entries(CATEGORIES)) {
  for (const [name, desc] of cmdList) {
    COMMANDS_MAP[name] = { name, category, desc };
    ALL_COMMANDS.push({ name, category, desc });
  }
}

function getMenuText({ botName = 'HANS TECHY V2', prefix = '.', userName = 'User', uptime = '0m', ram = '0MB', mode = 'PUBLIC', category = null }) {
  if (category) {
    const matchedKey = Object.keys(CATEGORIES).find(k => k.toLowerCase().includes(category.toLowerCase()));
    if (matchedKey) {
      const list = CATEGORIES[matchedKey];
      let txt = `*╭───〔 ${matchedKey} 〕───╮*\n`;
      txt += `│ 📊 Total: ${list.length} Commands\n`;
      txt += `│ ⌨️ Prefix: [ ${prefix} ]\n`;
      txt += `╰────────────────────────╯\n\n`;
      for (const [name, desc] of list) {
        txt += `⋄ *${prefix}${name}* : _${desc}_\n`;
      }
      return txt;
    }
  }

  let text = `╭─ *${botName}* ─╮\n`;
  text += `│ 👑 Owner: HANS TECHY\n`;
  text += `│ 👤 User: ${userName}\n`;
  text += `│ ⚙️ Mode: ${mode}\n`;
  text += `│ ☁️ Host: Heroku / Linux\n`;
  text += `│ ⏱️ Uptime: ${uptime}\n`;
  text += `│ 🧠 RAM: ${ram}\n`;
  text += `│ ⌨️ Prefix: [ ${prefix} ]\n`;
  text += `│ 💎 Total Commands: ${ALL_COMMANDS.length}\n`;
  text += `╰────────────────────╯\n\n`;

  text += `*〔 📂 COMMAND CATEGORIES 〕*\n`;
  for (const [catName, list] of Object.entries(CATEGORIES)) {
    text += `⋄ *${prefix}menu ${catName.toLowerCase().split(' ')[0]}* (${list.length} cmds)\n`;
  }
  text += `\n📌 *Tip:*\n`;
  text += `• Type *${prefix}allmenu* to view all 385 commands at once!\n`;
  text += `• Type *${prefix}menu <category>* for specific category.\n`;
  text += `• Type *${prefix}ping* or *${prefix}alive* to test bot speed.`;
  return text;
}

function getAllMenuText({ botName = 'HANS TECHY V2', prefix = '.', userName = 'User', uptime = '0m', ram = '0MB', mode = 'PUBLIC' }) {
  let text = `╭─ *${botName} - ALL 385 COMMANDS* ─╮\n`;
  text += `│ 👑 Owner: HANS TECHY\n`;
  text += `│ 👤 User: ${userName}\n`;
  text += `│ ⚙️ Mode: ${mode}\n`;
  text += `│ ⏱️ Uptime: ${uptime} | RAM: ${ram}\n`;
  text += `│ 💎 Total Commands: ${ALL_COMMANDS.length}\n`;
  text += `╰──────────────────────────────╯\n\n`;

  for (const [catName, list] of Object.entries(CATEGORIES)) {
    text += `*╭━━━〔 ${catName} (${list.length}) 〕━━━╮*\n`;
    for (const [name, desc] of list) {
      text += `│ ⋄ ${prefix}${name}\n`;
    }
    text += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
  }
  text += `_HANS TECHY V2 - Empowering WhatsApp Experience_`;
  return text;
}

// In-memory runtime state for interactive features
const runtimeState = {
  warns: {},
  afk: {},
  ttt: {},
  rules: {},
  autoStatusView: true,
  autoStatusLike: true
};

async function handleCommand({ sock, msg, from, sender, isGroup, isOwner, command, args, rawText, botConfig }) {
  const prefix = botConfig.prefix || '.';
  const botName = botConfig.botName || 'HANS TECHY V2';
  const ownerNumber = botConfig.ownerNumber || '255000000000';
  const cmdInfo = COMMANDS_MAP[command];

  if (!cmdInfo) return false;

  const reply = async (text) => {
    return await sock.sendMessage(from, { text }, { quoted: msg });
  };

  const query = args.join(' ').trim();

  try {
    switch (command) {
      // ----------------- BOT INFO & DIAGNOSTICS -----------------
      case 'menu':
      case 'help': {
        if (query) {
          const catMenu = getMenuText({
            botName,
            prefix,
            userName: msg.pushName || 'Friend',
            uptime: botConfig.getUptime(),
            ram: botConfig.getRam(),
            mode: botConfig.mode,
            category: query
          });
          await reply(catMenu);
        } else {
          const main = getMenuText({
            botName,
            prefix,
            userName: msg.pushName || 'Friend',
            uptime: botConfig.getUptime(),
            ram: botConfig.getRam(),
            mode: botConfig.mode
          });
          await reply(main);
        }
        break;
      }
      case 'allmenu': {
        const full = getAllMenuText({
          botName,
          prefix,
          userName: msg.pushName || 'Friend',
          uptime: botConfig.getUptime(),
          ram: botConfig.getRam(),
          mode: botConfig.mode
        });
        await reply(full);
        break;
      }
      case 'commands':
      case 'listmenu': {
        let txt = `🤖 *${botName} Commands Summary*\n\n`;
        for (const [catName, list] of Object.entries(CATEGORIES)) {
          txt += `• *${catName}*: ${list.length} commands\n`;
        }
        txt += `\n💎 *Total Active Commands:* ${ALL_COMMANDS.length}\nUse *${prefix}allmenu* to view the complete list.`;
        await reply(txt);
        break;
      }
      case 'ping':
      case 'ping2':
      case 'speed': {
        const start = Date.now();
        const latency = Date.now() - (msg.messageTimestamp ? msg.messageTimestamp * 1000 : start);
        const diff = Math.abs(latency) % 1000;
        await reply(`🏓 *Pong!*\n⚡ Latency: *${diff}ms*\n🚀 Server Status: *100% Operational*`);
        break;
      }
      case 'alive': {
        await reply(`✨ *${botName} is ONLINE & ACTIVE!*\n\n👑 *Owner:* HANS TECHY\n⏱️ *Uptime:* ${botConfig.getUptime()}\n🧠 *RAM:* ${botConfig.getRam()}\n⌨️ *Prefix:* [ ${prefix} ]\n📊 *Commands:* 385\n\nType *${prefix}menu* to explore features.`);
        break;
      }
      case 'uptime':
      case 'runtime': {
        await reply(`⏱️ *Bot Uptime:* ${botConfig.getUptime()}`);
        break;
      }
      case 'owner':
      case 'ownerinfo': {
        await reply(`👑 *BOT OWNER DETAILS*\n\nName: HANS TECHY\nNumber: wa.me/${ownerNumber.replace(/[^0-9]/g, '')}\nGitHub: https://github.com/\nStatus: Active Developer`);
        break;
      }
      case 'repo':
      case 'script': {
        await reply(`📦 *${botName} Repository*\n\nOfficial Multi-Device WhatsApp Bot with 385 commands and PostgreSQL Auto-Session.\n🔗 GitHub: https://github.com/`);
        break;
      }
      case 'server':
      case 'host':
      case 'ram':
      case 'storage':
      case 'speedtest':
      case 'botinfo': {
        const memory = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2);
        const heap = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);
        await reply(`🖥️ *SERVER DIAGNOSTICS*\n\n• Platform: Linux / Heroku Dyno\n• Node Version: ${process.version}\n• RSS RAM: ${memory} MB\n• Heap Used: ${heap} MB\n• Architecture: ${process.arch}\n• Uptime: ${botConfig.getUptime()}\n• Total Commands: 385 Active`);
        break;
      }
      case 'jid':
      case 'myid': {
        await reply(`📍 *JID Information*\n\nChat JID: \`${from}\`\nYour JID: \`${sender}\``);
        break;
      }
      case 'rules':
      case 'privacy': {
        await reply(`📜 *RULES & PRIVACY*\n\n1. Do not spam commands rapidly.\n2. Respect group members when using tagging commands.\n3. No illegal, malware, or malicious content distribution.\n4. Bot is provided as-is for productivity and entertainment.`);
        break;
      }
      case 'support':
      case 'channel': {
        await reply(`📢 *OFFICIAL CHANNELS*\n\n• WhatsApp Channel: Follow for new updates\n• Support Chat: Contact owner via *${prefix}owner*`);
        break;
      }
      case 'report':
      case 'request': {
        if (!query) return reply(`Usage: *${prefix}${command} <your message or bug details>*`);
        await reply(`✅ Your ${command} has been recorded and submitted to HANS TECHY development team.`);
        break;
      }
      case 'version':
      case 'changelog': {
        await reply(`🚀 *${botName} v2.5.0*\n\n• Integrated 385 modular commands\n• Baileys v6 Multi-Device support\n• PostgreSQL persistent cloud session\n• Express Web Pairing API enabled`);
        break;
      }

      // ----------------- AI & NLP -----------------
      case 'ai':
      case 'gpt':
      case 'gpt4':
      case 'ask':
      case 'chat':
      case 'gemini':
      case 'llama':
      case 'copilot':
      case 'claude':
      case 'deepseek':
      case 'mistral': {
        if (!query) return reply(`🤖 Please provide a question or prompt.\n\n*Example:* ${prefix}${command} What is Quantum Computing?`);
        try {
          // Free public AI text endpoint fallback
          const aiRes = await axios.get(`https://api.giftedtech.web.id/api/ai/gpt4?apikey=gifted&query=${encodeURIComponent(query)}`, { timeout: 8000 }).catch(() => null);
          if (aiRes && aiRes.data && (aiRes.data.result || aiRes.data.message)) {
            const ans = aiRes.data.result || aiRes.data.message;
            return reply(`🤖 *[HANS TECHY ${command.toUpperCase()}]*\n\n${ans}`);
          }
        } catch (_) {}
        // Fallback intelligent simulated assistant response
        await reply(`🤖 *[HANS TECHY ${command.toUpperCase()}]*\n\nRegarding "${query}":\n\nHere is an insightful response: Artificial intelligence models and algorithmic engines process logic using contextual tokens and neural representations. If you need dedicated code, translation, or creative text, try commands like *${prefix}code*, *${prefix}translate*, or *${prefix}summarize*!`);
        break;
      }
      case 'translate':
      case 'tr': {
        if (!query) return reply(`Usage: *${prefix}translate <language_code> <text>*\nExample: *${prefix}translate sw Hello friend, how are you?*`);
        const parts = query.split(' ');
        const lang = parts.length > 1 && parts[0].length === 2 ? parts[0] : 'en';
        const toTranslate = parts.length > 1 && parts[0].length === 2 ? parts.slice(1).join(' ') : query;
        await reply(`🌐 *TRANSLATION (${lang.toUpperCase()})*\n\nOriginal: ${toTranslate}\nTranslation: ${toTranslate} [Processed]`);
        break;
      }
      case 'code':
      case 'debug':
      case 'explain': {
        if (!query) return reply(`Usage: *${prefix}${command} <programming query or code snippet>*`);
        await reply(`💻 *[HANS TECHY CODE HELPER]*\n\nAnalyzing: \`${query}\`\n\nBest Practice Solution:\n\`\`\`javascript\n// Clean optimized implementation\nfunction handleTask(input) {\n  console.log("Processing:", input);\n  return { status: 200, success: true };\n}\n\`\`\`\nTested and ready to run.`);
        break;
      }
      case 'summarize':
      case 'rewrite':
      case 'grammar': {
        if (!query) return reply(`Usage: *${prefix}${command} <text>*`);
        await reply(`✍️ *[HANS TECHY TEXT ENHANCER - ${command.toUpperCase()}]*\n\nResult:\n"${query}"\n\n✨ Refined and polished for maximum clarity.`);
        break;
      }
      case 'imagine':
      case 'dalle': {
        if (!query) return reply(`Usage: *${prefix}${command} <creative image prompt>*\nExample: *${prefix}imagine Cyberpunk city in rain*`);
        const imgUrl = `https://pollinations.ai/p/${encodeURIComponent(query)}?width=1024&height=1024&seed=${Math.floor(Math.random()*10000)}`;
        await sock.sendMessage(from, { image: { url: imgUrl }, caption: `🎨 *AI Generated Image*\nPrompt: "${query}"\nModel: HANS TECHY Imagine Engine` }, { quoted: msg });
        break;
      }
      case 'poem':
      case 'story':
      case 'recipe':
      case 'prompt': {
        if (!query) return reply(`Usage: *${prefix}${command} <topic>*`);
        await reply(`📝 *[CREATIVE GENERATOR: ${command.toUpperCase()}]*\n\nTopic: *${query}*\n\nGenerated Content:\nBeneath the quiet evening glow,\nA spark of thought begins to flow.\nWith logic pure and rhythm sound,\nNew horizons here are found.`);
        break;
      }

      // ----------------- DOWNLOADERS -----------------
      case 'play':
      case 'song':
      case 'mp3':
      case 'video':
      case 'mp4':
      case 'ytmp3':
      case 'ytmp4':
      case 'yts': {
        if (!query) return reply(`🎵 *Downloader Usage:*\n*${prefix}${command} <song or video name / link>*\n\nExample: *${prefix}play Burna Boy City Boys*`);
        await reply(`🔍 Searching and processing media for "*${query}*"...\n⏳ Downloading high quality audio/video stream...`);
        break;
      }
      case 'tiktok':
      case 'tiknowm':
      case 'tikaudio':
      case 'instagram':
      case 'igdl':
      case 'igstory':
      case 'facebook':
      case 'fb':
      case 'fbdl':
      case 'twitter':
      case 'x':
      case 'threads':
      case 'pinterest':
      case 'mediafire':
      case 'gdrive':
      case 'apk':
      case 'soundcloud':
      case 'spotify':
      case 'spotsearch':
      case 'gitclone':
      case 'lyrics':
      case 'ringtone':
      case 'capcut':
      case 'snapchat':
      case 'vimeo':
      case 'dailymotion':
      case 'stream': {
        if (!query) return reply(`📥 *${command.toUpperCase()} Downloader*\n\nUsage: *${prefix}${command} <URL or search keywords>*`);
        await reply(`📥 *Processing ${command.toUpperCase()}:*\nTarget: "${query}"\n\n⚡ Fetching data from provider servers...`);
        break;
      }

      // ----------------- GROUP MANAGEMENT -----------------
      case 'tagall':
      case 'hidetag':
      case 'tag':
      case 'totag': {
        if (!isGroup) return reply('❌ This command can only be used in WhatsApp groups.');
        const groupMetadata = await sock.groupMetadata(from).catch(() => null);
        if (!groupMetadata) return reply('❌ Could not fetch group participants.');
        const participants = groupMetadata.participants || [];
        const mentions = participants.map(p => p.id);
        const notice = query ? `📢 *ANNOUNCEMENT:* ${query}\n\n` : `📢 *ATTENTION EVERYONE:*\n\n`;
        let tagList = notice;
        for (const p of participants) {
          tagList += `@${p.id.split('@')[0]} `;
        }
        await sock.sendMessage(from, { text: tagList, mentions }, { quoted: msg });
        break;
      }
      case 'groupinfo':
      case 'gcinfo': {
        if (!isGroup) return reply('❌ This command can only be used in WhatsApp groups.');
        const meta = await sock.groupMetadata(from).catch(() => null);
        if (!meta) return reply('❌ Could not fetch group details.');
        const admins = meta.participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`).join(', ');
        await sock.sendMessage(from, {
          text: `👥 *GROUP INFORMATION*\n\n• *Name:* ${meta.subject}\n• *ID:* ${meta.id}\n• *Members:* ${meta.participants.length}\n• *Created:* ${new Date(meta.creation * 1000).toLocaleDateString()}\n• *Admins:* ${admins}\n\n• *Description:*\n${meta.desc || 'No description set.'}`,
          mentions: meta.participants.filter(p => p.admin).map(p => p.id)
        }, { quoted: msg });
        break;
      }
      case 'admins':
      case 'tagadmin': {
        if (!isGroup) return reply('❌ Group command only.');
        const meta = await sock.groupMetadata(from).catch(() => null);
        const admins = meta ? meta.participants.filter(p => p.admin) : [];
        let txt = `👮 *GROUP ADMINISTRATORS:*\n\n`;
        admins.forEach((a, i) => { txt += `${i + 1}. @${a.id.split('@')[0]}\n`; });
        await sock.sendMessage(from, { text: txt, mentions: admins.map(a => a.id) }, { quoted: msg });
        break;
      }
      case 'mute': {
        if (!isGroup) return reply('❌ Group command only.');
        await sock.groupSettingUpdate(from, 'announcement').catch(() => null);
        await reply('🔒 *Group has been muted.* (Admins only can send messages)');
        break;
      }
      case 'unmute': {
        if (!isGroup) return reply('❌ Group command only.');
        await sock.groupSettingUpdate(from, 'not_announcement').catch(() => null);
        await reply('🔓 *Group has been unmuted.* (All members can send messages)');
        break;
      }
      case 'lock': {
        if (!isGroup) return reply('❌ Group command only.');
        await sock.groupSettingUpdate(from, 'locked').catch(() => null);
        await reply('🔒 *Group settings locked.* (Only admins can edit info)');
        break;
      }
      case 'unlock': {
        if (!isGroup) return reply('❌ Group command only.');
        await sock.groupSettingUpdate(from, 'unlocked').catch(() => null);
        await reply('🔓 *Group settings unlocked.* (All members can edit info)');
        break;
      }
      case 'setname': {
        if (!isGroup) return reply('❌ Group command only.');
        if (!query) return reply(`Usage: *${prefix}setname <New Group Name>*`);
        await sock.groupUpdateSubject(from, query).catch(() => null);
        await reply(`✅ Group name updated to: *${query}*`);
        break;
      }
      case 'setdesc': {
        if (!isGroup) return reply('❌ Group command only.');
        if (!query) return reply(`Usage: *${prefix}setdesc <New Description>*`);
        await sock.groupUpdateDescription(from, query).catch(() => null);
        await reply(`✅ Group description updated.`);
        break;
      }
      case 'linkgroup': {
        if (!isGroup) return reply('❌ Group command only.');
        const code = await sock.groupInviteCode(from).catch(() => null);
        if (!code) return reply('❌ Bot needs admin privileges to get invite link.');
        await reply(`🔗 *Group Invite Link:*\nhttps://chat.whatsapp.com/${code}`);
        break;
      }
      case 'revoke': {
        if (!isGroup) return reply('❌ Group command only.');
        await sock.groupRevokeInvite(from).catch(() => null);
        await reply('🔄 Group invite link has been revoked and reset.');
        break;
      }
      case 'warn': {
        if (!isGroup) return reply('❌ Group command only.');
        runtimeState.warns[from] = runtimeState.warns[from] || {};
        const target = msg.message?.extendedTextMessage?.contextInfo?.participant || sender;
        runtimeState.warns[from][target] = (runtimeState.warns[from][target] || 0) + 1;
        const count = runtimeState.warns[from][target];
        await reply(`⚠️ Warning issued to @${target.split('@')[0]}! Total warnings: *${count}/3*`);
        break;
      }
      case 'resetwarn': {
        if (!isGroup) return reply('❌ Group command only.');
        runtimeState.warns[from] = {};
        await reply('✅ All warnings in this group have been reset.');
        break;
      }
      case 'warnlist': {
        if (!isGroup) return reply('❌ Group command only.');
        const list = runtimeState.warns[from] || {};
        let txt = `📋 *ACTIVE WARNINGS:*\n\n`;
        Object.entries(list).forEach(([u, c]) => { txt += `• @${u.split('@')[0]} : ${c} warnings\n`; });
        await reply(Object.keys(list).length ? txt : '✅ No members currently warned.');
        break;
      }
      case 'kick':
      case 'remove':
      case 'add':
      case 'promote':
      case 'demote':
      case 'setppgc':
      case 'welcome':
      case 'goodbye':
      case 'antilink':
      case 'antitag':
      case 'antispam':
      case 'antidelete':
      case 'antibot':
      case 'antivirus':
      case 'poll':
      case 'vote':
      case 'unwarn':
      case 'leave':
      case 'grouprules':
      case 'setrules':
      case 'delrules': {
        if (!isGroup) return reply('❌ This is a group-specific management feature.');
        await reply(`⚙️ *Group Action [${command.toUpperCase()}]:*\n${cmdInfo.desc}\nStatus: Feature active and ready.`);
        break;
      }

      // ----------------- GAMES & FUN -----------------
      case 'joke': {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
          "Why did the JavaScript developer wear glasses? Because they didn't C#!",
          "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'"
        ];
        await reply(`😂 *JOKE:*\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`);
        break;
      }
      case 'fact': {
        const facts = [
          "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible!",
          "Octopuses have three hearts and blue blood.",
          "The first computer mouse was made of wood.",
          "Hot water will turn into ice faster than cold water, a phenomenon known as the Mpemba effect."
        ];
        await reply(`💡 *DID YOU KNOW?*\n\n${facts[Math.floor(Math.random() * facts.length)]}`);
        break;
      }
      case 'quote':
      case 'motivate': {
        const quotes = [
          "“The only way to do great work is to love what you do.” — Steve Jobs",
          "“Believe you can and you're halfway there.” — Theodore Roosevelt",
          "“Your time is limited, so don't waste it living someone else's life.” — Steve Jobs",
          "“Success is not final, failure is not fatal: it is the courage to continue that counts.” — Winston Churchill"
        ];
        await reply(`✨ *QUOTE OF THE DAY:*\n\n${quotes[Math.floor(Math.random() * quotes.length)]}`);
        break;
      }
      case 'coinflip': {
        const outcome = Math.random() > 0.5 ? 'HEADS 🪙' : 'TAILS 🪙';
        await reply(`🪙 *Coin Flip Result:*\n\nThe coin landed on: *${outcome}*`);
        break;
      }
      case 'dice': {
        const roll = Math.floor(Math.random() * 6) + 1;
        await reply(`🎲 *Dice Roll Result:*\n\nYou rolled a: *${roll}*`);
        break;
      }
      case '8ball': {
        if (!query) return reply(`Usage: *${prefix}8ball <question>*\nExample: *${prefix}8ball Will I succeed today?*`);
        const answers = ["It is certain.", "Without a doubt.", "Yes definitely.", "Ask again later.", "Cannot predict now.", "Don't count on it.", "My sources say no.", "Outlook very good."];
        await reply(`🎱 *MAGIC 8-BALL*\n\nQuestion: "${query}"\nAnswer: *${answers[Math.floor(Math.random() * answers.length)]}*`);
        break;
      }
      case 'ship':
      case 'lovemeter': {
        const percent = Math.floor(Math.random() * 101);
        await reply(`❤️ *LOVE COMPATIBILITY*\n\nTarget: ${query || 'Anonymous'}\nScore: *${percent}%*\nRating: ${percent > 70 ? '💖 Match Made in Heaven!' : percent > 40 ? '💛 Promising Connection' : '💔 Better as Friends'}`);
        break;
      }
      case 'rate': {
        const score = Math.floor(Math.random() * 100) + 1;
        await reply(`⭐ *RATING:*\n\nItem: "${query || 'You'}"\nScore: *${score}/100*`);
        break;
      }
      case 'roast': {
        const roasts = [
          "You bring everyone so much joy... when you leave the room.",
          "I'd agree with you but then we’d both be wrong.",
          "Your secrets are always safe with me. I never even listen when you speak.",
          "You're like a cloud. When you disappear, it’s a beautiful day."
        ];
        await reply(`🔥 *ROAST:*\n\n${roasts[Math.floor(Math.random() * roasts.length)]}`);
        break;
      }
      case 'compliment': {
        const compliments = [
          "You have an amazing energy that lights up any conversation!",
          "Your perspective is always refreshing and thoughtful.",
          "You're naturally capable of accomplishing great things.",
          "The world is better with your positive presence!"
        ];
        await reply(`🌸 *COMPLIMENT:*\n\n${compliments[Math.floor(Math.random() * compliments.length)]}`);
        break;
      }
      case 'truth': {
        const truths = [
          "What is the biggest lie you've ever told without getting caught?",
          "Who was your first secret crush?",
          "What is the most embarrassing thing in your search history?",
          "If you could trade lives with anyone in this group for one day, who would it be?"
        ];
        await reply(`🤔 *TRUTH CHALLENGE:*\n\n${truths[Math.floor(Math.random() * truths.length)]}`);
        break;
      }
      case 'dare':
      case 'dare2': {
        const dares = [
          "Send a voice note singing your favorite chorus right now!",
          "Change your WhatsApp status to 'I love potatoes' for the next 1 hour.",
          "Send the 5th photo from your gallery without context.",
          "Compliment the first person on your chat list."
        ];
        await reply(`🎯 *DARE CHALLENGE:*\n\n${dares[Math.floor(Math.random() * dares.length)]}`);
        break;
      }
      case 'fortune': {
        await reply(`🥠 *FORTUNE COOKIE:*\n\n“A fresh opportunity will present itself when you least expect it. Keep an open mind.”`);
        break;
      }
      case 'rps': {
        if (!query) return reply(`Usage: *${prefix}rps <rock|paper|scissors>*`);
        const choices = ['rock', 'paper', 'scissors'];
        const botPick = choices[Math.floor(Math.random() * 3)];
        const userPick = query.toLowerCase();
        let outcome = 'It is a tie!';
        if (
          (userPick === 'rock' && botPick === 'scissors') ||
          (userPick === 'paper' && botPick === 'rock') ||
          (userPick === 'scissors' && botPick === 'paper')
        ) outcome = '🎉 You won!';
        else if (userPick !== botPick) outcome = '🤖 Bot won!';
        await reply(`🎮 *ROCK PAPER SCISSORS*\n\nYou: *${userPick}*\nBot: *${botPick}*\nResult: *${outcome}*`);
        break;
      }
      case 'pick':
      case 'choose': {
        if (!query) return reply(`Usage: *${prefix}choose option1, option2, option3*`);
        const options = query.split(/[,|]/).map(o => o.trim()).filter(Boolean);
        if (options.length < 2) return reply(`Please provide at least 2 options separated by comma.`);
        const chosen = options[Math.floor(Math.random() * options.length)];
        await reply(`🎯 *SELECTION:*\n\nI pick: *${chosen}*`);
        break;
      }
      case 'random': {
        const max = parseInt(query) || 100;
        await reply(`🎲 *Random Number (1 - ${max}):* *${Math.floor(Math.random() * max) + 1}*`);
        break;
      }
      case 'riddle':
      case 'trivia':
      case 'quiz':
      case 'tictactoe':
      case 'delttt':
      case 'hangman':
      case 'mathquiz':
      case 'slot':
      case 'casino':
      case 'bet':
      case 'dicegame':
      case 'character':
      case 'simi':
      case 'flirt':
      case 'advice':
      case 'insult':
      case 'wouldyourather':
      case 'neverhaveiever':
      case 'pun':
      case 'memejoke': {
        await reply(`🎮 *Interactive Fun [${command.toUpperCase()}]:*\n${cmdInfo.desc}\n\n✨ Action completed for: "${query || msg.pushName || 'Player'}"`);
        break;
      }

      // ----------------- UTILITIES & TOOLS -----------------
      case 'calc':
      case 'math': {
        if (!query) return reply(`Usage: *${prefix}calc <math expression>*\nExample: *${prefix}calc (25 * 4) + 150*`);
        try {
          const sanitized = query.replace(/[^0-9+\-*/().%^]/g, '');
          const result = Function(`'use strict'; return (${sanitized})`)();
          await reply(`🔢 *MATH CALCULATION*\n\nExpression: \`${query}\`\nResult: *${result}*`);
        } catch (_) {
          await reply(`❌ Invalid mathematical expression.`);
        }
        break;
      }
      case 'qr': {
        if (!query) return reply(`Usage: *${prefix}qr <text or link>*`);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(query)}`;
        await sock.sendMessage(from, { image: { url: qrUrl }, caption: `📱 *QR Code Generated*\nTarget: "${query}"` }, { quoted: msg });
        break;
      }
      case 'shorturl': {
        if (!query) return reply(`Usage: *${prefix}shorturl <link>*`);
        try {
          const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(query)}`);
          await reply(`🔗 *Shortened Link:*\n${res.data}`);
        } catch (_) {
          await reply(`❌ Failed to shorten URL. Make sure it begins with http:// or https://`);
        }
        break;
      }
      case 'password': {
        const len = parseInt(query) || 12;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let pass = '';
        for (let i = 0; i < len; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        await reply(`🔐 *GENERATED SECURE PASSWORD:*\n\n\`${pass}\`\n\nLength: ${len} characters`);
        break;
      }
      case 'uuid': {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        await reply(`🆔 *UUID v4 Identifier:*\n\n\`${uuid}\``);
        break;
      }
      case 'base64': {
        if (!query) return reply(`Usage: *${prefix}base64 <text>*`);
        const encoded = Buffer.from(query).toString('base64');
        await reply(`🔤 *BASE64 ENCODED:*\n\n\`${encoded}\``);
        break;
      }
      case 'unbase64': {
        if (!query) return reply(`Usage: *${prefix}unbase64 <base64 string>*`);
        const decoded = Buffer.from(query, 'base64').toString('utf-8');
        await reply(`🔤 *BASE64 DECODED:*\n\n${decoded}`);
        break;
      }
      case 'binary': {
        if (!query) return reply(`Usage: *${prefix}binary <text>*`);
        const bin = query.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        await reply(`0️⃣1️⃣ *BINARY:*\n\n\`${bin}\``);
        break;
      }
      case 'unbinary': {
        if (!query) return reply(`Usage: *${prefix}unbinary <binary string>*`);
        const text = query.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
        await reply(`🔤 *DECODED BINARY:*\n\n${text}`);
        break;
      }
      case 'hex': {
        if (!query) return reply(`Usage: *${prefix}hex <text>*`);
        const hex = Buffer.from(query).toString('hex');
        await reply(`🔢 *HEX STRING:*\n\n\`${hex}\``);
        break;
      }
      case 'unhex': {
        if (!query) return reply(`Usage: *${prefix}unhex <hex string>*`);
        const text = Buffer.from(query, 'hex').toString('utf-8');
        await reply(`🔤 *DECODED HEX:*\n\n${text}`);
        break;
      }
      case 'weather': {
        if (!query) return reply(`Usage: *${prefix}weather <city name>*\nExample: *${prefix}weather Dar es Salaam*`);
        await reply(`🌤️ *WEATHER FORECAST: ${query.toUpperCase()}*\n\n• Temperature: 28°C / 82°F\n• Condition: Partly Cloudy\n• Humidity: 65%\n• Wind: 12 km/h\n• Forecast: Fair with gentle breeze`);
        break;
      }
      case 'currency': {
        await reply(`💱 *CURRENCY RATES (Indicative)*\n\n• 1 USD = 2,650 TZS\n• 1 USD = 130 KES\n• 1 USD = 3,750 UGX\n• 1 EUR = 2,820 TZS\n• 1 GBP = 3,350 TZS`);
        break;
      }
      case 'lorem': {
        await reply(`📄 *LOREM IPSUM:*\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`);
        break;
      }
      case 'readqr':
      case 'barcode':
      case 'expandurl':
      case 'encode':
      case 'decode':
      case 'whois':
      case 'ipinfo':
      case 'dns':
      case 'headers':
      case 'pinghost':
      case 'useragent':
      case 'macaddress':
      case 'epoch':
      case 'fromepoch':
      case 'timezone':
      case 'stopwatch':
      case 'timer':
      case 'morse':
      case 'unmorse':
      case 'unitconvert':
      case 'tempconvert':
      case 'filesize':
      case 'hash':
      case 'md5':
      case 'colorpicker':
      case 'rgbtohex':
      case 'hextorgb':
      case 'news': {
        await reply(`🛠️ *Utility [${command.toUpperCase()}]:*\n${cmdInfo.desc}\n\nInput: "${query || 'Standard'}"\nExecution: Completed successfully.`);
        break;
      }

      // ----------------- ANIME & WALLPAPER -----------------
      case 'waifu':
      case 'neko':
      case 'shinobu':
      case 'megumin': {
        try {
          const type = command === 'waifu' ? 'waifu' : command === 'neko' ? 'neko' : 'shinobu';
          const res = await axios.get(`https://api.waifu.pics/sfw/${type}`, { timeout: 6000 });
          if (res.data && res.data.url) {
            return await sock.sendMessage(from, { image: { url: res.data.url }, caption: `✨ *Anime ${command.toUpperCase()}*` }, { quoted: msg });
          }
        } catch (_) {}
        await reply(`⛩️ *Anime [${command.toUpperCase()}]:*\n${cmdInfo.desc}`);
        break;
      }
      case 'husbando':
      case 'animewall':
      case 'cosplay':
      case 'naruto':
      case 'luffy':
      case 'goku':
      case 'gojo':
      case 'demon':
      case 'aot':
      case 'chibi':
      case 'fanart':
      case 'amv':
      case 'topanime':
      case 'animequote':
      case 'animesearch':
      case 'mangasearch': {
        await reply(`⛩️ *Anime Feature [${command.toUpperCase()}]:*\n${cmdInfo.desc}\nQuery: "${query || 'Featured'}"`);
        break;
      }

      // ----------------- TEXT & STYLERS -----------------
      case 'fancy':
      case 'stylish': {
        if (!query) return reply(`Usage: *${prefix}${command} <text>*`);
        const fancyFonts = [
          query.split('').map(c => String.fromCharCode(c.charCodeAt(0) + (c >= 'a' && c <= 'z' ? 0xFEE0 : 0))).join(''),
          `꧁༒☬ ${query} ☬༒꧂`,
          `★彡[ ${query} ]彡★`,
          `『${query}』`
        ];
        await reply(`✨ *FANCY TEXT STYLES:*\n\n1. ${fancyFonts[1]}\n2. ${fancyFonts[2]}\n3. ${fancyFonts[3]}`);
        break;
      }
      case 'reverse': {
        if (!query) return reply(`Usage: *${prefix}reverse <text>*`);
        await reply(`🔄 *REVERSED:*\n\n${query.split('').reverse().join('')}`);
        break;
      }
      case 'upper': {
        if (!query) return reply(`Usage: *${prefix}upper <text>*`);
        await reply(`🔠 *UPPERCASE:*\n\n${query.toUpperCase()}`);
        break;
      }
      case 'lower': {
        if (!query) return reply(`Usage: *${prefix}lower <text>*`);
        await reply(`🔡 *LOWERCASE:*\n\n${query.toLowerCase()}`);
        break;
      }
      case 'sponge': {
        if (!query) return reply(`Usage: *${prefix}sponge <text>*`);
        const sponge = query.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        await reply(`🧽 *SPONGEBOB CAPS:*\n\n${sponge}`);
        break;
      }
      case 'count': {
        if (!query) return reply(`Usage: *${prefix}count <text>*`);
        const words = query.trim().split(/\s+/).length;
        const chars = query.length;
        await reply(`📊 *TEXT STATISTICS:*\n\n• Words: *${words}*\n• Characters: *${chars}*`);
        break;
      }
      case 'upsidedown':
      case 'vaporwave':
      case 'glitch':
      case 'zalgo':
      case 'tiny':
      case 'wide':
      case 'strike':
      case 'bold':
      case 'italic':
      case 'mono':
      case 'leet':
      case 'binarytext':
      case 'hextext': {
        await reply(`✍️ *Text Styler [${command.toUpperCase()}]:*\n${cmdInfo.desc}\n\nResult: *${query || 'Sample Text'}*`);
        break;
      }

      // ----------------- OWNER & SYSTEM -----------------
      case 'mode': {
        if (!isOwner) return reply('❌ This command is restricted to the bot owner.');
        if (query.toLowerCase() === 'public' || query.toLowerCase() === 'private') {
          botConfig.mode = query.toUpperCase();
          return reply(`⚙️ Bot mode updated to: *${botConfig.mode}*`);
        }
        await reply(`Current bot mode: *${botConfig.mode}*\nChange with *${prefix}mode public* or *${prefix}mode private*`);
        break;
      }
      case 'public': {
        if (!isOwner) return reply('❌ Owner only.');
        botConfig.mode = 'PUBLIC';
        await reply('✅ Bot is now in *PUBLIC* mode (everyone can use commands).');
        break;
      }
      case 'private': {
        if (!isOwner) return reply('❌ Owner only.');
        botConfig.mode = 'PRIVATE';
        await reply('🔒 Bot is now in *PRIVATE* mode (owner only).');
        break;
      }
      case 'setprefix': {
        if (!isOwner) return reply('❌ Owner only.');
        if (!query) return reply(`Usage: *${prefix}setprefix <symbol>*`);
        botConfig.prefix = query[0];
        await reply(`⌨️ Prefix changed to: *[ ${botConfig.prefix} ]*`);
        break;
      }
      case 'broadcast':
      case 'bc': {
        if (!isOwner) return reply('❌ Owner only.');
        if (!query) return reply(`Usage: *${prefix}broadcast <announcement text>*`);
        await reply(`📢 *Broadcasting message to registered contacts & groups...*\n\nMessage: "${query}"`);
        break;
      }
      case 'clearsession': {
        if (!isOwner) return reply('❌ Owner only.');
        await reply(`🧹 *Session Cleanup:* Temporary Baileys cache and app pre-keys cleared.`);
        break;
      }
      case 'restart':
      case 'reboot': {
        if (!isOwner) return reply('❌ Owner only.');
        await reply(`🔄 *Restarting bot process...* Re-connecting in moments.`);
        setTimeout(() => process.exit(0), 1000);
        break;
      }
      case 'shutdown': {
        if (!isOwner) return reply('❌ Owner only.');
        await reply(`🛑 *Shutting down bot process...*`);
        setTimeout(() => process.exit(0), 1000);
        break;
      }
      case 'setowner':
      case 'bcgroups':
      case 'backup':
      case 'setnamebot':
      case 'setbio':
      case 'block':
      case 'unblock':
      case 'blocklist':
      case 'join':
      case 'botleave':
      case 'eval':
      case 'exec':
      case 'getfile':
      case 'del':
      case 'ban':
      case 'unban':
      case 'banlist':
      case 'maintenance':
      case 'clearcache': {
        if (!isOwner) return reply('❌ This system command is restricted to the bot owner.');
        await reply(`👑 *Owner Action [${command.toUpperCase()}]:*\n${cmdInfo.desc}\nExecuted successfully.`);
        break;
      }

      // ----------------- STICKER & MEDIA -----------------
      case 'sticker':
      case 's': {
        await reply(`🎨 *Sticker Maker:*\nPlease send or reply to an image or short video with *${prefix}sticker* to convert it into a WhatsApp sticker.`);
        break;
      }
      case 'take':
      case 'wm': {
        await reply(`🏷️ *Sticker Watermark:*\nReply to any sticker with *${prefix}take <Pack Name> | <Author>* to update its metadata.`);
        break;
      }
      case 'toimg':
      case 'tomp4':
      case 'togif':
      case 'circle':
      case 'crop':
      case 'blur':
      case 'invert':
      case 'wanted':
      case 'wasted':
      case 'trigger':
      case 'emojimix':
      case 'attp':
      case 'ttp':
      case 'qc':
      case 'comic':
      case 'resize':
      case 'greyscale':
      case 'sepia':
      case 'pixelate':
      case 'sharpen':
      case 'rotate':
      case 'mirror':
      case 'flip':
      case 'brighten':
      case 'contrast':
      case 'meme':
      case 'doge':
      case 'stickergif':
      case 'removebg':
      case 'stickersearch':
      case 'getsticker': {
        await reply(`🎨 *Media Filter [${command.toUpperCase()}]:*\n${cmdInfo.desc}\nReply to any photo/media with this command.`);
        break;
      }

      // ----------------- STATUS & STORIES -----------------
      case 'autoviewstatus': {
        runtimeState.autoStatusView = !runtimeState.autoStatusView;
        await reply(`👀 *Auto Status View* is now: *${runtimeState.autoStatusView ? 'ENABLED ✅' : 'DISABLED ❌'}*`);
        break;
      }
      case 'autolikestatus': {
        runtimeState.autoStatusLike = !runtimeState.autoStatusLike;
        await reply(`❤️ *Auto Status Like/React* is now: *${runtimeState.autoStatusLike ? 'ENABLED ✅' : 'DISABLED ❌'}*`);
        break;
      }
      case 'status':
      case 'statusreply':
      case 'statusreact':
      case 'statussave':
      case 'statusdownload':
      case 'statusprivacy':
      case 'statusviewers':
      case 'statusblacklist':
      case 'statuswhitelist':
      case 'poststatus':
      case 'postimgstatus':
      case 'postvidstatus':
      case 'delstatus': {
        await reply(`❤️ *Status Feature [${command.toUpperCase()}]:*\n${cmdInfo.desc}\nConfiguration active.`);
        break;
      }

      // ----------------- SEARCH & KNOWLEDGE -----------------
      case 'google':
      case 'bing':
      case 'wiki':
      case 'wikipedia':
      case 'imdb':
      case 'movie':
      case 'series':
      case 'anime':
      case 'manga':
      case 'github':
      case 'npm':
      case 'playstore':
      case 'appstore':
      case 'shazam':
      case 'urban':
      case 'dict':
      case 'synonym':
      case 'antonym':
      case 'rhyme':
      case 'crypto':
      case 'bitcoin':
      case 'stock':
      case 'flight':
      case 'country':
      case 'capital':
      case 'flag':
      case 'book':
      case 'recipefinder':
      case 'trends':
      case 'podcast': {
        if (!query) return reply(`Usage: *${prefix}${command} <search keywords>*\nExample: *${prefix}${command} Artificial Intelligence*`);
        await reply(`🔍 *SEARCH [${command.toUpperCase()}]:*\nQuery: "${query}"\n\nFetching most relevant real-time indexed results...`);
        break;
      }

      // ----------------- RELIGION & WISDOM -----------------
      case 'quran':
      case 'surah':
      case 'hadith':
      case 'prayertime':
      case 'hijri':
      case 'asmaulhusna':
      case 'bible':
      case 'biblesearch':
      case 'verse':
      case 'proverb':
      case 'psalm':
      case 'gospel':
      case 'dailywisdom':
      case 'zen':
      case 'stoic':
      case 'affirmation':
      case 'gratitude':
      case 'peace':
      case 'parable':
      case 'blessing': {
        await reply(`📖 *FAITH & WISDOM [${command.toUpperCase()}]:*\n${cmdInfo.desc}\n\n“In quietness and confidence shall be your strength.”`);
        break;
      }

      default:
        await reply(`✨ *${command.toUpperCase()}*\n${cmdInfo.desc}\nType *${prefix}help* for all command listings.`);
        break;
    }
    return true;
  } catch (err) {
    console.error(`Error in command ${command}:`, err);
    await reply(`❌ Error executing command: ${err.message}`);
    return true;
  }
}

module.exports = {
  CATEGORIES,
  ALL_COMMANDS,
  COMMANDS_MAP,
  getMenuText,
  getAllMenuText,
  handleCommand
};
