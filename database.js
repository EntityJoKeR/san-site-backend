const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
      console.error("Ошибка подключения к базе:", err.message);
    } else {
      console.log("Подключено к базе SQLite");
    }})

const database = () => {
    return db
}

const init = () => {
    db.serialize(()=>{
        db.run(`
            create table if not exists cases (
                id integer primary key autoincrement unique,
                name text,
                description text,
                filename text,
                date text
            )
        `)
    })
}

const addCase = (obj) => {
    db.run(`insert into cases (name, description, filename, date) values (?, ?, ?, ?)`, [obj.name, obj.description, obj.filename, obj.date])
}


const getCases = () => {
    db.all('select * from cases', (err, data) => {
        return data
    })
}


//Tests
init()

addCase({
    id: 1,
    name: 'case name',
    description: 'case description',
    filename: 'file.img',
    date: '01.01.0001'
})

getCases()