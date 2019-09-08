var dbMan = require('./testDb');
before(()=>dbMan.start());
after(()=>dbMan.stop());
require('./controllers/IndexControllerTest');

