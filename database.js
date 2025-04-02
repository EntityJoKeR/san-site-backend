import sqlite3 from "sqlite3"

const db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
      console.error("Ошибка подключения к базе:", err.message);
    } else {
      console.log("Подключено к базе SQLite");
    }
});


export const init = () => {
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

export const addCase = (obj) => {
    db.run(`insert into cases (name, description, filename, date) values (?, ?, ?, ?)`, [obj.name, obj.description, obj.filename, obj.date])
}


export const getCases = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from cases', (err, data) => {
            console.log(data)
            if (err){
                reject(err)
            }
            resolve(data)
        })
        

    })
}

export const getCase = (id) => {
    return new Promise((resolve, reject) => {
        db.all('select * from cases where id=?', [id], (err, data) => {
            
            if (err){
                reject(err)
            }
            resolve(data)
        })
    })
}

export const deleteCase = (caseId) => {
    db.run(`delete from cases where id=?`, [caseId], (err, data) => {
        if (err) {
            return err
        }
        else {
            return null
        }
    })
}



    


//Tests
// init()

// addCase({
//     id: 1,
//     name: 'case name',
//     description: 'case description',
//     filename: 'file.img',
//     date: '01.01.0001'
// })

// getCases()
// deleteCase(1)


// Данные для отправки
