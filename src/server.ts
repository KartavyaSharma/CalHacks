import App from './app';
import config from 'config';

/** Sets up server and waits for all processes to finish. */
async function main() {
    const app = new App();
    await app.initialize();
    app.server.listen(config.get('port'), () => {
        console.log(`Server is running on port ${config.get('port')}`);
    });
}

/** Begin */
main();