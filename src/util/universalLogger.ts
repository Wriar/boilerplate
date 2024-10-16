const consoleColors = {
    'reset': '\x1b[0m',
    'bright': '\x1b[1m',
    'dim': '\x1b[2m',
    'underscore': '\x1b[4m',
    'blink': '\x1b[5m',
    'reverse': '\x1b[7m',
    'hidden': '\x1b[8m',
    'black': '\x1b[30m',
    'red': '\x1b[31m',
    'green': '\x1b[32m',
    'yellow': '\x1b[33m',
    'blue': '\x1b[34m',
    'magenta': '\x1b[35m',
    'cyan': '\x1b[36m',
    'white': '\x1b[37m',
    'bgBlack': '\x1b[40m',
    'bgRed': '\x1b[41m',
    'bgGreen': '\x1b[42m',
    'bgYellow': '\x1b[43m',
    'bgBlue': '\x1b[44m',
    'bgMagenta': '\x1b[45m',
    'bgCyan': '\x1b[46m',
    'bgWhite': '\x1b[47m',
    'default': '\x1b[39m',
};

type severity = 'console' | 'debug' | 'info' | 'warn' | 'error';

const displayInConsole = true;

/**
 * Universal SysLogging Module:
 * Logs a message to the console and application logs.
 * @param message The message to log.
 * @param color The color to display the message in.
 * @param severity The severity of the message (debug, info, warn, error)
 * @param exception An optional exception to log with the message.
 * @constructor
 */
function DEBUG_ASSERT(message: string, color?: keyof typeof consoleColors, severity?: severity, exception?: Error): void {
    if (displayInConsole) {
        if (color) {
            if (severity) {
                console.log(`${consoleColors[color]}${message}${consoleColors['reset']}`);
            } else {
                console.log(`${consoleColors[color]}${message}${consoleColors['reset']}`);
            }
        } else {
            if (severity) {
                console.log(`${message}`);
            } else {
                console.log(message);
            }
        }
    }

    if (exception) {
        console.error(exception);
    }
}

/**
 * Logs a message to the console. No application logs are generated.
 * @param message The message to log.
 * @constructor
 */
function CONSOLE_ASSERT(message: string): void {
    console.log(message);
}

export {DEBUG_ASSERT, CONSOLE_ASSERT};