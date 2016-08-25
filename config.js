var convict = require('convict');

// Define a schema
var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["prod", "dev", "local", "stage", "test"],
    default: "dev",
    env: "NODE_ENV"
  },
  port: {
    doc: "port",
    format: "port",
    default: "3000",
    env: "PORT"
  },
  task_db_path: {
    doc: "The path to taskdb",
    default: "/var/lib/taskbox-taskdb",
    env: "TASK_DB_PATH",
  },
  path_data: {
    doc: "The path to data jsons",
    default: "./data",
    env: "PATH_DATA"
  },
  schedule_to_generate: {
    doc: "The schedule for generating the data files from DB",
    default: "0 0 0 * * *",
    env: "SCHEDULE_TO_GENERATE"
  },
  smtpConfig: {
    doc: "SMTP config",
    default: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: '***@gmail.com', 
            pass: '****' 
        }
    }
  }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

// Perform validation
//conf.validate({strict: true});

module.exports = conf;