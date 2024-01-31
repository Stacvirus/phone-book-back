const app = require('./app');
const config = require('./utils/config');
const { info } = require('./utils/logger');

app.listen(config.PORT, () => {
  info('server running on', config.PORT);
});
