const mysql = require('mysql2/promise');
const fs = require('node:fs/promises');

class DB {
    constructor(configPath = 'config.json') {
        this.configPath = configPath;
        this.connection = null;
        this.config = null;
    }

    async loadConfig() {
        try {
            const fileData = await fs.readFile(this.configPath, 'utf-8');
            const parsedConfig = JSON.parse(fileData);
            if (!parsedConfig || !parsedConfig.Mysql) {
              throw new Error("Неправильная структура файла конфигурации, отсутствует ключ Mysql");
            }
            this.config = {
                host: parsedConfig.Mysql.IP,
                port: parsedConfig.Mysql.port,
                user: parsedConfig.Mysql.User,
                password: parsedConfig.Mysql.Password,
                database: parsedConfig.Mysql.DataBase,
            };
        } catch (error) {
            console.error("Ошибка при загрузке файла конфигурации:", error);
            throw error;
        }
    }

    async connect() {
         if (this.config == null){
            await this.loadConfig();
        }
        try {
            this.connection = await mysql.createConnection(this.config);
            console.log('Успешное подключение к базе данных');
            return this.connection;
        } catch (error) {
            console.error('Ошибка подключения к базе данных:', error);
            throw error;
        }
    }

    async close() {
        if (this.connection) {
             try {
              await  this.connection.end();
              console.log("Подключение к базе данных закрыто");
            } catch (error) {
                console.error('Ошибка при закрытии подключения:', error);
            } finally {
                this.connection = null; 
            }
        }
    }
      async query(sql, values) {
         if (!this.connection) {
          await this.connect(); 
        }
        try {
            const [rows] = await this.connection.execute(sql, values);
            return rows;
        } catch (error) {
           console.error('Ошибка при выполнении запроса:', error);
           throw error;
        }
    }
}
module.exports = {
  DB
};